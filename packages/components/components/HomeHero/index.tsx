'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown } from 'lucide-react'

export interface HomeHeroProps {
  photo?: string
  logoImage?: string
  heading?: string
  subheading?: string
  primaryCtaLabel?: string
  primaryCtaHref?: string
  secondaryCtaLabel?: string
  secondaryCtaHref?: string
}

export function HomeHero({
  photo = '/images/john-schneider.png',
  logoImage = '/images/ssm-logo.png',
  heading = 'Schneider Sports Media',
  subheading = 'Video, audio, and storytelling from John Schneider — covering Georgia high school sports through three shows: Schneider Sports Media, Inside the Nest RHS, and Atlanta Sportscast.',
  primaryCtaLabel = 'About John',
  primaryCtaHref = '#about',
  secondaryCtaLabel = 'Explore The Shows',
  secondaryCtaHref = '#shows',
}: HomeHeroProps) {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(225,100%,18%)_0%,_hsl(220,30%,5%)_70%)]" />

      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(hsl(0,0%,100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0,0%,100%) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-12 px-4 py-32 lg:grid lg:grid-cols-[minmax(0,380px)_1fr] lg:items-center lg:gap-16 lg:px-8 lg:text-left">
        <div className="relative mx-auto w-full max-w-xs lg:mx-0 lg:max-w-none">
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg border border-border shadow-2xl shadow-primary/20">
            <Image
              src={photo}
              alt="John Schneider on the sidelines at a Georgia high school football game"
              fill
              className="object-cover object-top"
              priority
              sizes="(min-width: 1024px) 380px, 320px"
            />
          </div>
          <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-lg border-2 border-primary/30" />
        </div>

        <div className="flex flex-col items-center gap-8 text-center lg:items-start lg:text-left">
          <Image
            src={logoImage}
            alt="Schneider Sports Media logo"
            width={72}
            height={72}
            className="rounded-full shadow-lg shadow-primary/30"
          />

          <div className="flex flex-col items-center gap-4 lg:items-start">
            <h1 className="text-balance font-display text-5xl font-bold uppercase leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl">
              {heading}
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              {subheading}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <Link
              href={primaryCtaHref}
              className="rounded-md bg-primary px-8 py-3 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground transition-all hover:bg-primary/80"
            >
              {primaryCtaLabel}
            </Link>
            <Link
              href={secondaryCtaHref}
              className="rounded-md border-2 border-secondary bg-transparent px-8 py-3 font-display text-sm font-bold uppercase tracking-wider text-secondary transition-all hover:bg-secondary hover:text-secondary-foreground"
            >
              {secondaryCtaLabel}
            </Link>
          </div>
        </div>

        <Link
          href={secondaryCtaHref}
          className="flex animate-bounce items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground lg:absolute lg:bottom-[-64px] lg:left-1/2 lg:-translate-x-1/2"
          aria-label="Scroll to the shows section"
        >
          <ArrowDown className="h-5 w-5" />
        </Link>
      </div>
    </section>
  )
}
