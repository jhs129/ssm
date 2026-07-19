// Resolves the [...page] catch-all's route segments into the Builder urlPath.
export function resolvePageUrlPath(segments: string[] | undefined): string {
  const parts = Array.isArray(segments) ? segments : []
  const urlPath = "/" + parts.join("/")
  return urlPath === "/" ? "/" : urlPath.replace(/\/$/, "")
}

export function formatLastUpdatedDate(dateInput: unknown): string {
  if (!dateInput) return "Date not available"

  const date = new Date(dateInput as string | number)
  if (isNaN(date.getTime())) return "Invalid date"

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

// Server-side preview detection from the route's searchParams. Builder injects
// builder.preview / builder.space when editing; the seed script's article
// preview URL also uses a plain ?preview=true.
export function isPreviewingFromSearchParams(
  searchParams: Record<string, string | string[] | undefined> | undefined,
): boolean {
  if (!searchParams) return false
  return (
    searchParams["builder.preview"] !== undefined ||
    searchParams["builder.space"] !== undefined ||
    searchParams["builder.overrides.preview"] !== undefined ||
    searchParams["preview"] !== undefined
  )
}
