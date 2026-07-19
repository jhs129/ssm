import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function AboutAdvantage() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_hsl(225,100%,50%,0.06),_transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-3 inline-block font-display text-sm font-bold uppercase tracking-[0.2em] text-secondary">
            Competitive Advantage
          </span>
          <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-foreground md:text-4xl">
            <span className="text-balance">Hyperlocal. Hyper Personal.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Schneider Sports Media is hyperlocal to the high schools it covers while infusing the communities around them, along with coverage and content from students at each of the specific high schools — making it hyper personal as well.
          </p>
        </div>

        {/* Visual emphasis */}
        <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-8 text-center">
            <p className="font-display text-4xl font-bold text-primary">100%</p>
            <p className="mt-2 text-sm font-medium text-muted-foreground">Georgia Focused</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-8 text-center">
            <p className="font-display text-4xl font-bold text-secondary">Real</p>
            <p className="mt-2 text-sm font-medium text-muted-foreground">Student Voices</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-8 text-center">
            <p className="font-display text-4xl font-bold text-primary">All</p>
            <p className="mt-2 text-sm font-medium text-muted-foreground">Sports Covered</p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14 flex flex-col items-center gap-4 text-center">
          <p className="text-lg text-muted-foreground">
            Ready to experience Georgia high school sports like never before?
          </p>
          <Link
            href="/#listen"
            className="group inline-flex items-center gap-2 rounded-md bg-primary px-8 py-4 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground transition-all hover:bg-primary/80"
          >
            Start Listening
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
