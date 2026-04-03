import Link from "next/link"
import Image from "next/image"
import { Headphones, ExternalLink } from "lucide-react"

export function ListenSection() {
  return (
    <section id="listen" className="relative overflow-hidden bg-card py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-16 flex flex-col items-center text-center">
          <span className="mb-3 font-display text-sm font-bold uppercase tracking-[0.2em] text-secondary">
            Listen
          </span>
          <h2 className="font-display text-4xl font-bold uppercase tracking-tight text-foreground md:text-5xl">
            <span className="text-balance">Tune In</span>
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {"John Schneider's Georgia High School Sports Show is available on Spotify. Listen wherever you are."}
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          {/* Spotify Embed */}
          <div className="overflow-hidden rounded-lg border border-border">
            <iframe
              src="https://open.spotify.com/embed/show/john-schneiders-georgia-high-school-sports-show?utm_source=generator&theme=0"
              width="100%"
              height="352"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="John Schneider's Georgia High School Sports Show on Spotify"
              className="w-full"
            />
          </div>

          {/* Podcast Card */}
          <div className="mt-8 flex flex-col items-center gap-8 rounded-lg border border-border bg-background p-8 sm:flex-row">
            <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-lg border border-border">
              <Image
                src="/images/ga-podcast-logo.png"
                alt="Georgia High School Sports Show podcast artwork"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-3 text-center sm:text-left">
              <h3 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">
                {"John Schneider's Georgia High School Sports Show"}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                New episodes covering the latest in Georgia high school sports. Interviews,
                highlights, hot takes, and hometown pride.
              </p>
              <div className="flex flex-wrap justify-center gap-3 sm:justify-start">
                <Link
                  href="https://open.spotify.com/show/john-schneiders-georgia-high-school-sports-show"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-md bg-[#1DB954] px-5 py-2.5 text-sm font-bold text-[#000000] transition-all hover:bg-[#1ed760]"
                >
                  <Headphones className="h-4 w-4" />
                  Listen on Spotify
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
