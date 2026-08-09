import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '@/i18n/config';

export type Project = CollectionEntry<'projects'>;
export type Ecosystem = Project['data']['ecosystem'];
export type Category = Project['data']['category'];

const isPublished = import.meta.env.PROD
  ? (project: Project) => !project.data.draft
  : () => true;

function byOrder(a: Project, b: Project): number {
  return a.data.order - b.data.order || a.data.title.localeCompare(b.data.title);
}

export function slugOf(project: Project): string {
  return project.id.split('/').slice(1).join('/');
}

export async function getProjects(locale: Locale): Promise<Project[]> {
  const all = await getCollection('projects', (project) => {
    return project.id.startsWith(`${locale}/`) && isPublished(project);
  });

  return all.sort(byOrder);
}

export async function getFeaturedProjects(locale: Locale): Promise<Project[]> {
  const projects = await getProjects(locale);
  return projects.filter((project) => project.data.featured);
}

export async function getProjectBySlug(
  locale: Locale,
  slug: string
): Promise<Project | undefined> {
  const projects = await getProjects(locale);
  return projects.find((project) => slugOf(project) === slug);
}

export async function getEcosystems(locale: Locale): Promise<Ecosystem[]> {
  const projects = await getProjects(locale);
  return [...new Set(projects.map((project) => project.data.ecosystem))];
}

export function countByEcosystem(projects: Project[]): Record<string, number> {
  return projects.reduce<Record<string, number>>((counts, project) => {
    counts[project.data.ecosystem] = (counts[project.data.ecosystem] ?? 0) + 1;
    return counts;
  }, {});
}
