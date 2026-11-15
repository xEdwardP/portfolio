import type { Locale } from '@/i18n/config';

export const tags = {
  architecture: { es: 'Arquitectura', en: 'Architecture' },
  resilience: { es: 'Resiliencia', en: 'Resilience' },
  patterns: { es: 'Patrones', en: 'Patterns' },
  postgis: { es: 'PostGIS', en: 'PostGIS' },
  laravel: { es: 'Laravel', en: 'Laravel' },
  dotnet: { es: '.NET', en: '.NET' },
  flutter: { es: 'Flutter', en: 'Flutter' },
  typescript: { es: 'TypeScript', en: 'TypeScript' },
  astro: { es: 'Astro', en: 'Astro' },
  testing: { es: 'Pruebas', en: 'Testing' },
  cybersecurity: { es: 'Ciberseguridad', en: 'Cybersecurity' },
  tryhackme: { es: 'TryHackMe', en: 'TryHackMe' },
  web: { es: 'Seguridad web', en: 'Web security' },
  privesc: { es: 'Escalada de privilegios', en: 'Privilege escalation' },
  cryptography: { es: 'Criptografía', en: 'Cryptography' },
  reversing: { es: 'Ingeniería inversa', en: 'Reverse engineering' },
  tooling: { es: 'Herramientas', en: 'Tooling' },
} as const satisfies Record<string, Record<Locale, string>>;

export type TagId = keyof typeof tags;

export const tagIds = Object.keys(tags) as [TagId, ...TagId[]];

export function tagLabel(id: TagId, locale: Locale): string {
  return tags[id][locale];
}
