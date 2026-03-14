import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      publishedAt: z.coerce.date(),
      updatedAt: z.coerce.date().optional(),
      tags: z.array(z.string()).min(1),
      categories: z.array(z.string()).default([]),
      image: image().optional(),
      imageAlt: z.string().optional(),
      draft: z.boolean().default(false),
      featured: z.boolean().default(false),
      author: z.string().optional(),
      faq: z
        .array(
          z.object({
            question: z.string(),
            answer: z.string()
          })
        )
        .default([])
    })
});

export const collections = { posts };

