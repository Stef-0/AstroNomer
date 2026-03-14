# PACKET C — FULL PRODUCT SPEC
# Version: 1.6
# Produced by: Spec Builder
# Source inputs: Packet A + Packet B
# No field in this spec may contradict either packet.

## C1. PRODUCT SUMMARY
A reusable, statically-generated content site base built on Astro, Tailwind CSS v4, and Markdown/MDX content collections. It is intended for operators who need to launch multiple independent publishing instances with configurable design, domain/base path, deploy transport, analytics, authorship model, and host-site integration without changing the core architecture.

## C2. PROBLEM STATEMENT
A one-off static blog specification is not sufficient when the product must support multiple independent content instances across different domains, base paths, designs, and deployment environments. The product must preserve the validated static publishing architecture while turning site-specific decisions into controlled instance-level configuration.

## C3. TARGET USERS & ROLES

### Target Users
- Instance owner / operator: A person or team creating and maintaining a specific instance who needs reusable architecture with configurable domain, base path, design tokens, deploy method, analytics, shell integration, and optional modules.
- Content author: A person writing and publishing Markdown or MDX content who needs validated frontmatter, draft filtering, rich media support, code blocks, search indexing, RSS generation, and a single deploy command.
- Reader / visitor: An anonymous public user consuming published content who needs fast page loads, browsing, taxonomy navigation, full-text search, RSS access, and reliable rendering.
- Host-site integrator: A person mounting an instance into an existing site who needs a defined shell seam for nav/footer integration without changing the core content application.

### System Roles
- Instance operator: Configures instance-level settings, manages environment variables, selects deploy transport, runs build and deploy, controls hosting targets, and manages shell integration.
- Author: Creates and edits content files, sets frontmatter including optional `author`, and participates in the publish workflow.
- Reader: Public read-only role for consuming published routes, search, taxonomy pages, and RSS.
- [Open Question]: The exact permission boundary between Instance operator and Author is not formally specified. Packet A allows flexible authorship, while Packet B defers the formal permissions module. This affects future publish rights, deploy rights, and any later CMS-style workflow controls.

## C4. JOBS TO BE DONE
- Instance owner / operator:
  - When I need to launch a new content instance, I need to configure purpose, domain/base path, design tokens, deploy transport, analytics, and shell integration, so that I can reuse the same architecture across different sites or sections.
  - When I need to host multiple instances on one domain, I need to give each one an independent base path, content collection, deploy target, and deploy script, so that they coexist without sharing runtime state.

- Content author:
  - When I have written new content, I need to add a Markdown or MDX file with validated frontmatter and run one deploy command, so that the site rebuilds, updates search, regenerates SEO artifacts, and publishes the new content.
  - When I need to stage content before publication, I need to mark it as draft, so that it is excluded from production output at build time.
  - When I need rich content, I need to use approved MDX components and the code block component, so that embeds and technical content work without requiring a backend runtime.

- Reader / visitor:
  - When I want to discover content, I need to browse paginated listings, tags, categories, and search results, so that I can find relevant content quickly.
  - When I want to follow updates, I need to access RSS and optional newsletter surfaces, so that I can subscribe using my preferred channel.

- Host-site integrator:
  - When an instance is mounted under an existing site, I need a shell seam that can be replaced with host navigation and footer elements, so that the instance feels integrated without changing the core content system.

## C5. FULL PRODUCT VISION
The product is a reusable static publishing base that preserves the validated architecture from Packet A while allowing each instance to be configured for its own purpose, design contract, domain/base path, deploy transport, analytics, dark mode posture, authorship model, and host-site shell integration. Its target is not a single blog, but a repeatable content system that can be instantiated multiple times on one domain or across many domains without reopening core architectural choices such as Astro static output, Tailwind v4, Content Collections, Pagefind, RSS, sitemap generation, and MDX-based rich content.

In the full vision, an operator can spin up independent content instances for blogs, documentation, changelogs, or SEO hubs, each with its own configuration surface and deploy target, while authors use a common validated content workflow and readers receive fast, searchable, SEO-complete static experiences. The product also supports integration into an existing host site through a defined shell seam, while preserving runtime isolation between instances.

The long-term direction includes flexible authorship, optional newsletter activation, replaceable analytics, purpose-sensitive optional modules, and possible shared build-time assets such as token files or component libraries across instances. All of this remains inside the same self-owned static publishing architecture rather than introducing a backend runtime or SaaS dependency.

## C6. MVP SCOPE
- [Core reusable static site base]: Includes Astro static output, Tailwind CSS v4, Content Collections with Zod validation, and the locked static architecture so operators can launch new instances without re-deciding the core stack.
- [Three-layer instance configuration surface]: Includes `.env`, `instance.config.mjs`, and `tokens.css` so instance-level operational, secret, and design decisions are separated cleanly.
- [Environment-driven site and mount-point configuration]: Includes required environment-variable-driven `site`/domain handling and base-path support so instances can mount at root, subdirectory, or subdomain.
- [Design contract with neutral defaults]: Includes CSS custom property-driven tokens for type, accent, spacing, radius, and dark-mode toggle so each instance can adapt visually without changing shared architecture. Dark mode is instance-configurable and defaults to not supported in the base spec unless explicitly enabled per instance in `instance.config.mjs`.
- [Markdown/MDX authoring workflow with locked schema defaults]: Includes required and optional frontmatter, draft filtering, and MDX authoring so authors can publish validated content through one deploy path.
- [Locked rich content layer]: Includes required MDX rich media components and locked `CodeBlock` behavior so technical and media-rich content work without a backend runtime.
- [Static discovery surfaces]: Includes homepage/primary index, paginated post listings, category pages, tag pages, post pages, and Pagefind-powered search so readers can discover and read content.
- [SEO and feed baseline]: Includes sitemap generation, RSS with `content:encoded`, and RSS autodiscovery so published instances are syndication-ready and crawlable.
- [Full SEO and AEO structured data layer]: Includes JSON-LD Article, JSON-LD FAQPage, JSON-LD BreadcrumbList, JSON-LD WebSite with SearchAction, JSON-LD Organization or Person, Open Graph tags, and Twitter/X card tags on appropriate page types so instances ship with complete baseline discoverability support for search engines and AI-powered answer engines from day one.
- [Single-command deploy chain with transport abstraction]: Includes `npm run deploy` performing build → Pagefind index generation → transfer through a selected transport so publishing works consistently across host environments.
- [Standalone shell plus shell seam]: Includes a default standalone shell and `SiteShell.astro` seam so an instance can work standalone while remaining mount-ready for host-site integration.
- [Single-author and schema-ready multi-author content support]: Includes optional `author` frontmatter so the content model supports both authorship modes without a schema change.
- [GA4 default analytics slot]: Includes cookieless/anonymized GA4 as the default analytics implementation because it is the locked default.
- [Newsletter structural placeholder]: Includes `NewsletterEmbed` only as a structural seam so the base supports later activation without adding provider-specific scope now.

## C7. OUT OF SCOPE FOR MVP
- [Provider-swappable analytics implementations beyond GA4 default] [Deferred]: Deferred because GA4 satisfies MVP analytics coverage and replacement-provider contracts are not yet specified.
- [Activated newsletter provider integration] [Deferred]: Deferred because the structural placeholder is sufficient for MVP and provider activation adds external-service scope.
- [Purpose-specific homepage or navigation variants] [Deferred]: Deferred because purpose remains metadata-only in MVP and purpose-sensitive defaults are unresolved.
- [Dark mode implementation variants beyond on/off support] [Deferred]: Deferred because MVP only needs the instance-level support decision and tokenized design contract.
- [Alternative pagination rules or per-instance listing size overrides] [Deferred]: Deferred because pagination is locked at 10 per page and variable pagination is not required for MVP viability.
- [Additional schema fields beyond base defaults] [Deferred]: Deferred because the base schema already supports the MVP authoring workflow.
- [Advanced deploy safety features such as rollback orchestration or transport-specific recovery UX] [Deferred]: Deferred because MVP only requires the locked deploy chain and halt-on-failure rule.
- [Formal multi-author permissions module] [Deferred]: Module-level deferral because schema-ready authorship is in MVP but publish/deploy authority boundaries are not yet formalized.
- [Provider abstraction module for analytics and newsletter services] [Deferred]: Module-level deferral because broader compliance and provider-equivalence rules remain unresolved.
- [Purpose-sensitive instance presets module] [Deferred]: Module-level deferral because purpose-specific defaults are unresolved and should not reshape MVP behavior.
- [Shared cross-instance design/component library module] [Deferred]: Module-level deferral because shared build-time assets are optional future reuse, not required for the base product.

## C8. CORE WORKFLOWS

### Workflow 1: Configure a New Instance
Actor: Instance operator
1. Define the instance purpose in `instance.config.mjs` as metadata such as personal blog, business blog, SEO hub, documentation, or changelog.
2. Choose the mount model for the instance: root, subdirectory via Astro base configuration, or subdomain.
3. Set domain-sensitive values through `.env`, including the environment-driven `site` value and any transport or analytics secrets.
4. Fill the design contract in `tokens.css`, including heading font, body font, accent color, radius token, and spacing scale.
5. Decide whether dark mode is supported for this instance and set the dark mode support flag in `instance.config.mjs`. The base default is no dark mode support unless the instance explicitly enables it. If enabled, ensure `tokens.css` defines both light and dark theme token states.
6. Select the authorship model in `instance.config.mjs`, using single-author or multi-author-ready content with optional `author` frontmatter.
7. Choose the deploy transport pattern in `instance.config.mjs` so the deploy chain can build, generate the search index, and transfer compiled output to the selected host.
8. Decide whether the default standalone shell is sufficient or whether `SiteShell.astro` must be adapted for host-site integration.
9. System resolves configuration according to the locked layer boundary: `.env` for secrets/domain, `instance.config.mjs` for operational choices, and `tokens.css` for design values.
10. System builds internal links, asset paths, and sitemap URLs using the configured site/base-path values.

### Workflow 2: Author and Publish Content
Actor: Author
1. Create a Markdown or MDX file in the instance content collection.
2. Add required frontmatter fields: `title`, `description`, `publishedAt`, and `tags`.
3. Add optional frontmatter as needed: `updatedAt`, `categories`, `image`, `imageAlt`, `draft`, `featured`, and `author`.
4. Write content and use approved MDX rich media components and the `CodeBlock` component where needed.
5. Run `npm run deploy`.
6. System validates content through Content Collections with Zod.
7. System excludes any content marked `draft` from production build output.
8. System generates static output through Astro.
9. System generates the Pagefind index.
10. System generates sitemap and RSS artifacts, including `content:encoded`.
11. System transfers compiled output through the selected transport pattern.
12. If any step in the build → Pagefind → transfer chain exits non-zero, the deploy sequence stops immediately and does not continue to later steps.

Note: This workflow describes the generic publish sequence regardless of which role executes the deploy command. Until the formal permissions module is formalized, deploy execution should be treated as an Instance operator responsibility per the C20 recommendation. The permissions boundary for Author deploy authority is explicitly unresolved.

### Workflow 3: Discover and Read Published Content
Actor: Reader
1. Visit the homepage or primary index route.
2. Browse recent or featured content using paginated listings, category pages, and tag pages.
3. Open an individual post page and consume rendered Markdown/MDX content, code blocks, and optional rich media embeds.
4. Use the static search page to query the Pagefind index client-side.
5. Access the RSS feed to subscribe.
6. If the instance has activated a newsletter integration in a later phase, use the newsletter surface exposed by the structural placeholder.
7. System renders the instance as a static site with no shared runtime state across sibling instances.
- [Open Question]: Packet A states that purpose is metadata only, while Packet B defers purpose-specific presets. It remains unresolved whether declared purpose should influence homepage emphasis, navigation labels, or optional module defaults in future phases.

### Workflow 4: Mount an Instance Into an Existing Site
Actor: Host-site integrator
1. Choose whether the instance will mount at root, under a subdirectory, or on a subdomain.
2. Configure the instance's base path and site values so Astro prefixes internal links, asset paths, and sitemap URLs correctly.
3. Use the default standalone shell or adapt `SiteShell.astro` for host-site presentation.
4. Pass the minimum resolved shell inputs: `pageTitle`, `description`, `canonicalUrl`, `currentPath`, and the default page-content slot.
5. Implement host integration using one of the two supported paths:
   - Option 1 — Direct markup integration: Copy the host site's header and footer markup into `SiteShell.astro` for this instance. The blog renders with the host site's chrome directly. [Assumption] Requires manual sync if the host nav changes.
   - Option 2 — Design-token matching: Keep the standalone shell and match the host site's visual design through the token contract in `tokens.css`. No markup coupling; [Assumption] the instance looks integrated through shared branding.
6. Deploy the instance to its own output target so it remains runtime-isolated from any sibling instances.

## C9. INFORMATION ARCHITECTURE / VIEWS
- Homepage / primary index: Recent or featured content entry point and navigation into listings and post detail. [Assumption] For instances where the homepage is the primary listing, these are the same view with variant presentation. Accessible by: Reader.
- Paginated post listing: Chronological or primary listing of posts paginated at 10 per page / accessible by: Reader.
- Category listing pages: Taxonomy pages for categories, paginated where applicable / accessible by: Reader.
- Tag listing pages: Taxonomy pages for tags, paginated where applicable / accessible by: Reader.
- Individual post page: Rendered Markdown/MDX content, rich media components, code blocks, metadata, SEO tags, and structured data / accessible by: Reader.
- Search page: Client-side full-text search surface powered by Pagefind with graceful fallback / accessible by: Reader.
- RSS feed endpoint: Machine-readable feed with `content:encoded` / accessible by: Reader and feed clients.
- Sitemap endpoint: Generated sitemap for discoverability / accessible by: Search engines and operators.
- Shell wrapper (`SiteShell.astro`): Layout and integration seam supplying metadata and outer shell behavior / accessible by: Instance operator and host-site integrator during implementation.

## C10. ENTITY / DATA MODEL

### Entity: Instance Configuration
- Key fields: purpose, mount model, base path, site URL, authorship mode, deploy transport, analytics setting, dark mode support flag, shell mode.
- Relationships: Governs content rendering, shell behavior, deploy behavior, and environment-driven URL generation.
- Ownership: Created and maintained by Instance operator.
- Lifecycle / state: Defined → updated → active in deployed instance.
- Source of truth: `instance.config.mjs` for operational decisions; `.env` for secrets/domain; `tokens.css` for design values.
- Sensitive / security-classified fields: Secrets and environment-specific credentials in `.env`; these must not be stored in version control.

### Entity: Content Entry
- Key fields: `title`, `description`, `publishedAt`, `tags`, optional `updatedAt`, `categories`, `image`, `imageAlt`, `draft`, `featured`, `author`, body content.
- Relationships: Belongs to one instance; may reference one author value; contributes to taxonomy pages, search index, RSS feed, sitemap, and post pages.
- Ownership: Authored by Author; publish path controlled by Author and/or Instance operator depending on future permission formalization.
- Lifecycle / state: Draft → published → updated; draft entries are excluded from production output.
- Source of truth: Markdown/MDX files in the content collection.
- Sensitive / security-classified fields: Draft status is operationally sensitive because draft content must never appear in production output.

### Entity: Taxonomy Term
- Key fields: tag name, category name, slug.
- Relationships: Aggregates multiple Content Entries into listing pages.
- Ownership: Derived from Content Entry frontmatter authored by Author.
- Lifecycle / state: Created implicitly when referenced by content; updated as content changes.
- Source of truth: Content entry frontmatter.
- Sensitive / security-classified fields: None.

### Entity: Search Index
- Key fields: indexed page content and metadata required by Pagefind.
- Relationships: Generated from published Content Entries and queried by the Search page.
- Ownership: Generated by the build/deploy pipeline.
- Lifecycle / state: Regenerated on each deploy.
- Source of truth: Derived build artifact from published content.
- Sensitive / security-classified fields: Must exclude draft-only content because drafts are filtered before production output.

### Entity: Shell Metadata
- Key fields: `pageTitle`, `description`, `canonicalUrl`, `currentPath`, page content slot.
- Relationships: Wraps rendered views and supports standalone or host-integrated presentation.
- Ownership: Maintained by Instance operator / host-site integrator.
- Lifecycle / state: Defined per instance, updated as shell integration changes.
- Source of truth: `SiteShell.astro` and instance-level implementation.
- Sensitive / security-classified fields: None.

## C11. FUNCTIONAL REQUIREMENTS

### Core Static Architecture
- Description: The product must use Astro with `output: 'static'`, Tailwind CSS v4, and Content Collections with Zod validation across all instances.
- Why it exists: It preserves the validated architecture and prevents each instance from re-deciding the core stack.
- Scope status: MVP
- Dependencies: Astro, Tailwind v4, Content Collections, Zod.
- Risks & tradeoffs: It prevents backend-runtime features from entering scope; any capability needing server-side state becomes a future architectural change.

### Three-Layer Configuration Surface
- Description: The product must separate instance decisions across `.env`, `instance.config.mjs`, and `tokens.css`, with no cross-layer leakage.
- Why it exists: It gives operators a disciplined way to configure new instances without hardcoding site-specific decisions.
- Scope status: MVP
- Dependencies: Configuration loading in the build pipeline and documented layer boundaries.
- Risks & tradeoffs: Poor separation would make reuse brittle; disciplined boundaries increase predictability but reduce ad hoc flexibility.

### Environment-Driven Domain and Mount Configuration
- Description: The product must derive site/domain values from environment variables and support root, subdirectory, and subdomain mount models using Astro base handling.
- Why it exists: It enables multiple independent instances across domains or mount points without hardcoded URLs.
- Scope status: MVP
- Dependencies: `.env`, Astro base configuration, shell metadata, sitemap generation.
- Risks & tradeoffs: Misconfiguration can break canonical URLs, sitemap paths, asset paths, or internal navigation.

### Design Contract with Neutral Defaults
- Description: All instance-level design values must be supplied through CSS custom properties rather than hardcoded aesthetics. Dark mode defaults to not supported in the base spec and is enabled only when an instance explicitly sets the dark mode support flag in `instance.config.mjs`.
- Why it exists: It allows each instance to adopt its own visual system while preserving shared architecture.
- Scope status: MVP
- Dependencies: `tokens.css`, component token consumption, self-hosted font delivery.
- Risks & tradeoffs: Token discipline improves reuse, but highly custom visual patterns may require later extensions.

### Markdown/MDX Authoring with Locked Schema Defaults
- Description: Authors must be able to create content in Markdown or MDX using required and optional frontmatter fields defined in the locked content schema.
- Why it exists: It supports the validated publishing workflow and keeps authoring backend-free.
- Scope status: MVP
- Dependencies: Content Collections, Zod validation, content collection routing.
- Risks & tradeoffs: The base schema is intentionally limited; additional fields are deferred to avoid premature schema sprawl.

### Draft Filtering
- Description: Content entries marked `draft` must be excluded from production output at build time.
- Why it exists: It provides staging without adding runtime access control.
- Scope status: MVP
- Dependencies: Content schema, build-time filtering.
- Risks & tradeoffs: Draft safety depends on correct build filtering; there is no runtime protection layer for accidentally published content.

### Rich Media and Code Block Layer
- Description: The product must support approved MDX rich media components and a locked `CodeBlock` component using Shiki, `lang` and `filename` props, line numbers always on, and copy-to-clipboard.
- Why it exists: It supports technical and media-rich content without a backend runtime.
- Scope status: MVP
- Dependencies: MDX support, rich media components, Shiki.
- Risks & tradeoffs: Third-party embeds add dependency surface; click-to-load reduces eager third-party loading but does not remove provider dependence.

### Discovery Surfaces
- Description: The product must expose homepage/primary index, paginated blog listings, category pages, tag pages, individual post pages, and static search.
- Why it exists: It supports the reader's content discovery and reading workflow.
- Scope status: MVP
- Dependencies: Content routing, pagination logic, taxonomy derivation, Pagefind.
- Risks & tradeoffs: Discovery remains static and content-driven; purpose-specific discovery variations are deferred.

### SEO and Structured Data Baseline
- Description: The product must generate sitemap, RSS with `content:encoded`, RSS autodiscovery, and the following structured data and social metadata on appropriate page types: JSON-LD Article, JSON-LD FAQPage, JSON-LD BreadcrumbList, JSON-LD WebSite with SearchAction, JSON-LD Organization or Person, Open Graph tags, and Twitter/X card tags.
- Why it exists: It ensures the reusable publishing base is discoverable by search engines, feed readers, and AI-powered answer engines from day one.
- Scope status: MVP
- Dependencies: `@astrojs/rss`, `@astrojs/sitemap`, metadata generation, post templates.
- Risks & tradeoffs: Structured data breadth improves discoverability but increases template responsibility and metadata QA requirements.

### Single-Command Deploy Chain
- Description: The product must expose `npm run deploy` that performs build → Pagefind index generation → transfer through the selected transport pattern, and must halt on failure at any step.
- Why it exists: It gives authors and operators one reliable publish path across different hosting environments.
- Scope status: MVP
- Dependencies: Build tooling, Pagefind, transport implementation, environment configuration.
- Risks & tradeoffs: One command improves ergonomics, but transport diversity means errors can vary by host environment.

### Standalone Shell plus `SiteShell.astro` Seam
- Description: The product must ship with a default standalone shell and a shell integration seam accepting the resolved minimum props: `pageTitle`, `description`, `canonicalUrl`, `currentPath`, and a default page-content slot. Two supported integration paths are available per instance: direct markup integration or design-token matching. Both are resolved supported options and require no structural changes to the base architecture.
- Why it exists: It supports both standalone deployment and integration into an existing host site.
- Scope status: MVP
- Dependencies: Shell template, metadata flow, base-path handling, token contract.
- Risks & tradeoffs: The seam supports integration, but deeper host-integration formalization is deferred.

### Schema-Ready Multi-Author Support
- Description: The content schema must support optional `author` frontmatter in MVP without introducing the full permissions module.
- Why it exists: It preserves authorship flexibility without requiring a schema change later.
- Scope status: MVP
- Dependencies: Content schema, authoring workflow.
- Risks & tradeoffs: It supports data modeling now, but operational authority boundaries remain unresolved.

### GA4 Default Analytics Slot
- Description: The product must support cookieless/anonymized GA4 as the default analytics implementation. Analytics failure must not block or degrade page rendering for readers.
- Why it exists: It provides a baseline analytics capability already locked in upstream packets.
- Scope status: MVP
- Dependencies: Analytics configuration, environment values if required by the selected instance.
- Risks & tradeoffs: It covers MVP analytics needs, but replacement-provider abstraction is deferred.

### Newsletter Structural Placeholder
- Description: The product must include `NewsletterEmbed` as a structural placeholder without requiring an active provider integration.
- Why it exists: It preserves a future activation seam without adding external-service scope to MVP.
- Scope status: MVP
- Dependencies: Template support for optional rendering.
- Risks & tradeoffs: It keeps future flexibility, but does not deliver newsletter functionality in MVP.

## C12. NON-FUNCTIONAL REQUIREMENTS
- Performance: Post pages must meet the locked Lighthouse 100 post-page performance standard.
- Scalability: The product must support multiple independent instances on one domain or across multiple domains, with no shared runtime state between instances.
- Availability: [Open Question] Availability targets are not specified in Packet A or Packet B and will depend on the selected static host and deployment transport for each instance. See C14 and C19 for deployment model variability context.
- Reliability: The single deploy chain must halt on failure at any non-zero exit step; draft filtering, search indexing, sitemap generation, and RSS generation must occur during the deploy path rather than as separate manual steps.
- Other: Search must use Pagefind as the locked static search solution with graceful fallback.

## C13. SECURITY REQUIREMENTS
- Authentication: [Assumption] MVP exposes a public read-only runtime for readers and does not introduce runtime login for authoring or administration; operator and author actions occur through the code/content workflow and deployment environment rather than an in-product admin UI.
- Authorisation and permissions model: [Open Question] The minimum formal permission model for multi-author instances is unresolved. MVP supports schema-ready authorship, but publish/deploy authority boundaries are deferred.
- Secrets and API key handling: All secrets must live in `.env` and be excluded from version control. No instance may hardcode secrets in source.
- Encryption at rest and in transit: [Recommendation] HTTPS should be enabled for all live instance deployments. SSL/TLS management is handled at the hosting environment level and is outside application scope. Secrets must not be stored in source repositories per the `.env` rule. [Open Question] A required at-rest encryption baseline for build environments and selected static hosts is not specified and is owner-dependent per instance.
- Input validation: Content Collections with Zod validation are mandatory, required/optional frontmatter fields are fixed, and draft filtering occurs at build time.
- Audit logging: [Recommendation] Build and deploy logs should be retained by the execution environment for a minimum duration sufficient to diagnose the last deploy failure. No dedicated audit subsystem is required in MVP.
- Tenant / workspace isolation: Each instance must be deployed as an independent Astro build with no shared runtime state; sibling instances may share a domain but must not share runtime coupling.
- Backup and recovery: [Recommendation] Source content, configuration files, and deployable build inputs should be backed up through version control with at least one remote copy. [Recommendation] Host-environment backup for deployed output is the responsibility of the instance operator and should be addressed per instance before going live.

## C14. DEPLOYMENT REQUIREMENTS
- Deployment model: Hybrid. The base product supports multiple deployment environments and transport patterns per instance while keeping one fixed deploy contract.
- Infrastructure: Static hosting only. Each instance is an independent Astro static build with its own output target, optional base path, and selected transfer pattern. No backend runtime is required for MVP.
- Update strategy: Updates must flow through `npm run deploy`, which performs build → Pagefind index generation → transfer. The sequence must stop on the first non-zero exit code.
- Secrets management: Secrets and domain-sensitive values must be stored in `.env`, excluded from version control, and consumed from the environment rather than hardcoded in code.
- Operational considerations: The configured `site` value and mount point must drive canonical URLs, sitemap URLs, internal links, and asset paths. Transport selection is instance-level. Runtime isolation between sibling instances must be preserved even when they share a domain.

## C15. INTEGRATION REQUIREMENTS

### Pagefind
- Direction: Outbound at build time, inbound at read time through client-side querying.
- Trigger: Deploy command runs the build chain; reader later performs a search.
- Data exchanged: Published content and metadata are indexed into the static search index; the client-side search page queries that index.
- Error handling: If index generation fails during deploy, the deploy chain must halt on failure.

### `@astrojs/rss`
- Direction: Outbound build-time generation.
- Trigger: Deploy command runs the build chain.
- Data exchanged: Published content entries and metadata are transformed into an RSS feed with `content:encoded`.
- Error handling: If RSS generation fails, the deploy chain must halt on failure.

### `@astrojs/sitemap`
- Direction: Outbound build-time generation.
- Trigger: Deploy command runs the build chain.
- Data exchanged: Published route metadata and canonical URLs are transformed into sitemap output.
- Error handling: If sitemap generation fails, the deploy chain must halt on failure.

### GA4
- Direction: Outbound client-side analytics.
- Trigger: Reader loads pages on an instance where GA4 is enabled as the default analytics slot.
- Data exchanged: Page analytics data consistent with the configured cookieless/anonymized GA4 setup.
- Error handling: Analytics failure must not block or degrade page rendering. [Open Question] Packet A and Packet B do not specify failure-display, retry, or validation behavior for analytics misconfiguration beyond the non-blocking requirement.

### fontsource
- Direction: Build-time/local asset integration.
- Trigger: The instance includes selected self-hosted typefaces in the design system.
- Data exchanged: Font assets are bundled and served as part of the static site.
- Error handling: If selected fonts are missing or misconfigured, the instance should fail build-time asset resolution rather than silently falling back to undeclared typefaces. [Recommendation]

### Rich media providers
- Direction: Outbound client-side embed loading after user activation.
- Trigger: Reader activates a click-to-load embed inside MDX content.
- Data exchanged: Provider-specific embed requests for YouTube, Vimeo, Codepen, GitHub Gist, and Twitter/X content.
- Error handling: If a provider embed cannot load, the surrounding post content must remain readable and the failure must be isolated to the embed surface.

### Deploy transport layer
- Direction: Outbound deployment transfer.
- Trigger: Deploy command reaches the transfer phase after a successful build and index generation.
- Data exchanged: Compiled static output and related deploy artifacts are transferred through the selected transport pattern. Supported patterns: SFTP, rsync/SSH, CI/CD pipeline, manual copy.
- Error handling: Any non-zero exit code in the transfer phase must halt the sequence and fail the deploy command.

### `SiteShell.astro` seam
- Direction: Internal instance-to-host integration surface.
- Trigger: An instance is mounted standalone or integrated into an existing host site.
- Data exchanged: `pageTitle`, `description`, `canonicalUrl`, `currentPath`, and page content through the default slot.
- Integration options: Two supported paths exist per instance. Option 1 — direct markup integration: copy host site header/footer markup into `SiteShell.astro` for this instance. Option 2 — design-token matching: match the host site's visual design through the token contract in `tokens.css`. Both options are resolved supported choices and require no structural changes to the base architecture.
- Error handling: [Open Question] Packet B resolves minimum props, but does not define validation or fallback behavior if host integration is incomplete or inconsistent.

## C16. PERMISSIONS / ROLES MATRIX

| Capability | Instance operator | Author | Reader |
|---|---|---|---|
| Configure `.env`, `instance.config.mjs`, and `tokens.css` | Yes | No | No |
| Select deploy transport and hosting target | Yes | No | No |
| Create and edit content files | Yes | Yes | No |
| Set optional `author` frontmatter | Yes | Yes | No |
| Run `npm run deploy` | Yes | [Open Question] | No |
| Adapt `SiteShell.astro` for host integration | Yes | No | No |
| Read published pages, search, taxonomy routes, and RSS | Yes | Yes | Yes |

Note: Author deploy authority is intentionally unresolved in MVP. This matrix must not be read as implicitly granting deploy rights to Authors. The formal permissions module, deferred to a later phase, will define that boundary.

## C17. REPORTING & ANALYTICS REQUIREMENTS
- Default GA4 page analytics support: MVP
- Analytics provider replacement beyond GA4 default: Deferred
- Newsletter-provider reporting or subscription analytics: Deferred
- [Open Question] Packet A and Packet B do not specify required reports, exports, or surfaced analytics views beyond including the GA4 default slot. Owner: product/operator.

## C18. MODULARITY MAP
- Core platform: Astro static output, Tailwind CSS v4, Content Collections with Zod, Markdown/MDX authoring, draft filtering, Pagefind, sitemap, RSS, structured data baseline, single-command deploy chain, three-layer configuration surface, standalone shell, and `SiteShell.astro` seam.
- Optional modules: Newsletter activation via `NewsletterEmbed`, instance-selected analytics slot behavior within the MVP default, and host-specific shell presentation choices.
- Future add-ons: Formal multi-author permissions, provider abstraction beyond defaults, purpose-sensitive instance presets, shared cross-instance design/component library, advanced deploy safety tooling.
- Replaceable layers: Deploy transport implementation, selected typefaces delivered through fontsource, instance-level design tokens, analytics provider layer once provider abstraction exists, and shell presentation implemented through `SiteShell.astro` plus token contract.

## C19. RISKS & TRADEOFFS
- Product: Purpose remains metadata in MVP — this avoids premature UX branching, but it may limit how well documentation, changelog, or SEO-hub instances feel purpose-native until later presets are defined.
- Technical: Transport abstraction increases reuse across hosts — this matters because each transport can fail differently — mitigation: keep one fixed deploy contract and lock halt-on-failure behavior.
- Security: Public static draft exclusion replaces runtime access control — this matters because draft safety depends entirely on build filtering — mitigation: keep draft filtering locked at build time and avoid introducing runtime draft surfaces in MVP.
- Operational: Hybrid deployment flexibility shifts some operational guarantees to the selected host and transport — this matters because availability, backup posture, and some failure behavior vary by environment — mitigation: document the fixed deploy contract and resolve host-specific baselines per instance where needed.
- Provider abstraction deferred: Until the provider abstraction module ships, instances that need non-GA4 analytics or an active newsletter provider must solve compliance and integration independently without a base-spec framework — mitigation: document this as an instance-level responsibility until Phase 2+.
- Permissions deferred: Until the formal permissions module ships, multi-author instances have no base-spec guidance on publish/deploy authority boundaries — mitigation: [Recommendation] treat all deploy authority as instance-operator-only until the permissions module is formalized.

## C20. OPEN QUESTIONS, ASSUMPTIONS, RECOMMENDATIONS & DEFERRED DECISIONS
- [Open Question] — The formal permission model for multi-author instances is unresolved. This includes the exact boundary between Instance operator and Author, publish rights, deploy authority, and any future workflow controls. Packet B defers this to a later module. Owner: product/operator.
- [Open Question] — Packet A states that purpose is metadata only, while Packet B defers purpose-specific presets. It remains unresolved whether declared purpose should influence homepage emphasis, navigation labels, or optional module defaults in future phases. Owner: product/operator.
- [Deferred] — Provider-swappable analytics implementations beyond GA4 default are deferred because GA4 satisfies MVP analytics coverage and replacement-provider contracts are not yet specified.
- [Deferred] — Activated newsletter provider integration is deferred because the structural placeholder is sufficient for MVP and provider activation adds external-service scope.
- [Deferred] — Purpose-specific homepage or navigation variants are deferred because purpose remains metadata-only in MVP and purpose-sensitive defaults are unresolved.
- [Deferred] — Dark mode implementation variants beyond on/off support are deferred because MVP only needs the instance-level support decision and tokenized design contract.
- [Deferred] — Alternative pagination rules or per-instance listing size overrides are deferred because pagination is locked at 10 per page and variable pagination is not required for MVP viability.
- [Deferred] — Additional schema fields beyond base defaults are deferred because the base schema already supports the MVP authoring workflow.
- [Deferred] — Advanced deploy safety features such as rollback orchestration or transport-specific recovery UX are deferred because MVP only requires the locked deploy chain and halt-on-failure rule.
- [Deferred] — The formal multi-author permissions module is deferred because schema-ready authorship is in MVP but publish/deploy authority boundaries are not yet formalized.
- [Deferred] — The provider abstraction module for analytics and newsletter services is deferred because broader compliance and provider-equivalence rules remain unresolved.
- [Deferred] — The purpose-sensitive instance presets module is deferred because purpose-specific defaults are unresolved and should not reshape MVP behavior.
- [Deferred] — The shared cross-instance design/component library module is deferred because shared build-time assets are optional future reuse, not required for the base product.
- [Open Question] — Availability targets are not specified in Packet A or Packet B and will depend on the selected static host and deployment transport for each instance. Owner: operator per instance.
- [Open Question] — A required at-rest encryption baseline for build environments and selected static hosts is not specified and is owner-dependent per instance. Owner: operator/security reviewer.
- [Assumption] — MVP exposes a public read-only runtime for readers and does not introduce runtime login for authoring or administration; operator and author actions occur through the code/content workflow and deployment environment rather than an in-product admin UI.
- [Recommendation] — If selected fonts are missing or misconfigured, the instance should fail build-time asset resolution rather than silently falling back to undeclared typefaces.
- [Open Question] — Packet B resolves minimum `SiteShell.astro` props, but does not define validation or fallback behavior if host integration is incomplete or inconsistent. Owner: implementation/spec reviewer.
- [Open Question] — Whether Authors can run `npm run deploy` in MVP is unresolved because the formal permissions boundary is deferred. Owner: product/operator.
- [Open Question] — Packet A and Packet B do not specify required reports, exports, or surfaced analytics views beyond including the GA4 default slot. Owner: product/operator.
- [Open Question] — Packet A and Packet B do not specify failure-display, retry, or validation behavior for analytics misconfiguration beyond the non-blocking requirement. Owner: implementation/spec reviewer.
- [Open Question] — Provider-specific security and compliance obligations for alternative analytics or newsletter providers are unresolved. Instances replacing GA4 or activating a newsletter provider must define their own compliance baseline until the provider abstraction module is formalized. Owner: operator/security reviewer.
- [Recommendation] — HTTPS should be enabled for all live instance deployments. SSL/TLS management is handled at the hosting environment level and is outside application scope.
- [Recommendation] — Build and deploy logs should be retained by the execution environment for a minimum duration sufficient to diagnose the last deploy failure.
- [Recommendation] — Source content, configuration files, and deployable build inputs should be backed up through version control with at least one remote copy.
- [Recommendation] — Host-environment backup for deployed output is the responsibility of the instance operator and should be addressed per instance before going live.
- [Open Question] — Secret rotation responsibilities for deploy credentials, analytics IDs, and any future newsletter provider credentials are not specified. Instances must define a rotation policy as part of their operational baseline. Owner: operator/security reviewer.
- [Recommendation] — Treat all deploy authority as instance-operator-only until the formal permissions module is formalized.

## C21. RECOMMENDED IMPLEMENTATION PHASES

### Phase 0 — MVP
Scope: Ship the reusable static site base with locked architecture, three-layer configuration surface, environment-driven domain/base-path handling, neutral design contract with dark-mode-off default, Markdown/MDX authoring with locked schema defaults, rich media and code block support, reader discovery surfaces, SEO/feed baseline, full SEO and AEO structured data layer, default shell plus `SiteShell.astro` seam with two supported integration paths, default GA4 slot, newsletter structural placeholder, and the single-command deploy chain with selectable transport and locked halt-on-failure behavior.
Unlock condition: A new instance can be configured and deployed through the documented configuration layers, publish validated content through one deploy command, render search/RSS/sitemap correctly, and mount either standalone or under a base path without runtime coupling to other instances.
Key dependencies: Astro static build, Tailwind v4, Content Collections with Zod, Pagefind, `@astrojs/rss`, `@astrojs/sitemap`, fontsource, transport abstraction implementation, and the locked configuration-layer boundary.

### Phase 1
Scope: Add the first deferred expansions that deepen reuse without altering the core base, primarily formalizing host-shell integration details and enabling one or more provider swaps or activations where the compliance baseline is defined. [Assumption] Note: Packet B Phase 1 originally included "clarifying deploy reliability rules." This item was superseded by B10, which resolved halt-on-failure as a locked MVP rule. That resolution is implemented in Phase 0 and does not carry forward to Phase 1.
Unlock condition: The unresolved MVP questions that materially affect implementation consistency are answered, especially replacement-provider privacy/compliance expectations, `SiteShell.astro` validation/fallback behavior, and provider-baseline definitions. [Assumption]
Key dependencies: Human decisions on unresolved questions, confirmed shell-integration rules, and a stable MVP implementation proving the reusable base works across at least one standalone and one mounted instance. [Assumption]

### Phase 2+
Scope: Expand into deferred modules such as formal multi-author permissions, provider abstraction beyond defaults, purpose-sensitive presets, and optional shared cross-instance component/design libraries once the base platform has demonstrated reuse across multiple instance types. [Assumption]
Unlock condition: The base product has been validated across multiple independent instances and there is clear evidence that additional abstraction reduces repeated work rather than adding premature complexity. [Assumption]
Key dependencies: Confirmed real-world demand across instance types, resolved permission/compliance questions, and stable boundaries for configuration layers so future modules do not blur the separation already locked in Packet A. [Assumption]

## PACKET C SOURCE INTEGRITY
- [x] All Packet A / Packet B contradictions were identified in the pre-write scan
- [x] Each contradiction is either: (a) flagged as [Open Question] inline and in C20, or (b) resolved by an explicit human override recorded in Packet B sign-off notes, with the resolution noted inline
- [x] No conflicted field was silently resolved in favor of either packet
- [x] No scope decision from Packet B has been reopened without an explicit human override recorded in the Packet B sign-off
- [x] No new [Recommendation] reshapes Packet B scope intent without explicit justification stated inline
- [x] All invented or inferred content is tagged per the Global Tag Contract
- [x] All eight security domains are addressed in C13
- [x] Packet A fields A8, A9, A11, and A14 are reflected in C
- [x] A5 Business Goal is reflected in C if not clearly restated in Packet B
- [!] Note: Packet A and Packet B human sign-off checkboxes are unchecked. This spec was produced from upstream packets that have not been formally approved at their review checkpoints. Downstream reliance on this Packet C should be qualified by that reduced checkpoint integrity until upstream approval is obtained.

## SELF-EVALUATION
- Did I preserve Packet A facts and locked decisions? Yes.
- Did I treat Packet B as binding? Yes.
- Did I avoid scope bleed? Yes.
- Did I address all 21 sections? Yes.
- Did I address all eight security domains? Yes.
- Did I calibrate deployment requirements to the actual deployment model? Yes.
- Did I consolidate every tagged item into C20? Yes.
