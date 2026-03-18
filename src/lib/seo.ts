import instanceConfig from "../../instance.config.mjs";
import { SITE_DESCRIPTION, SITE_NAME } from "./constants";
import { getCanonicalUrl } from "./site";
import type { PostEntry } from "@/types/content";

type SocialImageSource =
  | string
  | {
      src: string;
      width?: number;
      height?: number;
      format?: string;
    };

type ResolvedSocialImage = {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  mimeType?: string;
};

function toAbsoluteImageUrl(source: string) {
  if (source.startsWith("http://") || source.startsWith("https://")) {
    return source;
  }

  return getCanonicalUrl(source);
}

function guessMimeType(source: string, format?: string) {
  const extension = (format || source.split(".").pop() || "").toLowerCase();

  switch (extension) {
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "webp":
      return "image/webp";
    case "gif":
      return "image/gif";
    case "svg":
    case "svg+xml":
      return "image/svg+xml";
    default:
      return undefined;
  }
}

function resolveSocialImage(source: SocialImageSource, alt: string): ResolvedSocialImage {
  if (typeof source === "string") {
    return {
      url: toAbsoluteImageUrl(source),
      alt,
      mimeType: guessMimeType(source)
    };
  }

  return {
    url: toAbsoluteImageUrl(source.src),
    alt,
    width: source.width,
    height: source.height,
    mimeType: guessMimeType(source.src, source.format)
  };
}

export function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: getCanonicalUrl("/"),
    potentialAction: {
      "@type": "SearchAction",
      target: `${getCanonicalUrl("/search")}?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
}

export function buildPageSchema({
  title,
  description,
  path,
  type = "WebPage"
}: {
  title: string;
  description: string;
  path: string;
  type?: "WebPage" | "CollectionPage" | "SearchResultsPage";
}) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    name: title,
    description,
    url: getCanonicalUrl(path),
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: getCanonicalUrl("/")
    }
  };
}

export function buildItemListSchema(posts: PostEntry[], path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    url: getCanonicalUrl(path),
    itemListElement: posts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: getCanonicalUrl(`/blog/${post.slug}`),
      name: post.data.title
    }))
  };
}

export function buildOrgSchema() {
  return {
    "@context": "https://schema.org",
    "@type": instanceConfig.organization.type,
    name: instanceConfig.organization.name,
    url: instanceConfig.organization.url
  };
}

export function buildBreadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getCanonicalUrl(item.path)
    }))
  };
}

export function buildArticleSchema(post: PostEntry) {
  const authorName = post.data.author || instanceConfig.authorship.defaultAuthor;
  const socialImage = getPostSocialMetadata(post).image;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.data.title,
    description: post.data.description,
    datePublished: post.data.publishedAt.toISOString(),
    dateModified: (post.data.updatedAt || post.data.publishedAt).toISOString(),
    author: {
      "@type": "Person",
      name: authorName
    },
    publisher: {
      "@type": instanceConfig.organization.type,
      name: instanceConfig.organization.name,
      url: instanceConfig.organization.url
    },
    mainEntityOfPage: getCanonicalUrl(`/blog/${post.slug}`),
    articleSection: post.data.categories[0],
    keywords: [...post.data.categories, ...post.data.tags].join(", "),
    inLanguage: "en",
    image: socialImage
      ? {
          "@type": "ImageObject",
          url: socialImage.url,
          width: socialImage.width,
          height: socialImage.height,
          caption: socialImage.alt
        }
      : undefined
  };
}

export function buildFaqSchema(post: PostEntry) {
  if (!post.data.faq.length) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.data.faq.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: entry.answer
      }
    }))
  };
}

export function getPostSocialMetadata(post: PostEntry) {
  const fallbackAlt = `${post.data.title} social image`;
  const image = post.data.socialImage
    ? resolveSocialImage(post.data.socialImage, post.data.socialImageAlt || fallbackAlt)
    : getDefaultSocialImage(fallbackAlt);

  return {
    type: "article",
    image,
    publishedTime: post.data.publishedAt.toISOString(),
    modifiedTime: (post.data.updatedAt || post.data.publishedAt).toISOString(),
    author: post.data.author || instanceConfig.authorship.defaultAuthor,
    tags: post.data.tags,
    section: post.data.categories[0]
  };
}

export function getDefaultSocialImage(alt = `${SITE_NAME} social image`) {
  const configuredFallback = instanceConfig.fallbackSocialImage;

  if (!configuredFallback) {
    return resolveSocialImage("/social/site.svg", alt);
  }

  return resolveSocialImage(configuredFallback, alt);
}

export function getPageSocialMetadata(type: "website" | "article" = "website") {
  return {
    type,
    image: getDefaultSocialImage(`${SITE_NAME} social image`)
  };
}
