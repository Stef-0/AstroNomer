import { getCollection } from "astro:content";
import readingTime from "reading-time";
import instanceConfig from "../../instance.config.mjs";
import { toSlug } from "./slug";
import type { PostEntry } from "@/types/content";

export async function getPublishedPosts() {
  const posts = await getCollection("posts");

  return posts
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());
}

export async function getFeaturedPosts() {
  const posts = await getPublishedPosts();
  return posts.filter((post) => post.data.featured);
}

export function getPostReadingStats(post: PostEntry) {
  return readingTime(post.body);
}

export async function getTagMap() {
  const posts = await getPublishedPosts();
  return createTaxonomyMap(posts, "tags");
}

export async function getCategoryMap() {
  const posts = await getPublishedPosts();
  return createTaxonomyMap(posts, "categories");
}

export function getAuthorName(post: PostEntry) {
  return post.data.author || instanceConfig.authorship.defaultAuthor;
}

function createTaxonomyMap(posts: PostEntry[], key: "tags" | "categories") {
  return posts.reduce<Map<string, PostEntry[]>>((map, post) => {
    for (const value of post.data[key]) {
      const slug = toSlug(value);
      const current = map.get(slug) || [];
      current.push(post);
      map.set(slug, current);
    }

    return map;
  }, new Map());
}

