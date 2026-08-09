import type { UiKey } from '@/i18n/ui';

interface NavItem {
  key: UiKey;
  path: string;
}

export const navigation: readonly NavItem[] = [
  { key: 'nav.projects', path: '/projects' },
  { key: 'nav.blog', path: '/blog' },
  { key: 'nav.about', path: '/about' },
  { key: 'nav.contact', path: '/contact' },
];
