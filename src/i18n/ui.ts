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

  'projects.lead': 'Doce proyectos en cuatro ecosistemas. Filtra por el que te interese.',
  'projects.filter': 'Filtrar por ecosistema',
  'projects.all': 'Todos',
  'projects.empty': 'No hay proyectos con ese filtro.',
  'projects.caseStudy': 'Caso de estudio',
  'projects.readCase': 'Leer el caso',
  'projects.viewProject': 'Ver proyecto',
  'projects.back': 'Volver a proyectos',

  'project.role': 'Alcance',
  'project.year': 'Año',
  'project.stack': 'Tecnologías',
  'project.repos': 'Repositorios',
  'project.highlights': 'Lo destacable',
  'project.live': 'Ver en vivo',
  'project.status': 'Estado',
  'project.status.active': 'En desarrollo',
  'project.status.completed': 'Terminado',
  'project.status.archived': 'Archivado',

  'category.web': 'Web',
  'category.mobile': 'Móvil',
  'category.api': 'API',
  'category.desktop': 'Escritorio',

  'blog.lead': 'Notas sobre decisiones técnicas, escritas desde proyectos reales.',
  'blog.readingTime': 'min de lectura',
  'blog.readMore': 'Leer',
  'blog.back': 'Volver al blog',
  'blog.toc': 'En este artículo',
  'blog.tags': 'Etiquetas',
  'blog.allTags': 'Todas las etiquetas',
  'blog.taggedWith': 'Artículos etiquetados con',
  'blog.empty': 'Todavía no hay artículos.',
  'blog.updated': 'Actualizado el',
  'blog.rss': 'Suscribirse por RSS',
  'blog.newer': 'Más recientes',
  'blog.older': 'Más antiguos',
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

  'projects.lead':
    'Twelve projects across four ecosystems. Filter by the one you care about.',
  'projects.filter': 'Filter by ecosystem',
  'projects.all': 'All',
  'projects.empty': 'No projects match that filter.',
  'projects.caseStudy': 'Case study',
  'projects.readCase': 'Read the case',
  'projects.viewProject': 'View project',
  'projects.back': 'Back to projects',

  'project.role': 'Scope',
  'project.year': 'Year',
  'project.stack': 'Tech stack',
  'project.repos': 'Repositories',
  'project.highlights': 'Highlights',
  'project.live': 'View live',
  'project.status': 'Status',
  'project.status.active': 'In progress',
  'project.status.completed': 'Completed',
  'project.status.archived': 'Archived',

  'category.web': 'Web',
  'category.mobile': 'Mobile',
  'category.api': 'API',
  'category.desktop': 'Desktop',

  'blog.lead': 'Notes on technical decisions, written from real projects.',
  'blog.readingTime': 'min read',
  'blog.readMore': 'Read',
  'blog.back': 'Back to the blog',
  'blog.toc': 'In this article',
  'blog.tags': 'Tags',
  'blog.allTags': 'All tags',
  'blog.taggedWith': 'Posts tagged',
  'blog.empty': 'No posts yet.',
  'blog.updated': 'Updated on',
  'blog.rss': 'Subscribe via RSS',
  'blog.newer': 'Newer',
  'blog.older': 'Older',
} as const satisfies Record<keyof typeof es, string>;

export const ui = { es, en } as const;

export type UiKey = keyof typeof es;
