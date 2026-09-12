'use client'

export interface ShowSectionHeadingProps {
  eyebrow?: string
  heading?: string
  subheading?: string
}

export function ShowSectionHeading({
  eyebrow = 'The Shows',
  heading = 'Three Shows, One Mission',
  subheading = 'Video, audio, and everything in between — covering Georgia sports from every angle.',
}: ShowSectionHeadingProps) {
  return (
    <div className="mb-16 flex flex-col items-center text-center">
      <span className="mb-3 font-display text-sm font-bold uppercase tracking-[0.2em] text-secondary">
        {eyebrow}
      </span>
      <h2 className="font-display text-4xl font-bold uppercase tracking-tight text-foreground md:text-5xl">
        <span className="text-balance">{heading}</span>
      </h2>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        {subheading}
      </p>
    </div>
  )
}
