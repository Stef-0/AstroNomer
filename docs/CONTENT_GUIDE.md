# AstroNomer Content Guide

This guide is for authors and editors working inside an AstroNomer instance.

## Where Content Lives

Posts live in:
- [/Users/stefanorlic/code/astronomer/src/content/posts](/Users/stefanorlic/code/astronomer/src/content/posts)

Supported formats:
- `.md`
- `.mdx`

Use `.mdx` when you need embeds or interactive MDX components.

## Required Frontmatter

Every post needs:
- `title`
- `description`
- `publishedAt`
- `tags`

Example:

```md
---
title: Example Post
description: A short summary for listings and metadata.
publishedAt: 2026-03-14
tags:
  - Example
  - Writing
---
```

## Optional Frontmatter

Supported optional fields:
- `updatedAt`
- `categories`
- `image`
- `imageAlt`
- `draft`
- `featured`
- `author`
- `faq`

### Notes
- `draft: true`
  Excludes the post from production routes, RSS, and search output
- `featured: true`
  Lets the homepage prioritize the post
- `author`
  Overrides the instance default author for that post
- `image`
  Becomes the post’s social image when present
- `faq`
  Generates FAQ structured data on the post page

## Draft Workflow

Use:

```md
draft: true
```

Draft behavior:
- visible in source control
- not included in generated public output
- not included in RSS
- not included in Pagefind search

## Tags And Categories

Use tags for cross-cutting topics and categories for broader grouping.

Example:

```md
tags:
  - SEO
  - Metadata
categories:
  - Growth
```

AstroNomer automatically generates:
- tag pages
- category pages
- paginated archive pages where needed

## MDX Components

Current supported MDX components:
- `CodeBlock`
- `Figure`
- `YouTubeEmbed`
- `VimeoEmbed`
- `CodePenEmbed`
- `GitHubGistEmbed`
- `TwitterEmbed`

### `CodeBlock`

Example:

```mdx
<CodeBlock
  lang="bash"
  filename="deploy.sh"
  code={`npm run build\nnpm run pagefind\nnpm run transfer`}
/>
```

Behavior:
- Shiki-powered highlighting
- line numbers always on
- copy-to-clipboard button

### Rich Media Embeds

Example:

```mdx
<YouTubeEmbed id="dQw4w9WgXcQ" title="Example video" />
```

Embed loading behavior depends on the instance:
- `click-to-load`
- `eager`

Authors do not need to change content based on that setting.

## Social Images

Post social image behavior:
- if `image` is set in the post, that image is used
- otherwise the instance fallback social image is used
- if no instance fallback image is configured, the generated default site image is used

If you want a specific post to have its own social card image, set `image`.

## Publishing Model

The project uses a code/content workflow, not an in-app CMS.

Typical flow:
1. Create or edit a post file
2. Validate frontmatter by building the site
3. Remove `draft: true` when the post is ready
4. Deploy through the platform’s standard deploy path

## Writing Guidelines For This Repo

- keep `description` concise and useful in listings
- use tags consistently so taxonomy pages stay meaningful
- use categories sparingly and intentionally
- prefer `.md` unless you need MDX components
- use `faq` only when the content really supports question/answer structure

## Common Patterns

### Single-author default

Omit `author` and let the instance-level default author be used.

### Override author on one post

```md
author: Jane Doe
```

### Mark a post as featured

```md
featured: true
```

### Add FAQ schema

```md
faq:
  - question: What does this feature do?
    answer: It improves discoverability and keeps metadata structured.
```

## What Authors Do Not Need To Touch

Unless you are also acting as an operator, you usually do not need to change:
- [instance.config.mjs](/Users/stefanorlic/code/astronomer/instance.config.mjs)
- [.env.example](/Users/stefanorlic/code/astronomer/.env.example)
- [src/styles/tokens.css](/Users/stefanorlic/code/astronomer/src/styles/tokens.css)
- deploy transport settings
- analytics settings

Those are operator-level concerns.

