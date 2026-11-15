import type { APIContext } from 'astro';
import { render } from 'astro:content';
import { getPosts, readingMinutes, slugOf } from '@/features/blog/queries';
import { tagLabel } from '@/data/tags';
import { locales, type Locale } from '@/i18n/config';
import { localizePath } from '@/i18n/utils';
import { formatDate, isoDate } from '@/shared/lib/format';

export function getStaticPaths() {
  return locales.map((locale) => ({ params: { locale } }));
}

export async function GET(context: APIContext) {
  const locale = context.params.locale as Locale;
  const posts = await getPosts(locale);

  const index = await Promise.all(
    posts.map(async (post) => {
      const { headings } = await render(post);
      const tags = post.data.tags.map((tag) => tagLabel(tag, locale));

      return {
        title: post.data.title,
        description: post.data.description,
        url: localizePath(`/blog/${slugOf(post)}`, locale),
        date: formatDate(post.data.publishDate, locale),
        iso: isoDate(post.data.publishDate),
        minutes: readingMinutes(post),
        tags,
        text: [
          post.data.title,
          post.data.description,
          ...tags,
          ...headings.map((h) => h.text),
        ].join(' '),
      };
    })
  );

  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
