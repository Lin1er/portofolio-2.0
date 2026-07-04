# components/ui/ — Reusable primitives & effects

Small, reusable building blocks and motion effects consumed by `sections/` and
`layout/`. All are `"use client"`.

## Files

| File | Purpose |
|------|---------|
| `section-wrapper.tsx` | `SectionWrapper` — standard scroll-reveal `motion.section` (fade in on `whileInView`, `once: true`). Reuse for consistent reveals. |
| `bento-card.tsx` | Grid/bento card container used by sections. |
| `projects-grid.tsx` | Filterable project card grid + detail modal (homepage section passes a featured slice; `/projects` passes the full list with `showFilters`). |
| `project-modal.tsx` | Click-to-open project detail modal (used by `ProjectsGrid`). |
| `marquee.tsx` | Scrolling tech-stack rows (fed by `techStackRow*`). |
| `animated-text.tsx` | Text reveal/typing animation. |
| `magnetic-button.tsx` | Cursor-follow magnetic button effect. |
| `preloader.tsx` | Intro loader (duration from `animationConfig.preloaderDuration`). |
| `scroll-progress.tsx` | Top scroll-progress bar. |
| `back-to-top.tsx` | Floating back-to-top button. |
| `theme-toggle.tsx` | Light/dark toggle (uses `next-themes`). |
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
