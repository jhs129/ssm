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
    // The hero CTA and every show page's "See all shows" link target #shows,
    // so this heading owns the anchor. scroll-mt clears the fixed header.
    <div id="shows" className="mb-16 flex scroll-mt-24 flex-col items-center text-center">
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
