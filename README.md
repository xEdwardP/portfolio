# Portafolio · Edward Pineda

[![CI](https://github.com/xEdwardP/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/xEdwardP/portfolio/actions/workflows/ci.yml)

Portafolio personal bilingüe (español e inglés), estático, con tema claro y oscuro.

**[Español](#español) · [English](#english)**

---

## Español

Sitio construido con Astro y desplegado como assets estáticos en Cloudflare Workers. Los
proyectos se filtran por ecosistema (Laravel, .NET, Node y Flutter), de modo que cada perfil
de reclutador encuentra su trabajo en un clic.

### Stack

| Capa | Elección |
| --- | --- |
| Framework | Astro 7, salida estática |
| Lenguaje | TypeScript en modo `strict` |
| Estilos | Tailwind CSS v4, configurado en CSS con `@theme` |
| Interactividad | TypeScript sin framework, en `<script>` de Astro |
| Contenido | Content Collections y MDX validados con Zod |
| Pruebas | Vitest |
| Hosting | Cloudflare Workers con assets estáticos |

Ninguna página descarga un chunk de JavaScript. Las dos piezas interactivas, el filtro de
proyectos y el formulario de contacto, van en unos dos kilobytes insertados en el HTML.

### Requisitos

Node 22.12 o superior. La versión exacta que se usa está en `.nvmrc`.

### Puesta en marcha

```bash
npm install
cp .env.example .env   # completa los valores
npm run dev
```

Las tres variables `PUBLIC_` son obligatorias: sin ellas el build falla nombrando la que
falta, en lugar de publicar un enlace de contacto vacío.

### Comandos

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Compila a `dist/` |
| `npm run preview` | Sirve el build de producción |
| `npm run check:all` | Tipos, lint, formato, pruebas, build y enlaces rotos |
| `npm run deploy` | Compila y publica en Cloudflare |

### Estructura

```
src/
  features/<capacidad>/    componentes y consultas por funcionalidad
  shared/                  primitivas de UI, layouts y utilidades
  content/{projects,posts}/{es,en}/
  assets/projects/<slug>/  capturas, descubiertas por carpeta
  i18n/  data/  styles/  pages/
```

Los colores viven solo en `src/styles/tokens.css`. Las páginas nunca llaman a
`getCollection()` directamente, sino a través de `features/*/queries.ts`.

### Añadir un proyecto

Crea el `.mdx` en `src/content/projects/es/` y en `en/`, y deja las capturas en
`src/assets/projects/<slug>/`. No hay que declararlas en ninguna parte: se descubren por el
nombre de la carpeta, el orden alfabético del archivo es el orden mostrado y la primera
imagen es la portada de la tarjeta.

---

## English

Personal portfolio built with Astro and deployed as static assets on Cloudflare Workers.
Projects are filterable by ecosystem (Laravel, .NET, Node and Flutter), so each kind of
recruiter finds the relevant work in one click.

### Stack

| Layer | Choice |
| --- | --- |
| Framework | Astro 7, static output |
| Language | TypeScript in `strict` mode |
| Styling | Tailwind CSS v4, configured in CSS with `@theme` |
| Interactivity | Framework-free TypeScript in Astro `<script>` |
| Content | Content Collections and MDX validated with Zod |
| Tests | Vitest |
| Hosting | Cloudflare Workers with static assets |

No page downloads a JavaScript chunk. The two interactive pieces, the project filter and the
contact form, ship as roughly two kilobytes inlined into the HTML.

### Requirements

Node 22.12 or newer. The exact version in use lives in `.nvmrc`.

### Getting started

```bash
npm install
cp .env.example .env   # fill in the values
npm run dev
```

The three `PUBLIC_` variables are required: without them the build fails and names the
missing one, rather than publishing an empty contact link.

### Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Builds to `dist/` |
| `npm run preview` | Serves the production build |
| `npm run check:all` | Types, lint, format, tests, build and broken links |
| `npm run deploy` | Builds and publishes to Cloudflare |

### Structure

```
src/
  features/<capability>/   components and queries per feature
  shared/                  UI primitives, layouts and helpers
  content/{projects,posts}/{es,en}/
  assets/projects/<slug>/  screenshots, discovered by folder
  i18n/  data/  styles/  pages/
```

Colors live in `src/styles/tokens.css` and nowhere else. Pages never call `getCollection()`
directly; they go through `features/*/queries.ts`.

### Adding a project

Create the `.mdx` file under `src/content/projects/es/` and `en/`, then drop screenshots into
`src/assets/projects/<slug>/`. Nothing needs declaring: images are discovered by folder name,
filename order is display order, and the first image is the card cover.
