import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/projects/*/*.{png,jpg,jpeg,webp,avif}',
  { eager: true }
);

const bySlug = new Map<string, ImageMetadata[]>();

for (const path of Object.keys(files).sort()) {
  const slug = path.split('/').at(-2);
  const image = files[path]?.default;
  if (!slug || !image) continue;

  bySlug.set(slug, [...(bySlug.get(slug) ?? []), image]);
}

export function galleryFor(slug: string): ImageMetadata[] {
  return bySlug.get(slug) ?? [];
}

export function coverFor(slug: string): ImageMetadata | undefined {
  return galleryFor(slug)[0];
}
