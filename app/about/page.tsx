import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { AboutHero } from "@/components/about-hero"
import { AboutBio } from "@/components/about-bio"
import { AboutMission } from "@/components/about-mission"
import { AboutPodcast } from "@/components/about-podcast"
import { AboutAdvantage } from "@/components/about-advantage"

export const metadata: Metadata = {
  title: "About | Schneider Sports Media",
  description:
    "Meet John Schneider and learn about Schneider Sports Media — authentic, high-quality coverage of Georgia high school sports.",
}

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <AboutHero />
        <AboutBio />
        <AboutMission />
        <AboutPodcast />
        <AboutAdvantage />
      </main>
      <SiteFooter />
    </>
  )
}
