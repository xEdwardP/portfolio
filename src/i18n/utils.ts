import { defaultLocale, isLocale, locales, type Locale } from './config';
import { ui, type UiKey } from './ui';

export function getLocaleFromPath(pathname: string): Locale {
  const segment = pathname.split('/').filter(Boolean)[0] ?? '';
  return isLocale(segment) ? segment : defaultLocale;
}

export function useTranslations(locale: Locale) {
  return function t(key: UiKey): string {
    return ui[locale][key];
  };
}

export function stripLocale(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length && isLocale(segments[0])) segments.shift();
  return segments.length ? `/${segments.join('/')}` : '';
}

export function localizePath(path: string, locale: Locale): string {
  const clean = path.replace(/^\/+|\/+$/g, '');
  return clean ? `/${locale}/${clean}/` : `/${locale}/`;
}

export function switchLocalePath(pathname: string, target: Locale): string {
  return localizePath(stripLocale(pathname), target);
}

export function getAlternates(pathname: string, site: URL | string) {
  const route = stripLocale(pathname);
  const alternates = locales.map((locale) => ({
    locale,
    href: new URL(localizePath(route, locale), site).href,
  }));

  return [
    ...alternates,
    {
      locale: 'x-default',
      href: new URL(localizePath(route, defaultLocale), site).href,
    },
  ];
}

export function otherLocale(locale: Locale): Locale {
  return locale === 'es' ? 'en' : 'es';
}
