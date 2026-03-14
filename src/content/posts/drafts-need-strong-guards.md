---
title: Drafts Need Strong Guards
description: Build-time draft exclusion is simple, but it has to be reliable everywhere.
publishedAt: 2026-03-04
tags:
  - Core
  - Drafts
  - Security
  - Workflow
categories:
  - Operations
  - Platform
featured: false
author: Nora Vale
---

If a platform handles drafts, it has to exclude them everywhere that matters: pages, feeds, search indexes, and any generated route lists.

The whole point of a static draft system is that unpublished content never reaches production artifacts.
