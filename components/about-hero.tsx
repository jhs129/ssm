import Image from "next/image"

export function AboutHero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(225,100%,50%,0.08),_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(0,85%,48%,0.06),_transparent_50%)]" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 pb-16 pt-32 text-center lg:px-8 lg:pb-20 lg:pt-40">
        <Image
          src="/images/ssm-logo.png"
          alt="Schneider Sports Media logo"
          width={100}
          height={100}
          className="rounded-full shadow-xl shadow-primary/20"
          priority
        />
        <h1 className="font-display text-4xl font-bold uppercase tracking-tight text-foreground md:text-5xl lg:text-6xl">
          <span className="text-balance">About Schneider Sports Media</span>
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Authentic, high-quality sports media covering the Georgia high school sports scene the way it deserves to be covered.
        </p>
      </div>
    </section>
  )
}
