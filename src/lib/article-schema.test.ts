import { z } from "astro/zod";
import { describe, expect, it } from "vitest";
import { articleSchema } from "./article-schema";

// Stand-in for Astro's image() helper, which only exists inside the
// content-collection pipeline.
const schema = articleSchema(() => z.string());

const valid = {
    title: "Quiet software",
    description: "Notes on building calm tools.",
    date: "2026-07-05",
};

describe("articleSchema", () => {
    it("accepts minimal frontmatter and applies defaults", () => {
        const parsed = schema.parse(valid);
        expect(parsed.draft).toBe(false);
        expect(parsed.lang).toBe("en");
        expect(parsed.tags).toEqual([]);
        expect(parsed.date).toBeInstanceOf(Date);
    });

    it.each(["title", "description", "date"])(
        "rejects missing %s",
        (key) => {
            const rest: Record<string, unknown> = { ...valid };
            delete rest[key];
            expect(schema.safeParse(rest).success).toBe(false);
        },
    );

    it("rejects an image without imageAlt", () => {
        const result = schema.safeParse({ ...valid, image: "./hero.jpg" });
        expect(result.success).toBe(false);
    });

    it("accepts an image with imageAlt", () => {
        const result = schema.safeParse({
            ...valid,
            image: "./hero.jpg",
            imageAlt: "A quiet desk",
        });
        expect(result.success).toBe(true);
    });

    it("rejects an unsupported lang", () => {
        expect(schema.safeParse({ ...valid, lang: "fr" }).success).toBe(false);
    });
});
