# ssm

Schneider Sports Media marketing site.

## Project Structure

This is a pnpm/Turborepo monorepo:

```
apps/
  web/                # Next.js App Router site (the deployed app)
packages/
  components/         # @repo/components — shared, Builder.io-registrable components
  types/              # @repo/types — shared type definitions
```

Vercel's Root Directory is set to `apps/web`; Vercel builds the whole workspace from there via Turborepo.

## Development

```
pnpm install
pnpm dev            # run all apps/packages in dev mode
pnpm dev:web        # run just the web app
pnpm build          # build everything
pnpm build:web      # build just the web app
```

Copy `.env.example` to `apps/web/.env.local` and fill in the values for local development.
