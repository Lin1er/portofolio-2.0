# components/email-templates/ — Email JSX

React components rendered into HTML emails by **Resend** (server-side, from
`app/api/contact/route.ts`). These are **not** rendered in the browser.

## Files

- `client.tsx` — `ClientEmail({ clientName, clientEmail, message })`. The email body
  sent when someone submits the contact form.

## Conventions

- **Inline styles only** (`style={{ ... }}`). Email clients don't support Tailwind
  classes or external CSS, so do not use theme tokens or `className` styling here.
- **No `"use client"`** and no hooks/browser APIs — these are pure, server-rendered JSX.
- Keep props explicit and typed via an interface; the caller in
  `app/api/contact/route.ts` passes them.
- Test rendering by submitting the contact form against a real `RESEND_API_KEY`
  (there is no local email preview harness wired up).

## Do / Don't

- ✅ Use inline styles and keep markup email-client-safe (tables/inline CSS).
- ❌ Don't use Tailwind classes, theme tokens, hooks, or `"use client"` here.
