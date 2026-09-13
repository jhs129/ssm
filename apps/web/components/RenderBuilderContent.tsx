"use client"

import { Content, type BuilderContent } from "@builder.io/sdk-react"
import { customComponents } from "@repo/components"
import { BUILDER_API_KEY } from "@/lib/builder"

interface RenderBuilderContentProps {
  // Null when the entry is missing but the page is being previewed in Builder.
  content: BuilderContent | null
  model: string
  data?: Record<string, unknown>
}

export default function RenderBuilderContent({ content, model, data }: RenderBuilderContentProps) {
  return (
    <Content
      content={content ?? undefined}
      model={model}
      apiKey={BUILDER_API_KEY}
      customComponents={customComponents}
      data={data}
      enrich
    />
  )
}
