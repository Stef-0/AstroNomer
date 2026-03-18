# AstroNomer Implementation Guide

This guide is for operators, developers, and host-site integrators setting up or adapting an AstroNomer instance.

## What AstroNomer Is
- A statically generated publishing platform built on Astro
- A reusable base for blogs, content hubs, changelogs, or documentation-style instances
- A code-managed system with no runtime admin backend in the MVP

## Core Configuration Model

AstroNomer is organized around three configuration layers:

1. `.env`
   Use for environment-specific values and secrets.

2. `instance.config.mjs`
   Use for instance behavior and platform options.

3. `src/styles/tokens.css`
   Use for visual design tokens and theming.

Keep these boundaries intact. Do not put secrets in source code or design tokens in environment variables.

## Environment Variables

Use [.env.example](/Users/stefanorlic/code/astronomer/.env.example) as the starting point.

Current variables:
- `PUBLIC_SITE_URL`
  The canonical site URL for metadata, RSS, and sitemap generation.
- `PUBLIC_GA4_ID`
  The GA4 measurement ID when analytics is enabled.
- `DEPLOY_LOCAL_TARGET`
  Output target when using the `local-copy` deploy transport.
- `DEPLOY_TRANSPORT`
  Optional override used to test supported transports without editing `instance.config.mjs`.

## Instance Configuration

[instance.config.mjs](/Users/stefanorlic/code/astronomer/instance.config.mjs) is validated with Zod at import time. Invalid values fail fast.

### Site Identity
- `siteName`
- `siteDescription`
- `purpose`
- `fallbackSocialImage`

`fallbackSocialImage` may be:
- a root-relative path like `"/images/social-default.jpg"`
- an absolute URL like `"https://cdn.example.com/social/default.jpg"`

If omitted, AstroNomer uses the generated default social image at `/social/site.svg`.

Content image model:
- `socialImage` is the post’s social/share image
- `featuredImage` is the post’s on-site editorial image

### Mounting And Routing
- `mount.model`
  Supported values: `root`, `subdirectory`, `subdomain`
- `mount.basePath`

Rules:
- `root` must use `"/"`
- `subdirectory` must use a non-root path like `"/blog"`
- `subdomain` may still use `"/"`

### Authorship
- `authorship.mode`
  Supported values: `single-author`, `multi-author-ready`
- `authorship.defaultAuthor`

This affects default display behavior and metadata, not runtime permissions.

### Font Delivery
- `fonts.provider`
  Supported values: `fontsource`, `self-hosted`, `google-fonts`

Current provider config shapes:
- `fontsource`
  - `preset`
  - current built-in preset: `newsreader-outfit`
- `self-hosted`
  - `stylesheets`
  - `preload`
- `google-fonts`
  - `stylesheets`
  - `preconnectOrigins`

Recommended usage:
- use `fontsource` when the desired typefaces are available as packages
- use `self-hosted` for downloaded or licensed font files you want to serve from your own site
- use `google-fonts` only as an explicit convenience tradeoff when third-party runtime requests are acceptable

Notes:
- tokenized font families still live in [src/styles/tokens.css](/Users/stefanorlic/code/astronomer/src/styles/tokens.css)
- the provider controls delivery, not the token names
- a downloaded Google Font served from your own site belongs in the `self-hosted` workflow, not the `google-fonts` workflow

### Feature Options
- `features.darkMode`
- `features.newsletter`
- `features.analytics`
  Supported values: `ga4`, `disabled`
- `features.analyticsPrivacyMode`
  Supported values: `cookieless`, `full`
- `features.search`
- `features.richMediaLoadStrategy`
  Supported values: `click-to-load`, `eager`

Behavior notes:
- `analytics: "ga4"` with `analyticsPrivacyMode: "cookieless"` uses privacy-reduced GA4
- `analytics: "ga4"` with `analyticsPrivacyMode: "full"` enables standard GA4 behavior
- `richMediaLoadStrategy: "click-to-load"` keeps embeds behind an activation step
- `richMediaLoadStrategy: "eager"` renders embeds immediately

### Newsletter Activation

`newsletter.mode` supports:
- `placeholder`
- `button`
- `form`
- `embed`

Recommended usage:
- `button` for a provider-hosted subscribe page
- `form` for a public provider subscribe endpoint
- `embed` for iframe-based provider widgets

Important:
- newsletter config values are public runtime values, not secrets
- keep private provider tokens and administrative credentials out of source control
- deeper provider abstraction and provider-equivalence rules are still post-MVP concerns

### Blog Behavior
- `blog.postsPerPage`
- `blog.tableOfContents.enabled`
- `blog.tableOfContents.title`
- `blog.tableOfContents.levels`

Default is `10`, but pagination is configurable per instance. This is an intentional implementation override from the original spec lock.

Table of contents behavior:
- instance defaults live in `blog.tableOfContents`
- recommended default levels are `h2` and `h3`
- per-post frontmatter can disable the TOC, override heading levels, change the TOC title, or include only named headings

### Shell And Navigation
- `shell.mode`
  Supported values: `standalone`, `host-integrated`
- `shell.navigation`
- `shell.homepage.mode`
  Supported values: `content-first`, `editorial-hero`

Each navigation item must include:
- `href`
- `label`

Homepage behavior:
- `content-first` starts with a lead content package and recent posts
- `editorial-hero` adds the larger editorial intro block above the lead content package

Recommendation:
- use `content-first` for most live publications
- use `editorial-hero` only when the instance needs a stronger brand or mission statement at the top of the homepage

### Deploy Transport
- `deploy.transport`
  Supported values: `noop`, `local-copy`

Current behavior:
- `noop` leaves generated output in `dist`
- `local-copy` copies `dist` to `DEPLOY_LOCAL_TARGET`

### Organization Metadata
- `organization.type`
  Supported values: `Organization`, `Person`
- `organization.name`
- `organization.url`

This feeds structured data and metadata output.

## Fresh Instance Setup

1. Set the public site URL in `.env`.
2. Edit [instance.config.mjs](/Users/stefanorlic/code/astronomer/instance.config.mjs) for:
   routing, authorship, fonts, analytics, newsletter activation, embeds, homepage mode, pagination, and social fallback image.
3. Adjust [src/styles/tokens.css](/Users/stefanorlic/code/astronomer/src/styles/tokens.css) to match the target brand.
4. Add or replace content in [/Users/stefanorlic/code/astronomer/src/content/posts](/Users/stefanorlic/code/astronomer/src/content/posts).
5. Build and deploy through the single deploy chain.

## Mounting Into An Existing Site

AstroNomer supports two integration patterns:

1. Shell replacement
   Adapt [src/components/SiteShell.astro](/Users/stefanorlic/code/astronomer/src/components/SiteShell.astro) to match host navigation/footer markup.

2. Token matching
   Keep the default shell and align the look via [src/styles/tokens.css](/Users/stefanorlic/code/astronomer/src/styles/tokens.css).

For mounted instances:
- set the correct `mount.model`
- set the correct `mount.basePath`
- make sure `PUBLIC_SITE_URL` and the base path together produce correct canonical URLs

## SEO And Social Behavior

Current behavior:
- posts can use their own social image through post frontmatter `socialImage`
- post images now emit richer social metadata when dimensions are available
- non-post pages use the instance fallback social image
- if no instance fallback image is configured, AstroNomer uses the generated `/social/site.svg`
- posts emit article metadata and JSON-LD
- archive, taxonomy, and search pages emit page-type schema and fallback social metadata

## Rich Media Behavior

Supported MDX embed providers:
- YouTube
- Vimeo
- CodePen
- GitHub Gist
- Twitter/X

Embed loading behavior is controlled instance-wide by `features.richMediaLoadStrategy`.

## Deployment Flow

The publish path is:

1. `npm run build`
2. `npm run pagefind`
3. `npm run transfer`

`npm run deploy` runs those steps in sequence and stops on failure.

## Security And Operational Notes

- Do not commit `.env` or any secret-bearing environment file.
- Keep deploy credentials and analytics IDs out of source.
- Use `.env.example` only for safe placeholders.
- Treat deploy authority as an operator responsibility unless you intentionally adopt a different workflow.
- If you use `analyticsPrivacyMode: "full"`, make sure your consent/compliance setup matches that choice.

## Current MVP Boundaries

Implemented:
- static publishing
- search
- RSS
- sitemap
- taxonomy
- SEO metadata
- configurable analytics/privacy
- configurable embed loading
- configurable fallback social image
- configurable pagination

Still intentionally deferred:
- analytics providers beyond GA4
- formal multi-author permissions
- advanced deploy rollback/recovery tooling
