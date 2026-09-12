import type { RegisteredComponent } from '@builder.io/sdk-react'
import { HomeAbout } from './index'

export const registration: RegisteredComponent[] = [
  {
    component: HomeAbout,
    name: 'Home About',
    inputs: [
      {
        name: 'eyebrow',
        type: 'string',
        defaultValue: 'About',
        advanced: true,
      },
      {
        name: 'heading',
        type: 'string',
        required: true,
        defaultValue: 'Meet John Schneider',
      },
      {
        name: 'photo',
        type: 'file',
        allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg', 'webp'],
        defaultValue: '/images/john-schneider.png',
        helperText: 'Portrait photo shown next to the bio.',
      },
      {
        name: 'bioParagraphs',
        type: 'list',
        helperText: 'Bio paragraphs, shown in order.',
        subFields: [
          {
            name: 'text',
            type: 'longText',
            required: true,
          },
        ],
        defaultValue: [
          {
            text: "Hi, I'm John. Since the ripe age of 2, I've been passionate about 2 things: my local sports teams and talking about my local sports teams — and believe me, you can ask anyone of my friends and family, and they'll tell you the same thing.",
          },
          {
            text: "Once I got to High School, I quickly became consumed in my fandom for my school's teams. However, I came to the realization that if you aren't actually at whatever game that might've just happened, many high school outlets just present that plain-old box score that doesn't give you a single clue as to what went down.",
          },
          {
            text: "That's the exact reason why Schneider Sports Media exists — because it sucks when as fans we can't be fans and end up getting left in the dark. And at the end of the day, High School Sports deserve the same attention and coverage that both the professional and collegiate levels receive.",
          },
        ],
      },
      {
        name: 'missionHeading',
        type: 'string',
        defaultValue: 'Our Mission',
        advanced: true,
      },
      {
        name: 'missionText',
        type: 'longText',
        defaultValue:
          "To deliver authentic, high-quality sports media and podcasts that amplify the fan's voice and perspective with integrity. Through insider coverage, sideline reporting, engaging talk shows, and dynamic podcasts spanning the Georgia high school sports scene across the state.",
      },
    ],
  },
]
