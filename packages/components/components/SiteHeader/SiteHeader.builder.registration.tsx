import type { RegisteredComponent } from '@builder.io/sdk-react'
import { SiteHeader } from './index'

export const registration: RegisteredComponent[] = [
  {
    component: SiteHeader,
    name: 'Site Header',
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
        name: 'navLinks',
        type: 'list',
        helperText: 'Primary navigation links, in order. The last link renders after the Shows dropdown.',
        subFields: [
          { name: 'label', type: 'string', required: true },
          { name: 'url', type: 'string', required: true },
        ],
        defaultValue: [
          { label: 'Home', url: '/' },
          { label: 'About', url: '/#about' },
          { label: 'Connect', url: '/contact' },
        ],
      },
      {
        name: 'shows',
        type: 'list',
        helperText: 'Links shown in the "Shows" dropdown.',
        subFields: [
          { name: 'label', type: 'string', required: true },
          { name: 'url', type: 'string', required: true },
        ],
        defaultValue: [
          { label: 'Schneider Sports Media', url: '/shows/schneider-sports-media' },
          { label: 'Inside the Nest RHS', url: '/shows/inside-the-nest' },
          { label: 'Atlanta Sportscast', url: '/shows/atlanta-sportscast' },
        ],
      },
    ],
  },
]
