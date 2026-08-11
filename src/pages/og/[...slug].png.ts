import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { Resvg } from '@resvg/resvg-js';
import satori from 'satori';
import { ogTemplate, type OgContent } from '@/features/og/template';
import { getPosts, slugOf as postSlug } from '@/features/blog/queries';
import { getProjects, slugOf as projectSlug } from '@/features/projects/queries';
import { profile } from '@/data/profile';
import { locales } from '@/i18n/config';
import { useTranslations } from '@/i18n/utils';
import { tagLabel } from '@/data/tags';

const SIZE = { width: 1200, height: 630 };

const fontFile = (weight: 400 | 700) =>
  join(
    process.cwd(),
    'node_modules/@fontsource/inter/files',
    `inter-latin-${weight}-normal.woff`
  );

const fonts = [
  {
    name: 'Inter',
    weight: 400 as const,
    style: 'normal' as const,
    data: await readFile(fontFile(400)),
  },
  {
    name: 'Inter',
    weight: 700 as const,
    style: 'normal' as const,
    data: await readFile(fontFile(700)),
  },
];

export async function getStaticPaths() {
  const perLocale = await Promise.all(
    locales.map(async (locale) => {
      const t = useTranslations(locale);

      const projects = await getProjects(locale);
      const posts = await getPosts(locale);

      return [
        {
          params: { slug: `${locale}/default` },
          props: {
            eyebrow: profile.role[locale],
            title: t('home.title'),
            meta: ['Laravel', '.NET', 'TypeScript', 'Flutter'],
            footer: profile.shortName,
          } satisfies OgContent,
        },
        ...projects.map((project) => ({
          params: { slug: `${locale}/projects/${projectSlug(project)}` },
          props: {
            eyebrow: t('projects.caseStudy'),
            title: project.data.title,
            meta: project.data.stack,
            footer: profile.shortName,
          } satisfies OgContent,
        })),
        ...posts.map((post) => ({
          params: { slug: `${locale}/blog/${postSlug(post)}` },
          props: {
            eyebrow: t('nav.blog'),
            title: post.data.title,
            meta: post.data.tags.map((tag) => tagLabel(tag, locale)),
            footer: profile.shortName,
          } satisfies OgContent,
        })),
      ];
    })
  );

  return perLocale.flat();
}

export async function GET({ props }: { props: OgContent }) {
  const svg = await satori(ogTemplate(props), { ...SIZE, fonts });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: SIZE.width } })
    .render()
    .asPng();

  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
