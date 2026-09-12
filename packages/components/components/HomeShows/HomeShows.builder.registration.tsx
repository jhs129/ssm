import type { RegisteredComponent } from '@builder.io/sdk-react'
import { HomeShows } from './index'

export const registration: RegisteredComponent[] = [
  {
    component: HomeShows,
    name: 'Home Shows Grid',
    inputs: [
      {
        name: 'eyebrow',
        type: 'string',
        defaultValue: 'The Shows',
        advanced: true,
      },
      {
        name: 'heading',
        type: 'string',
        required: true,
        defaultValue: 'Three Shows, One Mission',
      },
      {
        name: 'subheading',
        type: 'longText',
        defaultValue:
          'Video, audio, and everything in between — covering Georgia sports from every angle.',
      },
    ],
  },
]
