#!/usr/bin/env node
import { existsSync, writeFileSync } from "node:fs";
import { articleTemplate, slugify } from "../src/lib/new-article.mjs";

const [title, explicitSlug] = process.argv.slice(2);

if (!title) {
    console.error('Usage: pnpm new:article "Article title" [slug]');
    process.exit(1);
}

const slug = slugify(explicitSlug ?? title);
if (!slug) {
    console.error(
        "Could not derive a slug from that title (no latin characters).",
    );
    console.error('Pass one explicitly: pnpm new:article "中文標題" my-slug');
    process.exit(1);
}

const target = new URL(`../src/content/articles/${slug}.md`, import.meta.url);
if (existsSync(target)) {
    console.error(`Already exists: src/content/articles/${slug}.md`);
    process.exit(1);
}

writeFileSync(target, articleTemplate(title, new Date()));
console.log(`Created src/content/articles/${slug}.md`);
console.log(
    "Next: fill in the description, write, then set draft: false to publish.",
);
