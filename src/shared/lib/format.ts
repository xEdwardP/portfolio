import type { Locale } from '@/i18n/config';

const bcp47: Record<Locale, string> = { es: 'es-HN', en: 'en-US' };

export function formatDate(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(bcp47[locale], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function isoDate(date: Date): string {
  return date.toISOString().split('T')[0];
}
