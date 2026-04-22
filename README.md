# 맛있는 김 DB 🍙

Korean seaweed (김/gim) review database with filterable ratings.

**Live (Phase 1 — Astro on Vercel)**: https://korean-gim-db-git-feature-astr-91dada-chang-hyun-hongs-projects.vercel.app/
**Legacy (GitHub Pages)**: https://chang-hyun-hong.github.io/korean-gim-db/ (Phase 1 완료 후 archive 예정)

## Features

- Filterable & sortable seaweed review table
- Korean / English language toggle
- Oiliness & saltiness ratings with visual bars
- Purchase links to Coupang & Naver SmartStore

## How It Works

```
Notion DB → GitHub Actions (daily 9AM KST) → public/data.json → Vercel auto-redeploy
```

1. Seaweed data is managed in a Notion database
2. GitHub Actions runs `scripts/fetch_notion.py` daily to sync data to `public/data.json`
3. Vercel detects the commit and redeploys the Astro site

## Local Development

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # production build to dist/
npm run preview   # preview production build
```

## Manual Data Refresh

GitHub → Actions tab → "Update GIM Data from Notion" → "Run workflow"

## Project Structure

```
├── .github/workflows/
│   └── update-data.yml      # Daily Notion sync
├── scripts/
│   └── fetch_notion.py      # Notion API → public/data.json
├── src/
│   ├── pages/index.astro    # Main page
│   └── data/translations.ts # i18n + EN translation maps
├── public/
│   └── data.json            # Auto-generated (Notion output)
├── astro.config.mjs
├── vercel.json
└── package.json
```

## Phase Status

See [`../.omc/plans/00-overview.md`](../.omc/plans/00-overview.md) for full project phase plan.

- [x] Phase 1 — Astro migration
- [ ] Phase 2 — Content sections (About/Guides/Blog) + TinaCMS admin
- [ ] Phase 3 — Custom domain, image optimization, English-first
