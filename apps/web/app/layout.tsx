import type { Metadata, Viewport } from "next"
import { Inter, Oswald } from "next/font/google"
import Script from "next/script"
import { SitePropertiesProvider, SiteHeader, SiteFooter } from "@repo/components"

import "./globals.css"
import { getSiteProperties } from "@/lib/site-properties"
import { OrganizationSchemaData } from "@/components/OrganizationSchemaData"
import RenderBuilderContent from "@/components/RenderBuilderContent"

const _inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const _oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" })

export const metadata: Metadata = {
  title: "Schneider Sports Media | Georgia High School Sports",
  description:
    "Authentic, high-quality sports media and podcasts covering the Georgia high school sports scene. Insider coverage, sideline reporting, and dynamic podcasts.",
}

export const viewport: Viewport = {
  themeColor: "#0040E6",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || ""
  const siteProperties = await getSiteProperties()

  const headerRef = siteProperties?.data?.defaultHeader
  const footerRef = siteProperties?.data?.defaultFooter

  return (
    <html lang="en">
      <head>
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
        <OrganizationSchemaData siteProperties={siteProperties} siteUrl={siteUrl} />
      </head>
      <body className={`${_inter.variable} ${_oswald.variable} font-sans antialiased`}>
        <SitePropertiesProvider siteProperties={siteProperties}>
          <div className="flex min-h-screen flex-col">
            {headerRef?.model === "symbol" && headerRef.value ? (
              <RenderBuilderContent
                content={headerRef.value}
                model="symbol"
                data={{ siteProperties }}
              />
            ) : (
              <SiteHeader />
            )}
            {children}
            {footerRef?.model === "symbol" && footerRef.value ? (
              <RenderBuilderContent
                content={footerRef.value}
                model="symbol"
                data={{ siteProperties }}
              />
            ) : (
              <SiteFooter />
            )}
          </div>
        </SitePropertiesProvider>
      </body>
    </html>
  )
}
