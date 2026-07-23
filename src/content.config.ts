import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      // Short mono tag list shown next to the title, e.g. "engineering · aws · openai · agents"
      tags: z.string(),
      // Where the tile links. Omit for a tile that isn't clickable (e.g. no public link yet).
      href: z.string().optional(),
      target: z.enum(['_self', '_blank']).default('_self'),
      image: image().optional(),
      // Small label pinned over the image, e.g. "github.com/x/y ↗". Leave unset for none.
      chip: z.string().optional(),
      // CSS object-position for the image crop.
      imagePosition: z.string().default('center'),
      description: z.string(),
      // true = full-width feature card at the top of Work. Only one should be featured at a time.
      featured: z.boolean().default(false),
      // Lower sorts first within its group (featured / grid).
      order: z.number().default(0),
    }),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    year: z.string(),
    // Set for a post that lives elsewhere (e.g. a Substack/Medium URL); omit to link to the post's own page on this site.
    href: z.url().optional(),
    draft: z.boolean().default(false),
    // Breaks ties within the same year — lower sorts first (newest-first listing).
    order: z.number().default(0),
  }),
});

export const collections = { projects, posts };
