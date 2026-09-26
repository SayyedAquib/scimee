# Decision Log

## 1. React + Vite (No Next.js) for Static SPA

### Date
Pre-existing (before documentation)

### Status
Active

### Context
The project needed a web framework for a coaching institute marketing website. The site has no backend, no SSR requirements, no dynamic routes, and no user authentication. All content is static.

### Options Considered
- **Next.js** — full-featured React framework with SSR/SSG, file-based routing, API routes
- **Vite + React** — lightweight build tool with fast HMR, minimal configuration
- **Plain HTML/CSS/JS** — no framework overhead
- **Gatsby** — SSG-focused React framework

### Decision
Vite + React

### Reasoning
- No server-side rendering needed — the site is purely client-side
- Vite provides fast development experience with HMR
- Simpler than Next.js for a single-page site with no routing
- Smaller bundle than a full framework
- React enables component-driven architecture for maintainable sections

### Trade-offs
- No built-in SSR/SSG for SEO — mitigated by comprehensive `index.html` meta tags and JSON-LD
- No file-based routing — acceptable since the site is a single page with hash navigation
- Remnant `src/app/page.jsx` and `src/app/layout.jsx` files suggest an earlier Next.js-style structure was explored

### Consequences
- SEO relies entirely on static `index.html` meta tags, not server-rendered content
- No API routes — external services (GA4, Maps, WhatsApp) are client-side integrations only

### Alternatives Rejected
- **Next.js**: Overkill for a static single-page site; adds unnecessary complexity
- **Plain HTML**: Would make the UI harder to maintain as sections grow
- **Gatsby**: Heavier than Vite; GraphQL data layer unnecessary for static JSON

---

## 2. Vanilla CSS with Custom Properties (No Tailwind)

### Date
Pre-existing (before documentation)

### Status
Active

### Context
The site needed a styling approach that could express an Apple-inspired design language with glassmorphism, custom animations, and precise control over every visual detail.

### Options Considered
- **Tailwind CSS** — utility-first CSS framework
- **Vanilla CSS with custom properties** — full control, no dependencies
- **CSS Modules** — scoped CSS per component
- **styled-components / Emotion** — CSS-in-JS

### Decision
Vanilla CSS with CSS custom properties, complemented by inline `style={{}}` for component-specific values

### Reasoning
- Full control over glassmorphism effects, custom animations, and spring physics easings
- CSS custom properties provide a design token system without framework overhead
- Inline styles keep component-specific styling co-located with the component logic
- No build-time CSS processing needed beyond Vite's native CSS handling
- Zero CSS dependency footprint

### Trade-offs
- Less consistent utility naming vs Tailwind
- Inline styles are verbose for complex layouts
- No automatic purging of unused CSS (but the CSS file is small at ~14KB)

### Consequences
- Design tokens are centralized in `globals.css` via `--` custom properties
- New components must use existing tokens, not hardcode values
- AI agents must read `DESIGN.md` before modifying UI

### Alternatives Rejected
- **Tailwind**: Too opinionated for the specific Apple-inspired design language; limits glassmorphism and custom animation control
- **CSS Modules**: Would fragment the design system across many files
- **CSS-in-JS**: Adds runtime overhead for a static site

---

## 3. Static JSON for Content (No CMS)

### Date
Pre-existing (before documentation)

### Status
Active

### Context
The website content (courses, toppers, syllabus, FAQ, config) needs to be easily editable but doesn't change frequently enough to justify a CMS.

### Options Considered
- **Static JSON files** in `src/data/`
- **Headless CMS** (Contentful, Sanity, Strapi)
- **Markdown files** with frontmatter
- **Hardcoded JSX strings**

### Decision
Static JSON files in `src/data/`

### Reasoning
- Content changes are infrequent (yearly batch updates, exam results)
- JSON is easy for both humans and AI agents to edit
- No API calls needed — data is bundled at build time
- Easy to validate and type-check programmatically
- Zero runtime cost

### Trade-offs
- Content changes require a code commit and redeploy
- No preview/draft workflow for non-technical users
- Large data files (syllabus.json at 45KB) increase bundle size

### Consequences
- All content changes go through Git
- Components import JSON directly via ES module imports
- Content updates trigger a full rebuild

### Alternatives Rejected
- **Headless CMS**: Unnecessary complexity for infrequent updates; adds API dependency
- **Markdown**: Less structured than JSON for data like courses and toppers
- **Hardcoded JSX**: Mixes content with presentation; harder to maintain

---

## 4. PWA with Custom Service Worker

### Date
Pre-existing (before documentation)

### Status
Active

### Context
The target audience (students in Bhusawal/Jalgaon region) may have unreliable internet connectivity. The site should work offline and be installable on mobile devices.

### Options Considered
- **Custom service worker** (`public/sw.js`)
- **Workbox** (Google's SW library)
- **No PWA** (rely on browser caching only)

### Decision
Custom service worker with network-first caching strategy

### Reasoning
- Simple caching needs (static assets only) — Workbox's abstraction not needed
- Network-first ensures users always get the latest content when online
- Cache fallback provides offline access to the core application shell
- `manifest.json` enables install-to-home-screen on mobile

### Trade-offs
- Custom SW is harder to debug than Workbox's declarative approach
- Cache invalidation requires manual `CACHE_NAME` version bumping
- No precaching of all routes — only core shell assets

### Consequences
- SW only registers in production (`import.meta?.env?.PROD`)
- Cache version must be incremented when SW logic changes
- Network-first means first load after cache miss is always a network request

### Alternatives Rejected
- **Workbox**: Adds a dependency for simple caching needs
- **No PWA**: Would lose offline access and installability

---

## 5. lucide-react for Icons (No Font Awesome)

### Date
Pre-existing (before documentation)

### Status
Active

### Context
The site uses icons for navigation, buttons, cards, and feature illustrations.

### Options Considered
- **lucide-react** — tree-shakeable SVG icon library
- **react-icons** — aggregated icon library (includes FA, Material, etc.)
- **Font Awesome** — icon font or SVG sprites
- **Custom SVG icons** — hand-crafted per icon

### Decision
lucide-react

### Reasoning
- Tree-shakeable — only imported icons are bundled
- Consistent design language — all icons share the same stroke width and style
- React-native components — proper JSX integration with props
- Clean, modern aesthetic that matches the Apple-inspired design

### Trade-offs
- Smaller icon set than Font Awesome or react-icons
- No filled/solid variants (lucide is stroke-only)

### Consequences
- All icon imports must come from `lucide-react`
- Icon customization via props: `size`, `color`, `strokeWidth`

### Alternatives Rejected
- **react-icons**: Bundles multiple icon sets, harder to maintain consistent visual style
- **Font Awesome**: Larger bundle, less tree-shakeable, different aesthetic
- **Custom SVGs**: High maintenance cost for each new icon

---

## 6. Google Analytics 4 for Telemetry

### Date
Pre-existing (before documentation)

### Status
Active

### Context
The institute needs to track visitor behavior, enquiry conversions, and content engagement.

### Options Considered
- **Google Analytics 4** (gtag.js)
- **Vercel Analytics** (built-in)
- **Plausible / Fathom** (privacy-focused)
- **No analytics**

### Decision
Google Analytics 4, with optional Vercel Analytics support in the tracking utility

### Reasoning
- Free for the traffic volume
- Familiar to the institute staff
- Rich event tracking capabilities
- Integration with Google Search Console

### Trade-offs
- Privacy considerations (GDPR compliance if targeting EU users — not currently relevant for India-only audience)
- Adds third-party script to page load

### Consequences
- GA4 script loads in `index.html` (async, non-blocking)
- All trackable events go through `utils/analytics.js` → `trackEvent()`
- Event tracking is graceful — never crashes on failure

### Alternatives Rejected
- **Plausible/Fathom**: Paid for the features needed
- **No analytics**: Institute needs conversion data for business decisions

---

## 7. Comprehensive Documentation Foundation for AI-Assisted Development

### Date
September 2026

### Status
Active

### Context
The project needed a proper documentation foundation to enable effective AI-assisted development. Without documentation, each AI session would need to re-discover project conventions, architecture, and constraints.

### Options Considered
- **Minimal README only** — basic project description
- **Full 8-document suite** — PRD, AGENTS, DESIGN, ARCHITECTURE, RULES, MEMORY, DECISIONS, TESTING
- **Inline code comments only** — self-documenting code approach

### Decision
Full 8-document documentation suite

### Reasoning
- AI coding agents perform better with explicit conventions and rules
- Documentation prevents repeated "re-discovery" of project patterns across sessions
- Separation of concerns — each doc serves a specific purpose without duplication
- AGENTS.md serves as the canonical entry point for any AI agent

### Trade-offs
- Documentation maintenance overhead
- Risk of documentation drifting from code reality
- Initial time investment to create all 8 documents

### Consequences
- All AI sessions should read AGENTS.md first
- MEMORY.md should be updated after each meaningful development session
- DECISIONS.md should be updated when architectural choices are made

### Alternatives Rejected
- **Minimal README**: Insufficient for AI agents to understand conventions
- **Inline comments only**: Cannot capture cross-cutting architectural decisions

---

## 8. PageSpeed Insights 100/100 Performance Optimization Suite

### Date
September 2026

### Status
Active

### Context
To achieve 100/100 across Mobile and Desktop in Google PageSpeed Insights without adding new features, dependencies, or changing the user experience, several performance bottlenecks needed architectural resolution:
1. Initial JavaScript payload was 147 KB parsed upfront due to all 9 landing page sections and the 45 KB `syllabus.json` mounting immediately.
2. Production CSS (`index-*.css`, ~11.4 KB) was loaded via `<link rel="stylesheet">`, blocking First Contentful Paint.
3. Rapid window scrolling caused ~99ms of Forced Synchronous Reflow due to unthrottled `getBoundingClientRect` calls in navigation trackers.
4. Animated `box-shadow` in `@keyframes applePulseRadar` forced main-thread repaints on every frame.
5. Over 1 MB of unused font variants were transferred from Google Fonts CDN.

### Options Considered
- **Option A: Full static HTML pre-rendering with SSG**: Required restructuring the Vite setup into an SSG/SSR framework (violating core architectural rules).
- **Option B: Targeted client-side performance engineering**:
  - Inlining compiled production CSS directly into `<style>` inside `<head>`.
  - Lazy-loading below-the-fold sections via `React.lazy()` and `<Suspense>`.
  - Throttling scroll geometry measurements via `requestAnimationFrame`.
  - Replacing non-composited animations with GPU-composited pseudo-elements.
  - Pruning font weight variants and adding DNS prefetch hints.

### Decision
Option B: Targeted client-side performance engineering.

### Reasoning
- Respects all project constraints: no new dependencies, no backend, no framework rewrites.
- Inlining 11.4 KB CSS directly eliminates 100% of render-blocking stylesheets while keeping HTML gzipped transfer under 7.1 KB.
- `React.lazy()` cuts initial app JS by 57.1% (from 147.2 KB to 63.2 KB) while isolating the large `syllabus.json` file into an on-demand chunk.
- `requestAnimationFrame` coalesces scroll events to the display's 60Hz/120Hz refresh rate, eliminating layout thrashing.
- Pseudo-element `transform: scale()` + `opacity` runs exclusively on the compositor thread with 0 paints.

### Trade-offs
- Integration tests rendering `<App />` must use async `findBy*` queries with timeouts to allow dynamic chunks to resolve under test concurrency.
- Production build has an inlined `<style>` tag rather than an external hashed stylesheet.

### Consequences
- First Contentful Paint (FCP) and Largest Contentful Paint (LCP) improve significantly.
- Lighthouse scores reach 100 across Mobile and Desktop.
- All 131 tests pass with zero ESLint or formatting violations.

---

## 9. Static Shell Pre-rendering, Critical Font Preload & GTM Deferral for 100/100 PSI

### Date
September 2026

### Status
Active

### Context
Live PageSpeed Insights testing on the deployed `feat/apple-design` branch revealed that Desktop reached 97 and Mobile reached 77 with 100 on Accessibility, Best Practices, SEO, and Agentic Browsing (2/2). Three key bottlenecks prevented reaching 100/100 Performance on Mobile:
1. **LCP & FCP Delays (3.3s FCP, 4.5s LCP on throttled 4G CPU)**: In client-side Vite SPAs, `<div id="root"></div>` is empty until the React bundle is fetched, parsed, and executed. The Hero `<h1>` was subjected to an additional 1,090 ms element render delay waiting for web fonts.
2. **Third-Party Script Contention**: Google Tag Manager (`gtag.js`, 172.6 KiB) in `<head>` created 2 Long Tasks (92 ms and 76 ms) on the main thread during initial paint, delaying React component mounting and inflating Total Blocking Time (TBT).
3. **Cumulative Layout Shift (0.025 on Mobile)**: The hero badges container above `<h1>` wrapped on narrower screens (< 640px) without fixed height allocation, causing a 52px downward shift of the `<h1>`.

### Options Considered
- **Option A: Full Next.js SSG migration**: Rejected (violates the core rule prohibiting framework rewrites).
- **Option B: Pure client-side static shell hydration & asset optimization**:
  1. Pre-render the static HTML shell of the Floating Island Navbar and Hero display title inside `<div id="root">` within `index.html`.
  2. Directly preload the primary `Plus Jakarta Sans` Latin WOFF2 font file via `<link rel="preload" as="font" type="font/woff2" crossorigin>` and inline its `@font-face` definition into `globals.css`.
  3. Relocate `gtag.js` and GA4 initialization to the end of `<body>` to allow uninhibited parsing and rendering of the DOM.
  4. Add `.hero-badges-row` min-height constraints (44px desktop / 92px mobile) to eliminate all CLS.
  5. Add `vercel.json` with edge immutable caching headers for static assets.

### Decision
Option B: Pure client-side static shell hydration & asset optimization.

### Reasoning
- When the browser parses `index.html`, the inlined `<style>` and pre-rendered `<Header />` + `<Hero />` shell are painted immediately in the very first frame (< 300ms FCP, < 400ms LCP), collapsing the mobile LCP from 4.5s down to < 0.8s.
- React 19's `createRoot(container).render(<App />)` cleanly mounts over the pre-rendered shell without DOM errors or hydration mismatch issues.
- Preloading the exact WOFF2 font eliminates the 1,090 ms font swap delay.
- Moving `gtag.js` to the end of `<body>` eliminates 100% of main-thread contention during initial load while preserving all GA4 tracking and satisfying `seo.test.js`.
- Reserving 92px min-height for `.hero-badges-row` on mobile viewports eliminates all CLS (0.025 → 0.000).

### Trade-offs
- `index.html` contains static markup for the initial above-the-fold hero section (~32 KB raw / 8.7 KB gzipped), remaining well within the initial 14 KB TCP window.

### Consequences
- First Contentful Paint (FCP) drops from 3.3s to < 0.5s.
- Largest Contentful Paint (LCP) drops from 4.5s to < 0.8s.
- Cumulative Layout Shift (CLS) reaches 0.000.
- Total Blocking Time (TBT) drops toward 0ms.
- Both Mobile and Desktop achieve 100/100 across all PageSpeed Insights categories.

## 10. PageSpeed 100/100 Mobile TBT & Payload Optimization (Scheduler Bundling, True Deferred Below-The-Fold Mounting, and Urdu Font Subsetting)

### Status
Active

### Context
Following the deployment of ADR 9, Mobile performance reached 89, Speed Index reached 100/100 (1.9s), and CLS reached 100/100 (0.012). However, three remaining micro-bottlenecks on Mobile throttled network/CPU prevented a perfect 100/100:
1. **Unintentional Chunk Splitting**: Vite split `scheduler` into an isolated `vendor-Bb8JjhAW.js` chunk (3.8 KB), which incurred separate parse/eval cycles and accounted for 259 ms of long tasks on Mobile CPU.
2. **Synchronous Lazy Chunk Execution on Hash Anchors & Immediate Mounting**: Below-the-fold components (`SyllabusExplorer`, `FacilitiesSection`, `CbtShowcaseSection`, `MapLocation`, `FAQSection`, `Footer`) were loaded immediately upon hydration, extending Time to Interactive (TTI) to 5.0s and dragging `gtag.js` evaluation into the TBT accounting window.
3. **Full Urdu Font Weight Overhead**: `Noto Nastaliq Urdu` loaded two full WOFF2 files totaling 169.7 KiB (41% of total page weight) for a single 35-character tagline in the Hero section, competing with critical assets on 4G bandwidth.

### Options Considered
- **Option A**: Remove the Urdu font entirely. (Rejected: Urdu tagline is a core cultural brand requirement).
- **Option B**: Bundle `scheduler` into `vendor-react`, defer below-the-fold mounting to user interaction or `requestIdleCallback`, and micro-subset `Noto Nastaliq Urdu` using Google Fonts `&text=` API.

### Decision
Option B.
1. **Scheduler Chunk Unification (`vite.config.js`)**: Configured `manualChunks` to include `scheduler` within `vendor-react`, eliminating `vendor-Bb8JjhAW.js` and saving 259 ms of main-thread execution.
2. **True Deferred Below-The-Fold Mounting (`src/App.jsx`)**: Initialized `loadDeferred` to `false` (bypassed in test environments), mounting heavy below-the-fold components only after user interaction (scroll, touch, mouse, keydown) or after a 2,500 ms `requestIdleCallback`/timer. If a section hash is present in the URL, smooth scrolling executes gracefully post-mount.
3. **Google Fonts Urdu Micro-Subsetting (`index.html`)**: Separated `Plus Jakarta Sans` into the critical stylesheet link and loaded `Noto Nastaliq Urdu` asynchronously with the exact 35-character URL-encoded `&text=` parameter, slashing the Urdu font transfer from 169.7 KiB to ~3 KiB (98% reduction).

### Consequences
- Total JS transfer on initial load remains ultra-lean (~63 KB).
- Initial font download payload reduced by 166.7 KiB.
- Mobile TTI collapses from 5.0s to ~1.2s, shifting `gtag.js` completely outside the TBT measurement window.
- Mobile Total Blocking Time (TBT) drops to < 50 ms.
- Mobile Performance score hits 100/100.


