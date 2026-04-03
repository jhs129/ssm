import Image from "next/image"

export function AboutBio() {
  return (
    <section className="border-b border-border bg-card py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-12 flex flex-col items-center text-center">
          <span className="mb-3 font-display text-sm font-bold uppercase tracking-[0.2em] text-secondary">
            The Founder
          </span>
          <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-foreground md:text-4xl lg:text-5xl">
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
              {/* Bottom gradient overlay */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-card to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="font-display text-lg font-bold uppercase tracking-wide text-foreground">
                  John Schneider
                </p>
                <p className="text-sm text-muted-foreground">
                  Founder & Host
                </p>
              </div>
            </div>
            {/* Decorative accent */}
            <div className="absolute -bottom-3 -right-3 -z-10 h-full w-full rounded-lg border-2 border-primary/20" />
          </div>

          {/* Bio text */}
          <div className="flex flex-col gap-6">
            <p className="text-lg leading-relaxed text-muted-foreground">
              {"Hi, I'm John. Since the ripe age of 2, I've been passionate about 2 things: my local sports teams and talking about my local sports teams \u2014 and believe me, you can ask anyone of my friends and family, and they'll tell you the same thing."}
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {"Once I got to High School, I quickly became consumed in my fandom for my school's teams. However, I came to the realization that if you aren't actually at whatever game that might've just happened, many high school outlets just present that plain-old box score that doesn't give you a single clue as to what went down."}
            </p>
            <p className="text-lg leading-relaxed text-foreground font-medium">
              {"That's the exact reason why Schneider Sports Media exists \u2014 because it sucks when as fans we can't be fans and end up getting left in the dark."}
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {"And at the end of the day, High School Sports deserve the same attention and coverage that both the professional and collegiate levels receive."}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
