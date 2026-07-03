import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Shared shape for anything published on a date with an optional cover image.
const publishedSchema = z.object({
  title: z.string(),
  description: z.string(),
  lang: z.enum(['ru', 'uk', 'en']),
  pubDate: z.date(),
  updatedDate: z.date().optional(),
  image: z.string().optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: publishedSchema,
});

const stories = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/stories' }),
  schema: publishedSchema,
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    lang: z.enum(['ru', 'uk', 'en']),
  }),
});

export const collections = { blog, stories, pages };
