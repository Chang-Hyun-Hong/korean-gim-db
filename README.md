# 맛있는 김 DB 🍙

Korean seaweed (김/gim) review database with filterable ratings.

**Live Site: https://chang-hyun-hong.github.io/korean-gim-db/**

## Features

- Filterable & sortable seaweed review table
- Korean / English language toggle
- Oiliness & saltiness ratings with visual bars
- Purchase links to Coupang & Naver SmartStore

## How It Works

```
Notion DB → GitHub Actions (daily 9AM KST) → GitHub Pages
```

1. Seaweed data is managed in a Notion database
2. GitHub Actions runs `scripts/fetch_notion.py` daily to sync data
3. Site reads from `site/data.json` and is deployed via GitHub Pages

## Manual Data Refresh

Go to [Actions tab](https://github.com/Chang-Hyun-Hong/korean-gim-db/actions) → "Update GIM Data from Notion" → "Run workflow"

## Project Structure

```
├── .github/workflows/
│   └── update-data.yml      # Daily Notion sync + deploy
├── scripts/
│   └── fetch_notion.py      # Notion API → data.json
├── site/
│   ├── index.html            # Main website
│   └── data.json             # Auto-generated data
└── requirements.txt
```
