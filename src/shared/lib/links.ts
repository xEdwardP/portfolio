const EXTERNAL = /^https?:\/\//i;

export function isExternal(href: string): boolean {
  return EXTERNAL.test(href);
}

export function linkAttrs(href: string, rel?: string) {
  const tokens = rel?.split(/\s+/).filter(Boolean) ?? [];

  if (!isExternal(href)) {
    return tokens.length ? { rel: tokens.join(' ') } : {};
  }

  return {
    target: '_blank',
    rel: [...new Set([...tokens, 'noopener'])].join(' '),
  };
}
