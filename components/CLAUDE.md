# components/ — React components

All UI components. Organized by role; each subfolder has its own `CLAUDE.md`.

## Subfolders

- `sections/` — full homepage sections (Hero, About, Projects, …). One per page block.
- `ui/` — reusable primitives & motion effects (buttons, cards, marquee, preloader…).
- `layout/` — site chrome: `navbar`, `footer`.
- `providers/` — React context providers (theme).
- `email-templates/` — JSX rendered into emails by Resend (not rendered in the browser).

## Conventions

- **Named exports**, PascalCase component names, one primary component per file.
  Filenames are kebab-case (`back-to-top.tsx`, `section-wrapper.tsx`).
- **`"use client"` at the top** of essentially every component here — they use
  hooks, Framer Motion, or browser APIs. (Email templates are the exception: they
  are plain JSX rendered server-side, no directive needed.)
- **Consume content from `@/data`**, never hardcode copy, lists, or links.
- **Import siblings via alias**: `@/components/ui/bento-card`, not relative paths.
- **Styling**: Tailwind classes + theme tokens (`bg-card`, `text-muted`, `border`,
  `text-accent`) defined in `app/globals.css`. Support light & dark automatically
  by using tokens rather than raw colors.
- **Icons** from `lucide-react`. **Images** via `next/image`.
- **Animation** via `framer-motion`. Reuse `SectionWrapper` / existing motion
  patterns for scroll reveals (`whileInView`, `viewport={{ once: true }}`) instead
  of reinventing timings; shared tuning lives in `animationConfig` (`@/data`).

## Do / Don't

- ✅ Keep components presentational; pull data from `@/data`.
- ✅ Match the animation and Tailwind-token style of neighboring files.
- ❌ Don't hardcode content that belongs in `data/`.
- ❌ Don't use raw hex colors where a theme token exists (breaks dark mode).
- ❌ Don't default-export components (Next.js special files excepted).
