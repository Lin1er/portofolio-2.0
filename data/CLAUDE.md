# data/ — Single source of truth

All portfolio content lives here as typed TypeScript exports. Edit these files to
change the site — components read from them and update automatically. This is the
**most common place to make content changes**.

## Files

| File | Exports (key ones) |
|------|--------------------|
| `index.ts` | Barrel: `export * from` every file below. **Import from `@/data`.** |
| `config.ts` | `siteConfig` (name, title, url, keywords, author, theme, `homepage` limits), `animationConfig`. Drives all SEO. |
| `personal.ts` | `personalInfo`, `aboutMe`, `socialLinks`, `navItems`, `funFacts`. |
| `projects.ts` | `interface Project`, `projectCategories`, `projects[]`. |
| `skills.ts` | `skills` (by category), `skillCategories`, `techStackRow1/2/3`. |
| `experience.ts` | `interface Experience`, `experiences[]`. |
| `testimonials.ts` | `interface Testimonial`, `testimonials[]`. |

## Conventions

- **Typed unions matter.** New entries must satisfy the interfaces:
  - `Project.status`: `"completed" | "in-progress" | "on-hold"`;
    `Project.category`: `"backend" | "frontend" | "fullstack" | "web3" | "other"`
    (must match an id in `projectCategories`). `image` points to `public/assets/…`.
  - `Experience.type`: `"education" | "work" | "achievement" | "organization"`;
    `Experience.icon`: `"graduation" | "briefcase" | "award" | "calendar" | "users"`
    (icon strings map to `lucide-react` icons in `experience.tsx` — only these are valid).
  - `Testimonial.rating`: 1–5.
- **`siteConfig` is authoritative** for site identity — SEO routes, layout, manifest,
  sitemap, robots, and OG images all read it. Change name/URL/keywords here, nowhere else.
- **`homepage` limits** (`experiencesLimit`, `projectsLimit`) control how many items the
  homepage sections show; the full lists still render on dedicated pages.
- **New skill in a marquee?** Add it to the relevant `techStackRow*` too, not just `skills`.
- Keep additions consistent in shape/order with existing entries; prefer editing arrays
  over restructuring the exported objects.

## How to update content (recipes)

- **Add a project** → append to `projects[]` (valid `status`/`category`, image in
  `public/assets/`), set `featured: true` to highlight.
- **Add experience** → append to `experiences[]` with a valid `type` and `icon`.
- **Change bio / socials / nav** → edit `personal.ts` (`personalInfo`, `socialLinks`,
  `navItems`). A new `navItems` entry needs a matching section `id` in `app/page.tsx`.
- **Retune SEO** → `config.ts` (`keywords`, `title`, `description`, `url`).

## Do / Don't

- ✅ Keep new records matching the existing `interface`/union types.
- ✅ Add new content here instead of in components.
- ❌ Don't duplicate `siteConfig` values into components or route files.
- ❌ Don't use `Project`/`Experience` icon or category strings outside their unions.
- ❌ Don't deep-import these files from components — go through `@/data`.

## Testing

Each `data/*.ts` has a co-located `*.test.ts` asserting its **contract**, not
its values: union membership (`Project.status`/`category`, `Experience.type`/`icon`),
`Testimonial.rating` 1–5, skill levels 0–100, URL/email shapes, positive
homepage limits. When you add a new field or union value, extend the matching
test's `negative case` block so invalid data fails the suite. Run `npm run test data/`.
