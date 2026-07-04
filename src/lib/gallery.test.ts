import { describe, expect, it } from "vitest";
import { parseGallery } from "./gallery";

describe("parseGallery", () => {
    it("derives each entry's id from the image filename, extension stripped", () => {
        const entries = parseGallery(
            [
                "- image: ../assets/gallery/DSCF1398.JPG",
                "  alt: A street scene.",
                "  caption: Tokyo, Japan (2025)",
            ].join("\n"),
        );

        expect(entries).toEqual([
            {
                image: "../assets/gallery/DSCF1398.JPG",
                alt: "A street scene.",
                caption: "Tokyo, Japan (2025)",
                id: "DSCF1398",
                order: 0,
            },
        ]);
    });

    it("numbers entries in file order so top-to-bottom is display order", () => {
        const entries = parseGallery(
            [
                "- image: ../assets/gallery/b.JPG",
                "  alt: b",
                "  caption: b",
                "- image: ../assets/gallery/a.JPG",
                "  alt: a",
                "  caption: a",
            ].join("\n"),
        );

        expect(entries.map((e) => [e.id, e.order])).toEqual([
            ["b", 0],
            ["a", 1],
        ]);
    });

    it("only strips the final extension from dotted filenames", () => {
        const [entry] = parseGallery(
            "- image: ../assets/gallery/trip.day1.jpeg\n  alt: x\n  caption: x",
        );
        expect(entry.id).toBe("trip.day1");
    });

    it("returns an empty list for an empty file", () => {
        expect(parseGallery("")).toEqual([]);
    });
});
