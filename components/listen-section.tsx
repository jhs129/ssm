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
            {"Watch the latest episodes of John Schneider's Georgia High School Sports Show on YouTube."}
          </p>
        </div>

        {/* Video Gallery */}
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-3">
            {videos.map((video) => (
              <div key={video.id} className="overflow-hidden rounded-lg border border-border">
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
                  <h3 className="line-clamp-2 font-display text-sm font-bold uppercase tracking-wide text-foreground">
                    {video.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* YouTube Channel CTA */}
          <div className="mt-8 flex justify-center">
            <Link
              href="https://youtube.com/@SchneiderSportsMedia"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-lg border border-border bg-background px-8 py-4 transition-all hover:border-secondary/50"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF0000] text-white">
                <Play className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="font-display text-sm font-bold uppercase tracking-wide text-foreground">
                  @SchneiderSportsMedia
                </p>
                <p className="text-xs text-muted-foreground">Watch more on YouTube</p>
              </div>
              <ExternalLink className="ml-2 h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
            </Link>
          </div>
        </div>

        {/* Podcast Card */}
        <div className="mx-auto mt-12 max-w-4xl">
          <div className="flex flex-col items-center gap-8 rounded-lg border border-border bg-background p-8 sm:flex-row">
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
