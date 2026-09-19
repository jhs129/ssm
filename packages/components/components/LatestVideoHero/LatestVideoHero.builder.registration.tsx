import type { RegisteredComponent } from '@builder.io/sdk-react'
import { LatestVideoHero } from './index'

export const registration: RegisteredComponent[] = [
  {
    component: LatestVideoHero,
    name: 'Latest Video Hero',
    inputs: [
      {
        name: 'eyebrow',
        type: 'string',
        advanced: true,
        defaultValue: 'Latest Episodes',
        helperText: 'Small label above the featured videos. The 3 cards are computed automatically as the most recently published episodes across all shows, queried live from YouTube/Spotify.',
      },
    ],
  },
]
