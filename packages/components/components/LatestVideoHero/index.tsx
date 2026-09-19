'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Play } from 'lucide-react'

interface LatestEpisode {
  title?: string
  url?: string
  thumbnail?: string
  publishDate?: string
  showName?: string
  showSlug?: string
  showLogo?: string
}

export interface LatestVideoHeroProps {
  eyebrow?: string
}

function formatEpisodeDate(value?: string) {
  if (!value) return null
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function LatestVideoHero({ eyebrow = 'Latest Episodes' }: LatestVideoHeroProps) {
  const [episodes, setEpisodes] = useState<LatestEpisode[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    fetch('/api/latest-episodes')
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setEpisodes(Array.isArray(data.episodes) ? data.episodes : [])
      })
      .catch(() => {
        if (!cancelled) setEpisodes([])
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  // Next.js scrolls to the URL hash once, on initial mount — before this
  // component's async fetch resolves. Swapping the loading skeleton for real
  // content changes this section's height and shifts everything below it
  // (including any hash target further down the page), leaving the scroll
  // position stale. Re-apply the hash scroll once this section has settled.
  useEffect(() => {
    if (loading) return
    const hash = window.location.hash
    if (!hash) return
    document.querySelector(hash)?.scrollIntoView()
  }, [loading])

  if (loading) {
    return (
      <section className="border-y border-border bg-card py-16">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:grid-cols-3 lg:px-8">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="animate-pulse overflow-hidden rounded-lg border border-border">
              <div className="aspect-video w-full bg-muted" />
              <div className="space-y-2 bg-background p-5">
                <div className="h-3 w-1/3 rounded bg-muted" />
                <div className="h-4 w-full rounded bg-muted" />
                <div className="h-3 w-1/4 rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (episodes.length === 0) {
    return null
  }

  return (
    <section className="border-y border-border bg-card py-16">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="mb-3 font-display text-sm font-bold uppercase tracking-[0.2em] text-secondary">
            {eyebrow}
          </span>
        </div>
        {/* Each card stacks its thumbnail above its copy; the cards themselves
            stack vertically on mobile and lay out side by side from sm up. */}
        <div className="grid gap-6 sm:grid-cols-3">
          {episodes.map((episode) => {
            const formattedDate = formatEpisodeDate(episode.publishDate)

            return (
              <Link
                key={episode.url}
                href={episode.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col overflow-hidden rounded-lg border border-border bg-background transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="relative aspect-video w-full overflow-hidden">
                  {episode.thumbnail && (
                    <Image
                      src={episode.thumbnail}
                      alt={episode.title || 'Episode thumbnail'}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      sizes="(min-width: 640px) 33vw, 100vw"
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/90 text-primary-foreground">
                      <Play className="h-5 w-5 translate-x-0.5" fill="currentColor" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  {episode.showLogo && (
                    <div className="flex items-center gap-2">
                      <div className="relative h-6 w-6 overflow-hidden rounded-full border border-border">
                        <Image src={episode.showLogo} alt={episode.showName || 'Show logo'} fill className="object-cover" />
                      </div>
                      <span className="font-display text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        {episode.showName}
                      </span>
                    </div>
                  )}
                  <h3 className="line-clamp-2 font-display text-base font-bold uppercase leading-snug tracking-tight text-foreground">
                    {episode.title}
                  </h3>
                  {formattedDate && (
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {formattedDate}
                    </span>
                  )}
                  <span className="mt-auto pt-2 text-sm font-semibold uppercase tracking-wider text-primary">
                    Watch Now →
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
