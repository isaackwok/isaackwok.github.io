/*
 * Pure draft filter shared by the index page and getStaticPaths so the
 * rule can't drift. Callers pass import.meta.env.PROD; taking it as a
 * parameter keeps this testable without env stubbing.
 */
export function isPublished(
    entry: { data: { draft: boolean } },
    isProd: boolean,
): boolean {
    return !isProd || !entry.data.draft;
}

export function formatArticleDate(date: Date): string {
    // UTC keeps frontmatter dates (parsed as UTC midnight) stable in any TZ
    return new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
    }).format(date);
}
