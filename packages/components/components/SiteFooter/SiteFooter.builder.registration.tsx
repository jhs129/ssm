import type { RegisteredComponent } from '@builder.io/sdk-react'
import { SiteFooter } from './index'

export const registration: RegisteredComponent[] = [
  {
    component: SiteFooter,
    name: 'Site Footer',
    inputs: [
      {
        name: 'logo',
        type: 'file',
        allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg', 'webp'],
        advanced: true,
        helperText: 'Defaults to the Site Properties logo when left empty.',
      },
      {
        name: 'siteName',
        type: 'string',
        defaultValue: 'Schneider Sports Media',
        advanced: true,
      },
      {
        name: 'tagline',
        type: 'longText',
        defaultValue:
          'Video, audio, and storytelling covering Georgia high school sports — Schneider Sports Media, Inside the Nest RHS, and Atlanta Sportscast.',
      },
      {
        name: 'socialLinks',
        type: 'list',
        helperText: 'Icons shown in the footer.',
        subFields: [
          { name: 'label', type: 'string', required: true, helperText: 'e.g. Follow on Instagram' },
          { name: 'url', type: 'string', required: true, helperText: 'Link (mailto: or https://...).' },
          { name: 'icon', type: 'string', enum: ['instagram', 'youtube', 'mail'], defaultValue: 'mail' },
        ],
        defaultValue: [
          { label: 'Follow on Instagram', url: 'https://instagram.com/schneidersports_media', icon: 'instagram' },
          { label: 'Subscribe on YouTube', url: 'https://youtube.com/@SchneiderSportsMedia', icon: 'youtube' },
          { label: 'Send email', url: 'mailto:jschneider.sports.media@gmail.com', icon: 'mail' },
        ],
      },
      {
        name: 'copyrightName',
        type: 'string',
        defaultValue: 'Schneider Sports Media',
        advanced: true,
      },
    ],
  },
]
