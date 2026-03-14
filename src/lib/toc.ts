import type { MarkdownHeading } from "astro";
import instanceConfig from "../../instance.config.mjs";

type HeadingLevel = "h2" | "h3" | "h4" | "h5" | "h6";

type TocOverride =
  | boolean
  | {
      enabled?: boolean;
      title?: string;
      levels?: HeadingLevel[];
      include?: string[];
    }
  | undefined;

export interface TocItem {
  depth: number;
  slug: string;
  text: string;
}

export interface PostTableOfContents {
  title: string;
  items: TocItem[];
}

export function buildPostTableOfContents(headings: MarkdownHeading[], override: TocOverride): PostTableOfContents | undefined {
  const config = resolveTocConfig(override);

  if (!config.enabled) {
    return undefined;
  }

  const allowedDepths = new Set(config.levels.map(levelToDepth));
  const includedHeadings = config.include ? new Set(config.include.map(normalizeHeadingText)) : undefined;

  const items = headings
    .filter((heading) => allowedDepths.has(heading.depth))
    .filter((heading) => !includedHeadings || includedHeadings.has(normalizeHeadingText(heading.text)))
    .map((heading) => ({
      depth: heading.depth,
      slug: heading.slug,
      text: heading.text
    }));

  if (!items.length) {
    return undefined;
  }

  return {
    title: config.title,
    items
  };
}

function resolveTocConfig(override: TocOverride) {
  const defaults = instanceConfig.blog.tableOfContents;

  if (typeof override === "boolean") {
    return {
      ...defaults,
      enabled: override
    };
  }

  return {
    ...defaults,
    ...override,
    levels: override?.levels ?? defaults.levels
  };
}

function levelToDepth(level: HeadingLevel) {
  return Number(level.slice(1));
}

function normalizeHeadingText(value: string) {
  return value.trim().toLowerCase();
}
