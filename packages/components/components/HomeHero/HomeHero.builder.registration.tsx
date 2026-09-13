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
        helperText:
          'Portrait photo. Framed beside the headline on desktop; full-bleed behind the headline on mobile, so keep the subject in the upper half.',
      },
      {
        name: 'logoImage',
        type: 'file',
        allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg', 'webp'],
        defaultValue: '/images/ssm-logo.png',
        helperText: 'Small logo shown above the headline on desktop. Hidden on mobile, where the header logo already covers it.',
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
        defaultValue: 'Georgia high school sports, covered the way it deserves to be.',
        helperText:
          'Supporting line under the headline. Keep it to roughly two lines on a phone so the buttons stay above the fold.',
      },
      {
        name: 'primaryCtaLabel',
        type: 'string',
        defaultValue: 'Explore The Shows',
        helperText: 'Label for the primary (filled) button. This should point at the content, not the bio.',
      },
      {
        name: 'primaryCtaHref',
        type: 'string',
        defaultValue: '#shows',
        advanced: true,
        helperText: 'Link for the primary button (usually a section anchor like #shows).',
      },
      {
        name: 'secondaryCtaLabel',
        type: 'string',
        defaultValue: 'About John',
        helperText: 'Label for the secondary (outlined) button.',
      },
      {
        name: 'secondaryCtaHref',
        type: 'string',
        defaultValue: '#about',
        advanced: true,
        helperText: 'Link for the secondary button (usually a section anchor like #about).',
      },
    ],
  },
]
