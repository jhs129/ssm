import type { RegisteredComponent } from '@builder.io/sdk-react'
import { HomeHero } from './index'

export const registration: RegisteredComponent[] = [
  {
    component: HomeHero,
    name: 'Home Hero',
    inputs: [
      {
        name: 'photo',
        type: 'file',
        allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg', 'webp'],
        defaultValue: '/images/john-schneider.png',
        helperText: 'Portrait photo shown alongside the headline.',
      },
      {
        name: 'logoImage',
        type: 'file',
        allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg', 'webp'],
        defaultValue: '/images/ssm-logo.png',
        helperText: 'Small logo shown above the headline.',
      },
      {
        name: 'heading',
        type: 'string',
        required: true,
        defaultValue: 'Schneider Sports Media',
        helperText: 'Main headline.',
      },
      {
        name: 'subheading',
        type: 'longText',
        defaultValue:
          'Video, audio, and storytelling from John Schneider — covering Georgia high school sports through three shows: Schneider Sports Media, Inside the Nest RHS, and Atlanta Sportscast.',
        helperText: 'Supporting paragraph under the headline.',
      },
      {
        name: 'primaryCtaLabel',
        type: 'string',
        defaultValue: 'About John',
        helperText: 'Label for the primary button.',
      },
      {
        name: 'primaryCtaHref',
        type: 'string',
        defaultValue: '#about',
        advanced: true,
        helperText: 'Link for the primary button (usually a section anchor like #about).',
      },
      {
        name: 'secondaryCtaLabel',
        type: 'string',
        defaultValue: 'Explore The Shows',
        helperText: 'Label for the secondary button.',
      },
      {
        name: 'secondaryCtaHref',
        type: 'string',
        defaultValue: '#shows',
        advanced: true,
        helperText: 'Link for the secondary button (usually a section anchor like #shows).',
      },
    ],
  },
]
