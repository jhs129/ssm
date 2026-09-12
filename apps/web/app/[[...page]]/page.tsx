import { cache } from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { fetchOneEntry, fetchEntries } from "@builder.io/sdk-react"
import RenderBuilderContent from "@/components/RenderBuilderContent"
import { BUILDER_API_KEY } from "@/lib/builder"
import { resolvePageUrlPath, isPreviewingFromSearchParams } from "@/lib/page-utils"

// ISR window (seconds) for published Builder.io content. Must be a literal —
// App Router segment config is statically analyzed and rejects runtime/env
// expressions. Editors still get instant updates via Builder preview mode.
export const revalidate = 300

// Dedupe the page fetch across generateMetadata and the page component within
// the same request render.
const fetchPage = cache(async (urlPath: string) =>
  fetchOneEntry({
    model: "page",
    apiKey: BUILDER_API_KEY,
    userAttributes: { urlPath },
    enrich: true,
  }),
)

// /blogs has its own coded route implementation and must not be claimed by
// this catch-all's generateStaticParams.
const EXCLUDED_DIRECTORIES = ["/blogs"]

function shouldExcludePath(url: string): boolean {
  if (!url) return true
  return EXCLUDED_DIRECTORIES.some((dir) => url === dir || url.startsWith(`${dir}/`))
}

export async function generateStaticParams(): Promise<{ page?: string[] }[]> {
  const pages = await fetchEntries({
    model: "page",
    apiKey: BUILDER_API_KEY,
    fields: "data.url",
    options: { noTargeting: true },
  })

  return pages
    .map((page) => String(page.data?.url))
    .filter((url) => !shouldExcludePath(url))
    .map((url) => ({ page: url.split("/").filter(Boolean) }))
}

interface PageRouteProps {
  params: Promise<{ page?: string[] }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export async function generateMetadata({ params }: PageRouteProps): Promise<Metadata> {
  const { page: segments } = await params
  const urlPath = resolvePageUrlPath(segments)
  const page = await fetchPage(urlPath)

  const isHomepage = urlPath === "/"

  return {
    title: page?.data?.title || undefined,
    description: page?.data?.metadata?.description || undefined,
    keywords: page?.data?.metadata?.keywords,
    robots: isHomepage ? undefined : { index: false, follow: false },
  }
}

export default async function Page({ params, searchParams }: PageRouteProps) {
  const { page: segments } = await params
  const resolvedSearchParams = await searchParams
  const urlPath = resolvePageUrlPath(segments)
  const page = await fetchPage(urlPath)
  const isPreviewing = isPreviewingFromSearchParams(resolvedSearchParams)

  if (!page && !isPreviewing) {
    notFound()
  }

  return (
    <main id="main-content" className="flex-grow pt-16" role="main">
      <RenderBuilderContent content={page} model="page" />
    </main>
  )
}
