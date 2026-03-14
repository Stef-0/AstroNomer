# AstroNomer Implementation Tracker

This file is the working source for implementation status, intentional spec deviations, and drift checks against [AstroNomer-spec.md](/Users/stefanorlic/code/astronomer/AstroNomer-spec.md).

## How To Use This File
- Update `Status` when a requirement meaningfully changes.
- Record any intentional spec interpretation or override in `Decisions and Overrides`.
- Use `Drift Watch` to flag places where code and spec may diverge.
- Keep unresolved spec items visible until we either implement or intentionally defer them.

## Status Legend
- `not started`
- `in progress`
- `implemented`
- `partial`
- `deferred by spec`
- `blocked`

## Current Build Phase
- Active phase: `Phase 0 / MVP foundation`
- Last updated for: initial greenfield scaffold

## Requirement Tracking

| Area | Spec reference | Status | Notes |
| --- | --- | --- | --- |
| Astro static architecture | C6, C11 | implemented | Astro static output is configured and verified through real builds. |
| Tailwind CSS v4 foundation | C6, C11 | implemented | Tailwind v4 is installed and active through the Vite integration path. |
| Three-layer config surface | C6, C10, C11 | implemented | `.env.example`, `instance.config.mjs`, and `src/styles/tokens.css` created with separated responsibilities. |
| Environment-driven site/base path | C6, C11 | implemented | `astro.config.mjs` reads env-driven site URL and instance-configured base path. |
| Design tokens contract | C6, C11 | implemented | Neutral token system created in `tokens.css`; dark-mode token hooks included but disabled by default. |
| Markdown/MDX content workflow | C6, C11 | in progress | Content collection schema, sample MDX content, and MDX component mapping added. |
| Draft filtering | C6, C11 | implemented | Production filtering is centralized in content query helpers. |
| Rich media and code block layer | C6, C11 | implemented | `CodeBlock` uses Shiki with locked props, and approved click-to-load MDX embeds now cover YouTube, Vimeo, CodePen, GitHub Gist, and Twitter/X. |
| Discovery surfaces | C6, C11 | in progress | Home, blog index, paginated listings, category/tag pages, post pages, and search route scaffolded. |
| Pagefind search | C6, C11, C15 | implemented | Search UI, Pagefind asset loading, and index generation are verified. |
| RSS | C6, C11, C15 | implemented | RSS endpoint scaffolded with `content:encoded`. |
| Sitemap | C6, C11, C15 | implemented | Astro sitemap integration configured. |
| SEO and structured data baseline | C6, C11 | partial | Post pages now emit article-specific OG/Twitter metadata plus verified WebSite, Organization, Article, BreadcrumbList, and FAQPage JSON-LD; image-rich and broader page-type refinements remain. |
| Single-command deploy chain | C6, C11, C14 | implemented | `npm run deploy` verified end to end with build, Pagefind, and transfer. |
| Transport abstraction | C6, C11, C14 | implemented | `noop` and `local-copy` transports are implemented and verified; remote transports remain future extensions, not MVP requirements. |
| Standalone shell + `SiteShell.astro` seam | C6, C11, C15 | implemented | Shell seam created with the minimum required props and a default standalone presentation. |
| Schema-ready multi-author support | C6, C11 | implemented | Optional `author` field is in the content schema. |
| GA4 default analytics slot | C6, C11, C15 | implemented | Non-blocking GA4 component scaffolded behind instance config and env vars. |
| Newsletter structural placeholder | C6, C11 | implemented | `NewsletterEmbed` placeholder component added with no active provider coupling. |

## Decisions and Overrides
- Decision: the tracking file for implementation and spec drift lives at `/Users/stefanorlic/code/astronomer/IMPLEMENTATION_TRACKER.md`.
  Reason: the spec explicitly asked for a file that works for progress tracking and drift checks; keeping it in the repo root makes it hard to miss.
- Decision: first implementation slice prioritizes the reusable platform skeleton over a polished design.
  Reason: the spec is architecture-heavy and greenfield; getting the seams and constraints in place early reduces rework.
- Decision: deploy transport starts with `noop` and `local-copy`.
  Reason: the spec requires an abstraction and a fixed deploy chain, but does not lock a concrete remote provider for MVP.
- Decision: deploy transport may be overridden with `DEPLOY_TRANSPORT` for operational verification.
  Reason: this lets us test supported transports without repeatedly editing checked-in instance config, while keeping the instance config default as the source of truth.
- Decision: instance configuration is validated at import time with Zod and normalized before use.
  Reason: the spec treats `instance.config.mjs` as a primary configuration surface, so invalid instance settings should fail fast instead of drifting into builds.
- Interpretation: draft filtering is enforced in content query helpers and route generation, which makes production exclusion explicit in the code paths that create pages and feeds.
- Interpretation: approved third-party MDX embeds are implemented with click-to-load activation and source links so failures stay isolated to the embed surface.

## Drift Watch
- Watch: the approved rich-media provider set is implemented with click-to-load activation; the remaining risk in this area is provider-side embed reliability, which is intentionally isolated at runtime.
- Watch: the core required schema types are now verified on post pages; the remaining SEO gap is refinement breadth across more page contexts and richer media/image metadata.
- Watch: the spec mentions self-hosted font delivery through fontsource; the scaffold exposes tokenized font families but does not yet install concrete font packages.
- Watch: Pagefind integration is scaffolded, but index generation cannot be verified until dependencies are installed and a build is run.

## Open Questions From The Spec
- Formal author vs operator deploy permissions remain unresolved by the spec.
- Purpose is treated as metadata only for now; no purpose-specific UX branching has been introduced.
- `SiteShell.astro` validation/fallback behavior for incomplete host integration remains unresolved.
- Analytics reporting expectations beyond shipping the GA4 slot remain unspecified.

## Deferred By Spec
- Provider-swappable analytics beyond GA4
- Activated newsletter provider integration
- Purpose-specific homepage/navigation variants
- Pagination customization beyond 10 per page
- Additional schema fields beyond the locked defaults
- Formal permissions module
- Shared cross-instance design/component library
- Advanced deploy rollback/recovery UX

## Verification Log
- `completed`: dependency install
- `completed with ASTRO_TELEMETRY_DISABLED=1`: Astro build
- `completed`: instance config validation and normalization enforced at import time
- `completed`: Shiki-backed `CodeBlock` render verified in generated post HTML
- `completed`: post-page article metadata and required JSON-LD set verified in generated HTML
- `completed`: click-to-load YouTube, Vimeo, CodePen, GitHub Gist, and Twitter/X embed surfaces verified in generated post HTML
- `completed`: Pagefind index generation
- `completed`: `npm run deploy` with default `noop` transport
- `completed`: `npm run deploy` with `DEPLOY_TRANSPORT=local-copy` and output copied to `/tmp/astronomer-deploy-check`
