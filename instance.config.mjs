import { z } from "zod";
import { getPurposePreset } from "./src/lib/purpose-presets.mjs";

const navigationItemSchema = z.object({
  href: z.string().startsWith("/"),
  label: z.string().min(1),
});

const headingLevelSchema = z.enum(["h2", "h3", "h4", "h5", "h6"]);
const urlOrRootRelativeSchema = z.string().startsWith("/").or(z.string().url());

const fontProviderSchema = z.discriminatedUnion("provider", [
  z.object({
    provider: z.literal("fontsource"),
    preset: z.enum(["newsreader-outfit"]),
  }),
  z.object({
    provider: z.literal("self-hosted"),
    stylesheets: z.array(z.string().startsWith("/")).min(1),
    preload: z.array(z.string().startsWith("/")).default([]),
  }),
  z.object({
    provider: z.literal("google-fonts"),
    stylesheets: z.array(z.string().url()).min(1),
    preconnectOrigins: z
      .array(z.string().url())
      .default(["https://fonts.googleapis.com", "https://fonts.gstatic.com"]),
  }),
]);

const newsletterConfigSchema = z.discriminatedUnion("mode", [
  z.object({
    mode: z.literal("placeholder"),
    eyebrow: z.string().min(1).default("Newsletter"),
    title: z.string().min(1),
    description: z.string().min(1),
  }),
  z.object({
    mode: z.literal("button"),
    eyebrow: z.string().min(1).default("Newsletter"),
    title: z.string().min(1),
    description: z.string().min(1),
    ctaLabel: z.string().min(1),
    href: urlOrRootRelativeSchema,
    note: z.string().min(1).optional(),
  }),
  z.object({
    mode: z.literal("form"),
    eyebrow: z.string().min(1).default("Newsletter"),
    title: z.string().min(1),
    description: z.string().min(1),
    action: urlOrRootRelativeSchema,
    method: z.enum(["get", "post"]).default("post"),
    submitLabel: z.string().min(1),
    emailName: z.string().min(1).default("email"),
    emailPlaceholder: z.string().min(1).default("you@example.com"),
    note: z.string().min(1).optional(),
    hiddenFields: z
      .array(
        z.object({
          name: z.string().min(1),
          value: z.string(),
        }),
      )
      .default([]),
  }),
  z.object({
    mode: z.literal("embed"),
    eyebrow: z.string().min(1).default("Newsletter"),
    title: z.string().min(1),
    description: z.string().min(1),
    src: urlOrRootRelativeSchema,
    minHeight: z.number().int().min(240).max(1600).default(420),
    note: z.string().min(1).optional(),
  }),
]);

const instanceConfigSchema = z.object({
  siteName: z.string().min(1),
  siteDescription: z.string().min(1),
  fallbackSocialImage: z
    .string()
    .startsWith("/")
    .or(z.string().url())
    .optional(),
  fonts: fontProviderSchema,
  purpose: z.enum(["blog", "documentation", "changelog", "seo-hub"]),
  mount: z.object({
    model: z.enum(["root", "subdirectory", "subdomain"]),
    basePath: z.string().min(1),
  }),
  authorship: z.object({
    mode: z.enum(["single-author", "multi-author-ready"]),
    defaultAuthor: z.string().min(1),
  }),
  features: z.object({
    darkMode: z.boolean(),
    newsletter: z.boolean(),
    analytics: z.enum(["ga4", "disabled"]),
    analyticsPrivacyMode: z.enum(["cookieless", "full"]),
    search: z.boolean(),
    richMediaLoadStrategy: z.enum(["click-to-load", "eager"]),
  }),
  shell: z.object({
    mode: z.enum(["standalone", "host-integrated"]),
    navigation: z.array(navigationItemSchema).min(1).optional(),
    homepage: z.object({
      mode: z.enum(["default", "editorial-hero", "posts-only"]).optional(),
    }).default({}),
    copy: z.object({
      collectionLabel: z.string().min(1).optional(),
      topline: z.string().min(1).optional(),
      tagline: z.string().min(1).optional(),
      footerEyebrow: z.string().min(1).optional(),
      archiveEyebrow: z.string().min(1).optional(),
      archiveTitle: z.string().min(1).optional(),
      homepageHeroEyebrow: z.string().min(1).optional(),
      homepageHeroTitle: z.string().min(1).optional(),
      homepageFeaturedLabel: z.string().min(1).optional(),
      homepageArchiveEyebrow: z.string().min(1).optional(),
      homepageArchiveTitle: z.string().min(1).optional(),
      homepageNewsletterTitle: z.string().min(1).optional(),
      homepageNewsletterDescription: z.string().min(1).optional(),
      postNewsletterTitle: z.string().min(1).optional(),
      postNewsletterDescription: z.string().min(1).optional(),
      footerCredit: z.string().optional(),
    }).default({}),
  }),
  blog: z.object({
    postsPerPage: z.number().int().min(1).max(100),
    tableOfContents: z.object({
      enabled: z.boolean(),
      title: z.string().min(1),
      levels: z.array(headingLevelSchema).min(1),
    }),
  }),
  deploy: z.object({
    transport: z.enum(["noop", "local-copy"]),
  }),
  organization: z.object({
    type: z.enum(["Organization", "Person"]),
    name: z.string().min(1),
    url: z.string().url(),
  }),
  newsletter: newsletterConfigSchema,
});

const rawInstanceConfig = {
  siteName: "AstroNomer",
  siteDescription:
    "A reusable Astro publishing platform for blogs and content hubs.",
  fallbackSocialImage: undefined,
  fonts: {
    provider: "fontsource",
    preset: "newsreader-outfit",
  },
  purpose: "blog",
  mount: {
    model: "root",
    basePath: "/",
  },
  authorship: {
    mode: "single-author",
    defaultAuthor: "AstroNomer Team",
  },
  features: {
    darkMode: false,
    newsletter: true,
    analytics: "ga4",
    analyticsPrivacyMode: "cookieless",
    search: true,
    richMediaLoadStrategy: "click-to-load",
  },
  shell: {
    mode: "standalone",
    navigation: undefined,
    homepage: {},
    copy: {},
  },
  blog: {
    postsPerPage: 10,
    tableOfContents: {
      enabled: false,
      title: "On this page",
      levels: ["h2", "h3"],
    },
  },
  deploy: {
    transport: process.env.DEPLOY_TRANSPORT || "noop",
  },
  organization: {
    type: "Organization",
    name: "AstroNomer",
    url: "https://example.com",
  },
  newsletter: {
    mode: "button",
    eyebrow: "Newsletter",
    title: "Newsletter desk",
    description:
      "Follow new issues by email through the instance newsletter surface.",
    ctaLabel: "Subscribe",
    href: "https://example.com/newsletter",
    note: "Replace this example destination with your provider-hosted subscribe page, or switch to form or embed mode.",
  },
};

const parsedInstanceConfig = instanceConfigSchema.parse({
  ...rawInstanceConfig,
  mount: {
    ...rawInstanceConfig.mount,
    basePath: normalizeBasePath(rawInstanceConfig.mount.basePath),
  },
});

const purposePreset = getPurposePreset(parsedInstanceConfig.purpose);

const instanceConfig = {
  ...parsedInstanceConfig,
  shell: {
    ...parsedInstanceConfig.shell,
    navigation:
      parsedInstanceConfig.shell.navigation ?? purposePreset.navigation,
    homepage: {
      ...parsedInstanceConfig.shell.homepage,
      mode:
        parsedInstanceConfig.shell.homepage.mode ?? purposePreset.homepageMode,
    },
    copy: {
      ...purposePreset.copy,
      ...parsedInstanceConfig.shell.copy,
    },
  },
};

if (
  instanceConfig.mount.model === "root" &&
  instanceConfig.mount.basePath !== "/"
) {
  throw new Error('Root-mounted instances must use "/" as `mount.basePath`.');
}

if (
  instanceConfig.mount.model === "subdirectory" &&
  instanceConfig.mount.basePath === "/"
) {
  throw new Error(
    "Subdirectory-mounted instances must declare a non-root `mount.basePath`.",
  );
}

export default instanceConfig;

function normalizeBasePath(basePath) {
  const trimmed = basePath.trim();

  if (trimmed === "/") {
    return "/";
  }

  return `/${trimmed.replace(/^\/+|\/+$/g, "")}`;
}
