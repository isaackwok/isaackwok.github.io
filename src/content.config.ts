import { defineCollection } from "astro:content";
import { file } from "astro/loaders";
import { z } from "astro/zod";
import { parse } from "yaml";
import { readFile } from "node:fs/promises";
import { lookupAlbum } from "./lib/itunes";

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

const music = defineCollection({
    // Inline loader: reads music.yaml, then resolves artwork + preview
    // tracks from the iTunes Lookup API. Runs once per build / dev-server
    // start (a music.yaml edit needs a dev-server restart to show up).
    loader: async () => {
        const entries: {
            artist: string;
            title: string;
            itunesId: number;
            country: string;
            spotifyUrl: string;
        }[] = parse(await readFile("src/data/music.yaml", "utf8")) ?? [];
        const albums = [];
        // Sequential on purpose — stays far below Apple's rate limit.
        for (const [order, entry] of entries.entries()) {
            const { artworkUrl, tracks } = await lookupAlbum(
                entry.itunesId,
                entry.country,
            );
            albums.push({
                id: String(entry.itunesId),
                order,
                ...entry,
                artworkUrl,
                tracks,
            });
        }
        return albums;
    },
    schema: z.object({
        artist: z.string().min(1),
        title: z.string().min(1),
        itunesId: z.number(),
        country: z.string().length(2),
        spotifyUrl: z.string().url(),
        order: z.number(),
        artworkUrl: z.string().url(),
        tracks: z.array(
            z.object({ name: z.string().min(1), previewUrl: z.string().url() }),
        ),
    }),
});

export const collections = { gallery, music };
