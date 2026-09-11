import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden py-24 lg:py-32">
      {/* Accent line */}
      <div className="absolute left-0 top-0 h-1 w-full bg-secondary" />

      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-16 flex flex-col items-center text-center">
          <span className="mb-3 font-display text-sm font-bold uppercase tracking-[0.2em] text-secondary">
            About
          </span>
          <h2 className="font-display text-4xl font-bold uppercase tracking-tight text-foreground md:text-5xl">
            <span className="text-balance">Meet John Schneider</span>
          </h2>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Photo */}
          <div className="relative mx-auto w-full max-w-md lg:mx-0">
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg border border-border">
              <Image
                src="/images/john-schneider.png"
                alt="John Schneider on the sidelines at a Georgia high school football game"
                fill
                className="object-cover object-top"
              />
            </div>
            {/* Decorative accent */}
            <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-lg border-2 border-primary/30" />
          </div>

          {/* Bio text */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <p className="text-lg leading-relaxed text-muted-foreground">
                {"Hi, I'm John. Since the ripe age of 2, I've been passionate about 2 things: my local sports teams and talking about my local sports teams \u2014 and believe me, you can ask anyone of my friends and family, and they'll tell you the same thing."}
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {"Once I got to High School, I quickly became consumed in my fandom for my school's teams. However, I came to the realization that if you aren't actually at whatever game that might've just happened, many high school outlets just present that plain-old box score that doesn't give you a single clue as to what went down."}
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {"That's the exact reason why Schneider Sports Media exists \u2014 because it sucks when as fans we can't be fans and end up getting left in the dark. And at the end of the day, High School Sports deserve the same attention and coverage that both the professional and collegiate levels receive."}
              </p>
            </div>

            {/* Mission Card */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-3 font-display text-sm font-bold uppercase tracking-[0.2em] text-secondary">
                Our Mission
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                To deliver authentic, high-quality sports media and podcasts that amplify the
                {" fan's"} voice and perspective with integrity. Through insider coverage, sideline
                reporting, engaging talk shows, and dynamic podcasts spanning the Georgia high
                school sports scene across the state.
              </p>
            </div>

            <Link
              href="/about"
              className="group inline-flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wider text-primary transition-colors hover:text-primary/80"
            >
              Read the full story
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
