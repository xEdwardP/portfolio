const es = {
  'site.title': 'Edward P. — Desarrollador Fullstack y Mobile',
  'site.description':
    'Portafolio de Edward P. Desarrollo fullstack y móvil con Laravel, ASP.NET Core, TypeScript y Flutter.',

  'nav.home': 'Inicio',
  'nav.projects': 'Proyectos',
  'nav.blog': 'Blog',
  'nav.about': 'Sobre mí',
  'nav.contact': 'Contacto',
  'nav.menu': 'Menú',
  'nav.close': 'Cerrar menú',

  'theme.label': 'Tema',
  'theme.light': 'Claro',
  'theme.dark': 'Oscuro',
  'theme.system': 'Sistema',

  'lang.label': 'Idioma',
  'lang.switch': 'Cambiar a inglés',

  'a11y.skip': 'Saltar al contenido principal',

  'home.eyebrow': 'Fullstack y Mobile',
  'home.title': 'Construyo software en cuatro ecosistemas',
  'home.lead':
    'Laravel, ASP.NET Core, TypeScript y Flutter. Arquitecturas modulares, patrones explícitos y productos que llegan a producción.',
  'home.cta.projects': 'Ver proyectos',
  'home.cta.contact': 'Contactar',
  'home.featured': 'Proyectos destacados',
  'home.stack': 'Con qué trabajo',

  'footer.built': 'Construido con Astro y Tailwind CSS',
  'footer.rights': 'Todos los derechos reservados',
  'footer.source': 'Código fuente',

  'soon.title': 'En construcción',
  'soon.body': 'Esta sección llega en un sprint próximo.',
} as const;

const en = {
  'site.title': 'Edward P. — Fullstack & Mobile Developer',
  'site.description':
    'Portfolio of Edward P. Fullstack and mobile development with Laravel, ASP.NET Core, TypeScript and Flutter.',

  'nav.home': 'Home',
  'nav.projects': 'Projects',
  'nav.blog': 'Blog',
  'nav.about': 'About',
  'nav.contact': 'Contact',
  'nav.menu': 'Menu',
  'nav.close': 'Close menu',

  'theme.label': 'Theme',
  'theme.light': 'Light',
  'theme.dark': 'Dark',
  'theme.system': 'System',

  'lang.label': 'Language',
  'lang.switch': 'Switch to Spanish',

  'a11y.skip': 'Skip to main content',

  'home.eyebrow': 'Fullstack & Mobile',
  'home.title': 'I build software across four ecosystems',
  'home.lead':
    'Laravel, ASP.NET Core, TypeScript and Flutter. Modular architectures, explicit patterns and products that ship.',
  'home.cta.projects': 'View projects',
  'home.cta.contact': 'Get in touch',
  'home.featured': 'Featured projects',
  'home.stack': 'What I work with',

  'footer.built': 'Built with Astro and Tailwind CSS',
  'footer.rights': 'All rights reserved',
  'footer.source': 'Source code',

  'soon.title': 'Under construction',
  'soon.body': 'This section ships in an upcoming sprint.',
} as const satisfies Record<keyof typeof es, string>;

export const ui = { es, en } as const;

export type UiKey = keyof typeof es;
