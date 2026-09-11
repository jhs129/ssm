import Link from "next/link"
import { Play, ExternalLink } from "lucide-react"

export function WatchSection() {
  return (
    <section id="watch" className="relative overflow-hidden py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-16 flex flex-col items-center text-center">
          <span className="mb-3 font-display text-sm font-bold uppercase tracking-[0.2em] text-secondary">
            Watch
          </span>
          <h2 className="font-display text-4xl font-bold uppercase tracking-tight text-foreground md:text-5xl">
            <span className="text-balance">Catch The Action</span>
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Watch the latest episodes, highlights, and exclusive content on the Schneider Sports
            Media YouTube channel.
          </p>
        </div>

        {/* YouTube Embed Area */}
        <div className="mx-auto max-w-4xl">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border">
            <iframe
              src="https://www.youtube.com/embed?listType=user_uploads&list=SchneiderSportsMedia"
              title="Schneider Sports Media YouTube Channel"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
            {/* Fallback overlay if iframe doesn't load */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-card">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                <Play className="h-10 w-10" />
              </div>
              <p className="mt-6 font-display text-xl font-bold uppercase text-foreground">
                Schneider Sports Media
              </p>
              <p className="mt-2 text-muted-foreground">Latest videos and episodes</p>
              <Link
                href="https://youtube.com/@SchneiderSportsMedia"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center gap-2 rounded-md bg-secondary px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-secondary-foreground transition-all hover:bg-secondary/80"
              >
                Visit YouTube Channel
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Channel CTA */}
        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <Link
            href="https://youtube.com/@SchneiderSportsMedia"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-lg border border-border bg-card px-8 py-4 transition-all hover:border-secondary/50"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
              <Play className="h-5 w-5" />
            </div>
            <div className="text-left">
              <p className="font-display text-sm font-bold uppercase tracking-wide text-foreground">
                @SchneiderSportsMedia
              </p>
              <p className="text-xs text-muted-foreground">Subscribe on YouTube</p>
            </div>
            <ExternalLink className="ml-2 h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
          </Link>
        </div>
      </div>
    </section>
  )
}
