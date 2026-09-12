import type { RegisteredComponent } from '@builder.io/sdk-react'
import { ShowCard } from './index'

export const registration: RegisteredComponent[] = [
  {
    component: ShowCard,
    name: 'Show Card',
    inputs: [
      {
        name: 'show',
        type: 'reference',
        model: 'show',
        required: true,
        helperText: 'Which show entry this card links to and pulls its name/logo/tagline from.',
      },
    ],
  },
]
