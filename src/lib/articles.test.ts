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
    const date = new Date("2026-07-05");

    it("formats English dates", () => {
        expect(formatArticleDate(date, "en")).toBe("5 July 2026");
    });

    it("formats Traditional Chinese dates", () => {
        expect(formatArticleDate(date, "zh-Hant")).toBe("2026年7月5日");
    });
});
