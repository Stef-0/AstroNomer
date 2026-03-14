import instanceConfig from "../../instance.config.mjs";
import { SITE_DESCRIPTION, SITE_NAME } from "./constants";
import { getCanonicalUrl, getSiteUrl } from "./site";
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
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.data.title,
    description: post.data.description,
    datePublished: post.data.publishedAt.toISOString(),
    dateModified: (post.data.updatedAt || post.data.publishedAt).toISOString(),
    author: {
      "@type": "Person",
      name: post.data.author || instanceConfig.authorship.defaultAuthor
    },
    mainEntityOfPage: getCanonicalUrl(`/blog/${post.slug}`),
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
