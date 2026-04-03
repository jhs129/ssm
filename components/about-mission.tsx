import { Radio, Users, MapPin, Shield } from "lucide-react"

const pillars = [
  {
    icon: Radio,
    title: "Insider Coverage",
    description:
      "Sideline reporting, engaging talk shows, and dynamic podcasts that go beyond the box score to tell the real story.",
  },
  {
    icon: MapPin,
    title: "Statewide Reach",
    description:
      "From the North Georgia mountains to the southern coast, we cover every corner of the Peach State.",
  },
  {
    icon: Users,
    title: "Fan-First Perspective",
    description:
      "We amplify the fan's voice and perspective with integrity \u2014 because fans deserve to be in the know.",
  },
  {
    icon: Shield,
    title: "Authentic Coverage",
    description:
      "Real insight, real passion, and real Georgia sports culture. No fluff, just the stories that matter.",
  },
]

export function AboutMission() {
  return (
    <section className="border-b border-border py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Mission statement */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-3 inline-block font-display text-sm font-bold uppercase tracking-[0.2em] text-secondary">
            Our Mission
          </span>
          <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-foreground md:text-4xl">
            <span className="text-balance">Why We Do What We Do</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Our mission is to deliver authentic, high-quality sports media and podcasts that amplify the fan{"'"}s voice and perspective with integrity. We achieve this through insider coverage, sideline reporting, engaging talk shows, and dynamic podcasts — spanning the Georgia high school sports scene across the state.
          </p>
        </div>

        {/* Pillar cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="group flex flex-col rounded-lg border border-border bg-card p-8 transition-all hover:border-primary/40"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <pillar.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-3 font-display text-lg font-bold uppercase tracking-wide text-foreground">
                {pillar.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
