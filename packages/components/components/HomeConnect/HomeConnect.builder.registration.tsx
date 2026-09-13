import type { RegisteredComponent } from '@builder.io/sdk-react'
import { HomeConnect } from './index'

export const registration: RegisteredComponent[] = [
  {
    component: HomeConnect,
    name: 'Home Connect',
    inputs: [
      {
        name: 'eyebrow',
        type: 'string',
        defaultValue: 'Connect',
        advanced: true,
      },
      {
        name: 'heading',
        type: 'string',
        required: true,
        defaultValue: 'Get In Touch',
      },
      {
        name: 'subheading',
        type: 'longText',
        defaultValue:
          "Whether you have a story tip, want to collaborate, or just want to talk Georgia high school sports — let's connect.",
      },
      {
        name: 'socials',
        type: 'list',
        helperText: 'Social/contact links shown as cards.',
        subFields: [
          { name: 'name', type: 'string', required: true, helperText: 'e.g. Email, Instagram, YouTube' },
          { name: 'handle', type: 'string', helperText: 'Displayed handle or address.' },
          { name: 'href', type: 'string', required: true, helperText: 'Link (mailto: or https://...).' },
          {
            name: 'icon',
            type: 'string',
            enum: ['mail', 'instagram', 'youtube'],
            defaultValue: 'mail',
          },
          { name: 'description', type: 'string', helperText: 'One-line description.' },
        ],
        defaultValue: [
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
        ],
      },
    ],
  },
]
