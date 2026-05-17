<div align="center">

# Portfolio — M. Ulinuha As Shiddiqy

**Fullstack & Web3 Backend Developer**

A modern, fully-responsive personal portfolio with SEO-first architecture, dynamic Open Graph images, structured data, and smooth motion.

[**Live → jameshub.fun**](https://jameshub.fun)

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Vercel-deployed-black?style=flat-square&logo=vercel)](https://vercel.com/)

</div>

---

## Overview

A single-source-of-truth portfolio: all content (projects, skills, experience, personal info) lives in typed data files under `data/`, so the site can be updated without touching components. Built with an aggressive SEO setup to maximize discoverability and rich results on Google.

## Features

- **SEO-first** — full metadata, canonical URLs, `sitemap.xml`, `robots.txt`, Google site verification
- **Dynamic Open Graph & Twitter images** — generated at the edge via `next/og` (1200×630)
- **JSON-LD structured data** — `Person` + `WebSite` + `ProfilePage` graph (occupation, awards, skills) for Google entity recognition
- **PWA-ready** — web manifest, generated favicon / icon / apple-touch-icon
- **Dark / light mode** — system-aware via `next-themes`
- **Smooth animations** — page transitions and reveals with Framer Motion
- **Contact form** — server-side email delivery via Resend + React Email
- **Data-driven** — edit `data/*.ts`, the UI updates automatically

## Tech Stack

| Area | Technologies |
|------|--------------|
| Framework | Next.js 16 (App Router), React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion |
| Theming | next-themes |
| Icons | lucide-react |
| Email | Resend, React Email |
| Hosting | Vercel · Domain via Cloudflare |

## Project Structure

```
app/                 # App Router: pages, layout, SEO routes
  layout.tsx         # Root metadata + JSON-LD structured data
  opengraph-image.tsx# Dynamic OG / Twitter image
  manifest.ts        # PWA manifest
  robots.ts          # robots.txt
  sitemap.ts         # sitemap.xml
  api/contact/       # Contact form endpoint (Resend)
components/           # UI, layout, and section components
data/                 # Single source of truth (typed content)
  config.ts          # Site config, SEO keywords
  personal.ts        # Bio, socials, stats
  projects.ts        # Project list
  skills.ts          # Skills & tech stack
  experience.ts      # Experience timeline
public/assets/        # Images & project screenshots
```

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env.local   # add RESEND_API_KEY for the contact form

# 3. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `RESEND_API_KEY` | Yes (build & contact form) | API key from [Resend](https://resend.com) for sending email |

## Customizing

All content is in `data/`. To make this portfolio your own:

1. Update `data/config.ts` — name, title, description, domain, keywords
2. Update `data/personal.ts` — bio, socials, stats
3. Update `data/projects.ts`, `data/skills.ts`, `data/experience.ts`
4. Replace images in `public/assets/`
5. Set your Google verification code in `app/layout.tsx`

## Deployment

Deployed on **Vercel**. Push to `main` triggers an automatic production deploy. Set `RESEND_API_KEY` in the Vercel project's environment variables (required at build time).

## Connect

- 🌐 [jameshub.fun](https://jameshub.fun)
- 💼 [LinkedIn](https://linkedin.com/in/ulinuha)
- 🐙 [GitHub](https://github.com/Lin1er)

---

<div align="center">
<sub>Built with Next.js · Designed & developed by M. Ulinuha As Shiddiqy</sub>
</div>
