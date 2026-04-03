import Image from "next/image"
import Link from "next/link"
import { ArrowDown } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(225,100%,18%)_0%,_hsl(220,30%,5%)_70%)]" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(0,0%,100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0,0%,100%) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 py-32 text-center lg:px-8">
        <Image
          src="/images/ssm-logo.png"
          alt="Schneider Sports Media logo"
          width={160}
          height={160}
          className="rounded-full shadow-2xl shadow-primary/30"
          priority
        />

        <div className="flex flex-col items-center gap-4">
          <h1 className="font-display text-5xl font-bold uppercase leading-tight tracking-tight text-foreground md:text-7xl lg:text-8xl">
            <span className="text-balance">Schneider Sports Media</span>
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Authentic, high-quality sports media covering the Georgia high school sports scene.
            From Friday night lights to state championship runs.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/about"
            className="rounded-md bg-primary px-8 py-3 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground transition-all hover:bg-primary/80"
          >
            Learn More
          </Link>
          <Link
            href="#watch"
            className="rounded-md border-2 border-secondary bg-transparent px-8 py-3 font-display text-sm font-bold uppercase tracking-wider text-secondary transition-all hover:bg-secondary hover:text-secondary-foreground"
          >
            Watch Now
          </Link>
        </div>

        <Link
          href="#show"
          className="mt-8 flex animate-bounce items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Scroll to the show section"
        >
          <ArrowDown className="h-5 w-5" />
        </Link>
      </div>
    </section>
  )
}
