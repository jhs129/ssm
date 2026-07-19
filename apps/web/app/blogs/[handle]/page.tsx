import { cache } from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { fetchOneEntry, fetchEntries } from "@builder.io/sdk-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ArticleSchemaData } from "@/components/ArticleSchemaData"
import RenderBuilderContent from "@/components/RenderBuilderContent"
import { BUILDER_API_KEY } from "@/lib/builder"
import { isPreviewingFromSearchParams } from "@/lib/page-utils"

// ISR window (seconds) for published Builder.io content. Must be a literal —
// App Router segment config is statically analyzed and rejects runtime/env
// expressions. Editors still get instant updates via Builder preview mode.
export const revalidate = 300

function formatDate(timestamp: number): string {
  if (!timestamp) return ""
  return new Date(timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

// Dedupe the article fetch across generateMetadata and the page component
// within the same request render.
const fetchArticle = cache(async (handle: string) =>
  fetchOneEntry({
    model: "article",
    apiKey: BUILDER_API_KEY,
    query: { "data.handle": handle },
    enrich: true,
  }),
)

export async function generateStaticParams(): Promise<{ handle: string }[]> {
  const articles = await fetchEntries({
    model: "article",
    apiKey: BUILDER_API_KEY,
    fields: "data.handle",
    options: { noTargeting: true },
  })

  return articles
    .map((article) => String(article.data?.handle))
    .filter(Boolean)
    .map((handle) => ({ handle }))
}

interface BlogRouteProps {
  params: Promise<{ handle: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export async function generateMetadata({ params }: BlogRouteProps): Promise<Metadata> {
  const { handle } = await params
  const article = await fetchArticle(handle)

  const title = article?.data?.title
  const description = article?.data?.metadata?.description || article?.data?.excerpt || ""

  return {
    title: title ? `${title} | Schneider Sports Media` : undefined,
    description,
    keywords: article?.data?.metadata?.keywords,
    openGraph: {
      title,
      description,
      type: "article",
      images: article?.data?.image ? [article.data.image] : undefined,
    },
  }
}

export default async function BlogPage({ params, searchParams }: BlogRouteProps) {
  const { handle } = await params
  const resolvedSearchParams = await searchParams
  const article = await fetchArticle(handle)
  const isPreviewing = isPreviewingFromSearchParams(resolvedSearchParams)

  if (!article && !isPreviewing) {
    notFound()
  }

  const publishedTimestamp = article?.data?.publishDate || article?.lastUpdated
  const publishedDate = formatDate(publishedTimestamp)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || ""

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      {article && publishedTimestamp && (
        <ArticleSchemaData
          headline={article.data?.title || ""}
          description={article.data?.metadata?.description || article.data?.excerpt || ""}
          image={article.data?.image}
          datePublished={new Date(publishedTimestamp).toISOString()}
          dateModified={article.lastUpdated ? new Date(article.lastUpdated).toISOString() : undefined}
          url={`${siteUrl}/blogs/${handle}`}
        />
      )}
      <main id="main-content" className="flex-grow" role="main">
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(225,100%,50%,0.08),_transparent_60%)]" />
          <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 pb-16 pt-32 text-center lg:px-8 lg:pb-20 lg:pt-40">
            {article?.data?.subtitle && (
              <p className="font-semibold uppercase tracking-wider text-primary">{article.data.subtitle}</p>
            )}
            <h1 className="text-balance font-display text-4xl font-bold uppercase tracking-tight text-foreground md:text-5xl">
              {article?.data?.title}
            </h1>
            {article?.data?.excerpt && (
              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">{article.data.excerpt}</p>
            )}
            {publishedDate && <p className="text-sm text-muted-foreground">Published {publishedDate}</p>}
          </div>
        </section>
        <article className="mx-auto w-full max-w-[800px] px-4 py-12 lg:px-8">
          <RenderBuilderContent content={article} model="article" />
        </article>
      </main>
      <SiteFooter />
    </div>
  )
}
