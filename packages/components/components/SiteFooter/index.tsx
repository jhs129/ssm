'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Instagram, Youtube, Mail, Link as LinkIcon } from 'lucide-react'
import { useSiteProperties } from '../../contexts/SitePropertiesProvider'

export interface SocialLink {
  label: string
  url: string
  icon?: string
}

export interface SiteFooterProps {
  logo?: string
  siteName?: string
  tagline?: string
  socialLinks?: SocialLink[]
  copyrightName?: string
}

const ICONS: Record<string, typeof Instagram> = {
  instagram: Instagram,
  youtube: Youtube,
  mail: Mail,
}

const DEFAULT_SOCIAL_LINKS: SocialLink[] = [
  { label: 'Follow on Instagram', url: 'https://instagram.com/schneidersports_media', icon: 'instagram' },
  { label: 'Subscribe on YouTube', url: 'https://youtube.com/@SchneiderSportsMedia', icon: 'youtube' },
  { label: 'Send email', url: 'mailto:jschneider.sports.media@gmail.com', icon: 'mail' },
]

export function SiteFooter({
  logo,
  siteName = 'Schneider Sports Media',
  tagline = 'Video, audio, and storytelling covering Georgia high school sports — Schneider Sports Media, Inside the Nest RHS, and Atlanta Sportscast.',
  socialLinks = DEFAULT_SOCIAL_LINKS,
  copyrightName = 'Schneider Sports Media',
}: SiteFooterProps) {
  const siteProperties = useSiteProperties()
  const resolvedLogo = logo || siteProperties?.data?.logo || '/images/ssm-logo.png'

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <div className="flex flex-col items-center gap-4 md:items-start">
            <Link href="/" className="flex items-center gap-3">
              <Image src={resolvedLogo} alt={`${siteName} logo`} width={40} height={40} className="rounded-full" />
              <span className="font-display text-sm font-bold uppercase tracking-wide text-foreground">
                {siteName}
              </span>
            </Link>
            <p className="max-w-sm text-center text-sm leading-relaxed text-muted-foreground md:text-left">
              {tagline}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = (social.icon && ICONS[social.icon]) || LinkIcon
              return (
                <Link
                  key={social.url}
                  href={social.url}
                  target={social.url.startsWith('mailto:') ? undefined : '_blank'}
                  rel={social.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                  aria-label={social.label}
                >
                  <Icon className="h-5 w-5" />
                </Link>
              )
            })}
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {copyrightName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
