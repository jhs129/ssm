import { cache } from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Youtube, ExternalLink } from "lucide-react"
import { fetchOneEntry, fetchEntries } from "@builder.io/sdk-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BUILDER_API_KEY } from "@/lib/builder"
import { isPreviewingFromSearchParams } from "@/lib/page-utils"

// ISR window (seconds) for published Builder.io content. Must be a literal —
// App Router segment config is statically analyzed and rejects runtime/env
// expressions. Editors still get instant updates via Builder preview mode.
export const revalidate = 300

const fetchShow = cache(async (slug: string) =>
  fetchOneEntry({
    model: "show",
    apiKey: BUILDER_API_KEY,
    query: { "data.slug": slug },
    enrich: true,
  }),
)

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const shows = await fetchEntries({
    model: "show",
    apiKey: BUILDER_API_KEY,
    fields: "data.slug",
    options: { noTargeting: true },
  })

  return shows
    .map((show) => String(show.data?.slug))
    .filter(Boolean)
    .map((slug) => ({ slug }))
}

interface ShowRouteProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export async function generateMetadata({ params }: ShowRouteProps): Promise<Metadata> {
  const { slug } = await params
  const show = await fetchShow(slug)

  const title = show?.data?.name
  const description = show?.data?.metadata?.description || show?.data?.tagline || ""

  return {
    title:
      title && title !== "Schneider Sports Media"
        ? `${title} | Schneider Sports Media`
        : title,
    description,
    keywords: show?.data?.metadata?.keywords,
  }
}

interface Episode {
  title?: string
  url?: string
  thumbnail?: string
  publishDate?: string
}

function formatEpisodeDate(value?: string) {
  if (!value) return null
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

function SpotifyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.24 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  )
}

export default async function ShowPage({ params, searchParams }: ShowRouteProps) {
  const { slug } = await params
  const resolvedSearchParams = await searchParams
  const show = await fetchShow(slug)
  const isPreviewing = isPreviewingFromSearchParams(resolvedSearchParams)

  if (!show && !isPreviewing) {
    notFound()
  }

  const data = show?.data || {}
  const hasYoutube = Boolean(data.youtubeUrl)
  const hasSpotify = Boolean(data.spotifyUrl)
  const embedUrl = data.featuredEmbedUrl
  const isSpotifyEmbed = Boolean(embedUrl && embedUrl.includes("spotify.com"))
  const episodes: Episode[] = Array.isArray(data.episodes) ? data.episodes : []

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main id="main-content" className="flex-grow pt-16" role="main">
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(225,100%,50%,0.08),_transparent_60%)]" />
          <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 lg:grid-cols-[auto_1fr] lg:gap-16 lg:px-8 lg:py-24">
            {data.logo && (
              <div className="relative mx-auto aspect-square w-48 overflow-hidden rounded-lg border border-border shadow-xl shadow-primary/10 lg:w-64">
                <Image
                  src={data.logo}
                  alt={`${data.name || "Show"} logo`}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex flex-col items-center gap-4 text-center lg:items-start lg:text-left">
              <h1 className="text-balance font-display text-4xl font-bold uppercase tracking-tight text-foreground md:text-5xl">
                {data.name}
              </h1>
              {data.tagline && (
                <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                  {data.tagline}
                </p>
              )}
              <div className="mt-2 flex flex-wrap justify-center gap-3 lg:justify-start">
                {hasYoutube && (
                  <Link
                    href={data.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-md border-2 border-secondary bg-transparent px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-secondary transition-all hover:bg-secondary hover:text-secondary-foreground"
                  >
                    <Youtube className="h-4 w-4" />
                    Watch on YouTube
                  </Link>
                )}
                {hasSpotify && (
                  <Link
                    href={data.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground transition-all hover:bg-primary/80"
                  >
                    <SpotifyIcon className="h-4 w-4" />
                    Listen on Spotify
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>

        {data.description && (
          <section className="mx-auto max-w-3xl px-4 py-12 text-center lg:px-8">
            <span className="mb-3 block font-display text-sm font-bold uppercase tracking-[0.2em] text-secondary">
              About the Show
            </span>
            <p className="text-lg leading-relaxed text-muted-foreground">{data.description}</p>
          </section>
        )}

        {episodes.length > 0 && (
          <section className="border-t border-border bg-card py-16">
            <div className="mx-auto max-w-6xl px-4 lg:px-8">
              <div className="mb-10 flex flex-col items-center text-center">
                <span className="mb-3 font-display text-sm font-bold uppercase tracking-[0.2em] text-secondary">
                  Recent Episodes
                </span>
                <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-foreground md:text-4xl">
                  Catch Up On {data.name}
                </h2>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {episodes.map((episode, index) => {
                  const formattedDate = formatEpisodeDate(episode.publishDate)
                  return (
                    <Link
                      key={episode.url || index}
                      href={episode.url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-background transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
                    >
                      {episode.thumbnail && (
                        <div className="relative aspect-video w-full overflow-hidden">
                          <Image
                            src={episode.thumbnail}
                            alt={episode.title || "Episode thumbnail"}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                          />
                        </div>
                      )}
                      <div className="flex flex-1 flex-col gap-2 p-5">
                        <h3 className="line-clamp-2 font-display text-base font-bold leading-snug text-foreground">
                          {episode.title}
                        </h3>
                        {formattedDate && (
                          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            {formattedDate}
                          </span>
                        )}
                        <span className="mt-auto pt-3 text-xs font-semibold uppercase tracking-wider text-primary">
                          Watch / Listen →
                        </span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {embedUrl && (
          <section className="mx-auto max-w-4xl px-4 pb-16 lg:px-8">
            <div className="overflow-hidden rounded-lg border border-border shadow-lg">
              <iframe
                src={embedUrl}
                title={`${data.name || "Show"} latest episodes`}
                className={isSpotifyEmbed ? "h-[352px] w-full" : "aspect-video w-full"}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </section>
        )}

        <section className="border-t border-border bg-card py-12">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 text-center lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Explore the other shows
            </p>
            <Link
              href="/#shows"
              className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
            >
              See all shows
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
