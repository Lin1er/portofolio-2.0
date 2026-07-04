# app/api/ — Route handlers

Server-side API endpoints (Node runtime). See root `CLAUDE.md` for global rules.

## Routes

- `contact/route.ts` — `POST /api/contact`. Receives `{ name, email, message }`
  (plus a hidden `honeypot` field) from the contact form and sends an email via
  **Resend** to `personalInfo.email`. The email body is rendered from the React
  component `ClientEmail` (`@/components/email-templates/client`). Guards, in
  order: per-IP rate limit (5/10min → `429`), honeypot filled → fake `200`
  success without sending, trimmed presence check, email-shape check, and
  max-length caps (name 100 / email 254 / message 5000) → `400`.

## Conventions

- Handlers use the Web `Request`/`NextRequest` + `NextResponse` API and export a
  named HTTP-verb function (`export async function POST(...)`).
- Always wrap logic in `try/catch`; return `NextResponse.json({ error }, { status })`
  with proper codes (`400` bad input, `500` failure) and `{ success: true }` on OK.
- Secrets come from `process.env` (`RESEND_API_KEY`). The `Resend` client is
  instantiated at module scope. Never log or return the key.
- Recipient address and other identity come from `@/data` (`personalInfo`), not
  hardcoded literals — except the Resend `from:` sender, which is a fixed verified
  Resend address.

## Do / Don't

- ✅ Validate inputs before calling external services.
- ✅ Read recipient/identity from `@/data`.
- ❌ Don't expose internal errors or the API key to the client response.
- ❌ Don't add `"use client"` — route handlers are server-only.

## Testing

`contact/route.test.ts` covers every validation branch (missing/empty fields,
Resend error, malformed JSON) plus the happy path. It mocks `resend` **locally**
via `vi.hoisted` (a shared `send` spy) so each test controls the send result —
do the same for any new route that calls an external service. Add a `negative case`
per new validation branch. Run `npm run test app/api`.
