"use client"

import { Content } from "@builder.io/sdk-react"
import { customComponents } from "@repo/components"
import { BUILDER_API_KEY } from "@/lib/builder"

interface RenderBuilderContentProps {
  content: any
  model: string
  data?: Record<string, unknown>
}

export default function RenderBuilderContent({ content, model, data }: RenderBuilderContentProps) {
  return (
    <Content
      content={content}
      model={model}
      apiKey={BUILDER_API_KEY}
      customComponents={customComponents}
      data={data}
      enrich
    />
  )
}
