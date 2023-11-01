import { defineCollection, z } from "astro:content";

const ZImageMetaData: z.ZodType<ImageMetadata> = z.object({
  src: z.string(),
  width: z.number(),
  height: z.number(),
	format: z.enum(["jpeg","jpg","png","tiff","webp","gif","svg","avif"])
});

const blog = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: ZImageMetaData.or(z.string()).optional(),
    archived: z.boolean().optional(),
  }),
});

export const collections = { blog };
