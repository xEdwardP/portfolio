import { globSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';
import { describe, expect, it } from 'vitest';
import { locales } from '@/i18n/config';

const root = fileURLToPath(new URL('../../content/projects', import.meta.url));

interface Frontmatter {
  title: string;
  tier: string;
  ecosystem: string;
  category: string;
  year: number;
  order: number;
  featured: boolean;
  stack: string[];
  repos?: { label: string; url: string }[];
  private?: boolean;
}

function load(locale: string): Map<string, Frontmatter> {
  const files = globSync(`${locale}/*.mdx`, { cwd: root });
  return new Map(
    files.map((file) => {
      const raw = readFileSync(`${root}/${file}`, 'utf8');
      const frontmatter = raw.split('---')[1];
      return [file.split(/[/\\]/).pop()!.replace('.mdx', ''), parse(frontmatter)];
    })
  );
}

const byLocale = Object.fromEntries(locales.map((locale) => [locale, load(locale)]));

describe('project content', () => {
  it.each(locales)('%s has entries', (locale) => {
    expect(byLocale[locale].size).toBeGreaterThan(0);
  });

  it('publishes the same slugs in every locale', () => {
    const [reference, ...rest] = locales.map((locale) =>
      [...byLocale[locale].keys()].sort()
    );
    for (const slugs of rest) expect(slugs).toEqual(reference);
  });

  it.each(['ecosystem', 'category', 'tier', 'year', 'order', 'featured'] as const)(
    'keeps %s identical across locales',
    (field) => {
      for (const [slug, entry] of byLocale.es) {
        expect({ slug, value: byLocale.en.get(slug)?.[field] }).toEqual({
          slug,
          value: entry[field],
        });
      }
    }
  );

  it('gives every public project at least one repository link', () => {
    for (const [slug, entry] of byLocale.es) {
      const reachable = entry.private === true || (entry.repos?.length ?? 0) > 0;
      expect({ slug, reachable }).toEqual({ slug, reachable: true });
    }
  });

  it('never links a repository on a project marked private', () => {
    for (const locale of locales) {
      for (const [slug, entry] of byLocale[locale]) {
        if (entry.private !== true) continue;
        expect({ slug, repos: entry.repos?.length ?? 0 }).toEqual({ slug, repos: 0 });
      }
    }
  });

  it('keeps the private flag consistent across locales', () => {
    for (const [slug, entry] of byLocale.es) {
      expect({ slug, private: byLocale.en.get(slug)?.private }).toEqual({
        slug,
        private: entry.private,
      });
    }
  });

  it('assigns a unique order per locale', () => {
    for (const locale of locales) {
      const orders = [...byLocale[locale].values()].map((entry) => entry.order);
      expect(new Set(orders).size).toBe(orders.length);
    }
  });
});
