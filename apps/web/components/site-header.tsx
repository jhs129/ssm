"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"

const shows = [
  { label: "Schneider Sports Media", href: "/shows/schneider-sports-media" },
  { label: "Inside the Nest RHS", href: "/shows/inside-the-nest" },
  { label: "Atlanta Sportscast", href: "/shows/atlanta-sportscast" },
]

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  // Blog nav link removed until real posts replace the placeholder content —
  // add { label: "Blog", href: "/blogs" } back here to restore it.
  { label: "Connect", href: "/contact" },
]

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showsOpen, setShowsOpen] = useState(false)
  const [mobileShowsOpen, setMobileShowsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/ssm-logo.png"
            alt="Schneider Sports Media logo"
            width={48}
            height={48}
            className="rounded-full"
          />
          <span className="hidden font-display text-lg font-bold uppercase tracking-wide text-foreground sm:inline-block">
            Schneider Sports Media
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <Link
            href="/"
            className="rounded-md px-4 py-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Home
          </Link>
          <Link
            href="/#about"
            className="rounded-md px-4 py-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            About
          </Link>

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
                    key={show.href}
                    href={show.href}
                    className="block rounded-md px-4 py-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {show.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Blog nav link removed until real posts replace the placeholder content —
              add <Link href="/blogs">Blog</Link> back here to restore it. */}
          <Link
            href="/contact"
            className="rounded-md px-4 py-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Connect
          </Link>
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center justify-center rounded-md p-2 text-foreground md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <nav className="border-t border-border/50 bg-background px-4 pb-6 pt-2 md:hidden">
          {navLinks.slice(0, 2).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block rounded-md px-4 py-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}

          <button
            onClick={() => setMobileShowsOpen((open) => !open)}
            className="flex w-full items-center justify-between rounded-md px-4 py-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-expanded={mobileShowsOpen}
          >
            Shows
            <ChevronDown className={`h-4 w-4 transition-transform ${mobileShowsOpen ? "rotate-180" : ""}`} />
          </button>
          {mobileShowsOpen && (
            <div className="pl-4">
              {shows.map((show) => (
                <Link
                  key={show.href}
                  href={show.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-md px-4 py-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {show.label}
                </Link>
              ))}
            </div>
          )}

          {navLinks.slice(2).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block rounded-md px-4 py-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
