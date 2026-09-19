import type { SyncedEpisode } from './types'

// YouTube serves a stripped-down page to non-browser user agents that omits
// the channel metadata we need, so a real browser UA is required here.
const BROWSER_USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36'

// Handles (@name) aren't accepted by the RSS feed endpoint, which only takes
// a channel ID — so we resolve it once per sync from the channel page itself.
export async function resolveYoutubeChannelId(youtubeUrl: string): Promise<string | null> {
  if (!youtubeUrl) return null

  const res = await fetch(youtubeUrl, { headers: { 'User-Agent': BROWSER_USER_AGENT } })
  if (!res.ok) return null

  const html = await res.text()
  return html.match(/"externalId":"(UC[\w-]+)"/)?.[1] ?? null
}

function decodeXmlEntities(value: string): string {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
}

// YouTube's channel RSS feed has no auth or quota requirements, unlike the
// Data API, so it's used here instead of registering an API key.
export async function fetchYoutubeEpisodes(channelId: string, limit = 5): Promise<SyncedEpisode[]> {
  const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`, {
    headers: { 'User-Agent': BROWSER_USER_AGENT },
  })
  if (!res.ok) return []

  const xml = await res.text()
  const entries = xml.split('<entry>').slice(1, limit + 1)

  return entries
    .map((entry) => {
      const videoId = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1]
      const title = entry.match(/<title>([^<]*)<\/title>/)?.[1]
      const published = entry.match(/<published>([^<]+)<\/published>/)?.[1]
      const thumbnail = entry.match(/<media:thumbnail url="([^"]+)"/)?.[1]

      if (!videoId || !title || !published || !thumbnail) return null

      return {
        title: decodeXmlEntities(title),
        url: `https://youtu.be/${videoId}`,
        thumbnail,
        publishDate: new Date(published).toISOString(),
      }
    })
    .filter((episode): episode is SyncedEpisode => episode !== null)
}
