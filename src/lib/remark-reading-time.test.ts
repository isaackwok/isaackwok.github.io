import { remark } from "remark";
import { describe, expect, it } from "vitest";
import { remarkReadingTime } from "./remark-reading-time.mjs";

// Runs the plugin through a real remark pipeline, seeding the
// file.data.astro.frontmatter object that Astro provides at build time.
async function minutesFor(markdown: string): Promise<number> {
    const file = await remark()
        .use(remarkReadingTime)
        .process({ value: markdown, data: { astro: { frontmatter: {} } } });
    const data = file.data as {
        astro: { frontmatter: { minutesRead: number } };
    };
    return data.astro.frontmatter.minutesRead;
}

describe("remarkReadingTime", () => {
    it("gives short text a floor of one minute", async () => {
        expect(await minutesFor("A few words.")).toBe(1);
    });

    it("scales with word count", async () => {
        // 600 words at ~200 wpm ≈ 3 minutes
        expect(await minutesFor("word ".repeat(600))).toBeGreaterThanOrEqual(3);
    });

    it("counts CJK characters, not just space-separated words", async () => {
        expect(await minutesFor("字".repeat(1000))).toBeGreaterThanOrEqual(2);
    });
});
