import { ui, defaultLang, languages } from './ui';

export type Lang = keyof typeof ui;

export function isLang(value: string): value is Lang {
  return value in ui;
}

export function getLangFromUrl(url: URL): Lang {
  const [, maybeLang] = url.pathname.split('/');
  if (maybeLang && isLang(maybeLang)) return maybeLang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

export function getLocalizedPath(lang: Lang, path: string): string {
  return `/${lang}${path.startsWith('/') ? path : `/${path}`}`;
}

export const LANG_STORAGE_KEY = 'preferredLang';

export const allLangs = Object.keys(languages) as Lang[];

// Picks which translation to show by default when a reader's site
// language has no translation of a given post/story: their own
// language, then Ukrainian, then whatever exists.
export function resolveContentLang(siteLang: Lang, availableLangs: Lang[]): Lang {
  if (availableLangs.includes(siteLang)) return siteLang;
  if (availableLangs.includes('uk')) return 'uk';
  return availableLangs[0];
}

export { languages, defaultLang };
