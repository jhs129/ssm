'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'
import { useSiteProperties } from '../../contexts/SitePropertiesProvider'

export interface NavLink {
  label: string
  url: string
}

export interface SiteHeaderProps {
  logo?: string
  siteName?: string
  navLinks?: NavLink[]
  shows?: NavLink[]
}

const DEFAULT_NAV_LINKS: NavLink[] = [
  { label: 'Home', url: '/' },
  { label: 'About', url: '/#about' },
  { label: 'Connect', url: '/contact' },
]

const DEFAULT_SHOWS: NavLink[] = [
  { label: 'Schneider Sports Media', url: '/shows/schneider-sports-media' },
  { label: 'Inside the Nest RHS', url: '/shows/inside-the-nest' },
  { label: 'Atlanta Sportscast', url: '/shows/atlanta-sportscast' },
]

export function SiteHeader({
  logo,
  siteName = 'Schneider Sports Media',
  navLinks = DEFAULT_NAV_LINKS,
  shows = DEFAULT_SHOWS,
}: SiteHeaderProps) {
  const siteProperties = useSiteProperties()
  const resolvedLogo = logo || siteProperties?.data?.logo || '/images/ssm-logo.png'

  const [mobileOpen, setMobileOpen] = useState(false)
  const [showsOpen, setShowsOpen] = useState(false)
  const [mobileShowsOpen, setMobileShowsOpen] = useState(false)

  const primaryLinks = navLinks.slice(0, -1)
  const lastLink = navLinks[navLinks.length - 1]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image src={resolvedLogo} alt={`${siteName} logo`} width={48} height={48} className="rounded-full" />
          <span className="hidden font-display text-lg font-bold uppercase tracking-wide text-foreground sm:inline-block">
            {siteName}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {primaryLinks.map((link) => (
            <Link
              key={link.url}
              href={link.url}
              className="rounded-md px-4 py-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}

          {shows.length > 0 && (
            <div
              className="relative"
              onMouseEnter={() => setShowsOpen(true)}
              onMouseLeave={() => setShowsOpen(false)}
            >
              <button
                className="flex items-center gap-1 rounded-md px-4 py-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-expanded={showsOpen}
                aria-haspopup="true"
                onClick={() => setShowsOpen(true)}
              >
                Shows
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
              {showsOpen && (
                <div className="absolute left-0 top-full w-64 rounded-md border border-border bg-background p-1 shadow-lg">
                  {shows.map((show) => (
                    <Link
                      key={show.url}
                      href={show.url}
                      className="block rounded-md px-4 py-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      {show.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {lastLink && (
            <Link
              href={lastLink.url}
              className="rounded-md px-4 py-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {lastLink.label}
            </Link>
          )}
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center justify-center rounded-md p-2 text-foreground md:hidden"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <nav className="border-t border-border/50 bg-background px-4 pb-6 pt-2 md:hidden">
          {primaryLinks.map((link) => (
            <Link
              key={link.url}
              href={link.url}
              onClick={() => setMobileOpen(false)}
              className="block rounded-md px-4 py-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}

          {shows.length > 0 && (
            <>
              <button
                onClick={() => setMobileShowsOpen((open) => !open)}
                className="flex w-full items-center justify-between rounded-md px-4 py-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-expanded={mobileShowsOpen}
              >
                Shows
                <ChevronDown className={`h-4 w-4 transition-transform ${mobileShowsOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileShowsOpen && (
                <div className="pl-4">
                  {shows.map((show) => (
                    <Link
                      key={show.url}
                      href={show.url}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-md px-4 py-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      {show.label}
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}

          {lastLink && (
            <Link
              href={lastLink.url}
              onClick={() => setMobileOpen(false)}
              className="block rounded-md px-4 py-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {lastLink.label}
            </Link>
          )}
        </nav>
      )}
    </header>
  )
}
