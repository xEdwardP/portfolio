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

interface AdditionalSkillGroup extends ToolGroup {
  headline: Record<Locale, string>;
}

interface SpokenLanguage {
  name: Record<Locale, string>;
  level: Record<Locale, string>;
}

export const skills = [
  {
    ecosystem: 'laravel',
    headline: {
      es: 'Aplicaciones de gestión, paneles administrativos y procesos en segundo plano.',
      en: 'Business applications, admin panels and background processing.',
    },
    items: [
      'Laravel 12 / 13',
      'PHP 8.2 / 8.5',
      'Livewire 3 / 4',
      'Filament 3',
      'Blade',
      'Eloquent ORM',
      'MySQL 8 / 8.4',
      'Bootstrap 5',
      'Alpine.js',
      'Tailwind CSS 4',
      'Laravel Fortify',
      'Spatie Permission',
      'Livewire Flux',
      'Laravel Sail',
      'Pest',
      'Laravel Pint',
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
      '.NET Framework',
      'C#',
      'ASP.NET Core',
      'Blazor WebAssembly',
      'Entity Framework Core 8 / 10',
      'SQL Server',
      'WPF',
      'Windows Forms',
      'ADO.NET',
      'ASP.NET Core Identity',
      'MudBlazor',
      'QuestPDF',
      'ClosedXML',
      'MailKit',
      'xUnit',
      'MSTest',
      'Moq',
    ],
  },
  {
    ecosystem: 'node',
    headline: {
      es: 'APIs con Express y NestJS, y aplicaciones web y móviles en React.',
      en: 'APIs with Express and NestJS, plus web and mobile apps in React.',
    },
    items: [
      'TypeScript 5 / 6',
      'NestJS 11',
      'Express 5',
      'React 19',
      'React Native 0.81',
      'Expo SDK 54',
      'Expo Router 6',
      'React Navigation 7',
      'Prisma 7',
      'PostgreSQL 17 / 18',
      'PostGIS 3.5',
      'Socket.io',
      'Passport / JWT',
      'Zod',
      'class-validator',
      'Axios',
      'Jest 30',
      'Vitest',
      'Supertest',
    ],
  },
  {
    ecosystem: 'flutter',
    headline: {
      es: 'Aplicaciones móviles multiplataforma con backend gestionado.',
      en: 'Cross-platform mobile apps on a managed backend.',
    },
    items: [
      'Flutter 3',
      'Dart 3.10',
      'Firebase Auth',
      'Cloud Firestore',
      'Firebase Storage',
      'Google ML Kit',
      'Provider',
      'Google Sign-In',
      'Image Picker',
      'intl',
      'Flutter Test',
      'Flutter Lints',
    ],
  },
] as const satisfies readonly SkillGroup[];

export const additionalSkills = [
  {
    label: 'skills.webStack',
    headline: {
      es: 'Interfaces web, sitios estáticos y aplicaciones con renderizado en servidor.',
      en: 'Web interfaces, static sites and applications with server-side rendering.',
    },
    items: [
      'React 19',
      'Next.js 16.2',
      'Angular 21.2',
      'Astro 7',
      'TypeScript 5 / 6',
      'RxJS 7.8',
      'React Router 7',
      'TanStack Query',
      'Zustand',
      'Auth.js / NextAuth',
      'Tailwind CSS 4',
      'Bootstrap 5',
      'Vite 8',
    ],
  },
  {
    label: 'skills.androidStack',
    headline: {
      es: 'Aplicaciones Android nativas con Kotlin, vistas XML y componentes de AndroidX.',
      en: 'Native Android applications with Kotlin, XML views and AndroidX components.',
    },
    items: [
      'Kotlin 2.0',
      'Android SDK 35',
      'AndroidX',
      'View Binding',
      'XML Layouts',
      'Material Components',
      'ConstraintLayout',
      'ViewPager2',
      'Gradle Kotlin DSL',
      'JUnit',
      'Espresso',
    ],
  },
] as const satisfies readonly AdditionalSkillGroup[];

export const toolbox = [
  {
    label: 'skills.languages',
    items: [
      'TypeScript',
      'JavaScript',
      'C#',
      'PHP',
      'Dart',
      'Kotlin',
      'Visual Basic .NET',
      'Python',
      'SQL',
    ],
  },
  {
    label: 'skills.interface',
    items: ['HTML5', 'CSS3', 'Tailwind CSS 4', 'Bootstrap 5', 'Alpine.js', 'Sass'],
  },
  {
    label: 'skills.data',
    items: [
      'PostgreSQL 17 / 18',
      'PostGIS 3.5',
      'SQL Server',
      'MySQL 8 / 8.4',
      'SQLite',
      'Cloud Firestore',
      'Supabase',
    ],
  },
  {
    label: 'skills.tooling',
    items: [
      'Git',
      'GitHub Actions',
      'Docker',
      'Docker Compose',
      'Postman',
      'Vite 8',
      'npm',
      'Composer',
      'Gradle',
      'ESLint',
      'Prettier',
      'Power BI',
    ],
  },
  {
    label: 'skills.integrations',
    items: [
      'Firebase',
      'Supabase',
      'Cloudinary',
      'Azure Blob Storage',
      'Google Maps',
      'Google Calendar / Meet',
      'PayPal',
      'Resend',
      'SMTP',
      'OpenAI API',
      'Gemini API',
    ],
  },
  {
    label: 'skills.testing',
    items: [
      'Vitest',
      'Jest',
      'Supertest',
      'Pest',
      'xUnit',
      'MSTest',
      'Moq',
      'JUnit',
      'Espresso',
      'Flutter Test',
    ],
  },
  {
    label: 'skills.systems',
    items: ['Linux', 'WSL2', 'TCP/IP', 'LAN/WAN'],
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
    'Inyección de dependencias',
    'Arquitectura en capas',
    'MVVM',
    'Transacciones de base de datos',
    'APIs REST',
    'Autenticación y permisos por rol',
    'Pruebas unitarias y de integración',
    'Procesamiento en segundo plano',
  ],
  en: [
    'Repository and Unit of Work',
    'Modular architecture',
    'Schema-based validation',
    'Multilingual applications',
    'Version control with Git',
    'Dependency injection',
    'Layered architecture',
    'MVVM',
    'Database transactions',
    'REST APIs',
    'Authentication and role-based permissions',
    'Unit and integration testing',
    'Background processing',
  ],
} satisfies Record<Locale, readonly string[]>;
