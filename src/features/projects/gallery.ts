import type { ImageMetadata } from 'astro';
import type { Locale } from '@/i18n/config';
import { projectScreenshots } from '@/data/project-screenshots';

const files = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/projects/*/*.{png,jpg,jpeg,webp,avif}',
  { eager: true }
);

const bySlug = new Map<string, ImageMetadata[]>();
const descriptions = new WeakMap<ImageMetadata, Record<Locale, string>>();

for (const path of Object.keys(files).sort()) {
  const slug = path.split('/').at(-2);
  const image = files[path]?.default;
  if (!slug || !image) continue;
  const filename = path.split('/').at(-1)!;
  const description = projectScreenshots[slug]?.[filename];
  if (description) descriptions.set(image, description);

  bySlug.set(slug, [...(bySlug.get(slug) ?? []), image]);
}

export function galleryFor(slug: string): ImageMetadata[] {
  return bySlug.get(slug) ?? [];
}

export function coverFor(slug: string): ImageMetadata | undefined {
  return galleryFor(slug)[0];
}

export function descriptionFor(image: ImageMetadata, locale: Locale): string | undefined {
  return descriptions.get(image)?.[locale];
}
