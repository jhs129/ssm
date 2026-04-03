import type { Metadata, Viewport } from "next"
import { Inter, Oswald } from "next/font/google"

import "./globals.css"

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${_inter.variable} ${_oswald.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
