import { defineCollection } from "astro:content";
import { file } from "astro/loaders";
import { z } from "astro/zod";
import { parse } from "yaml";

const gallery = defineCollection({
    loader: file("src/data/gallery.yaml", {
        parser: (text) =>
            (parse(text) ?? []).map(
                (entry: Record<string, string>, index: number) => ({
                    ...entry,
                    id: entry.image.split("/").pop()!.replace(/\.[^.]+$/, ""),
                    order: index,
                }),
            ),
    }),
    schema: ({ image }) =>
        z.object({
            image: image(),
            alt: z.string().min(1),
            caption: z.string().min(1),
            order: z.number(),
        }),
});

export const collections = { gallery };
