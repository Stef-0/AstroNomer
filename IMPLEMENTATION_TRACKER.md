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
- Active phase: `Phase 1 / post-MVP product refinements`
- Last updated for: separator cleanup, font delivery architecture, TOC system, post/homepage composition refinements, and RSS namespace compliance

## Requirement Tracking

| Area | Spec reference | Status | Notes |
| --- | --- | --- | --- |
| Astro static architecture | C6, C11 | implemented | Astro static output is configured and verified through real builds. |
| Tailwind CSS v4 foundation | C6, C11 | implemented | Tailwind v4 is installed and active through the Vite integration path. |
| Three-layer config surface | C6, C10, C11 | implemented | `.env.example`, `instance.config.mjs`, and `src/styles/tokens.css` created with separated responsibilities. |
| Environment-driven site/base path | C6, C11 | implemented | `astro.config.mjs` reads env-driven site URL and instance-configured base path. |
| Design tokens contract | C6, C11 | implemented | Editorial token system now drives the masthead, archive rhythm, and post-reading presentation with configurable fallback branding hooks plus provider-driven font delivery. |
| Markdown/MDX content workflow | C6, C11 | implemented | Content schema, MDX component mapping, and an expanded representative content set now exercise real archive and draft scenarios. |
| Table of contents system | C6, C11 | implemented | Instance defaults and post-level TOC overrides now support enable/disable, heading-level filters, and explicit heading inclusion. |
| Draft filtering | C6, C11 | implemented | Production filtering is centralized in content query helpers. |
| Rich media and code block layer | C6, C11 | implemented | `CodeBlock` uses Shiki with locked props, and approved click-to-load MDX embeds now cover YouTube, Vimeo, CodePen, GitHub Gist, and Twitter/X. |
| Discovery surfaces | C6, C11 | implemented | Home, blog index, paginated listings, category/tag pages, post pages, and search have been verified with multi-page archives. |
| Pagefind search | C6, C11, C15 | implemented | Search UI, Pagefind asset loading, and index generation are verified. |
| RSS | C6, C11, C15 | implemented | RSS endpoint scaffolded with `content:encoded`. |
| Sitemap | C6, C11, C15 | implemented | Astro sitemap integration configured. |
| SEO and structured data baseline | C6, C11 | partial | Post pages emit article metadata, and non-post pages now share a default social image plus page-type schema and item lists; richer post image handling is the main remaining refinement. |
| Single-command deploy chain | C6, C11, C14 | implemented | `npm run deploy` verified end to end with build, Pagefind, and transfer. |
| Transport abstraction | C6, C11, C14 | implemented | `noop` and `local-copy` transports are implemented and verified; remote transports remain future extensions, not MVP requirements. |
| Standalone shell + `SiteShell.astro` seam | C6, C11, C15 | implemented | Shell seam now ships with a verified editorial standalone presentation built around masthead, archive, and article layouts. |
| Schema-ready multi-author support | C6, C11 | implemented | Optional `author` field is in the content schema. |
| GA4 default analytics slot | C6, C11, C15 | implemented | Non-blocking GA4 component scaffolded behind instance config and env vars. |
| Newsletter structural placeholder | C6, C11 | implemented | `NewsletterEmbed` placeholder component added with no active provider coupling. |

## Decisions and Overrides
- Decision: the tracking file for implementation and spec drift lives at `/Users/stefanorlic/code/astronomer/IMPLEMENTATION_TRACKER.md`.
  Reason: the spec explicitly asked for a file that works for progress tracking and drift checks; keeping it in the repo root makes it hard to miss.
- Decision: the MVP now includes an intentional editorial UI layer rather than remaining a neutral scaffold.
  Reason: for a publishing product, reading experience is core product value, not post-MVP polish; the off-white and ink editorial treatment is now part of the verified default shell.
- Decision: shared separator styling is intentionally sparse across header, archive, taxonomy, search, and homepage surfaces.
  Reason: repeated stacked rules made the editorial shell feel boxed in; the lighter divider system is a deliberate readability and hierarchy choice rather than incidental CSS cleanup.
- Decision: post-page metadata is presented inline beneath the dek rather than in a detached left rail.
  Reason: the inline treatment keeps category/date/author/read-time information closer to the headline it supports and avoids oversized negative space in wide article headers.
- Decision: the post-page sidebar is treated as a full-height companion column so the TOC remains useful for more of the article scroll.
  Reason: a shorter sidebar caused sticky TOC behavior to end too early; stretching the sidebar and tightening the inter-column gap produces better navigation and a more unified reading layout.
- Decision: post pages use a narrower reading shell with a moderate body-to-sidebar gap instead of stretching the article composition across the full page shell.
  Reason: the earlier wide shell made the layout feel left-weighted and left too much inert space on the far right; constraining the post composition keeps the TOC comfortably separated without making the page feel disconnected.
- Decision: homepage presentation is configurable per instance, with `content-first` as the default and `editorial-hero` as an opt-in variant.
  Reason: a content-led homepage is the stronger default for most live publications, while some operators still need a branded intro mode at the top of the homepage.
- Decision: the homepage right rail shares a single explicit column width across the lead and newsroom sections.
  Reason: using one sidebar measure keeps the featured rail and newsletter seam aligned, which makes the homepage read as one editorial grid instead of two unrelated column systems.
- Decision: the homepage lead package gives the primary story a wider share of the grid than the secondary rail.
  Reason: matching the right-column alignment alone left too much inert space between the lead and sidebar; letting the primary story claim more width preserves alignment while keeping the lead package visually full.
- Decision: font delivery is configurable per instance through `fontsource`, `self-hosted`, or `google-fonts` provider modes.
  Reason: operators need a clean seam for package-managed fonts, manually hosted font files, or third-party convenience loading without rewriting the shell or token contract.
- Decision: table of contents behavior is configurable at the instance level and overridable per post.
  Reason: operators need a site-wide default, while authors still need to disable or refine the TOC for posts whose heading structure should not map directly to navigation.
- Decision: deploy transport starts with `noop` and `local-copy`.
  Reason: the spec requires an abstraction and a fixed deploy chain, but does not lock a concrete remote provider for MVP.
- Decision: deploy transport may be overridden with `DEPLOY_TRANSPORT` for operational verification.
  Reason: this lets us test supported transports without repeatedly editing checked-in instance config, while keeping the instance config default as the source of truth.
- Decision: instance configuration is validated at import time with Zod and normalized before use.
  Reason: the spec treats `instance.config.mjs` as a primary configuration surface, so invalid instance settings should fail fast instead of drifting into builds.
- Decision: rich-media loading strategy is configurable per instance as `click-to-load` or `eager`.
  Reason: some operators may already gate embeds behind a site-wide cookie or privacy layer and should not be forced into a second reveal step.
- Decision: GA4 privacy behavior is configurable per instance as `cookieless` or `full`.
  Reason: some operators will already have consent handling in place and need standard GA4 behavior, while others need privacy-reduced analytics by default.
- Decision: the instance-wide fallback social image is configurable, with the generated site SVG retained as the default fallback when no custom image is supplied.
  Reason: operators should be able to align social cards with their brand without needing per-post images everywhere.
- Override: pagination is configurable per instance through `blog.postsPerPage`, with `10` as the default.
  Reason: this intentionally overrides the current spec lock at 10 per page in favor of operator flexibility; this is a tracked spec drift decision, not an accidental implementation change.
- Interpretation: draft filtering is enforced in content query helpers and route generation, which makes production exclusion explicit in the code paths that create pages and feeds.
- Interpretation: approved third-party MDX embeds are implemented with click-to-load activation and source links so failures stay isolated to the embed surface.

## Drift Watch
- Watch: the approved rich-media provider set is implemented with click-to-load activation; the remaining risk in this area is provider-side embed reliability, which is intentionally isolated at runtime.
- Watch: site-level SEO is now stronger across non-post pages; the remaining gap is richer post-specific image metadata when authors add local or custom images.
- Watch: the font delivery seam now supports `fontsource`, `self-hosted`, and `google-fonts`; the remaining product question is whether Google CDN delivery should stay an opt-in convenience or eventually require stronger compliance guidance in docs/UI.
- Watch: the spec currently says pagination is locked at 10 per page, but the implementation now supports configurable pagination with `10` as the default. This should be reconciled in future product documentation/spec updates.

## Open Questions From The Spec
- Formal author vs operator deploy permissions remain unresolved by the spec.
- Purpose is treated as metadata only for now; no purpose-specific UX branching has been introduced.
- `SiteShell.astro` validation/fallback behavior for incomplete host integration remains unresolved.
- Analytics reporting expectations beyond shipping the GA4 slot remain unspecified.

## Deferred By Spec
- Provider-swappable analytics beyond GA4
- Activated newsletter provider integration
- Purpose-specific homepage/navigation variants
- Additional schema fields beyond the locked defaults
- Formal permissions module
- Shared cross-instance design/component library
- Advanced deploy rollback/recovery UX

## Verification Log
- `completed`: dependency install
- `completed with ASTRO_TELEMETRY_DISABLED=1`: Astro build
- `completed`: instance config validation and normalization enforced at import time
- `completed`: GA4 privacy mode is configurable through validated instance config
- `completed`: Shiki-backed `CodeBlock` render verified in generated post HTML
- `completed`: post-page article metadata and required JSON-LD set verified in generated HTML
- `completed`: click-to-load YouTube, Vimeo, CodePen, GitHub Gist, and Twitter/X embed surfaces verified in generated post HTML
- `completed`: expanded content set verified multi-page `/blog/2`, `/categories/platform/2`, and `/tags/core/2` archives
- `completed`: draft entries verified absent from generated `dist` output
- `completed`: RSS verified with 13 published items after content expansion
- `completed`: RSS XML namespace declarations verified for `atom:link` and `content:encoded` output
- `completed`: duplicate content-id warning resolved after clearing stale `.astro` cache and rebuilding cleanly
- `completed`: non-post pages verified with default social image plus `WebPage`/`CollectionPage`/`SearchResultsPage` schema in generated HTML
- `completed`: editorial redesign verified across home, archive, taxonomy, search, and post templates in generated HTML
- `completed`: shared separator cleanup verified across header, homepage, archive, taxonomy, and search layouts
- `completed`: homepage mode seam verified with `content-first` as default and `editorial-hero` as validated config option
- `completed`: font delivery seam verified with `fontsource` default delivery moved into head-managed provider logic
- `completed`: table of contents seam verified with instance defaults plus post-level heading selection overrides
- `completed`: post-page metadata layout verified with inline article meta replacing the detached left rail
- `completed`: responsive TOC behavior verified with desktop sidebar placement and mobile-first ordering above article content
- `completed`: post-page composition rebalanced with a narrower shell and wider body-to-sidebar separation
- `completed`: homepage right-column alignment verified across the featured rail and newsletter seam
- `completed`: homepage lead package rebalanced so the primary story occupies more of the shared editorial grid
- `completed`: Pagefind index generation
- `completed`: full `npm run deploy` verified against the expanded 53-page site
- `completed`: `npm run deploy` with default `noop` transport
- `completed`: `npm run deploy` with `DEPLOY_TRANSPORT=local-copy` and output copied to `/tmp/astronomer-deploy-check`
