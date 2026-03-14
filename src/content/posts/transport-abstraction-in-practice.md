---
title: Transport Abstraction In Practice
description: A single deploy command only works when transfer details stay behind one interface.
publishedAt: 2026-03-01
tags:
  - Core
  - Deploy
  - Operations
  - Platform
categories:
  - Engineering
  - Platform
featured: false
author: AstroNomer Team
---

Operators want one reliable publish command, not a collection of memorized host-specific steps.

That is why transport logic belongs behind a fixed deploy contract, even when the actual transfer target differs by instance.
