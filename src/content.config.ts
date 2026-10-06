import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { PROJECT_CATEGORIES, PROJECT_PREVIEWS } from './lib/projects';

// Copy is written for non-technical visitors: say what it is, who it's for and
// what it achieved. Technology names go only in `stack`.

// One file per project and language: src/content/projects/{es,en}/<slug>.md
// The markdown body is reserved for future case-study pages (/proyectos/<slug>).
const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    /** Who it was built for, e.g. "Berhlan de Colombia" or "Proyecto personal". */
    client: z.string(),
    kind: z.enum(['client', 'personal']),
    status: z.enum(['live', 'wip']),
    /** One or two plain sentences: what it is and what problem it solves. */
    summary: z.string(),
    /** Concrete results or benefits, 2–3 short bullets. */
    highlights: z.array(z.string()).min(1).max(3),
    categories: z.array(z.enum(PROJECT_CATEGORIES)).min(1),
    /** Technologies, shown small as "Hecho con". */
    stack: z.array(z.string()).min(1),
    preview: z.enum(PROJECT_PREVIEWS),
    /** Decorative path in the card's window bar, e.g. "~/proyectos/realtime-chat". */
    path: z.string(),
    featured: z.boolean().default(false),
    demoUrl: z.url().optional(),
    repoUrl: z.url().optional(),
    order: z.number().int(),
  }),
});

// One file per role and language: src/content/experience/{es,en}/<slug>.md
const experience = defineCollection({
  loader: glob({ base: './src/content/experience', pattern: '**/*.md' }),
  schema: z.object({
    role: z.string(),
    org: z.string(),
    period: z.string(),
    kind: z.enum(['work', 'mentoring', 'education']),
    current: z.boolean().default(false),
    summary: z.string(),
    order: z.number().int(),
  }),
});

export const collections = { projects, experience };
