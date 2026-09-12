interface ArticleSchemaDataProps {
  headline: string
  description: string
  image?: string
  datePublished: string
  dateModified?: string
  url: string
}

export function ArticleSchemaData({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  url,
}: ArticleSchemaDataProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    image: image ? [image] : undefined,
    datePublished,
    dateModified: dateModified || datePublished,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  }

  // Escape `<` so a content field containing `</script>` can't break out of
  // the script tag; JSON.stringify alone does not escape it.
  const json = JSON.stringify(schema).replace(/</g, "\\u003c")

  return (
    <script
      type="application/ld+json"
       
      dangerouslySetInnerHTML={{ __html: json }}
    />
  )
}
