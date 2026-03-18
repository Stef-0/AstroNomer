import { defineCollection, z } from "astro:content";

const headingLevelSchema = z.enum(["h2", "h3", "h4", "h5", "h6"]);

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
      socialImage: image().optional(),
      socialImageAlt: z.string().optional(),
      featuredImage: image().optional(),
      featuredImageAlt: z.string().optional(),
      draft: z.boolean().default(false),
      featured: z.boolean().default(false),
      author: z.string().optional(),
      toc: z
        .union([
          z.boolean(),
          z.object({
            enabled: z.boolean().optional(),
            title: z.string().optional(),
            levels: z.array(headingLevelSchema).min(1).optional(),
            include: z.array(z.string().min(1)).min(1).optional()
          })
        ])
        .optional(),
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
