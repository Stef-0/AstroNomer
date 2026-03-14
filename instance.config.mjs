const instanceConfig = {
  siteName: "AstroNomer",
  siteDescription: "A reusable Astro publishing platform for blogs and content hubs.",
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
    search: true
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
    ]
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

export default instanceConfig;
