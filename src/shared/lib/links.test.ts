import { describe, expect, it } from 'vitest';
import { isExternal, linkAttrs } from './links';

describe('isExternal', () => {
  it.each(['https://github.com/xEdwardP', 'http://example.com', 'HTTPS://EXAMPLE.COM'])(
    'treats %s as external',
    (href) => {
      expect(isExternal(href)).toBe(true);
    }
  );

  it.each(['/es/projects/', '#main', 'mailto:someone@example.com', '/cv/file.pdf'])(
    'treats %s as internal',
    (href) => {
      expect(isExternal(href)).toBe(false);
    }
  );
});

describe('linkAttrs', () => {
  it('sends an external link to a new tab', () => {
    expect(linkAttrs('https://linkedin.com/in/someone')).toEqual({
      target: '_blank',
      rel: 'noopener',
    });
  });

  it('keeps a caller-provided rel and appends noopener', () => {
    expect(linkAttrs('https://github.com/xEdwardP', 'me')).toEqual({
      target: '_blank',
      rel: 'me noopener',
    });
  });

  it('never repeats noopener', () => {
    expect(linkAttrs('https://example.com', 'me noopener')).toMatchObject({
      rel: 'me noopener',
    });
  });

  it('leaves internal routes alone', () => {
    expect(linkAttrs('/es/contact/')).toEqual({});
  });

  it('does not open mail clients in a new tab, but keeps the rel', () => {
    expect(linkAttrs('mailto:someone@example.com', 'me')).toEqual({ rel: 'me' });
  });
});
