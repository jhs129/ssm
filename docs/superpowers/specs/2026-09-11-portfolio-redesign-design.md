# Portfolio site redesign: SSM + Inside the Nest + Atlanta Sportscast

## Context

The site currently exists solely for Schneider Sports Media's single show
("John Schneider's Georgia High School Sports Show") and is largely
hardcoded React (`hero-section.tsx`, `about-*.tsx`, `show-section.tsx`,
`media-section.tsx`, `connect-section.tsx`), aside from `/blogs` (Builder
`article` model) and the `[...page]` catch-all.

John wants the site to become his personal portfolio, showcasing three
properties under the Schneider Sports Media umbrella brand:

1. **Schneider Sports Media** — existing show (YouTube + Spotify)
2. **Inside the Nest RHS** — Roswell High School show
   (`https://www.youtube.com/@InsideTheNestRHS27`, YouTube only)
3. **Atlanta Sportscast** — show
   (`https://open.spotify.com/show/2jHXt2YAFL2t6TnK1MI6Tw`, Spotify;
   confirm YouTube presence during implementation, treat as Spotify-only if
   none exists)

The entire site should become CMS-managed in Builder.io so John can edit
copy, images, and show details without a code change.

**Known bug this fixes:** the current Spotify links point at a placeholder
slug (`open.spotify.com/show/john-schneiders-georgia-high-school-sports-show`),
which is why the show page currently renders "Page not available" for the
Spotify embed. Migrating SSM into the new `show` model replaces this with
the real show ID.

## Decisions (confirmed with John)

- **Branding:** Keep "Schneider Sports Media" as the site's umbrella brand.
  The other two shows are presented as additional properties, not a
  personal-name rebrand.
- **Structure:** One page per show, plus a shared home page. Home
  introduces John and links out to all three; each show gets a full
  dedicated page.
- **Show content model:** A structured `show` data model in Builder
  (fixed fields), not free-form pages, so the three show pages stay
  visually consistent and John only edits fields.
- **CMS scope:** Home, About, and Contact convert to Builder `page`
  entries built from registered, drag-and-drop components — not just the
  new show pages and blog.
- **Visual style:** Keep the current dark navy theme with red/blue accents
  (matches the SSM logo); no visual redesign, just consistent application
  across new templates.
- **Embeds:** Live feed embeds (YouTube channel latest uploads, Spotify
  show episode list) — auto-updating, no manual curation.
- **Contact:** No form. Simple mailto/social links only.

## Information architecture

```
/                                 Home — Builder page entry
/about                            Builder page entry (John's bio)
/shows/schneider-sports-media     "show" model entry
/shows/inside-the-nest            "show" model entry
/shows/atlanta-sportscast         "show" model entry
/blog, /blog/[handle]             existing "article" model — unchanged
/contact                          Builder page entry (links only)
```

Nav stays coded (per existing pattern — this repo's `site-header.tsx`
does not source nav from Builder): `Home | About | Shows ▾ | Blog | Contact`,
with "Shows" expanding to the three show links.

## Content models

### New: `show` model

Structured Builder data model, one entry per show, rendered by a single
shared Next.js route.

| Field              | Type                        | Notes                                                   |
|--------------------|-----------------------------|----------------------------------------------------------|
| `name`             | text                        | e.g. "Schneider Sports Media"                            |
| `slug`             | text                        | URL path segment under `/shows/`                         |
| `tagline`          | text                        | short one-liner                                          |
| `description`      | rich text                   | longer show description                                  |
| `logo`             | image                       |                                                            |
| `platform`         | enum: `youtube`/`spotify`/`both` | drives which embed(s)/CTA(s) render                  |
| `youtubeUrl`       | text (optional)             | channel URL, used for CTA + embed source                 |
| `spotifyUrl`       | text (optional)             | show URL, used for CTA + embed source                     |
| `featuredEmbedUrl` | text (optional)             | channel/show identifier used to build the live-feed embed src |
| `metadata`         | model reference             | reuses existing shared `metadata` model (SEO)             |

Route: `apps/web/app/shows/[slug]/page.tsx` fetches the matching `show`
entry by `data.slug` (same pattern `article` uses today) and renders it
through one shared template component, so all three pages look and behave
identically regardless of which fields are filled in.

### Existing models — unchanged

- `article` (blog posts)
- `page` (Builder's built-in catch-all — now also used for `/`, `/about`,
  `/contact`)
- `metadata` (shared SEO fields)

### Registered components (drag-and-drop, for `page` entries)

Generalized from today's hardcoded sections, registered with Builder
following the existing `Button.builder.registration.tsx` pattern in
`packages/components`:

- **`Hero`** — headline/subhead/CTA (generalized from `hero-section.tsx`)
- **`Bio`** — John's bio content (from `about-bio.tsx`)
- **`ShowsGrid`** — renders preview cards for all `show` entries via a
  Builder data binding (querying the `show` model), so a 4th show added
  later requires no code change
- **`BlogPreview`** — latest N `article` entries
- **`ConnectLinks`** — mailto + social links (generalized from
  `connect-section.tsx`)

## Migration plan

1. Extend `scripts/seed-builder.mjs`:
   - Create the `show` model (idempotent, same pattern as the existing
     `article` model creation)
   - Seed three `show` entries using the real URLs above
2. Register the five components listed above with Builder
   (`*.builder.registration.tsx` files in `packages/components`)
3. Add `apps/web/app/shows/[slug]/page.tsx` — fetches and renders a `show`
   entry
4. Seed `page` entries for `/`, `/about`, `/contact` composed from the
   registered components, replacing `app/page.tsx` and `app/about/page.tsx`
   (both fold into the existing `[...page]` catch-all)
5. Add `apps/web/app/contact/` only if a coded fallback route is needed —
   otherwise the Builder `page` entry at `/contact` is served directly by
   the catch-all
6. Update `site-header.tsx` nav to add the "Shows" dropdown/links
7. Delete the now-unused hardcoded section components (`hero-section.tsx`,
   `about-bio.tsx`, `about-hero.tsx`, `about-mission.tsx`,
   `about-advantage.tsx`, `about-podcast.tsx`, `about-section.tsx`,
   `show-section.tsx`, `media-section.tsx`, `connect-section.tsx`) once
   their Builder-driven replacements are live and verified

## Error handling / edge cases

- A `show` entry missing `youtubeUrl` or `spotifyUrl` for its declared
  `platform` should not render a broken embed/CTA — the template only
  renders the CTA/embed for URLs that are actually present, regardless of
  the `platform` value (defensive: don't trust `platform` alone).
- If Builder content for `/`, `/about`, or `/contact` is unpublished or
  fails to fetch, the catch-all's existing not-found/error handling
  applies (no new error handling needed beyond what `[...page]` already
  does for `/blog/[handle]` today).

## Testing / rollout

- `pnpm build` and typecheck after each implementation phase
- Manual verification in Builder's preview for each new page/model entry
  before publishing
- Confirm all three shows' live embeds actually load (2 YouTube, at least
  1 Spotify) — this is the direct regression test for the bug this work
  fixes
- Visual check that new Builder-driven pages match the existing dark
  navy/red/blue theme (reuse existing `globals.css` tokens; no new theme
  work)

## Out of scope

- Rebranding to a personal "John Schneider" identity (umbrella brand
  stays "Schneider Sports Media")
- Contact form / email delivery backend
- Any visual/theme redesign beyond consistent application of the existing
  theme to new templates
- Curating specific "featured" episodes per show (embeds are live
  feeds, not curated picks)
