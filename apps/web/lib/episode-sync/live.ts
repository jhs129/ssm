import { fetchEntries } from '@builder.io/sdk-react'
import { BUILDER_API_KEY } from '@/lib/builder'
import { fetchYoutubeEpisodes, resolveYoutubeChannelId } from './youtube'
import { fetchSpotifyEpisodes } from './spotify'
import type { SyncedEpisode } from './types'

export interface LatestEpisode extends SyncedEpisode {
  showName?: string
  showSlug?: string
  showLogo?: string
}

interface ShowMeta {
  name?: string
  slug?: string
  logo?: string
  platform?: string
  youtubeUrl?: string
  spotifyUrl?: string
}

async function fetchShowsMeta(): Promise<ShowMeta[]> {
  const shows = await fetchEntries({
    model: 'show',
    apiKey: BUILDER_API_KEY,
    options: { noTargeting: true },
  })

  return shows.map((show) => (show.data ?? {}) as ShowMeta)
}

// Queries each show's platform (YouTube RSS / Spotify API) directly on every
// request rather than reading the periodic cron sync's copy stored on the
// Builder show entry. The per-request cost is bounded by the `next.revalidate`
// caching on the underlying fetches in youtube.ts/spotify.ts, so this stays
// fresh without needing the cron job to have run recently.
export async function getLatestEpisodesLive(limit = 3): Promise<LatestEpisode[]> {
  const shows = await fetchShowsMeta()

  const perShow = await Promise.all(
    shows.map(async (show): Promise<LatestEpisode[]> => {
      try {
        let episodes: SyncedEpisode[] = []

        if (show.platform === 'youtube' && show.youtubeUrl) {
          const channelId = await resolveYoutubeChannelId(show.youtubeUrl)
          if (channelId) episodes = await fetchYoutubeEpisodes(channelId, limit)
        } else if (show.platform === 'spotify' && show.spotifyUrl) {
          episodes = await fetchSpotifyEpisodes(show.spotifyUrl, limit)
        }

        return episodes.map((episode) => ({
          ...episode,
          showName: show.name,
          showSlug: show.slug,
          showLogo: show.logo,
        }))
      } catch {
        return []
      }
    }),
  )

  return perShow
    .flat()
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .slice(0, limit)
}
