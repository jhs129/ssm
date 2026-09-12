'use client'

import Image from 'next/image'
import Link from 'next/link'

interface ShowReferenceValue {
  id?: string
  value?: {
    data?: {
      slug?: string
      name?: string
      tagline?: string
      logo?: string
    }
  }
}

export interface ShowCardProps {
  show?: ShowReferenceValue
}

export function ShowCard({ show }: ShowCardProps) {
  const data = show?.value?.data

  if (!data?.slug || !data?.name) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-lg border border-dashed border-border bg-background text-sm text-muted-foreground">
        Select a show to feature
      </div>
    )
  }

  return (
    <Link
      href={`/shows/${data.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-background transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
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
        <h3 className="line-clamp-2 min-h-14 font-display text-lg font-bold uppercase tracking-wide text-foreground">
          {data.name}
        </h3>
        <p className="line-clamp-2 min-h-11 text-sm leading-relaxed text-muted-foreground">
          {data.tagline || ''}
        </p>
        <span className="mt-auto pt-4 text-xs font-semibold uppercase tracking-wider text-primary">
          View Show →
        </span>
      </div>
    </Link>
  )
}
