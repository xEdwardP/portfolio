import type { Locale } from '@/i18n/config';

export const profile = {
  name: 'Edward P.',
  username: 'xEdwardP',
  role: {
    es: 'Desarrollador Fullstack y Mobile',
    en: 'Fullstack & Mobile Developer',
  } satisfies Record<Locale, string>,
  location: 'Honduras',
  github: 'https://github.com/xEdwardP',
} as const;

export const ecosystems = [
  {
    id: 'laravel',
    label: 'Laravel',
    icon: 'simple-icons:laravel',
    color: 'text-laravel',
  },
  { id: 'dotnet', label: '.NET', icon: 'simple-icons:dotnet', color: 'text-dotnet' },
  {
    id: 'node',
    label: 'TypeScript',
    icon: 'simple-icons:typescript',
    color: 'text-node',
  },
  {
    id: 'flutter',
    label: 'Flutter',
    icon: 'simple-icons:flutter',
    color: 'text-flutter',
  },
] as const;

export type Ecosystem = (typeof ecosystems)[number]['id'];
