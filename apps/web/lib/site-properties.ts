import { cache } from "react"
import { fetchOneEntry } from "@builder.io/sdk-react"
import type { SiteProperties } from "@repo/components"
import { BUILDER_API_KEY } from "@/lib/builder"

// Single named entry acting as a site-wide settings singleton (logo, contact,
// social links, default header/footer symbols). Mirrors the "site-context"
// pattern used in other Builder-powered sites in this org.
export const SITE_PROPERTIES_NAME = "schneider-sports-media"

export const getSiteProperties = cache(async (): Promise<SiteProperties | null> => {
  const entry = await fetchOneEntry({
    model: "site-properties",
    apiKey: BUILDER_API_KEY,
    query: { name: SITE_PROPERTIES_NAME },
    options: { noTargeting: true },
    enrich: true,
  })
  return (entry as SiteProperties | null) || null
})
