const color = {
  bg: '#09090b',
  surface: '#18181b',
  text: '#fafafa',
  muted: '#a1a1aa',
  accent: '#a78bfa',
  border: '#27272a',
} as const;

import type { Locale } from '@/i18n/config';

export function ogImagePath(locale: Locale, route?: string): string {
  return `/og/${locale}/${route ?? 'default'}.png`;
}

export interface OgContent {
  eyebrow: string;
  title: string;
  meta: string[];
  footer: string;
}

type Node = { type: string; props: Record<string, unknown> };

function node(type: string, style: Record<string, unknown>, children?: unknown): Node {
  return { type, props: { style, ...(children === undefined ? {} : { children }) } };
}

export function ogTemplate({ eyebrow, title, meta, footer }: OgContent): Node {
  return node(
    'div',
    {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: color.bg,
      padding: '72px',
      fontFamily: 'Inter',
    },
    [
      node('div', {
        display: 'flex',
        width: '96px',
        height: '8px',
        borderRadius: '4px',
        backgroundColor: color.accent,
      }),

      node('div', { display: 'flex', flexDirection: 'column' }, [
        node(
          'div',
          {
            display: 'flex',
            fontSize: '26px',
            fontWeight: 400,
            color: color.accent,
            marginBottom: '18px',
          },
          eyebrow
        ),
        node(
          'div',
          {
            display: 'flex',
            fontSize: title.length > 42 ? '62px' : '76px',
            fontWeight: 700,
            color: color.text,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          },
          title
        ),
      ]),

      node(
        'div',
        {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: `2px solid ${color.border}`,
          paddingTop: '28px',
        },
        [
          node(
            'div',
            { display: 'flex', fontSize: '28px', fontWeight: 700, color: color.text },
            footer
          ),
          node(
            'div',
            { display: 'flex', gap: '12px' },
            meta.slice(0, 4).map((item) =>
              node(
                'div',
                {
                  display: 'flex',
                  fontSize: '22px',
                  color: color.muted,
                  backgroundColor: color.surface,
                  border: `2px solid ${color.border}`,
                  borderRadius: '8px',
                  padding: '6px 14px',
                },
                item
              )
            )
          ),
        ]
      ),
    ]
  );
}
