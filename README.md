# PHNTM Experience Company

Marketing site for [PHNTM](https://www.phntm.com) — an experience company that designs, builds, and runs live moments, platforms, and venues.

Built with **Next.js** (App Router), **React**, and **TypeScript**. Deployed on Vercel via this GitHub repo.

For coding agents (Claude, Cursor, etc.), see **[AGENTS.md](AGENTS.md)**.

## Routes

| Path | Description |
|------|-------------|
| `/` | Home |
| `/about` | About |
| `/contact` | Contact |
| `/work` | All work |
| `/moments`, `/platforms`, `/venues` | Work by scale |
| `/moments/[slug]`, `/platforms/[slug]`, `/venues/[slug]` | Case studies |
| `/sitemap.xml`, `/robots.txt` | SEO |

Legacy `/work/[slug]` and `/work?scale=*` URLs redirect permanently to the scale-based paths.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # serve production build
npm run lint    # lint
```

## Environment variables

Copy `.env.example` to `.env.local` (or `.env`) for local use:

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | No | Google Analytics 4 Measurement ID. If unset, GA scripts are not loaded. |

For production, set the same variable in **Vercel → Project → Settings → Environment Variables**, then redeploy.

## Project structure

```text
app/           # App Router pages (home, about, contact, work, scales)
components/    # UI (header, case studies, analytics, etc.)
data/          # Project / case study content (`projects.ts`)
lib/           # Path helpers, GA helpers, shared project page logic
public/        # Static assets (brand, photos)
```

Case study content and metadata live in `data/projects.ts`. URL helpers are in `lib/paths.ts`.

## SEO & analytics

- Per-page metadata, canonicals, Open Graph / Twitter tags
- JSON-LD (Organization, WebSite, case study breadcrumbs)
- Sitemap and robots via `app/sitemap.ts` and `app/robots.ts`
- GA4 via `components/GoogleAnalytics.tsx` (App Router pageviews)

## Notes

- `.next/` and env files are gitignored — do not commit build cache or secrets.
- Prefer editing content in `data/projects.ts` rather than hardcoding project lists in pages.
