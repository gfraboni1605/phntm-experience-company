# CLAUDE.md — Working on the PHNTM site

Guidance for Claude Code and other Claude agents working in this repository.

This file mirrors [AGENTS.md](AGENTS.md). Keep them in sync when project conventions change.

Humans: see [README.md](README.md) for setup and overview. This file is the **agent contract** — follow it unless the user explicitly overrides it.

---

## What this project is

- **Product:** Marketing / portfolio site for PHNTM (`https://www.phntm.com`).
- **Stack:** Next.js App Router, React 19, TypeScript.
- **Hosting:** **Vercel**, connected to **this GitHub repo**.
- **Deploy model:** Pushing to GitHub triggers Vercel builds. There is no separate deploy step agents must run.
  - `main` → production
  - other branches / PRs → Vercel preview deployments

Agents should assume **every commit that lands on a remote branch may ship to the internet**.

---

## How to work (workflow)

1. Prefer a **feature branch** for non-trivial changes. Do not push experimental work straight to `main` unless the user asks.
2. Make **small, focused diffs**. Match existing patterns in `app/`, `components/`, `data/`, and `lib/`.
3. **Do not commit** unless the user asks. When committing, use a clear message; never use `--no-verify` or rewrite shared history unless requested.
4. **Do not push** unless the user asks. Pushing can trigger a Vercel deploy.
5. After UI or route changes, prefer verifying with `npm run build` (or at least `npm run lint`) when practical.
6. Read nearby files before editing. Do not invent parallel abstractions when helpers already exist.

---

## Source of truth (edit here, not elsewhere)

| Concern | Location |
|---------|----------|
| Case studies / project content | [`data/projects.ts`](data/projects.ts) |
| URL paths for work | [`lib/paths.ts`](lib/paths.ts) — `projectPath()`, `scalePath()` |
| Shared case study page + metadata | [`lib/project-page.tsx`](lib/project-page.tsx) |
| GA helpers | [`lib/analytics.ts`](lib/analytics.ts) |
| Routes / pages | [`app/`](app/) |
| UI components | [`components/`](components/) |
| Static media | [`public/`](public/) (brand + photos) |
| Redirects | [`next.config.ts`](next.config.ts) |
| Sitemap / robots | [`app/sitemap.ts`](app/sitemap.ts), [`app/robots.ts`](app/robots.ts) |

**Do not** hardcode `/work/{slug}` or `/work?scale=` links. Use `projectPath` / `scalePath`.

**Do not** duplicate case study page logic under each scale route — use `lib/project-page.tsx`.

**Do not** treat `case study assets/` or `case study html/` as the live asset pipeline unless the user says otherwise. Served media lives under `public/`.

---

## URL / SEO rules

Canonical work tree:

```text
/work
/moments · /moments/[slug]
/platforms · /platforms/[slug]
/venues · /venues/[slug]
```

- Wrong-scale slugs must 404 (e.g. a platforms project under `/moments/...`).
- Keep redirects for legacy `/work/[slug]` and `/work?scale=*`.
- Preserve metadata: titles, descriptions, canonicals, Open Graph, JSON-LD.
- Update `app/sitemap.ts` when adding public routes or projects (sitemap is driven by `projects` data for case studies).

---

## Environment & secrets (Vercel + local)

| Variable | Where to set |
|----------|----------------|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Vercel project env (production/preview as needed); optionally `.env.local` for local |

Agent rules:

- **Never commit** `.env`, `.env.local`, API keys, tokens, or Measurement IDs.
- **Never print** secrets into chat logs, commits, or README examples beyond placeholders like `G-XXXXXXXXXX`.
- Keep [`.env.example`](.env.example) as the only committed env documentation.
- Changing env vars for production is done in the **Vercel dashboard** (or Vercel CLI by a human) — not by committing files.
- If GA is unset, the site must still build and run; analytics simply no-ops.

---

## What must never be committed

From [`.gitignore`](.gitignore) — enforce this:

- `.next/` (Next build/cache — can exceed GitHub’s 100MB file limit)
- `node_modules/`
- `.vercel/`
- `.env` / `.env.*` (except `.env.example`)
- OS / editor junk (`.DS_Store`, `.cursor/` is ignored here)

If build artifacts were accidentally staged: unstage with `git rm -r --cached`, fix `.gitignore`, and **do not** leave large cache files in commit history on branches that will be pushed.

---

## Design / frontend expectations

- This is a **branded marketing site**, not a dashboard. Preserve existing visual language (typography, CSS variables, layout patterns in `app/globals.css`).
- Prefer extending existing components (`WorkCard`, `CaseStudy`, `Header`, `ScaleIndexPage`) over new one-off layouts.
- Keep motion intentional; respect reduced-motion paths already in the codebase where present.
- Images today are largely `<img>` tags; do not mass-migrate to `next/image` unless asked.
- Avoid drive-by refactors, unrelated file renames, or “cleanup” outside the requested task.

---

## Vercel-specific agent behavior

Because deploy is GitHub-driven:

1. **Merging to `main` = production.** Treat main as protected product surface.
2. Prefer PRs for reviewable changes so Vercel preview URLs can be checked.
3. Build failures on Vercel usually mean TypeScript/build errors — fix those locally with `npm run build` before asking the user to merge.
4. Do not assume access to the Vercel dashboard, production logs, or env UI unless the user provides them.
5. Do not add Vercel config files or change hosting setup unless requested.
6. Preview deployments may or may not include GA depending on Vercel env settings — do not “fix” missing GA in preview by hardcoding IDs.

---

## Common tasks (cheat sheet)

**Add / edit a case study**  
→ Update `data/projects.ts` (slug, scale, content, images under `public/`). Paths and sitemap follow automatically if you use existing helpers.

**Change nav or scale links**  
→ `components/Header.tsx`, `MobileNav.tsx`, and any homepage/about scale rows — always via `scalePath` / `projectPath`.

**Analytics changes**  
→ `components/GoogleAnalytics.tsx` + `lib/analytics.ts`. Keep App Router route-change pageviews working.

**New top-level page**  
→ Add `app/<route>/page.tsx` with metadata + canonical; add to sitemap; link from nav only if appropriate.

---

## Definition of done (for agents)

Before considering a task finished:

- [ ] Change matches existing structure and helpers
- [ ] No secrets or `.next` in the diff
- [ ] Internal links use scale-based URLs
- [ ] Metadata / redirects still make sense for SEO
- [ ] Build is not knowingly broken
- [ ] No unsolicited commit or push

When unsure, ask the user — especially for production deploys, content tone, or legal/privacy changes.
