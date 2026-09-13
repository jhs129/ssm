// @repo/components — shared Builder.io-registrable component library.
// The ssm homepage sections (Home Hero/About/Shows/Connect) are registered
// here so the homepage's Builder `page` entry can compose them as editable
// blocks; app-local, non-Builder-managed components stay in apps/web/components/.

export { Button, buttonVariants, type ButtonProps } from './components/Button'
export { HomeHero, type HomeHeroProps } from './components/HomeHero'
export { LatestVideoHero, type LatestVideoHeroProps } from './components/LatestVideoHero'
export { HomeAbout, type HomeAboutProps } from './components/HomeAbout'
export { HomeConnect, type HomeConnectProps, type SocialLink, type SocialIcon } from './components/HomeConnect'
export { ShowSectionHeading, type ShowSectionHeadingProps } from './components/ShowSectionHeading'
export { ShowCard, type ShowCardProps } from './components/ShowCard'
export { SiteHeader, type SiteHeaderProps, type NavLink } from './components/SiteHeader'
export { SiteFooter, type SiteFooterProps, type SocialLink as FooterSocialLink } from './components/SiteFooter'
export {
  SitePropertiesProvider,
  useSiteProperties,
  type SiteProperties,
  type SocialNetwork,
} from './contexts/SitePropertiesProvider'
export { customComponents } from './registry'
