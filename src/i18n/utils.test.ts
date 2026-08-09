import { describe, expect, it } from 'vitest';
import { locales } from './config';
import { ui } from './ui';
import {
  getAlternates,
  getLocaleFromPath,
  localizePath,
  otherLocale,
  stripLocale,
  switchLocalePath,
  useTranslations,
} from './utils';

const SITE = 'https://example.com';

describe('getLocaleFromPath', () => {
  it.each([
    ['/es/', 'es'],
    ['/en/projects/', 'en'],
    ['/es/blog/post-1/', 'es'],
  ])('reads %s as %s', (path, expected) => {
    expect(getLocaleFromPath(path)).toBe(expected);
  });

  it('falls back to the default locale outside a locale route', () => {
    expect(getLocaleFromPath('/')).toBe('es');
  });
});

describe('stripLocale', () => {
  it.each([
    ['/es/projects/', '/projects'],
    ['/en/blog/post-1/', '/blog/post-1'],
    ['/es/', ''],
  ])('%s becomes %s', (path, expected) => {
    expect(stripLocale(path)).toBe(expected);
  });
});

describe('localizePath', () => {
  it('always emits a prefixed, trailing-slash path', () => {
    expect(localizePath('/projects', 'en')).toBe('/en/projects/');
    expect(localizePath('', 'es')).toBe('/es/');
  });
});

describe('switchLocalePath', () => {
  it('keeps the current route when changing language', () => {
    expect(switchLocalePath('/es/blog/post-1/', 'en')).toBe('/en/blog/post-1/');
    expect(switchLocalePath('/en/projects/', 'es')).toBe('/es/projects/');
  });

  it('round-trips back to the original path', () => {
    const original = '/es/projects/';
    const there = switchLocalePath(original, 'en');
    expect(switchLocalePath(there, 'es')).toBe(original);
  });
});

describe('getAlternates', () => {
  const alternates = getAlternates('/es/projects/', SITE);

  it('emits one entry per locale plus x-default', () => {
    expect(alternates.map((a) => a.locale)).toEqual([...locales, 'x-default']);
  });

  it('points every alternate at the same route', () => {
    expect(alternates.map((a) => a.href)).toEqual([
      'https://example.com/es/projects/',
      'https://example.com/en/projects/',
      'https://example.com/es/projects/',
    ]);
  });
});

describe('useTranslations', () => {
  it('resolves a key in each locale', () => {
    expect(useTranslations('es')('nav.projects')).toBe('Proyectos');
    expect(useTranslations('en')('nav.projects')).toBe('Projects');
  });
});

describe('ui dictionary', () => {
  it('defines the same keys in every locale', () => {
    const [reference, ...rest] = locales.map((locale) => Object.keys(ui[locale]).sort());
    for (const keys of rest) expect(keys).toEqual(reference);
  });

  it('has no empty strings', () => {
    for (const locale of locales) {
      const empty = Object.entries(ui[locale]).filter(([, value]) => !value.trim());
      expect(empty).toEqual([]);
    }
  });
});

describe('otherLocale', () => {
  it('toggles between the two locales', () => {
    expect(otherLocale('es')).toBe('en');
    expect(otherLocale('en')).toBe('es');
  });
});
