import Image from "next/image"
import Link from "next/link"
import { Mic, MapPin, Users, Trophy } from "lucide-react"

const highlights = [
  {
    icon: Mic,
    title: "Real Insight",
    description: "Deeper than the box score \u2014 real passion and real Georgia sports culture.",
  },
  {
    icon: MapPin,
    title: "Statewide Coverage",
    description:
      "From the North Georgia mountains to the southern coast, covering every corner.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description:
      "Featuring the best high school insiders and guests from across the Peach State.",
  },
  {
    icon: Trophy,
    title: "All The Action",
    description:
      "Friday night lights, buzzer-beaters, and state championship runs \u2014 we cover it all.",
  },
]

export function ShowSection() {
  return (
    <section id="show" className="relative overflow-hidden bg-card py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Show Info */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-secondary">
                Flagship Podcast
              </span>
              <h2 className="font-display text-3xl font-bold uppercase leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl">
                <span className="text-balance">
                  {"John Schneider's Georgia High School Sports Show"}
                </span>
              </h2>
              <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
                A true Georgia High School Sports Show, the way {"it's"} meant to be. Bringing
                you the stories, spirit, and spotlight of high school athletics across the Peach
                State.
              </p>
              <p className="max-w-xl leading-relaxed text-muted-foreground">
                Whether {"you're"} a player, coach, parent, alum, or just a die-hard fan,{" "}
                {"you'll"} find interviews, highlights, hot takes, and hometown pride packed into
                every episode. {"It's"} fun, {"it's"} fast, and {"it's"} full of the flavor that
                makes Georgia high school sports unforgettable.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="https://open.spotify.com/show/john-schneiders-georgia-high-school-sports-show"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-primary px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground transition-all hover:bg-primary/80"
              >
                Listen on Spotify
              </Link>
              <Link
                href="https://youtube.com/@SchneiderSportsMedia"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border-2 border-secondary bg-transparent px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-secondary transition-all hover:bg-secondary hover:text-secondary-foreground"
              >
                Watch on YouTube
              </Link>
            </div>
          </div>

          {/* Podcast Logo */}
          <div className="relative mx-auto w-full max-w-lg lg:mx-0">
            <div className="relative aspect-square overflow-hidden rounded-lg border border-border shadow-2xl shadow-primary/20">
              <Image
                src="/images/ga-podcast-logo.png"
                alt="John Schneider's Georgia High School Sports Show podcast logo"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Highlight cards */}
        <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="group rounded-lg border border-border bg-background p-6 transition-all hover:border-primary/50"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-display text-lg font-bold uppercase tracking-wide text-foreground">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
