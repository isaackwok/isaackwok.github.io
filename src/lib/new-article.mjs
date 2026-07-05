/*
 * Pure logic for the new:article scaffold script (scripts/new-article.mjs).
 * Lives in src/lib so the vitest include pattern covers it.
 */

export function slugify(title) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

function yamlQuote(value) {
    return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

export function articleTemplate(title, date) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `---
title: ${yamlQuote(title)}
description: "TODO — replace with a one-line summary for meta tags."
date: ${yyyy}-${mm}-${dd}
draft: true
---

Write here…
`;
}
