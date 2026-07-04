# CLAUDE.md — Portfolio 2.0

Guidance for AI agents working in this repository. Read this first, then the
folder-scoped `CLAUDE.md` inside the directory you are editing.

## What this is

A personal portfolio site for **M. Ulinuha As Shiddiqy** (live: `jameshub.fun`).
Single-page marketing site + `/projects` and `/experiences` sub-pages, built for aggressive SEO
(dynamic Open Graph images, JSON-LD structured data, sitemap/robots/manifest) and
smooth motion. All displayed content is data-driven — you edit `data/*.ts`, and
the UI updates itself.

## Tech stack

| Area       | Choice |
|------------|--------|
| Framework  | Next.js 16 (App Router), React 19 |
| Language   | TypeScript 5 (strict) |
| Styling    | Tailwind CSS 4 (CSS-first config in `app/globals.css`, no `tailwind.config`) |
| Animation  | Framer Motion (`framer-motion`) |
| Theming    | `next-themes` (dark default, system-aware) |
| Icons      | `lucide-react` |
| Email      | Resend + React Email (contact form) |
| Hosting    | Vercel (push to `main` = prod deploy) |

## Commands

```bash
npm run dev        # next dev — local at http://localhost:3000
npm run build      # next build — NOTE: needs RESEND_API_KEY set or build fails
npm run start      # serve production build
npm run lint       # eslint (flat config, eslint.config.mjs)
npm run test       # vitest run — unit tests (co-located *.test.ts(x))
npm run test:watch # vitest watch mode
npm run coverage   # vitest run --coverage — enforces the 80% gate
```

CI (`.github/workflows/ci.yml`) runs lint, the coverage gate, and the build on
every push/PR to `main`. Locally, verify changes by running `npm run test` (and
`npm run coverage` for the gate), plus `npm run build` for release checks.

## Testing

Vitest + React Testing Library, jsdom, **London/mockist** isolation. See
`docs/plans/2026-07-01-001-test-unit-test-suite-plan.md` for the full design.

- **Co-located**: every test sits beside its source (`route.test.ts` next to
  `route.ts`, `hero.test.tsx` next to `hero.tsx`).
- **Naming**: `describe("<unit>") → describe("positive case" | "negative case" | "edge case") → it(...)`.
  Negative cases must cover **all** validation logic.
- **Shared mock layer** lives in `vitest.setup.ts` — mocks `framer-motion`
  (motion tags → plain DOM), `next/image`, `next-themes`, `next/font/google`,
  `next/navigation`, `next/og`, `@vercel/analytics`, `@vercel/speed-insights`,
  and global `fetch`. `resend` is mocked locally
  in `app/api/contact/route.test.ts` for per-test control. Extend the shared
  layer there rather than re-mocking a boundary per file.
- **Coverage gate** (`vitest.config.ts`): lines/statements/functions ≥ 80,
  branches ≥ 70, measured across all of `app/`, `components/`, `data/`.
- **BUGS protocol**: if a test exposes a real production defect, annotate it
  `// BUG: …`, convert `it(...)` → `it.skip(...)`, and log it under
  "Discovered Bugs" in the plan doc. **Do not fix production source in a test PR.**
  (Known: BUG-1 — whitespace-only contact fields bypass validation.)

## Environment

- `RESEND_API_KEY` — **required at build time and runtime** (contact form). Copy
  `.env.example` → `.env.local`. On Vercel set it in project env vars.

## Architecture & data flow

```
data/*.ts  ──(barrel)──▶  data/index.ts  ──▶  components/**  ──▶  app/page.tsx
   │                                                                    │
   └── siteConfig / personalInfo ──▶ app/layout.tsx, app/{sitemap,robots,manifest,opengraph-image}
```

1. **Content lives in `data/`** as typed exports (single source of truth).
2. Everything is re-exported from `data/index.ts`; components import from `@/data`.
3. **Pages are Server Components** — `app/page.tsx`, `app/projects/page.tsx`, and `app/experiences/page.tsx`
   own metadata + JSON-LD, then render section/content components.
4. **Interactive UI is client** — nearly every component under `components/` is
   `"use client"` (Framer Motion, hooks). SEO/metadata never lives in a client file.
5. **SEO routes** (`layout.tsx`, `sitemap.ts`, `robots.ts`, `manifest.ts`,
   `opengraph-image.tsx`) all read from `siteConfig` — change the URL/name/keywords
   in `data/config.ts`, never hardcode them in the route files.
6. **Contact flow**: `components/sections/contact.tsx` (client) → `POST /api/contact`
   → Resend renders `components/email-templates/client.tsx` → email to `personalInfo.email`.

## Project-wide conventions

- **Import content via the barrel**: `import { projects, siteConfig } from "@/data"`.
  Do not deep-import individual `data/*.ts` files in components (route files may,
  e.g. `manifest.ts` imports `@/data/config`).
- **Path alias**: `@/*` maps to the repo root (`tsconfig.json`). Use `@/components/...`,
  `@/data`, never long relative `../../` chains.
- **Named exports** for components (`export function HeroSection() {}`), not default,
  except Next.js special files (`page.tsx`, `layout.tsx`, route handlers) which
  require default exports.
- **`"use client"`** goes at the very top of any component using hooks, Framer
  Motion, or browser APIs. Keep it out of files that export `metadata` or JSON-LD.
- **Styling** is Tailwind utility classes + CSS custom properties (theme tokens like
  `--background`, `--accent`, `bg-card`, `text-muted`) defined in `app/globals.css`.
  No CSS modules, no styled-components.
- **Images**: `next/image`. Remote hosts must be whitelisted in `next.config.ts`
  (`remotePatterns`) — currently only GitHub domains. Local images go in `public/`.

## Do / Don't

- ✅ Add or change portfolio content only in `data/*.ts`.
- ✅ Keep `siteConfig` the single source for site name / URL / keywords.
- ✅ Match the surrounding file's style (named exports, `"use client"` placement,
  Tailwind token usage).
- ❌ Don't hardcode text, project lists, skills, or links inside components.
- ❌ Don't put `"use client"` in a file that exports `metadata`/`generateMetadata`.
- ❌ Don't add a new remote image domain without updating `next.config.ts`.
- ❌ Don't introduce a styling system or state library without asking. (Testing is Vitest — see Testing above; use it, don't add another runner.)
- ❌ Don't commit secrets; `RESEND_API_KEY` belongs in env, not the repo.

## Directory map (each has its own CLAUDE.md)

- `app/` — App Router pages, root layout, SEO routes, API. → `app/CLAUDE.md`
- `app/api/` — server route handlers (contact form). → `app/api/CLAUDE.md`
- `components/` — all React components. → `components/CLAUDE.md`
- `components/sections/` — homepage page-sections. → `components/sections/CLAUDE.md`
- `components/ui/` — reusable UI primitives & effects. → `components/ui/CLAUDE.md`
- `components/layout/` — navbar / footer. → `components/layout/CLAUDE.md`
- `components/providers/` — context providers. → `components/providers/CLAUDE.md`
- `components/email-templates/` — Resend email JSX. → `components/email-templates/CLAUDE.md`
- `data/` — typed content, single source of truth. → `data/CLAUDE.md`
- `public/` — static assets & screenshots (no CLAUDE.md).
