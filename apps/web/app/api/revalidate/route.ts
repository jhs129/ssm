import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

// Maps a Builder.io model to the published path that must be revalidated.
// `page` revalidates its own `data.url`; `article` lives under a fixed route
// prefix keyed by `data.handle`. Publishing an article also revalidates the
// /blogs listing so it doesn't wait out its own ISR window.
interface ModelConfig {
  field: string
  toPaths: (value: string) => string[]
}

const MODEL_CONFIG: Record<string, ModelConfig> = {
  page: { field: "url", toPaths: (url) => [url] },
  article: { field: "handle", toPaths: (handle) => [`/blogs/${handle}`, "/blogs"] },
}

interface BuilderWebhookBody {
  // Builder.io nests the published entry under `newValue.data`; manual/test
  // payloads may send `data` at the top level instead.
  newValue?: { data?: Record<string, unknown> }
  data?: Record<string, unknown>
  modelName?: string
  operation?: string
}

function resolvePaths(body: BuilderWebhookBody): string[] | null {
  const data = body.newValue?.data ?? body.data
  if (!data) return null

  const config = body.modelName ? MODEL_CONFIG[body.modelName] : undefined
  if (config) {
    const value = data[config.field]
    if (typeof value === "string" && value) return config.toPaths(value)
  }

  // Fallback for unknown/missing modelName: treat a bare `url` as a page path.
  if (typeof data.url === "string" && data.url) return [data.url]

  return null
}

export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET
  if (!secret) {
    return NextResponse.json({ message: "REVALIDATE_SECRET is not configured" }, { status: 500 })
  }

  const url = new URL(request.url)
  const provided = request.headers.get("x-revalidate-secret") ?? url.searchParams.get("secret")
  if (provided !== secret) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 })
  }

  let body: BuilderWebhookBody = {}
  try {
    body = await request.json()
  } catch {
    // No/invalid JSON body — fall back to the `?path=` query param below.
  }

  const paths = resolvePaths(body) ?? (url.searchParams.get("path") ? [url.searchParams.get("path") as string] : null)
  if (!paths) {
    return NextResponse.json({ message: "Missing path" }, { status: 400 })
  }

  for (const path of paths) {
    revalidatePath(path)
  }

  return NextResponse.json({ revalidated: true, paths })
}
