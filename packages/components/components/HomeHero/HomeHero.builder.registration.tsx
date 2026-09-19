import type { RegisteredComponent } from '@builder.io/sdk-react'
import { HomeHero } from './index'

export const registration: RegisteredComponent[] = [
  {
    component: HomeHero,
    name: 'Home Hero',
    inputs: [
      {
        name: 'layout',
        type: 'string',
        enum: [
          { label: 'Framed (portrait beside copy)', value: 'framed' },
          { label: 'Full Bleed (photo fills background)', value: 'fullBleed' },
        ],
        defaultValue: 'framed',
        helperText:
          "Rendering style. 'Framed' shows the portrait beside the copy on desktop (current look). 'Full Bleed' keeps the photo full-bleed behind the headline at every screen size.",
      },
      {
        name: 'photo',
        type: 'file',
        allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg', 'webp'],
        defaultValue: '/images/john-schneider.png',
        helperText:
          'Portrait photo. Framed beside the headline on desktop; full-bleed behind the headline on mobile, so keep the subject in the upper half.',
      },
      {
        name: 'photoPosition',
        type: 'string',
        enum: [
          { label: 'Top', value: 'top' },
          { label: 'Top Right', value: 'top right' },
          { label: 'Top Left', value: 'top left' },
          { label: 'Center', value: 'center' },
          { label: 'Bottom', value: 'bottom' },
          { label: 'Bottom Right', value: 'bottom right' },
          { label: 'Bottom Left', value: 'bottom left' },
        ],
        defaultValue: 'top',
        helperText:
          'Which part of the photo stays visible when it\'s cropped to fill the hero. Use this to reveal more of the background (e.g. people or signage near the top) instead of having it cropped off.',
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
