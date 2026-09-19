import { NextRequest, NextResponse } from 'next/server'
import { syncAllShows } from '@/lib/episode-sync/sync'

export const maxDuration = 60

// Vercel Cron sends `Authorization: Bearer $CRON_SECRET` automatically once
// that env var is set, which also protects this route from public calls.
export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET
  if (cronSecret && request.headers.get('authorization') !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const results = await syncAllShows()
  return NextResponse.json({ results })
}
