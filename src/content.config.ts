import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    category: z.enum(['news', 'recipe']),
    author: z.string().default('Andy'),
    cover: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    cookTime: z.number().optional(),
    servings: z.number().optional(),
    difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
  }),
});

export const collections = { articles };
