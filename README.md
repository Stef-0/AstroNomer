# AstroNomer

AstroNomer is a reusable static publishing base for blogs and content hubs built with Astro, MD/MDX content collections, Tailwind CSS v4, RSS, sitemap generation, Pagefind search, and a configurable deploy pipeline.

## What This Repo Includes
- Static Astro output with no backend runtime
- Markdown and MDX authoring with validated frontmatter
- Post, tag, category, search, RSS, and sitemap routes
- Rich media embeds, Shiki-powered code blocks, and structured SEO metadata
- Instance-level configuration for routing, analytics, rich media behavior, pagination, design tokens, and font delivery
- Configurable homepage mode for content-first or editorial-intro presentation

## Start Here
- Operators and integrators: [docs/IMPLEMENTATION_GUIDE.md](/Users/stefanorlic/code/astronomer/docs/IMPLEMENTATION_GUIDE.md)
- Authors and content teams: [docs/CONTENT_GUIDE.md](/Users/stefanorlic/code/astronomer/docs/CONTENT_GUIDE.md)
- Build status and spec drift tracking: [IMPLEMENTATION_TRACKER.md](/Users/stefanorlic/code/astronomer/IMPLEMENTATION_TRACKER.md)
- Product source spec: [AstroNomer-spec.md](/Users/stefanorlic/code/astronomer/AstroNomer-spec.md)

## Current MVP Shape
- Multi-instance-ready static blog platform
- Configurable base path and shell seam
- Configurable pagination, GA4 privacy mode, rich media loading strategy, and fallback social image
- Configurable font delivery architecture for `fontsource`, self-hosted files, or Google Fonts CDN
- Configurable homepage mode with `content-first` as the recommended default
- Verified archive, taxonomy, RSS, search, sitemap, and deploy flows

## Main Configuration Files
- [instance.config.mjs](/Users/stefanorlic/code/astronomer/instance.config.mjs): instance behavior and feature settings
- [.env.example](/Users/stefanorlic/code/astronomer/.env.example): environment variables and secret placeholders
- [src/styles/tokens.css](/Users/stefanorlic/code/astronomer/src/styles/tokens.css): visual design tokens
