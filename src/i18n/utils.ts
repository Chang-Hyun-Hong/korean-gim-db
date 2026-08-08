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
  /**
   * 사전에서 key를 찾는다.
   * 못 찾으면 fallback을 쓰고, fallback도 없을 때만 key 문자열을 그대로 돌려준다.
   * (Notion에서 새 김 종류가 들어와도 화면에 "type_labels.김자반"이 노출되지 않게 하기 위함)
   */
  return function t(key: string, fallback?: string): string {
    const value = key.split('.').reduce<unknown>((acc, k) => {
      if (acc && typeof acc === 'object' && k in (acc as Record<string, unknown>)) {
        return (acc as Record<string, unknown>)[k];
      }
      return undefined;
    }, dict);
    if (typeof value === 'string') return value;
    return fallback ?? key;
  };
}

export function localizedPath(locale: Locale, path: string): string {
  if (locale === 'en') return path;
  return `/ko${path === '/' ? '' : path}`;
}
