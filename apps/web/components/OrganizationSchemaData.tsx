import type { SiteProperties } from "@repo/components"

interface OrganizationSchemaDataProps {
  siteProperties: SiteProperties | null
  siteUrl: string
}

export function OrganizationSchemaData({ siteProperties, siteUrl }: OrganizationSchemaDataProps) {
  const data = siteProperties?.data
  if (!data) return null

  const address = data.organization?.address
  const contact = data.contact

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}#organization`,
        name: data.organization?.name || data.siteName,
        description: data.organization?.description,
        url: siteUrl,
        logo: data.logo ? { "@type": "ImageObject", url: data.logo } : undefined,
        sameAs: data.socialNetworks?.map((network) => network.href),
        address:
          address && (address.address1 || address.city)
            ? {
                "@type": "PostalAddress",
                streetAddress: address.address1,
                addressLocality: address.city,
                addressRegion: address.state,
                postalCode: address.postalCode,
                addressCountry: address.country,
              }
            : undefined,
        contactPoint:
          contact && (contact.telephone || contact.email)
            ? [
                {
                  "@type": "ContactPoint",
                  contactType: "customer service",
                  telephone: contact.telephone,
                  email: contact.email,
                  areaServed: contact.areaServed,
                },
              ]
            : undefined,
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}#website`,
        name: data.siteName,
        url: siteUrl,
        publisher: { "@id": `${siteUrl}#organization` },
      },
    ],
  }

  // Escape `<` so a content field containing `</script>` can't break out of
  // the script tag; JSON.stringify alone does not escape it.
  const json = JSON.stringify(schema).replace(/</g, "\\u003c")

  return (
    <script
      type="application/ld+json"
       
      dangerouslySetInnerHTML={{ __html: json }}
    />
  )
}
