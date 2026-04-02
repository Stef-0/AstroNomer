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
- Last updated for: separator cleanup, font delivery architecture, TOC system, post/homepage composition refinements, RSS namespace compliance, richer post image metadata, newsletter activation modes, social/editorial image separation, social-image schema naming cleanup, homepage lead-media integration, over-image homepage lead treatment, featured-image text tone control, flat featured-image contrast styling, homepage lead tagline refinement, three-mode homepage presentation, homepage featured-label simplification, homepage featured-package alignment, posts-only first-story cleanup, rich-media embed activation fixes, frosted click-to-load embed placeholders, embed-stage simplification, unified provider-neutral rich-media placeholder styling, purpose-sensitive shell/homepage presets, post-audit security/accessibility/UI fixes, design/UI refinement pass (typography, spacing, layout, UI elements), and visual modernization pass (accent color, flat backgrounds, reduced uppercase, softened radii, differentiated hover)

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
| SEO and structured data baseline | C6, C11 | implemented | Post pages now emit article metadata with richer social image tags and `ImageObject` schema support, while non-post pages share fallback social imagery plus page-type schema and item lists. |
| Single-command deploy chain | C6, C11, C14 | implemented | `npm run deploy` verified end to end with build, Pagefind, and transfer. |
| Transport abstraction | C6, C11, C14 | implemented | `noop` and `local-copy` transports are implemented and verified; remote transports remain future extensions, not MVP requirements. |
| Standalone shell + `SiteShell.astro` seam | C6, C11, C15 | implemented | Shell seam now ships with a verified editorial standalone presentation built around masthead, archive, and article layouts. |
| Schema-ready multi-author support | C6, C11 | implemented | Optional `author` field is in the content schema. |
| GA4 default analytics slot | C6, C11, C15 | implemented | Non-blocking GA4 component scaffolded behind instance config and env vars. |
| Newsletter structural placeholder | C6, C11 | implemented | `NewsletterEmbed` remains the structural seam even when active newsletter modes are enabled. |
| Activated newsletter integration | C20, C21 | implemented | The newsletter seam now supports instance-configured `button`, `form`, and `embed` activation modes without requiring the deferred provider abstraction module. |
| Purpose-sensitive instance presets | C5, C7 | implemented | `purpose` now drives built-in shell copy, archive/breadcrumb labeling, default navigation labels, and default homepage mode for `blog`, `documentation`, `changelog`, and `seo-hub`, while explicit shell config overrides still win. |
| Accessibility baseline | C6 | implemented | Skip-to-content link, `aria-current` section matching, and semantic heading hierarchy in TOC and newsletter components verified. |
| JSON-LD security hardening | C6, C11 | implemented | JSON-LD output now escapes `</` sequences to prevent script tag breakout from author-controlled content (titles, descriptions, author names). |
| Dark mode token completeness | C6, C11 | implemented | Dark theme now defines all 10 color tokens including `--color-border-strong` and `--color-highlight`; previously 8 of 15 tokens were missing. |
| Footer credit line | C6, C11 | implemented | Footer right column now renders `shell.copy.footerCredit` when set; empty by default so operators start with a clean footer. |
| Typography and spacing refinement | C6, C11 | implemented | Heading line-heights, eyebrow legibility, dek tonal separation, post body line-height, PostCard rail width, taxonomy index page structure, and pagination layout all refined in design pass. |
| UI element polish | C6, C11 | implemented | Tag pills use token-based background, copy button has visual feedback state, tag overflow count shown, figcaption has separator, search page copy wired to shell copy system, taxonomy index pages share `.taxonomy-grid` global class. |

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
- Decision: homepage presentation is configurable per instance as `default`, `editorial-hero`, or `posts-only`.
  Reason: operators need a clean choice between a featured editorial front page, a simpler featured-post homepage, and a minimal archive-first homepage without overloading one mode with conflicting responsibilities.
- Decision: the homepage right rail shares a single explicit column width across the lead and newsroom sections.
  Reason: using one sidebar measure keeps the featured rail and newsletter seam aligned, which makes the homepage read as one editorial grid instead of two unrelated column systems.
- Decision: the homepage lead package gives the primary story a wider share of the grid than the secondary rail.
  Reason: matching the right-column alignment alone left too much inert space between the lead and sidebar; letting the primary story claim more width preserves alignment while keeping the lead package visually full.
- Decision: homepage featured images render within the lead story flow rather than as a separate block above the story text.
  Reason: the lead needs to read like one editorial unit; placing the image below the headline avoids the “image module plus second story” effect and keeps media integrated with the story hierarchy.
- Decision: when a homepage lead has a featured image, the eyebrow and headline render over the image while the dek and metadata remain below it.
  Reason: the lead reads more coherently when image, label, and headline form one dominant story object, and the wider gutter keeps that object from visually colliding with the featured rail beside it.
- Decision: over-image homepage lead text can opt into `light` or `dark` contrast per post through `featuredImageText`.
  Reason: image artwork can vary significantly, and a simple two-tone override keeps the system flexible without introducing arbitrary per-post color controls.
- Decision: featured-image contrast treatment uses flat text color only, without decorative shadows or gloss effects.
  Reason: the editorial visual system depends on crisp typography and restrained overlays; faux depth effects weaken that language instead of supporting it.
- Decision: the homepage lead section heading is treated like a wide tagline rather than a standard archive heading.
  Reason: the homepage lead package needs a more expansive, hero-like measure than normal section headings, while still using a tighter line-height to avoid awkward orphaned wraps.
- Decision: the homepage uses a single `Featured` label above the primary lead block, with no secondary featured label in the rail.
  Reason: the left lead object is the dominant featured story, and repeating the label in the rail adds noise without improving the information hierarchy.
- Decision: the homepage `Featured` label sits above the entire lead package rather than inside the left column.
  Reason: the whole package represents featured stories, and placing the label at the package level lets the sidebar stories align directly with the top of the lead image instead of competing with the label for the first visual row.
- Decision: `posts-only` mode removes the top divider from the first listed story.
  Reason: in the minimal homepage variant, the first post begins the page rather than continuing a section, so neither the section wrapper nor the first story should carry a leading divider.
- Decision: rich-media demo content uses known public provider examples rather than arbitrary sample IDs.
  Reason: embed failures should reflect component behavior rather than stale or invalid demo content, especially while we are validating post-MVP provider support.
- Decision: click-to-load embeds use a frosted placeholder stage that dissolves into the live provider content on activation.
  Reason: embeds should feel integrated into the editorial reading experience rather than appearing as disconnected controls followed by a separate media box.
- Decision: click-to-load embeds do not render provider/title/summary chrome above the reveal stage.
  Reason: the embed itself should be the object; extra heading blocks make the interaction feel like two separate components rather than one media surface transitioning from placeholder to live content.
- Decision: click-to-load embed placeholders use one provider-neutral frosted visual language before reveal, while provider-specific differences appear primarily in the revealed embed sizing.
  Reason: mixing dark and light placeholder treatments made the embed section feel inconsistent; the stage should read as one system until the real third-party surface appears.
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
- Decision: post social images and on-site featured images are separate content fields.
  Reason: social cards and editorial layout media serve different purposes; separating them avoids nested-card artifacts and lets posts carry featured imagery without forcing that asset into metadata or vice versa.
- Decision: the social/share image field is named `socialImage` instead of the more ambiguous `image`.
  Reason: authors should not have to infer that a generic `image` field only affects metadata; the explicit name makes the distinction from `featuredImage` obvious.
- Decision: newsletter activation is implemented through instance-configured render modes instead of a provider-specific abstraction.
  Reason: this enables a real subscribe surface now while keeping the broader provider abstraction module deferred until compliance and parity rules are clearer.
- Decision: `purpose` now supplies built-in shell and homepage presets instead of remaining metadata-only.
  Reason: the product already had stable navigation and homepage seams, so purpose-specific defaults add strong multi-instance leverage without forcing operators into a larger component-library or CMS-style expansion.
- Decision: JSON-LD entries are sanitized by replacing `</` with `<\/` before injection via `set:html`.
  Reason: `JSON.stringify` does not escape end-tag sequences; author-controlled fields (title, description, author name) in schema values can break out of the `<script type="application/ld+json">` block and inject arbitrary script.
- Decision: `aria-current="page"` now uses prefix matching for non-root nav items (`currentPath.startsWith(item.href)`) and exact matching for the root (`/`).
  Reason: exact matching left section nav items inactive while the reader was anywhere inside a section (e.g., `/blog/my-post` did not activate the Blog nav item); prefix matching reflects the section's active state correctly.
- Decision: featured image `alt` falls back to the post `title` rather than empty string when `featuredImageAlt` is not set.
  Reason: empty-string alt signals a decorative image to assistive technology; featured editorial images carry content meaning and should have descriptive alt text; the title is a safe, always-available fallback until the author provides a dedicated alt value.
- Decision: `NewsletterEmbed` accepts a `headingLevel` prop (`h2` | `h3`, default `h2`) and uses it for the component heading.
  Reason: in the post sidebar, the newsletter sits alongside post `h2` section headings, making a competing `h2` confusing for screen reader navigation; the call site at `PostLayout.astro` passes `headingLevel="h3"`.
- Decision: heading line-heights bumped from sub-0.95 range to 1.0 across PostCard, PostLayout, and homepage lead headlines; hero tagline bumped from 0.88 to 0.93.
  Reason: ultra-tight values (0.88–0.96) cause descender/ascender collision on post titles that wrap beyond one line; 1.0 preserves the editorial tension while remaining legible.
- Decision: post body line-height reduced from 1.82 to 1.72.
  Reason: 1.82 is beyond the comfortable reading range and makes paragraphs float apart; 1.72 retains the airy editorial character while tightening the rhythm.
- Decision: the post dek (description) renders in `--color-text-soft` rather than full `--color-text`.
  Reason: the dek is subtitle copy that supports the headline, not body prose; the tonal step creates hierarchy between headline, dek, and article body.
- Decision: `.eyebrow` size bumped from 0.72rem to 0.75rem and letter-spacing reduced from 0.18em to 0.14em.
  Reason: 0.72rem is near the floor of comfortable legibility with `--color-text-soft`; the small adjustments improve contrast without changing the eyebrow's visual register.
- Decision: PostCard left metadata rail reduced from 11rem to 9rem.
  Reason: the rail holds two pieces of small-caps metadata (category + date) and 11rem left too much inert space at mid-range viewports.
- Decision: taxonomy index pages (`/categories`, `/tags`) now use `.archive-shell` and `.archive-heading` global classes, eliminating their custom `.archive` and `h2` overrides.
  Reason: the previous custom padding and heading styles were inconsistent with sibling archive surfaces; using shared classes makes all listing pages structurally uniform.
- Decision: a `.taxonomy-grid` class is added to `global.css` as the shared grid for categories and tags index pages.
  Reason: both pages had identical CSS duplicated verbatim; the shared global class eliminates the duplication and reduces future drift risk.
- Decision: pagination uses a 3-column grid layout (`1fr auto 1fr`) with prev/next wrapped in slot divs, replacing the `justify-content: space-between` flex layout.
  Reason: space-between de-centered the status label whenever only one nav link was present; the grid layout keeps the status always centered regardless of which links are rendered.
- Decision: pagination links show directional arrows (`← Previous` / `Next →`).
  Reason: plain uppercase text links with no directional affordance required the reader to read the label to understand direction; the arrows make navigation intent immediate.
- Decision: tag pills use `color-mix(in srgb, var(--color-surface) 90%, transparent)` instead of `rgba(255,255,255,0.38)`.
  Reason: the hardcoded RGBA value would be invisible in dark mode (white tint on dark background); the token-based value adapts to both themes.
- Decision: the copy button shows `✓ Copied` and adds a green-tinted `is-copied` class for 1.5 seconds on activation.
  Reason: a text-only change from "Copy" to "Copied" without a visual state change gave insufficient confirmation feedback; the combined text + color change closes the feedback loop.
- Decision: tag lists in PostCard show a `+N` overflow count when more than 3 tags are present.
  Reason: silently dropping tags beyond 3 with no indicator hides information from the reader; the count preserves the constraint while communicating that additional tags exist.
- Decision: `Figure` figcaption gets a `border-top` separator and `font-display` styling; figure padding is removed from the card shell (image bleeds to edges) with padding only on the figcaption.
  Reason: the previous caption had no visual demarcation from the image above it; the border-top cleanly separates caption from media, and edge-to-edge images read as more editorial.
- Decision: search page eyebrow and heading are now driven by `shell.copy.searchEyebrow` and `shell.copy.searchTitle`, wired into the purpose-preset system.
  Reason: the search page was the only archive surface with hardcoded developer-facing copy; aligning it with the shell copy system makes all archive surfaces consistent and purpose-aware.
- Decision: the footer right column now renders `shell.copy.footerCredit` when set, and is empty when not set.
  Reason: the previous scaffolding copy ("Built as a static Astro instance with a host-shell seam through `SiteShell.astro`.") exposed implementation details and read as developer documentation rather than operator-facing product copy; the configurable credit line gives operators control without forcing a specific attribution pattern.
- Decision: the `featuredImageText: "dark"` overlay uses a white-tinted gradient (not black-tinted) with `--color-accent-strong` text, and `"light"` uses a black-tinted gradient with `#fffaf3` text.
  Reason: `"light"` means the image is light-toned and needs dark text lifted on a white overlay; `"dark"` means the image is dark-toned and needs light text on a dark overlay. The previous `"dark"` variant used white overlay with near-black text at lower contrast; the corrected version makes the variant semantics match the visual behavior.
- Decision: purpose presets are defaults, not locks; explicit `shell.navigation`, `shell.homepage.mode`, and `shell.copy.*` overrides take precedence.
  Reason: operators need purpose-native starting points, but the platform’s configurability depends on local instance choices still being authoritative.
- Override: pagination is configurable per instance through `blog.postsPerPage`, with `10` as the default.
  Reason: this intentionally overrides the current spec lock at 10 per page in favor of operator flexibility; this is a tracked spec drift decision, not an accidental implementation change.
- Interpretation: draft filtering is enforced in content query helpers and route generation, which makes production exclusion explicit in the code paths that create pages and feeds.
- Interpretation: approved third-party MDX embeds are implemented with click-to-load activation and source links so failures stay isolated to the embed surface.
- Decision: `--color-accent` changed from near-black (`#2e2a24`) to warm amber (`#b5713a`); `--color-accent-strong` remains ink-dark for text and structural borders.
  Reason: the monochrome ink palette had no hue energy for interactive elements; a warm amber accent gives buttons and CTAs visual distinction from body text while staying within the editorial warmth of the design system.
- Decision: body and root background gradients removed in favor of flat `--color-background`; surface cards use subtle `box-shadow` instead of tinted backgrounds.
  Reason: stacked background gradients created a "dirty white" appearance rather than the intended paper feel; flat backgrounds with elevation through shadow read cleaner on screen.
- Decision: `text-transform: uppercase` removed from post metadata, tag pills, pagination, and code block language labels; retained only on `.eyebrow`, `.site-nav a`, and `.site-header__tagline`.
  Reason: applying uppercase to every piece of UI chrome created a "newspaper masthead" density that fought the clean editorial intent; selective uppercase preserves hierarchy while adding breathing room.
- Decision: border-radius tokens softened — `--radius-sm` from 0.15rem to 0.25rem, `--radius-md` from 0.35rem to 0.5rem, `--radius-lg` from 0.5rem to 0.75rem.
  Reason: near-zero radii read as sharp and formal; slightly softened corners feel more approachable without going rounded.
- Decision: hover expressiveness is now differentiated by element importance — lead story image gets scale + shadow, CTAs get background color shift + shadow, small items keep the subtle `translateY(-1px)` lift.
  Reason: uniform 1px lifts on every interactive element made interactions feel flat; varying the response by visual weight makes high-value targets more expressive while keeping secondary items restrained.

## Drift Watch
- Watch: the SVG fallback social image (`/social/site.svg`) is not supported by most social platforms (Twitter/X, LinkedIn, Facebook). Until operators supply a JPEG/PNG `fallbackSocialImage`, social cards will silently fail to render. This is an open product gap, not a spec deviation.
- Watch: the approved rich-media provider set is implemented with click-to-load activation; the remaining risk in this area is provider-side embed reliability, which is intentionally isolated at runtime.
- Watch: the font delivery seam now supports `fontsource`, `self-hosted`, and `google-fonts`; the remaining product question is whether Google CDN delivery should stay an opt-in convenience or eventually require stronger compliance guidance in docs/UI.
- Watch: the spec currently says pagination is locked at 10 per page, but the implementation now supports configurable pagination with `10` as the default. This should be reconciled in future product documentation/spec updates.

## Open Questions From The Spec
- Formal author vs operator deploy permissions remain unresolved by the spec.
- `SiteShell.astro` validation/fallback behavior for incomplete host integration remains unresolved.
- Analytics reporting expectations beyond shipping the GA4 slot remain unspecified.

## Deferred By Spec
- Provider-swappable analytics beyond GA4
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
- `completed`: post-level social image metadata verified with local image alt text plus `og:image:*`, `twitter:image:alt`, and `ImageObject` schema output
- `completed`: social/share images and editorial featured images verified as separate surfaces on home and post layouts
- `completed`: newsletter seam verified with active instance-configured render modes instead of placeholder-only output
- `completed`: duplicate content-id warning resolved after clearing stale `.astro` cache and rebuilding cleanly
- `completed`: non-post pages verified with default social image plus `WebPage`/`CollectionPage`/`SearchResultsPage` schema in generated HTML
- `completed`: editorial redesign verified across home, archive, taxonomy, search, and post templates in generated HTML
- `completed`: shared separator cleanup verified across header, homepage, archive, taxonomy, and search layouts
- `completed`: homepage mode seam verified with `default`, `editorial-hero`, and `posts-only` as validated config options
- `completed`: font delivery seam verified with `fontsource` default delivery moved into head-managed provider logic
- `completed`: table of contents seam verified with instance defaults plus post-level heading selection overrides
- `completed`: post-page metadata layout verified with inline article meta replacing the detached left rail
- `completed`: responsive TOC behavior verified with desktop sidebar placement and mobile-first ordering above article content
- `completed`: post-page composition rebalanced with a narrower shell and wider body-to-sidebar separation
- `completed`: homepage right-column alignment verified across the featured rail and newsletter seam
- `completed`: homepage lead package rebalanced so the primary story occupies more of the shared editorial grid
- `completed`: homepage featured-image placement verified as inline lead media beneath the headline
- `completed`: homepage lead image treatment verified with over-image headline and wider spacing to the featured rail
- `completed`: featured-image text tone verified with per-post `light`/`dark` control on the homepage lead
- `completed`: purpose-sensitive shell copy, archive labeling, default navigation labels, and default homepage modes verified through config normalization and generated homepage/layout output
- `completed`: Pagefind index generation
- `completed`: full `npm run deploy` verified against the expanded 53-page site
- `completed`: `npm run deploy` with default `noop` transport
- `completed`: `npm run deploy` with `DEPLOY_TRANSPORT=local-copy` and output copied to `/tmp/astronomer-deploy-check`
- `completed`: JSON-LD XSS fix — `</` escaped to `<\/` in `SeoHead.astro` before `set:html` injection
- `completed`: skip-to-content link added to `SiteShell.astro` with focus-visible reveal; `<main>` receives `id="main-content"` target
- `completed`: `aria-current` updated to prefix matching for non-root nav items in `SiteShell.astro`
- `completed`: featured image `alt` fallback changed from empty string to post `title` in `index.astro` and `PostLayout.astro`
- `completed`: dark token set completed — `--color-border-strong` and `--color-highlight` added to `[data-theme="dark"]` block in `tokens.css`
- `completed`: TOC heading changed from `h2` to `h3` in `TableOfContents.astro` to avoid heading hierarchy conflict with post section headings
- `completed`: lead overlay `max-width: 10ch` cap removed from both overlay variants in `index.astro`
- `completed`: `featuredImageText: "dark"` overlay contrast corrected — white-tinted gradient with dark text for light images; `"light"` retains black-tinted gradient with light text for dark images
- `completed`: `NewsletterEmbed` heading level made configurable via `headingLevel` prop; `PostLayout.astro` passes `headingLevel="h3"`
- `completed`: footer right column scaffolding copy replaced with configurable `shell.copy.footerCredit` field; empty by default
- `completed`: heading line-heights bumped to 1.0 across PostCard, PostLayout h1, and homepage lead h3s; hero tagline bumped from 0.88 to 0.93
- `completed`: post body line-height reduced from 1.82 to 1.72
- `completed`: post dek color set to `--color-text-soft`
- `completed`: `.eyebrow` size 0.72rem → 0.75rem, letter-spacing 0.18em → 0.14em
- `completed`: PostCard left rail reduced from 11rem to 9rem
- `completed`: taxonomy index pages refactored to use `.archive-shell`, `.archive-heading`, and new `.taxonomy-grid` global class; duplicate CSS removed
- `completed`: pagination layout changed to 3-column grid for always-centered status; directional arrows added to prev/next links
- `completed`: tag pill background replaced from hardcoded `rgba(255,255,255,0.38)` to token-based `color-mix`
- `completed`: copy button shows `✓ Copied` with green-tinted `is-copied` state on activation
- `completed`: PostCard tag list shows `+N` overflow count when more than 3 tags present
- `completed`: Figure figcaption gets border-top separator and display-font styling; image now bleeds edge-to-edge within the card
- `completed`: search page heading and eyebrow wired to `shell.copy.searchEyebrow` / `shell.copy.searchTitle` via purpose presets
- `completed`: `--color-accent` updated to warm amber `#b5713a` in light theme; dark theme accent unchanged
- `completed`: body/root background gradients removed; flat `--color-background` applied; `.surface-card` updated to use subtle box-shadow for elevation
- `completed`: `text-transform: uppercase` removed from PostCard rail/meta/tags, PostLayout post-meta, homepage lead meta, Pagination links/status, CodeBlock language label, and NewsletterEmbed CTA; retained on `.eyebrow`, `.site-nav a`, `.site-header__tagline`
- `completed`: border-radius tokens softened across all three scale steps
- `completed`: lead story image hover enhanced with scale(1.03) + shadow; newsletter/embed CTA hover enhanced with color shift + shadow; taxonomy cards get shadow on hover
- `completed`: Astro build verified with all visual modernization changes (53 pages)
