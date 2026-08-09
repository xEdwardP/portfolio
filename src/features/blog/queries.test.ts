import { globSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';
import { describe, expect, it } from 'vitest';
import { locales } from '@/i18n/config';
import { tagIds } from '@/data/tags';
import { pageCount, pageSlice, POSTS_PER_PAGE } from './pagination';

const root = fileURLToPath(new URL('../../content/posts', import.meta.url));

interface Frontmatter {
  title: string;
  description: string;
  publishDate: string;
  tags: string[];
  draft?: boolean;
}

function load(locale: string): Map<string, Frontmatter> {
  const files = globSync(`${locale}/*.mdx`, { cwd: root });
  return new Map(
    files.map((file) => {
      const raw = readFileSync(`${root}/${file}`, 'utf8');
      return [
        file.split(/[/\\]/).pop()!.replace('.mdx', ''),
        parse(raw.split('---')[1]) as Frontmatter,
      ];
    })
  );
}

const byLocale = Object.fromEntries(locales.map((locale) => [locale, load(locale)]));

describe('blog content', () => {
  it.each(locales)('%s has posts', (locale) => {
    expect(byLocale[locale].size).toBeGreaterThan(0);
  });

  it('publishes the same slugs in every locale', () => {
    const [reference, ...rest] = locales.map((locale) =>
      [...byLocale[locale].keys()].sort()
    );
    for (const slugs of rest) expect(slugs).toEqual(reference);
  });

  it('uses the same tag ids in every locale', () => {
    for (const [slug, entry] of byLocale.es) {
      expect({ slug, tags: byLocale.en.get(slug)?.tags }).toEqual({
        slug,
        tags: entry.tags,
      });
    }
  });

  it('only uses tag ids declared in data/tags.ts', () => {
    for (const locale of locales) {
      for (const [slug, entry] of byLocale[locale]) {
        const unknown = entry.tags.filter((tag) => !tagIds.includes(tag as never));
        expect({ slug, unknown }).toEqual({ slug, unknown: [] });
      }
    }
  });

  it('keeps publish dates aligned across locales', () => {
    for (const [slug, entry] of byLocale.es) {
      expect({ slug, date: String(byLocale.en.get(slug)?.publishDate) }).toEqual({
        slug,
        date: String(entry.publishDate),
      });
    }
  });
});

describe('pagination', () => {
  const posts = Array.from({ length: 23 }, (_, index) => index);

  it('keeps page 1 implicit and counts the rest', () => {
    expect(pageCount(0)).toBe(1);
    expect(pageCount(POSTS_PER_PAGE)).toBe(1);
    expect(pageCount(POSTS_PER_PAGE + 1)).toBe(2);
  });

  it('slices without dropping or repeating a post', () => {
    const total = pageCount(posts.length);
    const seen = Array.from({ length: total }, (_, index) =>
      pageSlice(posts, index + 1)
    ).flat();
    expect(seen).toEqual(posts);
  });
});
