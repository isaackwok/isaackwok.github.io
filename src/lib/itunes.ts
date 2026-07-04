export interface AlbumTrack {
    name: string;
    previewUrl: string;
}

export interface AlbumLookup {
    artworkUrl: string;
    tracks: AlbumTrack[];
}

interface ItunesResult {
    wrapperType: string;
    artworkUrl100?: string;
    trackName?: string;
    previewUrl?: string;
}

/**
 * Resolve an album's artwork and preview-playable track list from the
 * iTunes Lookup API. Runs at build time only — visitors never call this.
 * Throws (failing the build loudly) when the album can't be resolved.
 */
export async function lookupAlbum(
    itunesId: number,
    country: string,
): Promise<AlbumLookup> {
    const params = new URLSearchParams({
        id: String(itunesId),
        entity: "song",
        country,
    });
    // Without lang the API romanizes Japanese metadata
    // ("Nekoto Allergie" instead of 猫とアレルギー).
    if (country === "jp") params.set("lang", "ja_jp");

    const res = await fetch(`https://itunes.apple.com/lookup?${params}`);
    if (!res.ok) {
        throw new Error(
            `iTunes lookup failed for album ${itunesId} (${country}): HTTP ${res.status}`,
        );
    }
    const data = (await res.json()) as { results?: ItunesResult[] };
    const results = data.results ?? [];
    const collection = results.find((r) => r.wrapperType === "collection");
    if (!collection?.artworkUrl100) {
        throw new Error(
            `iTunes lookup for album ${itunesId} (${country}) returned no album — check itunesId/country in music.yaml`,
        );
    }
    const tracks = results
        .filter(
            (r): r is ItunesResult & { trackName: string; previewUrl: string } =>
                r.wrapperType === "track" && !!r.trackName && !!r.previewUrl,
        )
        .map((r) => ({ name: r.trackName, previewUrl: r.previewUrl }));

    return {
        artworkUrl: collection.artworkUrl100.replace("100x100bb", "600x600bb"),
        tracks,
    };
}
