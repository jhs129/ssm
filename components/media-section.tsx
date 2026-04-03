import Link from "next/link"
import Image from "next/image"
import { Headphones, ExternalLink, Play } from "lucide-react"

const videos = [
  {
    id: "p82u25ET1qM",
    title: "LIVE at the Roswell Market Expo with Rob Madden",
  },
  {
    id: "6CXo4Rca4A4",
    title: "LIVE at the Roswell Market Expo with Rob Madden (Part 2)",
  },
  {
    id: "DxbEq2_oivA",
    title: "A Football Season Look Ahead, Gainesville Turnover, & MASS Coaching Carousel Cycle",
  },
]

export function MediaSection() {
  return (
    <section id="watch" className="relative overflow-hidden bg-card py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="mb-16 flex flex-col items-center text-center">
          <span className="mb-3 font-display text-sm font-bold uppercase tracking-[0.2em] text-secondary">
            Watch &amp; Listen
          </span>
          <h2 className="font-display text-4xl font-bold uppercase tracking-tight text-foreground md:text-5xl">
            <span className="text-balance">Catch The Action</span>
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Watch the latest episodes and highlights on YouTube, or tune in on Spotify.
          </p>
        </div>

        {/* Featured Channel Embed */}
        <div className="mx-auto max-w-4xl">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border">
            <iframe
              src="https://www.youtube.com/embed?listType=user_uploads&list=SchneiderSportsMedia"
              title="Schneider Sports Media YouTube Channel"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </div>

        {/* Recent Videos Grid */}
        <div className="mx-auto mt-10 max-w-6xl">
          <h3 className="mb-6 font-display text-lg font-bold uppercase tracking-wide text-foreground">
            Recent Episodes
          </h3>
          <div className="grid gap-6 md:grid-cols-3">
            {videos.map((video) => (
              <div key={video.id} className="overflow-hidden rounded-lg border border-border bg-background">
                <div className="relative aspect-video w-full">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
                <div className="p-4">
                  <p className="line-clamp-2 font-display text-sm font-bold uppercase tracking-wide text-foreground">
                    {video.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="mx-auto mt-12 max-w-6xl">
          <div className="flex flex-col gap-6 sm:flex-row">
            {/* YouTube CTA */}
            <Link
              href="https://youtube.com/@SchneiderSportsMedia"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-1 items-center gap-4 rounded-lg border border-border bg-background p-6 transition-all hover:border-secondary/50"
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#FF0000] text-white">
                <Play className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <p className="font-display text-sm font-bold uppercase tracking-wide text-foreground">
                  @SchneiderSportsMedia
                </p>
                <p className="text-xs text-muted-foreground">Subscribe on YouTube</p>
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
            </Link>

            {/* Podcast / Spotify CTA */}
            <Link
              href="https://open.spotify.com/show/john-schneiders-georgia-high-school-sports-show"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-1 items-center gap-4 rounded-lg border border-border bg-background p-6 transition-all hover:border-[#1DB954]/50"
            >
              <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg border border-border">
                <Image
                  src="/images/ga-podcast-logo.png"
                  alt="Georgia High School Sports Show podcast artwork"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="font-display text-sm font-bold uppercase tracking-wide text-foreground">
                  {"John Schneider's Georgia High School Sports Show"}
                </p>
                <p className="text-xs text-muted-foreground">Listen on Spotify</p>
              </div>
              <Headphones className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-[#1DB954]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
