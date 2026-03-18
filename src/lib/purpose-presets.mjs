export const purposePresets = {
  blog: {
    navigation: [
      { href: "/", label: "Home" },
      { href: "/blog", label: "Blog" },
      { href: "/search", label: "Search" },
      { href: "/rss.xml", label: "RSS" },
    ],
    homepageMode: "default",
    copy: {
      collectionLabel: "Blog",
      topline: "Independent Publishing System",
      tagline: "Editorial infrastructure for static publishing.",
      footerEyebrow: "AstroNomer Edition",
      archiveEyebrow: "Archive",
      archiveTitle: "All posts",
      homepageHeroEyebrow: "Latest Edition",
      homepageHeroTitle: "Start with the newest and strongest work",
      homepageFeaturedLabel: "Featured",
      homepageArchiveEyebrow: "Recent Posts",
      homepageArchiveTitle: "From the archive",
      homepageNewsletterTitle: "Newsletter desk",
      homepageNewsletterDescription:
        "Subscribe to new issues through the instance newsletter surface.",
      postNewsletterTitle: "Newsletter desk",
      postNewsletterDescription:
        "Subscribe through the instance newsletter surface without leaving the reading flow.",
    },
  },
  documentation: {
    navigation: [
      { href: "/", label: "Home" },
      { href: "/blog", label: "Docs" },
      { href: "/search", label: "Search" },
      { href: "/rss.xml", label: "RSS" },
    ],
    homepageMode: "posts-only",
    copy: {
      collectionLabel: "Docs",
      topline: "Documentation Instance",
      tagline: "Reference-first publishing for product knowledge.",
      footerEyebrow: "Documentation Index",
      archiveEyebrow: "Documentation",
      archiveTitle: "All guides",
      homepageHeroEyebrow: "Latest Update",
      homepageHeroTitle: "Start with the latest guidance and reference work",
      homepageFeaturedLabel: "Key Reading",
      homepageArchiveEyebrow: "Documentation",
      homepageArchiveTitle: "Browse the latest guides",
      homepageNewsletterTitle: "Documentation updates",
      homepageNewsletterDescription:
        "Get new guides and reference changes through the instance newsletter surface.",
      postNewsletterTitle: "Documentation updates",
      postNewsletterDescription:
        "Follow new guides and reference changes without leaving the reading flow.",
    },
  },
  changelog: {
    navigation: [
      { href: "/", label: "Home" },
      { href: "/blog", label: "Updates" },
      { href: "/search", label: "Search" },
      { href: "/rss.xml", label: "Release Feed" },
    ],
    homepageMode: "posts-only",
    copy: {
      collectionLabel: "Updates",
      topline: "Release Publishing System",
      tagline: "A clear running record of product changes.",
      footerEyebrow: "Release Index",
      archiveEyebrow: "Release notes",
      archiveTitle: "All releases",
      homepageHeroEyebrow: "Latest Release",
      homepageHeroTitle: "Start with the newest shipping changes",
      homepageFeaturedLabel: "Latest Release",
      homepageArchiveEyebrow: "Release notes",
      homepageArchiveTitle: "Recent product changes",
      homepageNewsletterTitle: "Release bulletin",
      homepageNewsletterDescription:
        "Follow shipping changes and release notes through the instance newsletter surface.",
      postNewsletterTitle: "Release bulletin",
      postNewsletterDescription:
        "Get shipping changes and release notes without leaving the reading flow.",
    },
  },
  "seo-hub": {
    navigation: [
      { href: "/", label: "Home" },
      { href: "/blog", label: "Library" },
      { href: "/search", label: "Search" },
      { href: "/rss.xml", label: "RSS" },
    ],
    homepageMode: "editorial-hero",
    copy: {
      collectionLabel: "Library",
      topline: "Search Publishing System",
      tagline: "Evergreen publishing for discoverability and answer engines.",
      footerEyebrow: "Search Library",
      archiveEyebrow: "Library",
      archiveTitle: "All coverage",
      homepageHeroEyebrow: "Key Coverage",
      homepageHeroTitle: "Start with the strongest pages for search and discovery",
      homepageFeaturedLabel: "Featured Library",
      homepageArchiveEyebrow: "Library updates",
      homepageArchiveTitle: "Recent publishing coverage",
      homepageNewsletterTitle: "Library updates",
      homepageNewsletterDescription:
        "Follow new search-focused publishing through the instance newsletter surface.",
      postNewsletterTitle: "Library updates",
      postNewsletterDescription:
        "Stay on top of new search-focused publishing without leaving the reading flow.",
    },
  },
};

export function getPurposePreset(purpose) {
  return purposePresets[purpose] ?? purposePresets.blog;
}
