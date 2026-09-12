'use client'

import Link from 'next/link'
import { Mail, Instagram, Youtube, ExternalLink } from 'lucide-react'

const ICONS = {
  mail: Mail,
  instagram: Instagram,
  youtube: Youtube,
} as const

export type SocialIcon = keyof typeof ICONS

export interface SocialLink {
  name?: string
  handle?: string
  href?: string
  icon?: SocialIcon
  description?: string
}

export interface HomeConnectProps {
  eyebrow?: string
  heading?: string
  subheading?: string
  socials?: SocialLink[]
}

const DEFAULT_SOCIALS: SocialLink[] = [
  {
    name: 'Email',
    handle: 'jschneider.sports.media@gmail.com',
    href: 'mailto:jschneider.sports.media@gmail.com',
    icon: 'mail',
    description: 'Reach out directly for inquiries, collaborations, or tips.',
  },
  {
    name: 'Instagram',
    handle: '@schneidersports_media',
    href: 'https://instagram.com/schneidersports_media',
    icon: 'instagram',
    description: 'Follow for behind-the-scenes content, game day updates, and more.',
  },
  {
    name: 'YouTube',
    handle: '@SchneiderSportsMedia',
    href: 'https://youtube.com/@SchneiderSportsMedia',
    icon: 'youtube',
    description: 'Subscribe for full episodes, highlights, and exclusive video content.',
  },
]

export function HomeConnect({
  eyebrow = 'Connect',
  heading = 'Get In Touch',
  subheading = "Whether you have a story tip, want to collaborate, or just want to talk Georgia high school sports — let's connect.",
  socials = DEFAULT_SOCIALS,
}: HomeConnectProps) {
  return (
    <section id="connect" className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_hsl(225,100%,14%)_0%,_transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
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

        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
          {socials.map((social, index) => {
            const Icon = (social.icon && ICONS[social.icon]) || Mail
            const isEmail = social.name === 'Email'
            return (
              <Link
                key={social.href || index}
                href={social.href || '#'}
                target={isEmail ? undefined : '_blank'}
                rel={isEmail ? undefined : 'noopener noreferrer'}
                className="group flex flex-col items-center gap-4 rounded-lg border border-border bg-card p-8 text-center transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-7 w-7" />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-display text-lg font-bold uppercase tracking-wide text-foreground">
                    {social.name}
                  </h3>
                  <p className="text-sm font-medium text-secondary">{social.handle}</p>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {social.description}
                </p>
                <span className="mt-auto flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors group-hover:text-primary">
                  {isEmail ? 'Send Email' : 'Visit'}
                  <ExternalLink className="h-3 w-3" />
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
