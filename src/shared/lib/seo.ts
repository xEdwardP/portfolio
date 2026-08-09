import { profile } from '@/data/profile';
import type { Locale } from '@/i18n/config';

export function personSchema(locale: Locale, site: URL | string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    alternateName: profile.username,
    url: new URL(`/${locale}/`, site).href,
    jobTitle: profile.role[locale],
    sameAs: [profile.github],
    knowsAbout: ['Laravel', 'ASP.NET Core', 'TypeScript', 'Flutter'],
  };
}
