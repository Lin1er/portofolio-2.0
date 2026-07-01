# app/ — App Router, layout & SEO

Next.js App Router entry. This directory owns routing, the root layout, all SEO
metadata routes, and API handlers. See the root `CLAUDE.md` for global conventions.

## Files

| File | Role |
|------|------|
| `page.tsx` | Homepage. Server Component that composes the `sections/*`. |
| `layout.tsx` | Root layout: fonts (Geist), `metadata`, `<ThemeProvider>`, `<Preloader>`, and the `Person`/`WebSite`/`ProfilePage` JSON-LD graph. |
| `globals.css` | Tailwind 4 entry + CSS theme tokens (light/dark vars, custom colors, `.noise`). No `tailwind.config`. |
| `manifest.ts` | PWA web manifest (reads `siteConfig`). |
| `robots.ts` | `robots.txt`. |
| `sitemap.ts` | `sitemap.xml`. |
| `opengraph-image.tsx` / `twitter-image.tsx` | Dynamic 1200×630 social images via `next/og`. |
| `not-found.tsx` | Custom 404 (client). |
| `manifest.ts`, `icon.png`, `apple-icon.png`, `favicon.ico`, `logo.png` | PWA / icon assets. |
| `experiences/` | `/experiences` sub-page (see below). |
| `api/` | Route handlers — see `app/api/CLAUDE.md`. |

## Server vs client (critical)

- `page.tsx`, `layout.tsx`, `experiences/page.tsx`, and every SEO route
  (`sitemap`, `robots`, `manifest`, `opengraph-image`, `twitter-image`) are
  **Server Components / server routes**. They export `metadata`, JSON-LD, or
  `next/og` output. **Never add `"use client"` here.**
- Interactivity is delegated to client components. Pattern to follow (see
  `experiences/`): a server `page.tsx` holds `metadata` + JSON-LD and renders a
  sibling `*-content.tsx` that carries `"use client"`.

## SEO conventions

- All site identity (name, URL, description, keywords, author) comes from
  `siteConfig` in `data/config.ts`. Route files must read from it, not hardcode.
- Adding a new page → also add it to `sitemap.ts`, give the `page.tsx` its own
  `metadata` (title/description/`alternates.canonical`), and add a
  `BreadcrumbList` JSON-LD if it's a sub-page (mirror `experiences/page.tsx`).
- The Google site-verification code lives in `layout.tsx` (`verification`).

## Ordering the homepage

`page.tsx` renders sections in visual order. To reorder/hide a section, edit the
JSX in `page.tsx` (e.g. `<TestimonialsSection />` is currently commented out).
Don't reorder by editing the section components themselves.

## Do / Don't

- ✅ Keep metadata + structured data in server files that read `siteConfig`.
- ✅ Split interactive UI into a `"use client"` `*-content.tsx` sibling.
- ❌ Don't hardcode URLs/keywords — use `siteConfig`.
- ❌ Don't add `"use client"` to a file exporting `metadata` or JSON-LD.
