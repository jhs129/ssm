import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { fetchEntries } from "@builder.io/sdk-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BUILDER_API_KEY } from "@/lib/builder"

export const revalidate = 300

export const metadata: Metadata = {
  title: "Blog | Schneider Sports Media",
  description: "News, updates, and stories from Schneider Sports Media.",
}

function formatDate(timestamp: number): string {
  if (!timestamp) return ""
  return new Date(timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default async function BlogsPage() {
  const articles = await fetchEntries({
    model: "article",
    apiKey: BUILDER_API_KEY,
    options: { noTargeting: true },
  })

  const sorted = [...articles].sort((a, b) => {
    const aDate = a.data?.publishDate || a.lastUpdated || 0
    const bDate = b.data?.publishDate || b.lastUpdated || 0
    return bDate - aDate
  })

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main id="main-content" className="flex-grow" role="main">
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(225,100%,50%,0.08),_transparent_60%)]" />
          <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 pb-16 pt-32 text-center lg:px-8 lg:pb-20 lg:pt-40">
            <h1 className="font-display text-4xl font-bold uppercase tracking-tight text-foreground md:text-5xl">
              Blog
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              News, updates, and stories from Schneider Sports Media.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
          {sorted.length === 0 ? (
            <p className="text-center text-muted-foreground">No articles yet — check back soon.</p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {sorted.map((article) => {
                const handle = String(article.data?.handle)
                return (
                  <Link
                    key={article.id}
                    href={`/blogs/${handle}`}
                    className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-primary/50"
                  >
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
                      {article.data?.image && (
                        <Image
                          src={article.data.image}
                          alt={article.data?.title || ""}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col gap-2 p-6">
                      {article.data?.subtitle && (
                        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                          {article.data.subtitle}
                        </p>
                      )}
                      <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">
                        {article.data?.title}
                      </h2>
                      {article.data?.excerpt && (
                        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                          {article.data.excerpt}
                        </p>
                      )}
                      <p className="mt-auto pt-2 text-xs text-muted-foreground">
                        {formatDate(article.data?.publishDate || article.lastUpdated)}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
