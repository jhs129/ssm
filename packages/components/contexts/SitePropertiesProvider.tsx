'use client'

import { createContext, useContext } from 'react'

export interface SocialNetwork {
  name: string
  href: string
}

export interface SiteProperties {
  data?: {
    siteName?: string
    logo?: string
    organization?: {
      name?: string
      description?: string
      address?: {
        address1?: string
        city?: string
        state?: string
        postalCode?: string
        country?: string
      }
    }
    contact?: {
      telephone?: string
      email?: string
      areaServed?: string
    }
    socialNetworks?: SocialNetwork[]
    googleAnalyticsId?: string
    defaultHeader?: { model?: string; value?: unknown } | null
    defaultFooter?: { model?: string; value?: unknown } | null
  }
}

const SitePropertiesContext = createContext<SiteProperties | null>(null)

export function SitePropertiesProvider({
  siteProperties,
  children,
}: {
  siteProperties: SiteProperties | null
  children: React.ReactNode
}) {
  return (
    <SitePropertiesContext.Provider value={siteProperties}>
      {children}
    </SitePropertiesContext.Provider>
  )
}

export function useSiteProperties() {
  return useContext(SitePropertiesContext)
}
