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

export function LatestVideoHero({ eyebrow = 'Latest Episode' }: LatestVideoHeroProps) {
  const [episode, setEpisode] = useState<LatestEpisode | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    fetch('/api/latest-episode')
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setEpisode(data.episode)
      })
      .catch(() => {
        if (!cancelled) setEpisode(null)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  if (loading) {
    return (
      <section className="border-y border-border bg-card py-16">
        <div className="mx-auto max-w-6xl animate-pulse px-4 lg:px-8">
          <div className="aspect-video w-full rounded-lg bg-muted" />
        </div>
      </section>
    )
  }

  if (!episode) {
    return null
  }

  const formattedDate = formatEpisodeDate(episode.publishDate)

  return (
    <section className="border-y border-border bg-card py-16">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="mb-3 font-display text-sm font-bold uppercase tracking-[0.2em] text-secondary">
            {eyebrow}
          </span>
        </div>
        <Link
          href={episode.url || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="group grid gap-8 overflow-hidden rounded-lg border border-border bg-background transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 lg:grid-cols-2 lg:items-center"
        >
          <div className="relative aspect-video w-full overflow-hidden lg:aspect-auto lg:h-full">
            {episode.thumbnail && (
              <Image
                src={episode.thumbnail}
                alt={episode.title || 'Latest episode thumbnail'}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/90 text-primary-foreground">
                <Play className="h-6 w-6 translate-x-0.5" fill="currentColor" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 p-8 lg:p-10">
            {episode.showLogo && (
              <div className="flex items-center gap-2">
                <div className="relative h-8 w-8 overflow-hidden rounded-full border border-border">
                  <Image src={episode.showLogo} alt={episode.showName || 'Show logo'} fill className="object-cover" />
                </div>
                <span className="font-display text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {episode.showName}
                </span>
              </div>
            )}
            <h3 className="font-display text-2xl font-bold uppercase leading-snug tracking-tight text-foreground md:text-3xl">
              {episode.title}
            </h3>
            {formattedDate && (
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {formattedDate}
              </span>
            )}
            <span className="mt-2 text-sm font-semibold uppercase tracking-wider text-primary">
              Watch Now →
            </span>
          </div>
        </Link>
      </div>
    </section>
  )
}
