import { BUILDER_API_KEY } from '@/lib/builder'
import { fetchYoutubeEpisodes, resolveYoutubeChannelId } from './youtube'
import { fetchSpotifyEpisodes } from './spotify'
import type { SyncedEpisode } from './types'

const MAX_EPISODES_PER_SHOW = 12

interface ShowEntry {
  id: string
  data: {
    name?: string
    platform?: string
    youtubeUrl?: string
    spotifyUrl?: string
    episodes?: SyncedEpisode[]
  }
}

async function fetchShows(): Promise<ShowEntry[]> {
  const res = await fetch(
    `https://cdn.builder.io/api/v3/content/show?apiKey=${BUILDER_API_KEY}&noTargeting=true&limit=100`,
    { cache: 'no-store' },
  )
  if (!res.ok) throw new Error(`Failed to fetch shows from Builder: ${res.status}`)

  const data: { results?: ShowEntry[] } = await res.json()
  return data.results ?? []
}

function mergeEpisodes(existing: SyncedEpisode[], incoming: SyncedEpisode[]): SyncedEpisode[] {
  const byUrl = new Map<string, SyncedEpisode>()
  for (const episode of [...existing, ...incoming]) {
    if (episode.url) byUrl.set(episode.url, episode)
  }

  return Array.from(byUrl.values())
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .slice(0, MAX_EPISODES_PER_SHOW)
}

async function updateShowEpisodes(showId: string, episodes: SyncedEpisode[]) {
  const privateKey = process.env.BUILDER_PRIVATE_KEY
  if (!privateKey) throw new Error('BUILDER_PRIVATE_KEY is not set')

  const res = await fetch(`https://builder.io/api/v1/write/show/${showId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${privateKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: { episodes } }),
  })

  if (!res.ok) {
    throw new Error(`Failed to update show ${showId} in Builder: ${res.status} ${await res.text()}`)
  }
}

export interface ShowSyncResult {
  show: string
  platform?: string
  added: number
  error?: string
}

export async function syncAllShows(): Promise<ShowSyncResult[]> {
  const shows = await fetchShows()

  return Promise.all(
    shows.map(async (show): Promise<ShowSyncResult> => {
      const { name, platform, youtubeUrl, spotifyUrl, episodes: existing = [] } = show.data

      try {
        let fetched: SyncedEpisode[] = []

        if (platform === 'youtube' && youtubeUrl) {
          const channelId = await resolveYoutubeChannelId(youtubeUrl)
          if (channelId) fetched = await fetchYoutubeEpisodes(channelId)
        } else if (platform === 'spotify' && spotifyUrl) {
          fetched = await fetchSpotifyEpisodes(spotifyUrl)
        }

        const existingUrls = new Set(existing.map((episode) => episode.url))
        const newEpisodes = fetched.filter((episode) => !existingUrls.has(episode.url))

        if (newEpisodes.length > 0) {
          await updateShowEpisodes(show.id, mergeEpisodes(existing, newEpisodes))
        }

        return { show: name ?? show.id, platform, added: newEpisodes.length }
      } catch (error) {
        return {
          show: name ?? show.id,
          platform,
          added: 0,
          error: error instanceof Error ? error.message : String(error),
        }
      }
    }),
  )
}
