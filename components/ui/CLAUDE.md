# components/ui/ — Reusable primitives & effects

Small, reusable building blocks and motion effects consumed by `sections/` and
`layout/`. All are `"use client"`.

## Files

| File | Purpose |
|------|---------|
| `bento-card.tsx` | Grid/bento card container used by sections. |
| `projects-grid.tsx` | Filterable project card grid + detail modal (used by `/projects` with `showFilters`). |
| `project-modal.tsx` | Click-to-open project detail modal (used by `ProjectsGrid`). |
| `magnetic-button.tsx` | Cursor-follow magnetic button effect. |
| `preloader.tsx` | First-visit intro: counter 000→100, orange curtain with the greetings, then lifts away. Counter follows the real page load, held for at least `minMs` and never waiting past `maxMs` (`animationConfig.intro`); sets `<html data-intro="playing|done">` (the hero name hides while playing). |
| `ticker.tsx` | `Ticker` — endless CSS marquee (items rendered twice, slides by half). |
| `section-head.tsx` | `SectionHead` — orange index, giant title that rises into view, optional note. |
| `dev-banner.tsx` | Optional "in development" banner (import commented out in layout). |

## Conventions

- Components are **generic and presentational**: props in, no hardcoded portfolio
  content. Content-specific data still comes from `@/data` at the call site or via props.
- Keep animation timings consistent — reuse `SectionWrapper` and pull shared values
  from `animationConfig` (`@/data`) rather than sprinkling magic numbers.
- Use theme tokens (`bg-card`, `text-muted`, `text-accent`, `border`) so effects
  work in both light and dark mode.
- Theme-aware components read/write theme via `next-themes` (`useTheme`), never a
  bespoke theme state.

## Do / Don't

- ✅ Keep these reusable and prop-driven; put page copy in `sections/` or `data/`.
- ✅ Reuse `SectionWrapper` and `animationConfig` for consistent motion.
- ❌ Don't bake specific project/skill data into a UI primitive.
