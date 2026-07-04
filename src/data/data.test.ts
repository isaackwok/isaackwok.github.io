// Integrity checks for the YAML data files behind /gallery and /music.
// These catch the mistakes the content-collection schemas only surface at
// build time (or, for missing images, as a broken deploy).
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { parse } from "yaml";
import { parseGallery } from "../lib/gallery";

const dataDir = dirname(fileURLToPath(import.meta.url));

describe("gallery.yaml", () => {
    const entries = parseGallery(
        readFileSync(resolve(dataDir, "gallery.yaml"), "utf8"),
    );

    it("has at least one photo", () => {
        expect(entries.length).toBeGreaterThan(0);
    });

    it("gives every photo a non-empty alt and caption", () => {
        for (const entry of entries) {
            expect(entry.alt, `alt for ${entry.image}`).toBeTruthy();
            expect(entry.caption, `caption for ${entry.image}`).toBeTruthy();
        }
    });

    it("points every image at a file that exists in src/assets/gallery", () => {
        for (const entry of entries) {
            const imagePath = resolve(dataDir, entry.image);
            expect(existsSync(imagePath), `missing file: ${entry.image}`).toBe(
                true,
            );
        }
    });

    it("has no duplicate photos (ids derive from the filename)", () => {
        const ids = entries.map((e) => e.id);
        expect(new Set(ids).size).toBe(ids.length);
    });
});

describe("music.yaml", () => {
    const albums: {
        artist: string;
        title: string;
        itunesId: number;
        country: string;
        spotifyUrl: string;
    }[] = parse(readFileSync(resolve(dataDir, "music.yaml"), "utf8"));

    it("has at least one album", () => {
        expect(albums.length).toBeGreaterThan(0);
    });

    it("gives every album a non-empty artist and title", () => {
        for (const album of albums) {
            expect(album.artist, `artist for ${album.itunesId}`).toBeTruthy();
            expect(album.title, `title for ${album.itunesId}`).toBeTruthy();
        }
    });

    it("has a numeric itunesId and a two-letter storefront country", () => {
        for (const album of albums) {
            expect(
                Number.isInteger(album.itunesId) && album.itunesId > 0,
                `itunesId for "${album.title}" must be a positive integer`,
            ).toBe(true);
            expect(
                album.country,
                `country for "${album.title}"`,
            ).toMatch(/^[a-z]{2}$/);
        }
    });

    it("links every album to a Spotify album URL", () => {
        for (const album of albums) {
            const url = new URL(album.spotifyUrl);
            expect(url.origin, `spotifyUrl for "${album.title}"`).toBe(
                "https://open.spotify.com",
            );
            expect(
                url.pathname,
                `spotifyUrl for "${album.title}"`,
            ).toMatch(/^\/album\/\w+$/);
        }
    });

    it("has no duplicate itunesIds (they become collection entry ids)", () => {
        const ids = albums.map((a) => a.itunesId);
        expect(new Set(ids).size).toBe(ids.length);
    });
});
