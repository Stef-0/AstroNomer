import instanceConfig from "../../instance.config.mjs";
import { SITE_DESCRIPTION, SITE_NAME } from "./constants";
import { getCanonicalUrl } from "./site";
import type { PostEntry } from "@/types/content";

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
    image: post.data.image ? getCanonicalUrl(post.data.image.src) : undefined
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
  return {
    type: "article",
    image: post.data.image ? getCanonicalUrl(post.data.image.src) : getDefaultSocialImage(),
    publishedTime: post.data.publishedAt.toISOString(),
    modifiedTime: (post.data.updatedAt || post.data.publishedAt).toISOString(),
    author: post.data.author || instanceConfig.authorship.defaultAuthor,
    tags: post.data.tags,
    section: post.data.categories[0]
  };
}

export function getDefaultSocialImage() {
  const configuredFallback = instanceConfig.fallbackSocialImage;

  if (!configuredFallback) {
    return getCanonicalUrl("/social/site.svg");
  }

  if (configuredFallback.startsWith("/")) {
    return getCanonicalUrl(configuredFallback);
  }

  return configuredFallback;
}

export function getPageSocialMetadata(type: "website" | "article" = "website") {
  return {
    type,
    image: getDefaultSocialImage()
  };
}
