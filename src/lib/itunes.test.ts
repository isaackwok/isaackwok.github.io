import { afterEach, describe, expect, it, vi } from "vitest";
import { lookupAlbum } from "./itunes";

function mockLookupResponse(
    body: unknown,
    init: { ok?: boolean; status?: number } = {},
) {
    const fetchMock = vi.fn().mockResolvedValue({
        ok: init.ok ?? true,
        status: init.status ?? 200,
        json: async () => body,
    });
    vi.stubGlobal("fetch", fetchMock);
    return fetchMock;
}

const album = {
    wrapperType: "collection",
    artworkUrl100:
        "https://is1-ssl.mzstatic.com/image/thumb/abc/100x100bb.jpg",
};

afterEach(() => {
    vi.unstubAllGlobals();
});

describe("lookupAlbum", () => {
    it("resolves artwork at 600x600 and the preview-playable tracks", async () => {
        mockLookupResponse({
            results: [
                album,
                {
                    wrapperType: "track",
                    trackName: "Planet Telex",
                    previewUrl: "https://audio.example/planet-telex.m4a",
                },
                {
                    wrapperType: "track",
                    trackName: "High and Dry",
                    previewUrl: "https://audio.example/high-and-dry.m4a",
                },
            ],
        });

        await expect(lookupAlbum(1097862703, "us")).resolves.toEqual({
            artworkUrl:
                "https://is1-ssl.mzstatic.com/image/thumb/abc/600x600bb.jpg",
            tracks: [
                {
                    name: "Planet Telex",
                    previewUrl: "https://audio.example/planet-telex.m4a",
                },
                {
                    name: "High and Dry",
                    previewUrl: "https://audio.example/high-and-dry.m4a",
                },
            ],
        });
    });

    it("skips tracks that have no preview URL", async () => {
        mockLookupResponse({
            results: [
                album,
                { wrapperType: "track", trackName: "No Preview" },
                {
                    wrapperType: "track",
                    trackName: "Has Preview",
                    previewUrl: "https://audio.example/has-preview.m4a",
                },
            ],
        });

        const { tracks } = await lookupAlbum(1, "us");
        expect(tracks).toEqual([
            {
                name: "Has Preview",
                previewUrl: "https://audio.example/has-preview.m4a",
            },
        ]);
    });

    it("requests id, song entity, and country", async () => {
        const fetchMock = mockLookupResponse({ results: [album] });

        await lookupAlbum(1097862703, "us");

        const url = new URL(fetchMock.mock.calls[0][0]);
        expect(url.origin + url.pathname).toBe(
            "https://itunes.apple.com/lookup",
        );
        expect(url.searchParams.get("id")).toBe("1097862703");
        expect(url.searchParams.get("entity")).toBe("song");
        expect(url.searchParams.get("country")).toBe("us");
        expect(url.searchParams.get("lang")).toBeNull();
    });

    it("asks for Japanese metadata on jp lookups", async () => {
        const fetchMock = mockLookupResponse({ results: [album] });

        await lookupAlbum(1440797361, "jp");

        const url = new URL(fetchMock.mock.calls[0][0]);
        expect(url.searchParams.get("lang")).toBe("ja_jp");
    });

    it("throws on an HTTP error so the build fails loudly", async () => {
        mockLookupResponse(null, { ok: false, status: 503 });

        await expect(lookupAlbum(42, "us")).rejects.toThrow(
            "iTunes lookup failed for album 42 (us): HTTP 503",
        );
    });

    it("throws when the response contains no album collection", async () => {
        mockLookupResponse({
            results: [
                {
                    wrapperType: "track",
                    trackName: "Orphan Track",
                    previewUrl: "https://audio.example/orphan.m4a",
                },
            ],
        });

        await expect(lookupAlbum(42, "us")).rejects.toThrow(
            "check itunesId/country in music.yaml",
        );
    });

    it("throws when the response body has no results at all", async () => {
        mockLookupResponse({});

        await expect(lookupAlbum(42, "us")).rejects.toThrow(
            "returned no album",
        );
    });
});
