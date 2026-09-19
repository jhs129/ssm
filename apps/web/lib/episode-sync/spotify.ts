import type { SyncedEpisode } from './types'

interface SpotifyTokenResponse {
  access_token: string
  expires_in: number
}

interface SpotifyEpisodeItem {
  name: string
  release_date: string
  external_urls?: { spotify?: string }
  images?: { url: string }[]
}

async function getSpotifyAccessToken(): Promise<string | null> {
  const clientId = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
  if (!clientId || !clientSecret) return null

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
    },
    body: 'grant_type=client_credentials',
  })
  if (!res.ok) return null

  const data: SpotifyTokenResponse = await res.json()
  return data.access_token
}

function extractSpotifyShowId(spotifyUrl: string): string | null {
  return spotifyUrl.match(/show\/([a-zA-Z0-9]+)/)?.[1] ?? null
}

// Requires SPOTIFY_CLIENT_ID / SPOTIFY_CLIENT_SECRET (a Spotify Developer app
// using the Client Credentials flow). Returns [] rather than throwing when
// those aren't configured, so YouTube shows keep syncing regardless.
export async function fetchSpotifyEpisodes(spotifyUrl: string, limit = 5): Promise<SyncedEpisode[]> {
  const showId = extractSpotifyShowId(spotifyUrl)
  if (!showId) return []

  const token = await getSpotifyAccessToken()
  if (!token) return []

  const res = await fetch(`https://api.spotify.com/v1/shows/${showId}/episodes?market=US&limit=${limit}`, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 300 },
  })
  if (!res.ok) return []

  const data: { items?: SpotifyEpisodeItem[] } = await res.json()

  return (data.items ?? [])
    .map((item) => {
      const url = item.external_urls?.spotify
      if (!url || !item.release_date) return null

      return {
        title: item.name,
        url,
        thumbnail: item.images?.[0]?.url ?? '',
        publishDate: new Date(item.release_date).toISOString(),
      }
    })
    .filter((episode): episode is SyncedEpisode => episode !== null)
}
