# components/sections/ — Homepage sections

Each file is one top-level block of the homepage, composed in order by
`app/page.tsx`. All are `"use client"`.

## Files

| Section | Data source (`@/data`) |
|---------|------------------------|
| `hero.tsx` | `personalInfo`, `siteConfig` |
| `about.tsx` | `personalInfo` (`aboutMe`, `funFacts`) |
| `projects.tsx` | `projects`, `projectCategories` (+ category filter state, `ProjectModal`) |
| `skills.tsx` | `skills`, `skillCategories`, `techStackRow*` |
| `experience.tsx` | `experiences` (homepage shows `siteConfig.homepage.experiencesLimit`) |
| `contact.tsx` | `personalInfo`, `socialLinks`; POSTs to `/api/contact` |

## Conventions

- A section owns its layout + local UI state (e.g. `projects.tsx` holds the active
  category filter and modal open state). It must **not** own content — that comes
  from `@/data`.
- Respect the display limits in `siteConfig.homepage` (`experiencesLimit`,
  `projectsLimit`) rather than slicing arbitrarily.
- Wrap scroll-revealed blocks in the shared motion pattern / `SectionWrapper`
  (`@/components/ui/section-wrapper`) and give the section an `id` so the navbar
  anchor links work (`navItems` in `@/data`).
- Reusable card/effect pieces come from `@/components/ui` (e.g. `BentoCard`,
  `ProjectModal`, `Marquee`). Extract there if a piece becomes reusable.

## Adding a section

1. Create `components/sections/<name>.tsx` (`"use client"`, named export).
2. Pull its content from `@/data` (add a new `data/*.ts` export if needed).
3. Import and place it in `app/page.tsx` in the desired order; add an `id` and a
   matching entry in `navItems` (`data/personal.ts`) if it needs a nav link.

## Do / Don't

- ✅ Keep content in `data/`; keep only layout + interaction here.
- ✅ Honor `siteConfig.homepage` limits and section `id`s.
- ❌ Don't hardcode projects/skills/experience text.
