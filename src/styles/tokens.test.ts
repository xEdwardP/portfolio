import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const css = readFileSync(fileURLToPath(new URL('./tokens.css', import.meta.url)), 'utf8');

function tokensIn(selector: string): Record<string, string> {
  const block = css.match(new RegExp(`${selector}\\s*\\{([^}]*)\\}`))?.[1] ?? '';
  return Object.fromEntries(
    [...block.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()])
  );
}

function relativeLuminance(hex: string): number {
  const value = parseInt(hex.slice(1), 16);
  const channels = [(value >> 16) & 255, (value >> 8) & 255, value & 255].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrast(a: string, b: string): number {
  const [x, y] = [relativeLuminance(a), relativeLuminance(b)];
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}

const light = tokensIn(':root');
const dark = tokensIn('\\.dark');

const textPairs: [string, string][] = [
  ['--text', '--bg'],
  ['--text', '--surface'],
  ['--text-muted', '--bg'],
  ['--text-muted', '--surface'],
  ['--text-muted', '--surface-raised'],
  ['--accent', '--bg'],
  ['--accent', '--surface'],
  ['--accent-contrast', '--accent'],
  ['--highlight-contrast', '--highlight'],
  ['--success', '--bg'],
  ['--warning', '--bg'],
  ['--danger', '--bg'],
];

const uiPairs: [string, string][] = [
  ['--border-control', '--bg'],
  ['--border-control', '--surface'],
];

describe('design tokens', () => {
  it('declares the light theme on :root', () => {
    expect(Object.keys(light)).toContain('--bg');
    expect(Object.keys(light)).toContain('--accent');
  });

  it('redeclares every light token in dark mode', () => {
    expect(Object.keys(dark).sort()).toEqual(Object.keys(light).sort());
  });

  it('resolves every token to a hex colour', () => {
    const invalid = Object.entries({ ...light, ...dark }).filter(
      ([, value]) => !/^#[0-9a-f]{6}$/i.test(value)
    );
    expect(invalid).toEqual([]);
  });
});

describe.each([
  ['light', light],
  ['dark', dark],
])('%s theme contrast', (_name, theme) => {
  it.each(textPairs)('%s on %s meets AA for text (4.5:1)', (fg, bg) => {
    expect(contrast(theme[fg], theme[bg])).toBeGreaterThanOrEqual(4.5);
  });

  it.each(uiPairs)('%s on %s meets AA for controls (3:1)', (fg, bg) => {
    expect(contrast(theme[fg], theme[bg])).toBeGreaterThanOrEqual(3);
  });
});
