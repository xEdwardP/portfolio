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

export const experience = [
  {
    company: 'Sistemas de Honduras',
    period: { es: 'Junio 2022', en: 'June 2022' },
    role: {
      es: 'Práctica profesional en Desarrollo de Software',
      en: 'Software Development Internship',
    },
    highlights: {
      es: [
        'Desarrollo de un sistema de escritorio en .NET Framework para la gestión académica de instituciones educativas.',
        'Módulos de matrícula, boletas de calificaciones y coordinación estudiantil.',
        'Generación e impresión automatizada de documentos académicos.',
        'Sistema entregado y adoptado en producción por la institución educativa.',
      ],
      en: [
        'Desktop system built in .NET Framework for academic management at educational institutions.',
        'Enrollment, report card and student coordination modules.',
        'Automated generation and printing of academic documents.',
        'System delivered and adopted in production by the institution.',
      ],
    },
  },
] as const satisfies readonly {
  company: string;
  period: Record<Locale, string>;
  role: Record<Locale, string>;
  highlights: Record<Locale, readonly string[]>;
}[];

export const education = [
  {
    institution: 'Universidad Católica de Honduras',
    period: { es: '2027', en: '2027' },
    degree: {
      es: 'Diplomado en Gestión de la Calidad Total',
      en: 'Diploma in Total Quality Management',
    },
  },
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
    color: 'text-laravel-text',
    bar: 'bg-laravel',
    tint: 'from-laravel/20',
    edge: 'hover:border-laravel/60 focus-within:border-laravel/60',
  },
  {
    id: 'dotnet',
    label: '.NET',
    icon: 'simple-icons:dotnet',
    color: 'text-dotnet-text',
    bar: 'bg-dotnet',
    tint: 'from-dotnet/20',
    edge: 'hover:border-dotnet/60 focus-within:border-dotnet/60',
  },
  {
    id: 'node',
    label: 'Node.js',
    icon: 'simple-icons:nodedotjs',
    color: 'text-node-text',
    bar: 'bg-node',
    tint: 'from-node/20',
    edge: 'hover:border-node/60 focus-within:border-node/60',
  },
  {
    id: 'flutter',
    label: 'Flutter',
    icon: 'simple-icons:flutter',
    color: 'text-flutter-text',
    bar: 'bg-flutter',
    tint: 'from-flutter/20',
    edge: 'hover:border-flutter/60 focus-within:border-flutter/60',
  },
] as const;

export type Ecosystem = (typeof ecosystems)[number]['id'];
