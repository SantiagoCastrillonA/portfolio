import { defaultLang, type Lang, languages, type UIKey, ui } from './ui';

export function isLang(value: unknown): value is Lang {
  return typeof value === 'string' && value in languages;
}

export function getLang(currentLocale: string | undefined): Lang {
  return isLang(currentLocale) ? currentLocale : defaultLang;
}

export function useTranslations(lang: Lang) {
  return (key: UIKey) => ui[lang][key];
}

/** Home path for a locale: "/" for the default one, "/en/" for the rest. */
export function homePath(lang: Lang): string {
  return lang === defaultLang ? '/' : `/${lang}/`;
}

export function otherLang(lang: Lang): Lang {
  return lang === 'es' ? 'en' : 'es';
}

export function cvPath(lang: Lang): string {
  return `/cv/santiago-castrillon-${lang}.pdf`;
}
