import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ShowSection } from "@/components/show-section"
import { WatchSection } from "@/components/watch-section"
import { ListenSection } from "@/components/listen-section"
import { ConnectSection } from "@/components/connect-section"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <AboutSection />
        <ShowSection />
        <WatchSection />
        <ListenSection />
        <ConnectSection />
      </main>
      <SiteFooter />
    </>
  )
}
