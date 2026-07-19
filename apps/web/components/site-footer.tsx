import Image from "next/image"
import Link from "next/link"
import { Instagram, Youtube, Mail } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          {/* Brand */}
          <div className="flex flex-col items-center gap-4 md:items-start">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/ssm-logo.png"
                alt="Schneider Sports Media logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="font-display text-sm font-bold uppercase tracking-wide text-foreground">
                Schneider Sports Media
              </span>
            </Link>
            <p className="max-w-sm text-center text-sm leading-relaxed text-muted-foreground md:text-left">
              Covering Georgia high school sports the way it deserves to be covered.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <Link
              href="https://instagram.com/schneidersports_media"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
              aria-label="Follow on Instagram"
            >
              <Instagram className="h-5 w-5" />
            </Link>
            <Link
              href="https://youtube.com/@SchneiderSportsMedia"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
              aria-label="Subscribe on YouTube"
            >
              <Youtube className="h-5 w-5" />
            </Link>
            <Link
              href="mailto:jschneider.sports.media@gmail.com"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
              aria-label="Send email"
            >
              <Mail className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Schneider Sports Media. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
