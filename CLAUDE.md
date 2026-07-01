# CLAUDE.md — Portfolio 2.0

Guidance for AI agents working in this repository. Read this first, then the
folder-scoped `CLAUDE.md` inside the directory you are editing.

## What this is

A personal portfolio site for **M. Ulinuha As Shiddiqy** (live: `jameshub.fun`).
Single-page marketing site + a `/experiences` sub-page, built for aggressive SEO
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
npm run dev     # next dev — local at http://localhost:3000
npm run build   # next build — NOTE: needs RESEND_API_KEY set or build fails
npm run start   # serve production build
npm run lint    # eslint (flat config, eslint.config.mjs)
```

There is **no test suite** and no CI config in-repo. Verify changes by running
`npm run dev` / `npm run build` and eyeballing the page.

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
3. **Pages are Server Components** — `app/page.tsx` and `app/experiences/page.tsx`
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
- ❌ Don't introduce a styling system, state library, or test framework without asking.
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
