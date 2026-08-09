import type { Ecosystem } from './profile';
import type { Locale } from '@/i18n/config';

interface SkillGroup {
  ecosystem: Ecosystem;
  headline: Record<Locale, string>;
  items: readonly string[];
}

export const skills = [
  {
    ecosystem: 'laravel',
    headline: {
      es: 'Aplicaciones de gestión: inventario, ventas y finanzas.',
      en: 'Business applications: inventory, sales and finance.',
    },
    items: [
      'Laravel 12',
      'PHP 8.2',
      'Livewire 3',
      'Filament 3',
      'Blade',
      'MySQL 8',
      'Eloquent ORM',
    ],
  },
  {
    ecosystem: 'dotnet',
    headline: {
      es: 'Web y escritorio con patrones explícitos sobre datos relacionales.',
      en: 'Web and desktop with explicit patterns over relational data.',
    },
    items: [
      '.NET 8 / 10',
      'ASP.NET Core',
      'Blazor WebAssembly',
      'Entity Framework Core',
      'C#',
      'SQL Server',
      'Windows Forms',
    ],
  },
  {
    ecosystem: 'node',
    headline: {
      es: 'APIs tipadas y frontends con datos geoespaciales.',
      en: 'Typed APIs and frontends backed by geospatial data.',
    },
    items: [
      'TypeScript',
      'NestJS 11',
      'Express 5',
      'React 19',
      'Prisma',
      'PostgreSQL 17',
      'PostGIS',
    ],
  },
  {
    ecosystem: 'flutter',
    headline: {
      es: 'Aplicaciones móviles multiplataforma con backend gestionado.',
      en: 'Cross-platform mobile apps on a managed backend.',
    },
    items: ['Flutter 3.35', 'Dart 3.10', 'Firebase Auth', 'Cloud Firestore'],
  },
] as const satisfies readonly SkillGroup[];

export const practices = {
  es: [
    'Repository y Unit of Work',
    'Arquitectura modular',
    'Validación con esquemas',
    'Aplicaciones multilingües',
    'Control de versiones con Git',
  ],
  en: [
    'Repository and Unit of Work',
    'Modular architecture',
    'Schema-based validation',
    'Multilingual applications',
    'Version control with Git',
  ],
} satisfies Record<Locale, readonly string[]>;
