---
title: Search Without A Backend
description: Static search can still feel fast when indexing is part of the deploy chain.
publishedAt: 2026-03-08
tags:
  - Core
  - Search
  - Pagefind
  - Platform
categories:
  - Engineering
  - Platform
featured: false
author: Jonah Reed
---

Readers care about search quality, not whether the index came from a server or a build step.

For this platform, the important decision is that search generation stays in the publish path so nobody has to remember an extra manual step.
