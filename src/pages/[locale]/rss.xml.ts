import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts, slugOf } from '@/features/blog/queries';
import { locales, type Locale } from '@/i18n/config';
import { ui } from '@/i18n/ui';

export function getStaticPaths() {
  return locales.map((locale) => ({ params: { locale } }));
}

export async function GET(context: APIContext) {
  const locale = context.params.locale as Locale;
  const posts = await getPosts(locale);

  return rss({
    title: ui[locale]['site.title'],
    description: ui[locale]['blog.lead'],
    site: context.site ?? 'https://portfolio.pages.dev',
    trailingSlash: true,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishDate,
      categories: post.data.tags,
      link: `/${locale}/blog/${slugOf(post)}/`,
    })),
    customData: `<language>${locale}</language>`,
  });
}
