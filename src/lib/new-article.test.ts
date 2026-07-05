import { describe, expect, it } from "vitest";
import { articleTemplate, slugify } from "./new-article.mjs";

describe("slugify", () => {
    it("kebab-cases a plain title", () => {
        expect(slugify("My article title")).toBe("my-article-title");
    });

    it("strips punctuation and collapses separators", () => {
        expect(slugify("Hello,   World! — again")).toBe("hello-world-again");
    });

    it("trims leading and trailing hyphens", () => {
        expect(slugify("...quiet software...")).toBe("quiet-software");
    });

    it("returns an empty slug for titles with no latin characters", () => {
        expect(slugify("中文標題")).toBe("");
    });
});

describe("articleTemplate", () => {
    it("renders quoted frontmatter with the given date and draft: true", () => {
        const md = articleTemplate(
            "Quiet software",
            new Date("2026-07-05T12:00:00"),
        );
        expect(md.startsWith("---\n")).toBe(true);
        expect(md).toContain('title: "Quiet software"');
        expect(md).toContain("date: 2026-07-05");
        expect(md).toContain("draft: true");
    });

    it("includes every optional field — valid defaults or commented out", () => {
        const md = articleTemplate(
            "Quiet software",
            new Date("2026-07-05T12:00:00"),
        );
        expect(md).toContain("tags: []");
        expect(md).toContain("lang: zh-Hant");
        expect(md).toContain('# lang must be "en" or "zh-Hant"');
        expect(md).toContain("# image: ../../assets/articles/");
        expect(md).toContain("# imageAlt:");
    });

    it("escapes double quotes in the title", () => {
        const md = articleTemplate(
            'The "quiet" web',
            new Date("2026-07-05T12:00:00"),
        );
        expect(md).toContain('title: "The \\"quiet\\" web"');
    });
});
