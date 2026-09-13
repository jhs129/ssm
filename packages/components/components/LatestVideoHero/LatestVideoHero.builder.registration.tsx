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
        defaultValue: 'Latest Episode',
        helperText: 'Small label above the featured video. The video itself is computed automatically as the most recently published episode across all shows.',
      },
    ],
  },
]
