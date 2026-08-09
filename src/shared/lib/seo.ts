import { education, profile } from '@/data/profile';
import type { Locale } from '@/i18n/config';

export function personSchema(locale: Locale, site: URL | string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    alternateName: profile.username,
    url: new URL(`/${locale}/`, site).href,
    jobTitle: profile.role[locale],
    email: `mailto:${profile.email}`,
    sameAs: [profile.github, profile.linkedin],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: education[0].institution,
    },
    knowsAbout: ['Laravel', 'ASP.NET Core', 'TypeScript', 'Flutter'],
  };
}
