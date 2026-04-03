import Image from "next/image"
import Link from "next/link"
import { Headphones, Play, Zap } from "lucide-react"

export function AboutPodcast() {
  return (
    <section className="border-b border-border bg-card py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Podcast artwork */}
          <div className="relative mx-auto w-full max-w-md lg:mx-0">
            <div className="absolute -inset-6 rounded-2xl bg-primary/5 blur-2xl" />
            <div className="relative aspect-square overflow-hidden rounded-xl border border-border shadow-2xl shadow-primary/10">
              <Image
                src="/images/ga-podcast-logo.png"
                alt="John Schneider's Georgia High School Sports Show podcast logo"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Podcast info */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <Headphones className="h-5 w-5 text-primary" />
              <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-secondary">
                Flagship Podcast
              </span>
            </div>

            <h2 className="font-display text-3xl font-bold uppercase leading-tight tracking-tight text-foreground md:text-4xl">
              <span className="text-balance">
                {"John Schneider's Georgia High School Sports Show"}
              </span>
            </h2>

            <p className="text-lg leading-relaxed text-muted-foreground">
              A true Georgia High School Sports Show, the way it{"'"}s meant to be. From Friday night lights to buzzer-beaters and state championship runs, this show dives deeper than the box score — delivering real insight, real passion, and real Georgia sports culture.
            </p>

            <p className="leading-relaxed text-muted-foreground">
              Featuring some of the best high school insiders and guests from every corner of the state. Whether you{"'"}re a player, coach, parent, alum, or just a die-hard fan, you{"'"}ll find interviews, highlights, hot takes, and hometown pride packed into every episode. It{"'"}s fun, it{"'"}s fast, and it{"'"}s full of the flavor that makes Georgia high school sports unforgettable.
            </p>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-secondary" />
                <span className="text-sm font-semibold text-foreground">Statewide Coverage</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-secondary" />
                <span className="text-sm font-semibold text-foreground">Weekly Episodes</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-secondary" />
                <span className="text-sm font-semibold text-foreground">Expert Guests</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/#listen"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground transition-all hover:bg-primary/80"
              >
                <Headphones className="h-4 w-4" />
                Listen Now
              </Link>
              <Link
                href="/#watch"
                className="inline-flex items-center gap-2 rounded-md border-2 border-secondary bg-transparent px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-secondary transition-all hover:bg-secondary hover:text-secondary-foreground"
              >
                <Play className="h-4 w-4" />
                Watch on YouTube
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
