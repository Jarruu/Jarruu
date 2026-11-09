import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const works = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/works' }),
	schema: z.object({
		slugId: z.string(),
		lang: z.enum(['en', 'id']),
		title: z.string(),
		summary: z.string(),
		category: z.enum(['iot', 'ai', 'software']),
		year: z.number(),
		role: z.string(),
		stack: z.array(z.string()),
		cover: z.string(),
		coverAlt: z.string(),
		featured: z.boolean().default(false),
		order: z.number().default(99),
		placeholder: z.boolean().default(true),
		specs: z.array(
			z.object({
				label: z.string(),
				value: z.string(),
			}),
		),
	}),
});

export const collections = { works };
