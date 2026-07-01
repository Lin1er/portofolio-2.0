---
artifact_contract: ce-unified-plan/v1
artifact_readiness: requirements-only
product_contract_source: ce-brainstorm
date: 2026-07-01
type: test
topic: unit-test-suite
---

# Unit Test Suite (Vitest, 80% coverage) - Plan

## Goal Capsule

- **Objective:** Introduce a unit-test suite to a currently untested Next.js 16 / React 19 portfolio, reaching a **hard-gated 80% coverage** (branches 70%) across the whole repo, without modifying any production source.
- **Product authority:** Repo owner (M. Ulinuha). All conventions below are owner-specified.
- **Open blockers:** None. All framework, scope, enforcement, and convention decisions are resolved (see Decisions Log).

## Product Contract

### Problem & Outcome

The repo has **zero test tooling and zero tests** (verified: no `vitest`/`jest`/`testing-library` in `package.json`; no `*.test.*`/`*.spec.*` files). There is no regression safety net for the one piece of real server logic (the contact API route), the typed content contracts in `data/`, or the SEO route outputs.

**Desired outcome:** A co-located Vitest suite that isolates every unit (London/mockist), documents every discovered bug without fixing it, and enforces 80% coverage as a build gate — so future content or dependency changes fail loudly instead of silently breaking the site.

### Primary Actor

The repo maintainer (solo developer) and any future AI agent editing the codebase. Tests are the executable spec they rely on.

### In Scope

1. **Tooling**
   - `vitest`, `@vitest/coverage-v8`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`.
   - `vitest.config.ts` (jsdom env, coverage provider `v8`, thresholds, excludes) + a test setup file registering `jest-dom` matchers and global mocks.
   - `package.json` scripts: `test`, `test:watch`, `coverage`.

2. **Coverage target — global, whole repo, hard gate**
   - Thresholds: **lines 80 / statements 80 / functions 80 / branches 70**. Build fails below.
   - Denominator excludes **only non-source**: `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `vitest.config.ts`, the test setup file, `*.d.ts`, `public/`, `.next/`, `node_modules/`.
   - All `.ts/.tsx` under `app/`, `components/`, `data/` count — including decorative animation components.

3. **Isolation — London / mockist (all boundaries mocked)**
   - Module mocks: `framer-motion` (motion elements → pass-through DOM tags, `AnimatePresence` → fragment, hooks → inert), `next/image` (→ plain `<img>`), `next-themes` (`useTheme`, `ThemeProvider`), `next/font/google` (Geist/Geist_Mono → stub with `variable`), `next/navigation`, `next/og` (`ImageResponse`), `resend` (`Resend` class → mocked `emails.send`), and global `fetch`.
   - Every test asserts against a mocked collaborator; no real network, no real image/font loading.

4. **Test file coverage map** (co-located `*.test.ts(x)` beside each source file)
   - `app/api/contact/route.test.ts` — **primary negative-testing target.**
   - `data/*.ts` — contract/integrity tests for `config`, `personal`, `projects`, `skills`, `experience`, `testimonials`.
   - SEO routes — `sitemap`, `robots`, `manifest` (shape) + `opengraph-image`, `twitter-image` (smoke: returns `ImageResponse`, correct size).
   - App shells — `layout`, `page`, `not-found`, `experiences/page` + `experiences-content` (render smoke).
   - `components/email-templates/client.test.tsx`, `components/providers/theme-provider`, `components/layout/{navbar,footer}`.
   - `components/sections/*` (hero, about, projects, skills, experience, testimonials, contact).
   - `components/ui/*` (section-wrapper, bento-card, project-modal, marquee, animated-text, magnetic-button, preloader, scroll-progress, back-to-top, theme-toggle, dev-banner).

5. **Naming convention (strict)**
   ```
   describe("<unit / method>", () => {
     describe("positive case", () => { it("...", ...) })
     describe("negative case", () => { it("...", ...) })  // covers ALL validation logic
     describe("edge case", () => { it("...", ...) })
   })
   ```

6. **BUGS protocol**
   - When a test exposes a genuine production defect (and the fix would require editing source, which is forbidden), annotate it `// BUG: <description>` and convert `it(...)` → `it.skip(...)`.
   - Record every such bug in the "Discovered Bugs" section of this doc so the suite stays green while the defect is tracked.

7. **Docs** — add a Testing section to the root `CLAUDE.md` and testing notes to `data/CLAUDE.md`, `app/api/CLAUDE.md`, and `components/CLAUDE.md`.

8. **Verification** — run `npm run test` (green, bugs quarantined) and `npm run coverage` (≥ thresholds) before declaring done.

### Out of Scope (Non-Goals)

- Any edit to production `.ts/.tsx` files, including `/* v8 ignore */` pragmas (branches driven by tests instead, hence the 70% branch threshold).
- E2E, integration, visual-regression, or accessibility-audit testing.
- CI/CD pipeline wiring beyond local npm scripts.
- Refactoring source to be "more testable."

### Success Criteria

- `npm run test` passes with all discovered bugs isolated via `.skip` + `// BUG:` annotation.
- `npm run coverage` meets lines/statements/functions ≥ 80%, branches ≥ 70%.
- Every validation branch in `app/api/contact/route.ts` has a corresponding negative-case test.
- Each `data/*.ts` union/range constraint has an integrity assertion.
- Relevant `CLAUDE.md` files document how to run and extend the suite.

### Key Decisions Log

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Framework | **Vitest** | ESM-native, fast, first-class with Next 16 / React 19; `vi.mock` ideal for London-style isolation. |
| Coverage scope | **Global, whole repo** | Owner wants a repo-wide safety net, not logic-only. |
| Enforcement | **Hard gate + standard excludes** | Fail build < threshold; exclude only non-source config/types/assets. |
| Branch metric | **branches 70%, others 80%** | Source edits forbidden → cannot silence unreachable defensive branches; 70% keeps the gate realistic. |
| File location | **Co-located** | Owner-specified; tests live beside source. |
| Isolation style | **London / mockist** | Owner-specified; all collaborators mocked. |

### Assumptions

- The `next/og` image routes can only be **smoke-tested** (assert an `ImageResponse`/`Response` is returned + size config); pixel output is not asserted.
- `app/layout.tsx` and `app/page.tsx` are covered via render-smoke tests with fonts/providers mocked.
- Reaching global 80% may require the decorative `components/ui/*` to have render-smoke tests even though their bug-catching value is low; this is accepted as the cost of the global target.
- No production bug is assumed in advance; the BUGS protocol is a safety valve, not an expectation.

### Discovered Bugs

_(To be populated during execution — none yet, tests not written at brainstorm time.)_

| ID | File:Line | Symptom | Test (skipped) |
|----|-----------|---------|----------------|

### Outstanding Questions

- None blocking. If global 80% proves unreachable on a specific decorative component without asserting trivial output, revisit whether that file joins the excludes list (would require owner sign-off, since it narrows the "whole repo" intent).

## Risks

- **Global 80% is effort-heavy** on ~20 presentational components; mitigated by shared mock setup and render-smoke helpers.
- **Branch coverage under no-source-edit** — some defensive branches (e.g. internal `catch`) may be hard to reach; mitigated by the 70% branch threshold and by mocking Resend to throw.
- **Mock drift** — pass-through mocks for `framer-motion`/`next/image` must stay faithful to the real prop surface or tests give false confidence; mitigated by centralizing them in the setup file.
