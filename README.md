# Korean GIM Database 🍙

Korean seaweed (김/gim) review database with filterable ratings.

**Live**: https://korean-gim-db.vercel.app/

## Tech Stack

- **Framework**: Astro 6 (static site, SSG)
- **Styling**: Tailwind CSS v4 (CSS-first via `@theme` block, no config file)
- **Typography**: Fraunces (serif headlines, en) + Inter (sans body, en) + Pretendard (sans, ko — system fallback for now)
- **i18n**: Astro built-in routing (`/` = en default, `/ko/` = Korean) + JSON dictionaries
- **Data**: Notion DB → Python sync → JSON → Astro build-time prerender
- **Deploy**: Vercel

## Features

- Filterable & sortable seaweed review table
- English (default) + Korean routes with URL-based language toggle
- Oiliness & saltiness ratings with visual bars (kelp / ocean gradients)
- Editor's Picks card grid above the database
- Cool ocean palette with kelp-green signature
- Purchase links to Coupang & Naver SmartStore

## How It Works

```
Notion DB → GitHub Actions (daily 9AM KST) → public/data.json → Vercel auto-redeploy
```

1. Seaweed data is managed in a Notion database
2. GitHub Actions runs `scripts/fetch_notion.py` daily to sync data to `public/data.json`
3. Astro reads `public/data.json` at build time and prerenders both `/` and `/ko/`
4. Vercel detects the commit and redeploys

### Notion DB columns

Required: `Name`, `Description`, `한줄평`, `총점`, `구매가격`, `구매링크`, `기름진 정도(0~10)`, `짠 정도(0~10)`, `김 종류`, `조리상태`, `등분 여부`.

For English-first content (Phase 2A+): add `Name_EN` (Text) and `Review_EN` (Text). When empty, the English page falls back to the Korean text.

## Local Development

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # production build to dist/
npm run preview   # preview production build
```

## Where to Edit

| What | Where |
|------|-------|
| Design tokens (colors, typography, radius, shadow) | `src/styles/global.css` (`@theme` block) |
| UI translations (labels, filters, table headers) | `src/i18n/locales/{en,ko}.json` |
| i18n helpers (`getLocaleFromUrl`, `useTranslations`, `localizedPath`) | `src/i18n/utils.ts` |
| Page composition | `src/pages/index.astro` (en), `src/pages/ko/index.astro` |
| Components | `src/components/*.astro` (Header, FilterBar, EditorsPicks, ReviewTable, Footer) |
| Reusable UI primitives | `src/components/ui/*.astro` (Button) |

## Manual Data Refresh

GitHub → Actions tab → "Update GIM Data from Notion" → "Run workflow"

Or locally:
```bash
NOTION_API_KEY=<key> NOTION_DATABASE_ID=<id> python3 scripts/fetch_notion.py
```

## Project Structure

```
├── .github/workflows/
│   └── update-data.yml         # Daily Notion sync
├── scripts/
│   └── fetch_notion.py         # Notion API → public/data.json
├── src/
│   ├── styles/global.css       # Tailwind import + @theme tokens
│   ├── layouts/Layout.astro    # Shared HTML shell
│   ├── components/             # Header, FilterBar, EditorsPicks, ReviewTable, Footer
│   ├── i18n/
│   │   ├── locales/{en,ko}.json
│   │   └── utils.ts
│   └── pages/
│       ├── index.astro         # English (default route)
│       └── ko/index.astro
├── public/
│   └── data.json               # Auto-generated from Notion
├── astro.config.mjs            # i18n + Tailwind Vite plugin
├── vercel.json
└── package.json
```

## Phase Status

See [`../docs/plans/00-overview.md`](../docs/plans/00-overview.md) for the full project phase plan.

- [x] Phase 1 — Astro migration (Vercel live)
- [x] Phase 2A — Tailwind + cool-ocean tokens + i18n foundation
- [ ] Phase 2B — TinaCMS + Content Collections
- [ ] Phase 2C — Core content pages (intro / types / buying guide / recipes)
- [ ] Phase 3 — Brand identity + custom domain + analytics
