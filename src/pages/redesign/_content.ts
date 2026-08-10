/**
 * Shared content for the design bake-off variants (/redesign/a, /b, /c).
 *
 * The whole point of the bake-off is that the three variants differ ONLY in
 * visual treatment — same copy, same data, same section order. Anything that
 * differs between variants belongs in the variant page, not here.
 *
 * Throwaway: delete this folder once a direction is picked.
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export interface Pick {
  name: string;
  name_en: string;
  type: string;
  cook: string;
  oil: number;
  salt: number;
  scoreNum: number;
  price: string;
  review: string;
  review_en: string;
  desc: string;
  link: string;
}

function readRows(): Pick[] {
  const dataPath = resolve(process.cwd(), 'public/data.json');
  return JSON.parse(readFileSync(dataPath, 'utf-8'));
}

/**
 * Top three by score. The section calls them picks and says "worth trying
 * first", so they have to be the best-rated — the real home page still takes
 * the first three in database order (index.astro), which surfaces 2/5 and 1/5
 * products as recommendations. Ties keep database order (sort is stable).
 */
export function getPicks(): Pick[] {
  return readRows()
    .sort((a, b) => b.scoreNum - a.scoreNum)
    .slice(0, 3);
}

/** Derived so the numbers on the page can't drift from the data. */
export function getTotals(): { reviews: number; types: number } {
  const rows = readRows();
  return {
    reviews: rows.length,
    types: new Set(rows.map(r => r.type)).size,
  };
}

/**
 * name_en and review_en are empty for all 17 rows today (blocked on Notion), so
 * both fall back to Korean. Callers need to know *which* language came back so
 * they can mark it up — hence `isKoFallback`, used to set lang="ko".
 */
export function displayName(p: Pick): string {
  return p.name_en || p.name;
}

export function displayReview(p: Pick): string {
  return p.review_en || p.review;
}

export function isKoFallback(en: string): boolean {
  return !en?.trim();
}

export const TYPE_LABELS: Record<string, string> = {
  재래김: 'Traditional',
  돌김: 'Stone Laver',
  파래김: 'Green Laver',
};

export const COOK_LABELS: Record<string, string> = {
  조미김: 'Seasoned',
  무조미김: 'Unseasoned',
};

export const content = {
  hero: {
    eyebrow: 'Korean GIM',
    title: 'Find your perfect gim.',
    subtitle:
      "An English-friendly guide to Korea's beloved seaweed — types, how to buy, recipes, and honest reviews.",
    primaryCta: { label: 'What is gim?', href: '/what-is-gim' },
    secondaryCta: { label: 'How to buy', href: '/buying-guide' },
  },

  highlights: {
    heading: 'Why this site',
    items: [
      {
        keyword: 'Plain-spoken.',
        copy: 'No marketing fluff — just what gim is, what to buy, and how to eat it.',
      },
      {
        keyword: 'Tasted firsthand.',
        copy: 'Every review is a product I actually opened, ate, and rated.',
      },
      {
        keyword: 'Beginner-friendly.',
        copy: 'Built for English speakers new to gim — labels, types, and simple recipes explained.',
      },
    ],
  },

  picks: {
    heading: "Editor's picks",
    sub: 'A handful of gim worth trying first.',
    cta: { label: 'See all reviews', href: '/reviews' },
  },

  about: {
    eyebrow: 'About',
    heading: "Korea's everyday seaweed, finally explained in English.",
    copy: 'Gim has been part of Korean tables for centuries — but most English guides skim the surface. This site goes deeper, in plain language.',
    cta: { label: 'Read the intro', href: '/what-is-gim' },
  },

  finalCta: {
    heading: 'Start with the buying guide.',
    sub: 'Two minutes — saves a lot of supermarket guesswork.',
    button: { label: 'Open the buying guide', href: '/buying-guide' },
  },
};
