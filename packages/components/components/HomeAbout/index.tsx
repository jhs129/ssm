'use client'

import Image from 'next/image'

export interface HomeAboutProps {
  eyebrow?: string
  heading?: string
  photo?: string
  bioParagraphs?: { text: string }[]
  missionHeading?: string
  missionText?: string
}

const DEFAULT_BIO_PARAGRAPHS = [
  {
    text: "Hi, I'm John. Since the ripe age of 2, I've been passionate about 2 things: my local sports teams and talking about my local sports teams — and believe me, you can ask anyone of my friends and family, and they'll tell you the same thing.",
  },
  {
    text: "Once I got to High School, I quickly became consumed in my fandom for my school's teams. However, I came to the realization that if you aren't actually at whatever game that might've just happened, many high school outlets just present that plain-old box score that doesn't give you a single clue as to what went down.",
  },
  {
    text: "That's the exact reason why Schneider Sports Media exists — because it sucks when as fans we can't be fans and end up getting left in the dark. And at the end of the day, High School Sports deserve the same attention and coverage that both the professional and collegiate levels receive.",
  },
]

export function HomeAbout({
  eyebrow = 'About',
  heading = 'Meet John Schneider',
  photo = '/images/john-schneider.png',
  bioParagraphs = DEFAULT_BIO_PARAGRAPHS,
  missionHeading = 'Our Mission',
  missionText = "To deliver authentic, high-quality sports media and podcasts that amplify the fan's voice and perspective with integrity. Through insider coverage, sideline reporting, engaging talk shows, and dynamic podcasts spanning the Georgia high school sports scene across the state.",
}: HomeAboutProps) {
  return (
    <section id="about" className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute left-0 top-0 h-1 w-full bg-secondary" />

      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-16 flex flex-col items-center text-center">
          <span className="mb-3 font-display text-sm font-bold uppercase tracking-[0.2em] text-secondary">
            {eyebrow}
          </span>
          <h2 className="font-display text-4xl font-bold uppercase tracking-tight text-foreground md:text-5xl">
            <span className="text-balance">{heading}</span>
          </h2>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative mx-auto w-full max-w-md lg:mx-0">
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg border border-border">
              <Image
                src={photo}
                alt="John Schneider on the sidelines at a Georgia high school football game"
                fill
                className="object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-lg border-2 border-primary/30" />
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              {bioParagraphs.map((paragraph, index) => (
                <p key={index} className="text-lg leading-relaxed text-muted-foreground">
                  {paragraph.text}
                </p>
              ))}
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-3 font-display text-sm font-bold uppercase tracking-[0.2em] text-secondary">
                {missionHeading}
              </h3>
              <p className="leading-relaxed text-muted-foreground">{missionText}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
