'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { fetchEntries } from '@builder.io/sdk-react'

export interface HomeShowsProps {
  eyebrow?: string
  heading?: string
  subheading?: string
}

interface ShowEntry {
  id: string
  data?: {
    slug?: string
    name?: string
    tagline?: string
    logo?: string
  }
}

// Fixed display order, leading with the umbrella brand, rather than
// Builder's default (creation-order) sort.
const SHOW_ORDER = ['schneider-sports-media', 'inside-the-nest', 'atlanta-sportscast']

export function HomeShows({
  eyebrow = 'The Shows',
  heading = 'Three Shows, One Mission',
  subheading = 'Video, audio, and everything in between — covering Georgia sports from every angle.',
}: HomeShowsProps) {
  const [shows, setShows] = useState<ShowEntry[]>([])

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_BUILDER_API_KEY
    if (!apiKey) return
    let cancelled = false

    fetchEntries({
      model: 'show',
      apiKey,
      options: { noTargeting: true },
    }).then((results) => {
      if (cancelled) return
      const filtered = (results as ShowEntry[])
        .filter((show) => show.data?.slug && show.data?.name)
        .sort(
          (a, b) =>
            SHOW_ORDER.indexOf(a.data?.slug || '') - SHOW_ORDER.indexOf(b.data?.slug || ''),
        )
      setShows(filtered)
    })

    return () => {
      cancelled = true
    }
  }, [])

  if (shows.length === 0) return null

  return (
    <section id="shows" className="relative overflow-hidden bg-card py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-16 flex flex-col items-center text-center">
          <span className="mb-3 font-display text-sm font-bold uppercase tracking-[0.2em] text-secondary">
            {eyebrow}
          </span>
          <h2 className="font-display text-4xl font-bold uppercase tracking-tight text-foreground md:text-5xl">
            <span className="text-balance">{heading}</span>
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {subheading}
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {shows.map((show) => {
            const data = show.data || {}
            return (
              <Link
                key={show.id}
                href={`/shows/${data.slug}`}
                className="group flex flex-col overflow-hidden rounded-lg border border-border bg-background transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
              >
                {data.logo ? (
                  <div className="relative aspect-video w-full overflow-hidden">
                    <Image
                      src={data.logo}
                      alt={`${data.name} logo`}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-video w-full items-center justify-center bg-muted">
                    <span className="font-display text-sm font-bold uppercase tracking-wide text-muted-foreground">
                      {data.name}
                    </span>
                  </div>
                )}
                <div className="flex flex-1 flex-col gap-2 p-6">
                  <h3 className="font-display text-lg font-bold uppercase tracking-wide text-foreground">
                    {data.name}
                  </h3>
                  {data.tagline && (
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {data.tagline}
                    </p>
                  )}
                  <span className="mt-auto pt-4 text-xs font-semibold uppercase tracking-wider text-primary">
                    View Show →
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
