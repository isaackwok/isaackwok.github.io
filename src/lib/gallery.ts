import { parse } from "yaml";

export interface GalleryEntry {
    image: string;
    alt: string;
    caption: string;
    id: string;
    order: number;
    // Keeps the parser assignable to astro's file() loader, which wants
    // Record<string, unknown> entries.
    [key: string]: unknown;
}

/**
 * Parse gallery.yaml into content-collection entries: each photo gets an
 * `id` derived from its filename (extension stripped) and an `order` that
 * preserves the top-to-bottom display order of the file.
 */
export function parseGallery(text: string): GalleryEntry[] {
    return (parse(text) ?? []).map(
        (entry: Record<string, string>, index: number) => ({
            ...entry,
            id: entry.image.split("/").pop()!.replace(/\.[^.]+$/, ""),
            order: index,
        }),
    );
}
