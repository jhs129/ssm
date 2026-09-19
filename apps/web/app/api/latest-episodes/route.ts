import { NextResponse } from "next/server"
import { getLatestEpisodesLive } from "@/lib/episode-sync/live"

// Same ISR window as the rest of the site's Builder-driven content (see
// apps/web/app/[[...page]]/page.tsx and apps/web/app/shows/[slug]/page.tsx).
// The underlying YouTube/Spotify fetches in lib/episode-sync also cache for
// this long, so this route stays cheap without a cron job keeping it warm.
export const revalidate = 300

export async function GET() {
  const episodes = await getLatestEpisodesLive(3)
  return NextResponse.json({ episodes })
}
