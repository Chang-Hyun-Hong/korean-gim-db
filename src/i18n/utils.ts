import en from './locales/en.json';
import ko from './locales/ko.json';

const dictionaries = { en, ko } as const;
export type Locale = keyof typeof dictionaries;

export function getLocaleFromUrl(url: URL): Locale {
  const [, segment] = url.pathname.split('/');
  return segment === 'ko' ? 'ko' : 'en';
}

export function useTranslations(locale: Locale) {
  const dict = dictionaries[locale];
  return function t(key: string): string {
    const value = key.split('.').reduce<unknown>((acc, k) => {
      if (acc && typeof acc === 'object' && k in (acc as Record<string, unknown>)) {
        return (acc as Record<string, unknown>)[k];
      }
      return undefined;
    }, dict);
    return typeof value === 'string' ? value : key;
  };
}

export function localizedPath(locale: Locale, path: string): string {
  if (locale === 'en') return path;
  return `/ko${path === '/' ? '' : path}`;
}
