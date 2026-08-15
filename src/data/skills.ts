import type { Ecosystem } from './profile';
import type { Locale } from '@/i18n/config';
import type { UiKey } from '@/i18n/ui';

interface SkillGroup {
  ecosystem: Ecosystem;
  headline: Record<Locale, string>;
  items: readonly string[];
}

interface ToolGroup {
  label: UiKey;
  items: readonly string[];
}

interface SpokenLanguage {
  name: Record<Locale, string>;
  level: Record<Locale, string>;
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
      'Eloquent ORM',
      'MySQL 8',
      'Bootstrap 5',
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
      'xUnit',
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
      'React Native',
      'Expo',
      'Prisma',
      'PostgreSQL 17',
      'PostGIS',
      'Astro',
    ],
  },
  {
    ecosystem: 'flutter',
    headline: {
      es: 'Aplicaciones móviles multiplataforma con backend gestionado.',
      en: 'Cross-platform mobile apps on a managed backend.',
    },
    items: [
      'Flutter 3.35',
      'Dart 3.10',
      'Firebase Auth',
      'Cloud Firestore',
      'Firebase Storage',
      'Google ML Kit',
    ],
  },
] as const satisfies readonly SkillGroup[];

export const toolbox = [
  {
    label: 'skills.languages',
    items: ['TypeScript', 'JavaScript', 'C#', 'PHP', 'Dart', 'Python', 'SQL'],
  },
  {
    label: 'skills.interface',
    items: ['HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap 5'],
  },
  {
    label: 'skills.data',
    items: ['PostgreSQL', 'PostGIS', 'SQL Server', 'MySQL', 'Cloud Firestore'],
  },
  {
    label: 'skills.tooling',
    items: ['Git', 'Docker', 'Postman', 'Vite', 'Power BI'],
  },
  {
    label: 'skills.systems',
    items: ['Linux', 'TCP/IP', 'LAN/WAN'],
  },
] as const satisfies readonly ToolGroup[];

export const softSkills = {
  es: [
    'Comunicación efectiva',
    'Trabajo en equipo',
    'Documentación técnica',
    'Resolución de problemas',
    'Aprendizaje autónomo',
    'Atención al detalle',
  ],
  en: [
    'Effective communication',
    'Teamwork',
    'Technical documentation',
    'Problem solving',
    'Self directed learning',
    'Attention to detail',
  ],
} satisfies Record<Locale, readonly string[]>;

export const spokenLanguages = [
  {
    name: { es: 'Español', en: 'Spanish' },
    level: { es: 'Nativo', en: 'Native' },
  },
  {
    name: { es: 'Inglés', en: 'English' },
    level: { es: 'Intermedio', en: 'Intermediate' },
  },
] as const satisfies readonly SpokenLanguage[];

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
