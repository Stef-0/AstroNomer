import rss from "@astrojs/rss";
import { getPublishedPosts } from "@/lib/content";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/constants";
import { getCanonicalUrl } from "@/lib/site";

export async function GET(context) {
  const posts = await getPublishedPosts();

  return rss({
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishedAt,
      link: `/blog/${post.slug}`,
      customData: `<content:encoded><![CDATA[${post.body}]]></content:encoded>`,
      categories: [...post.data.categories, ...post.data.tags]
    })),
    customData: `<language>en-us</language><atom:link href="${getCanonicalUrl("/rss.xml")}" rel="self" type="application/rss+xml" />`
  });
}

