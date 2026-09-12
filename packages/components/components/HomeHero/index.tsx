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
  subheading = 'Georgia high school sports, covered the way it deserves to be.',
  primaryCtaLabel = 'Explore The Shows',
  primaryCtaHref = '#shows',
  secondaryCtaLabel = 'About John',
  secondaryCtaHref = '#about',
}: HomeHeroProps) {
  return (
    // Mobile is a cinematic overlay: the photo goes full-bleed behind a scrim so
    // the headline and CTAs land above the fold. From lg up it reverts to the
    // framed portrait beside the copy, and the same <Image> serves both.
    <section className="relative flex min-h-[88svh] items-end overflow-hidden lg:min-h-screen lg:items-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(225,100%,18%)_0%,_hsl(220,30%,5%)_70%)]" />

      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(hsl(0,0%,100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0,0%,100%) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="z-10 mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pb-12 pt-20 lg:grid lg:grid-cols-[minmax(0,380px)_1fr] lg:items-center lg:gap-16 lg:px-8 lg:py-32">
        {/* Absolute on mobile (positioned against the section), an in-flow grid
            item from lg up. */}
        <div className="absolute inset-0 lg:relative lg:mx-0 lg:w-full">
          <div className="relative h-full w-full overflow-hidden lg:aspect-[3/4] lg:h-auto lg:rounded-lg lg:border lg:border-border lg:shadow-2xl lg:shadow-primary/20">
            <Image
              src={photo}
              alt="John Schneider on the sidelines at a Georgia high school football game"
              fill
              className="object-cover object-top"
              priority
              sizes="(min-width: 1024px) 380px, 100vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/80 to-background lg:hidden" />
          <div className="absolute -bottom-4 -right-4 -z-10 hidden h-full w-full rounded-lg border-2 border-primary/30 lg:block" />
        </div>

        {/* `relative` is load-bearing: the photo beside it is absolutely
            positioned on mobile and would otherwise paint over this column. */}
        <div className="relative flex flex-col items-center gap-6 text-center lg:items-start lg:gap-8 lg:text-left">
          {/* Redundant with the fixed header logo on mobile, where vertical
              space above the fold is the scarce resource. */}
          <Image
            src={logoImage}
            alt="Schneider Sports Media logo"
            width={72}
            height={72}
            className="hidden rounded-full shadow-lg shadow-primary/30 lg:block"
          />

          <div className="flex flex-col items-center gap-3 lg:items-start lg:gap-4">
            <h1 className="text-balance font-display text-4xl font-bold uppercase leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              {heading}
            </h1>
            <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl">
              {subheading}
            </p>
          </div>

          <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-center sm:gap-4 lg:justify-start">
            <Link
              href={primaryCtaHref}
              className="rounded-md bg-primary px-8 py-3 text-center font-display text-sm font-bold uppercase tracking-wider text-primary-foreground transition-all hover:bg-primary/80"
            >
              {primaryCtaLabel}
            </Link>
            <Link
              href={secondaryCtaHref}
              className="rounded-md border-2 border-secondary bg-transparent px-8 py-3 text-center font-display text-sm font-bold uppercase tracking-wider text-secondary transition-all hover:bg-secondary hover:text-secondary-foreground"
            >
              {secondaryCtaLabel}
            </Link>
          </div>
        </div>

        <Link
          href={primaryCtaHref}
          className="hidden animate-bounce items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground lg:absolute lg:bottom-[-64px] lg:left-1/2 lg:flex lg:-translate-x-1/2"
          aria-label="Scroll to the shows section"
        >
          <ArrowDown className="h-5 w-5" />
        </Link>
      </div>
    </section>
  )
}
