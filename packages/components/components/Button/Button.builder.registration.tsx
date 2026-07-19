import type { RegisteredComponent } from '@builder.io/sdk-react'
import { Button } from './index'

interface BuilderButtonProps {
  label: string
  href?: string
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  className?: string
}

function BuilderButton({ label, href = '#', variant = 'default', className = '' }: BuilderButtonProps) {
  return (
    <Button asChild variant={variant} className={className}>
      <a href={href}>{label}</a>
    </Button>
  )
}

export const registration: RegisteredComponent[] = [
  {
    component: BuilderButton,
    name: 'Button',
    inputs: [
      {
        name: 'label',
        type: 'string',
        required: true,
        defaultValue: 'Learn More',
        helperText: 'The text content of the button',
      },
      {
        name: 'href',
        type: 'string',
        defaultValue: '#',
        helperText: 'The URL the button should link to',
      },
      {
        name: 'variant',
        type: 'string',
        enum: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
        defaultValue: 'default',
        helperText: 'The visual style of the button',
      },
      {
        name: 'className',
        type: 'string',
        advanced: true,
        defaultValue: '',
        helperText: 'Additional CSS classes to apply to the button',
      },
    ],
  },
]
