import { toString } from "mdast-util-to-string";
import getReadingTime from "reading-time";

/*
 * Injects minutesRead into every article's frontmatter at build time.
 * reading-time counts CJK characters individually, so Chinese articles
 * get sane estimates too.
 */
export function remarkReadingTime() {
    return function (tree, { data }) {
        const readingTime = getReadingTime(toString(tree));
        data.astro.frontmatter.minutesRead = Math.max(
            1,
            Math.ceil(readingTime.minutes),
        );
    };
}
