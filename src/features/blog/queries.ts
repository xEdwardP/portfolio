import { getCollection, type CollectionEntry } from 'astro:content';
import { tagLabel, type TagId } from '@/data/tags';
import type { Locale } from '@/i18n/config';

export type Post = CollectionEntry<'posts'>;

const WORDS_PER_MINUTE = 200;

const isPublished = import.meta.env.PROD ? (post: Post) => !post.data.draft : () => true;

export function slugOf(post: Post): string {
  return post.id.split('/').slice(1).join('/');
}

export function readingMinutes(post: Post): number {
  const words = post.body?.trim().split(/\s+/).length ?? 0;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

export async function getPosts(locale: Locale): Promise<Post[]> {
  const all = await getCollection('posts', (post) => {
    return post.id.startsWith(`${locale}/`) && isPublished(post);
  });

  return all.sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());
}

export async function getPostsByTag(locale: Locale, tag: TagId): Promise<Post[]> {
  const posts = await getPosts(locale);
  return posts.filter((post) => post.data.tags.includes(tag));
}

export async function getTags(locale: Locale): Promise<{ id: TagId; label: string }[]> {
  const posts = await getPosts(locale);
  const used = new Set<TagId>();

  for (const post of posts) {
    for (const tag of post.data.tags) used.add(tag);
  }

  return [...used]
    .map((id) => ({ id, label: tagLabel(id, locale) }))
    .sort((a, b) => a.label.localeCompare(b.label, locale));
}
