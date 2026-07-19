import type { RegisteredComponent } from '@builder.io/sdk-react'
import { registration as button } from '../components/Button/Button.builder.registration'

// Combined list of all custom components for use with the Gen2 SDK
// (e.g. <Content customComponents={customComponents} ... />)
export const customComponents: RegisteredComponent[] = [...button]
