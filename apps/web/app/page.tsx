import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ShowsGrid } from "@/components/shows-grid"
import { ConnectSection } from "@/components/connect-section"
import { SiteFooter } from "@/components/site-footer"

export const revalidate = 300

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <AboutSection />
        <ShowsGrid />
        {/* BlogPreview removed until real posts replace the placeholder content —
            re-import and add it back here to restore it. */}
        <ConnectSection />
      </main>
      <SiteFooter />
    </>
  )
}
