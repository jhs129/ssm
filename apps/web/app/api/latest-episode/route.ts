import { NextResponse } from "next/server"
import { fetchEntries } from "@builder.io/sdk-react"
import { BUILDER_API_KEY } from "@/lib/builder"

// Same ISR window as the rest of the site's Builder-driven content (see
// apps/web/app/[[...page]]/page.tsx and apps/web/app/shows/[slug]/page.tsx).
export const revalidate = 300

interface Episode {
  title?: string
  url?: string
  thumbnail?: string
  publishDate?: string
}

interface LatestEpisode extends Episode {
  showName?: string
  showSlug?: string
  showLogo?: string
}

export async function GET() {
  const shows = await fetchEntries({
    model: "show",
    apiKey: BUILDER_API_KEY,
    options: { noTargeting: true },
  })

  const episodes: LatestEpisode[] = shows.flatMap((show) => {
    const data = show.data || {}
    const showEpisodes: Episode[] = Array.isArray(data.episodes) ? data.episodes : []
    return showEpisodes
      .filter((episode) => episode.url && episode.publishDate)
      .map((episode) => ({
        ...episode,
        showName: data.name,
        showSlug: data.slug,
        showLogo: data.logo,
      }))
  })

  episodes.sort((a, b) => new Date(b.publishDate!).getTime() - new Date(a.publishDate!).getTime())

  const latest = episodes[0] ?? null

  return NextResponse.json({ episode: latest })
}
