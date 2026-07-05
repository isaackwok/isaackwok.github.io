import { describe, expect, it } from "vitest";
import { formatArticleDate, isPublished } from "./articles";

describe("isPublished", () => {
    it("always shows published articles", () => {
        expect(isPublished({ data: { draft: false } }, true)).toBe(true);
        expect(isPublished({ data: { draft: false } }, false)).toBe(true);
    });

    it("hides drafts in production", () => {
        expect(isPublished({ data: { draft: true } }, true)).toBe(false);
    });

    it("shows drafts outside production", () => {
        expect(isPublished({ data: { draft: true } }, false)).toBe(true);
    });
});

describe("formatArticleDate", () => {
    it("formats dates in English day-month-year form for every article", () => {
        expect(formatArticleDate(new Date("2026-07-05"))).toBe("5 July 2026");
    });
});
