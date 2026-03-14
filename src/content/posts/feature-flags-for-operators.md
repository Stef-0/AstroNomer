---
title: Feature Flags For Operators
description: Instance-level feature decisions should be explicit instead of hiding in component code.
publishedAt: 2026-03-03
tags:
  - Config
  - Core
  - Operations
  - Features
categories:
  - Operations
  - Platform
featured: false
author: Jonah Reed
---

Feature flags are not just for experiments. They are also a clean way to express what a specific instance should or should not do.

Putting those decisions in the instance configuration makes the platform easier to reuse safely.
