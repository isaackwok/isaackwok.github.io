import { z } from "astro/zod";

/*
 * Factory instead of a plain schema: Astro's image() helper only exists
 * inside the content-collection pipeline, so content.config.ts injects
 * the real one and unit tests inject a stub.
 */
export function articleSchema(image: () => z.ZodTypeAny) {
    return z
        .object({
            title: z.string().min(1),
            description: z.string().min(1),
            date: z.coerce.date(),
            tags: z.array(z.string()).default([]),
            lang: z.enum(["en", "zh-Hant"]).default("en"),
            draft: z.boolean().default(false),
            image: image().optional(),
            imageAlt: z.string().min(1).optional(),
        })
        .refine((data) => !data.image || Boolean(data.imageAlt), {
            message: "imageAlt is required when image is set",
            path: ["imageAlt"],
        });
}
