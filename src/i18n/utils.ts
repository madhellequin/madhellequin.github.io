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

export { languages, defaultLang };
