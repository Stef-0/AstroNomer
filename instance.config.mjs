import { z } from "zod";

const navigationItemSchema = z.object({
  href: z.string().startsWith("/"),
  label: z.string().min(1)
});

const instanceConfigSchema = z.object({
  siteName: z.string().min(1),
  siteDescription: z.string().min(1),
  fallbackSocialImage: z.string().startsWith("/").or(z.string().url()).optional(),
  purpose: z.enum(["blog", "documentation", "changelog", "seo-hub"]),
  mount: z.object({
    model: z.enum(["root", "subdirectory", "subdomain"]),
    basePath: z.string().min(1)
  }),
  authorship: z.object({
    mode: z.enum(["single-author", "multi-author-ready"]),
    defaultAuthor: z.string().min(1)
  }),
  features: z.object({
    darkMode: z.boolean(),
    newsletter: z.boolean(),
    analytics: z.enum(["ga4", "disabled"]),
    analyticsPrivacyMode: z.enum(["cookieless", "full"]),
    search: z.boolean(),
    richMediaLoadStrategy: z.enum(["click-to-load", "eager"])
  }),
  shell: z.object({
    mode: z.enum(["standalone", "host-integrated"]),
    navigation: z.array(navigationItemSchema).min(1),
    homepage: z.object({
      mode: z.enum(["content-first", "editorial-hero"])
    })
  }),
  blog: z.object({
    postsPerPage: z.number().int().min(1).max(100)
  }),
  deploy: z.object({
    transport: z.enum(["noop", "local-copy"])
  }),
  organization: z.object({
    type: z.enum(["Organization", "Person"]),
    name: z.string().min(1),
    url: z.string().url()
  })
});

const rawInstanceConfig = {
  siteName: "AstroNomer",
  siteDescription: "A reusable Astro publishing platform for blogs and content hubs.",
  fallbackSocialImage: undefined,
  purpose: "blog",
  mount: {
    model: "root",
    basePath: "/"
  },
  authorship: {
    mode: "single-author",
    defaultAuthor: "AstroNomer Team"
  },
  features: {
    darkMode: false,
    newsletter: true,
    analytics: "ga4",
    analyticsPrivacyMode: "cookieless",
    search: true,
    richMediaLoadStrategy: "click-to-load"
  },
  shell: {
    mode: "standalone",
    navigation: [
      {
        href: "/",
        label: "Home"
      },
      {
        href: "/blog",
        label: "Blog"
      },
      {
        href: "/search",
        label: "Search"
      },
      {
        href: "/rss.xml",
        label: "RSS"
      }
    ],
    homepage: {
      mode: "content-first"
    }
  },
  blog: {
    postsPerPage: 10
  },
  deploy: {
    transport: process.env.DEPLOY_TRANSPORT || "noop"
  },
  organization: {
    type: "Organization",
    name: "AstroNomer",
    url: "https://example.com"
  }
};

const instanceConfig = instanceConfigSchema.parse({
  ...rawInstanceConfig,
  mount: {
    ...rawInstanceConfig.mount,
    basePath: normalizeBasePath(rawInstanceConfig.mount.basePath)
  }
});

if (instanceConfig.mount.model === "root" && instanceConfig.mount.basePath !== "/") {
  throw new Error('Root-mounted instances must use "/" as `mount.basePath`.');
}

if (instanceConfig.mount.model === "subdirectory" && instanceConfig.mount.basePath === "/") {
  throw new Error("Subdirectory-mounted instances must declare a non-root `mount.basePath`.");
}

export default instanceConfig;

function normalizeBasePath(basePath) {
  const trimmed = basePath.trim();

  if (trimmed === "/") {
    return "/";
  }

  return `/${trimmed.replace(/^\/+|\/+$/g, "")}`;
}
