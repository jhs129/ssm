import type { RegisteredComponent } from '@builder.io/sdk-react'
import { registration as button } from '../components/Button/Button.builder.registration'
import { registration as homeHero } from '../components/HomeHero/HomeHero.builder.registration'
import { registration as latestVideoHero } from '../components/LatestVideoHero/LatestVideoHero.builder.registration'
import { registration as homeAbout } from '../components/HomeAbout/HomeAbout.builder.registration'
import { registration as homeConnect } from '../components/HomeConnect/HomeConnect.builder.registration'
import { registration as showSectionHeading } from '../components/ShowSectionHeading/ShowSectionHeading.builder.registration'
import { registration as showCard } from '../components/ShowCard/ShowCard.builder.registration'
import { registration as siteHeader } from '../components/SiteHeader/SiteHeader.builder.registration'
import { registration as siteFooter } from '../components/SiteFooter/SiteFooter.builder.registration'

// Combined list of all custom components for use with the Gen2 SDK
// (e.g. <Content customComponents={customComponents} ... />)
export const customComponents: RegisteredComponent[] = [
  ...button,
  ...homeHero,
  ...latestVideoHero,
  ...homeAbout,
  ...showSectionHeading,
  ...showCard,
  ...homeConnect,
  ...siteHeader,
  ...siteFooter,
]
