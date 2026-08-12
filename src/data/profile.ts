import {
  PUBLIC_CONTACT_EMAIL,
  PUBLIC_GITHUB_URL,
  PUBLIC_LINKEDIN_URL,
} from 'astro:env/client';
import type { Locale } from '@/i18n/config';

export const profile = {
  name: 'Edward Javier Pineda Moran',
  shortName: 'Edward Pineda',
  username: 'xEdwardP',
  role: {
    es: 'Ingeniero en Ciencias de la Computación',
    en: 'Full Stack Developer',
  } satisfies Record<Locale, string>,
  location: 'Honduras',
  email: PUBLIC_CONTACT_EMAIL,
  github: PUBLIC_GITHUB_URL,
  linkedin: PUBLIC_LINKEDIN_URL,
  cv: {
    es: '/cv/edward-pineda-cv-es.pdf',
    en: '/cv/edward-pineda-cv-en.pdf',
  } satisfies Record<Locale, string>,
} as const;

export const education = [
  {
    institution: 'Universidad Católica de Honduras',
    period: { es: '2023 a 2027', en: '2023 to 2027' },
    degree: {
      es: 'Ingeniería en Ciencias de la Computación',
      en: 'B.Sc. in Computer Science',
    },
  },
  {
    institution: 'Centro Gubernamental Álvaro Contreras',
    period: { es: '2020 a 2022', en: '2020 to 2022' },
    degree: {
      es: 'Bachillerato Técnico Profesional en Informática',
      en: 'Technical High School Diploma in Computing',
    },
  },
] as const satisfies readonly {
  institution: string;
  period: Record<Locale, string>;
  degree: Record<Locale, string>;
}[];

export const ecosystems = [
  {
    id: 'laravel',
    label: 'Laravel',
    icon: 'simple-icons:laravel',
    color: 'text-laravel',
    bar: 'bg-laravel',
    tint: 'from-laravel/20',
  },
  {
    id: 'dotnet',
    label: '.NET',
    icon: 'simple-icons:dotnet',
    color: 'text-dotnet',
    bar: 'bg-dotnet',
    tint: 'from-dotnet/20',
  },
  {
    id: 'node',
    label: 'TypeScript',
    icon: 'simple-icons:typescript',
    color: 'text-node',
    bar: 'bg-node',
    tint: 'from-node/20',
  },
  {
    id: 'flutter',
    label: 'Flutter',
    icon: 'simple-icons:flutter',
    color: 'text-flutter',
    bar: 'bg-flutter',
    tint: 'from-flutter/20',
  },
] as const;

export type Ecosystem = (typeof ecosystems)[number]['id'];
