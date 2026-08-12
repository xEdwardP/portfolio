import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import * as z from 'zod';
import { tagIds } from './data/tags';

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.mdx' }),
  schema: z
    .object({
      title: z.string(),
      summary: z.string().max(200),
      role: z.string(),
      tier: z.enum(['case-study', 'card']),
      ecosystem: z.enum(['laravel', 'dotnet', 'node', 'flutter']),
      category: z.enum(['web', 'mobile', 'api', 'desktop']),
      stack: z.array(z.string()).min(1),
      year: z.number().int().min(2020),
      status: z.enum(['active', 'completed', 'archived']),
      featured: z.boolean().default(false),
      order: z.number().int().default(99),
      repos: z.array(z.object({ label: z.string(), url: z.url() })).default([]),
      private: z.boolean().default(false),
      liveUrl: z.url().optional(),
      highlights: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
    })
    .refine((project) => project.private || project.repos.length > 0, {
      message: 'A public project must list at least one repository',
      path: ['repos'],
    }),
});

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.mdx' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(200),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.enum(tagIds)).min(1),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, posts };
