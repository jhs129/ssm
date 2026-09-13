import next from 'eslint-config-next/core-web-vitals'
import typescript from 'eslint-config-next/typescript'

// Single flat config for the whole workspace. `next lint` was removed in
// Next 16, so linting runs from the root via `pnpm lint` rather than as a
// per-package turbo task.
const config = [
  {
    ignores: [
      '**/node_modules/**',
      '**/.next/**',
      '**/dist/**',
      '**/.turbo/**',
      'apps/web/next-env.d.ts',
    ],
  },
  ...next,
  ...typescript,
  {
    // The Next app is nested in the monorepo, so the app-directory rules
    // (no-html-link-for-pages and friends) need to be pointed at it.
    settings: { next: { rootDir: 'apps/web' } },
    linterOptions: { reportUnusedDisableDirectives: 'warn' },
  },
  {
    // Tailwind's config is CommonJS by convention; its plugin loading uses
    // require() deliberately.
    files: ['**/tailwind.config.ts'],
    rules: { '@typescript-eslint/no-require-imports': 'off' },
  },
]

export default config
