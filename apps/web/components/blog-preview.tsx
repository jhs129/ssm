import Image from "next/image"
import Link from "next/link"
import { fetchEntries } from "@builder.io/sdk-react"
import { BUILDER_API_KEY } from "@/lib/builder"

function formatDate(timestamp: number): string {
  if (!timestamp) return ""
  return new Date(timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

async function getLatestArticles(limit: number) {
  const articles = await fetchEntries({
    model: "article",
    apiKey: BUILDER_API_KEY,
    options: { noTargeting: true },
  })

  return [...articles]
    .sort((a, b) => {
      const aDate = a.data?.publishDate || a.lastUpdated || 0
      const bDate = b.data?.publishDate || b.lastUpdated || 0
      return bDate - aDate
    })
    .slice(0, limit)
}

export async function BlogPreview() {
  const articles = await getLatestArticles(3)

  if (articles.length === 0) return null

  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-16 flex flex-col items-center text-center">
          <span className="mb-3 font-display text-sm font-bold uppercase tracking-[0.2em] text-secondary">
            From The Blog
          </span>
          <h2 className="font-display text-4xl font-bold uppercase tracking-tight text-foreground md:text-5xl">
            <span className="text-balance">Latest Stories</span>
          </h2>
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => {
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
                  <h3 className="font-display text-lg font-bold uppercase tracking-wide text-foreground">
                    {article.data?.title}
                  </h3>
                  {article.data?.excerpt && (
                    <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
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

        <div className="mt-12 flex justify-center">
          <Link
            href="/blogs"
            className="rounded-md border-2 border-secondary bg-transparent px-8 py-3 font-display text-sm font-bold uppercase tracking-wider text-secondary transition-all hover:bg-secondary hover:text-secondary-foreground"
          >
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  )
}
