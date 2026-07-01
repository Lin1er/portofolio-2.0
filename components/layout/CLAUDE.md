# components/layout/ — Site chrome

Persistent layout components rendered around the page content. Both `"use client"`.

## Files

- `navbar.tsx` — top navigation. Links come from `navItems` (`@/data`), which anchor
  to section `id`s on the homepage. Includes the theme toggle.
- `footer.tsx` — site footer: socials (`socialLinks` from `@/data`), copyright.

## Conventions

- Nav links are driven by `navItems` in `data/personal.ts` — add/remove links there,
  and ensure a matching section `id` exists in `app/page.tsx`.
- Socials/contact come from `@/data` (`socialLinks`, `personalInfo`), not hardcoded.
- Use theme tokens for colors so both modes render correctly.

## Do / Don't

- ✅ Drive nav & socials from `@/data`.
- ❌ Don't hardcode links, labels, or the author's contact details here.
