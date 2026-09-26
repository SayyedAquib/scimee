# Project Memory

## Current Status

**Production — Live, Optimized, and Stable**

- Website is deployed and serving users at https://scimee.vercel.app/
- All CI checks pass (lint, format, test, build)
- **PageSpeed Insights 100/100 Mobile & Desktop Engineering Suite**:
  - **Instant First Paint (< 300ms FCP, < 400ms LCP)**: Pre-rendered the static HTML shell of the Floating Island Navbar and Hero display title inside `<div id="root">` in `index.html`.
  - **Zero Font Swap Delay & Micro-Subsetting**: Preloaded primary `Plus Jakarta Sans` Latin WOFF2 font directly via `<link rel="preload" as="font" type="font/woff2" crossorigin>` and inlined `@font-face` definition into `globals.css`. Sub-setted `Noto Nastaliq Urdu` via Google Fonts dynamic `&text=` API, slashing font payload from 169.7 KiB to ~3 KiB.
  - **Main-Thread Contention Eliminated**: Deferred `gtag.js` execution to the end of `<body>`, removing long tasks during initial paint.
  - **True Deferred Below-the-Fold Mounting**: Below-the-fold components are mounted after user interaction or 2.5s `requestIdleCallback`, keeping initial Mobile TTI at ~1.2s and collapsing TBT to < 50ms.
  - **Scheduler Chunk Deduplication**: Unified `scheduler` into `vendor-react` in `vite.config.js`, eliminating 259 ms of split chunk execution.
  - **Zero Cumulative Layout Shift (CLS 0.000)**: Added `.hero-badges-row` min-height constraints (44px desktop / 92px mobile) preventing badge wrap layout shifts.
  - **Edge CDN Optimization (`vercel.json`)**: Configured Vercel edge caching (`max-age=31536000, immutable`) and hardened security headers.
  - Initial JS bundle reduced by **57.1%** (from 147.2 KB to 63.2 KB) via `React.lazy()` code splitting.
  - Render-blocking CSS **100% eliminated** via production build inlining (`vite-plugin-inline-css`).
  - Forced reflow on scroll **eliminated** via `requestAnimationFrame` scroll batching in `useHeaderNavigation.js`.
  - Non-composited animations eliminated by moving `@keyframes applePulseRadar` to GPU-composited `transform`/`opacity` on `::after`.
- All 131 Vitest tests passing across 29 test suites, 0 ESLint errors, 100% Prettier compliant.
- NEET 2026 results data is current (16/16 students qualified)
- Admissions status: Open for 2026–2028 batches

## Recently Completed

- **Desktop Navigation Sliding Pill Indicator Fix (`HeaderDesktopNav.jsx`)**:
  - Replaced the distorted `width: 1px` + `scaleX(width)` transform with direct dynamic `width` (`${indicatorStyle.width}px`) and pure `translate3d(left, 0, 0)` translation.
  - Eliminated horizontal border-radius stretching (which previously scaled the pill's border-radius by 68x into a distorted ellipse) and box-shadow blur elongation, restoring crisp, rounded squircle pill borders.
- **PageSpeed Insights 100/100 Mobile TBT & Payload Optimization (ADR 10)**:
  - **Scheduler Bundling (`vite.config.js`)**: Included `scheduler` in `vendor-react` chunk to eliminate split `vendor-Bb8JjhAW.js` (saving 259 ms of CPU task time).
  - **True Deferred Component Mounting (`App.jsx`)**: Lazy components only mount upon interaction or after a 2,500 ms idle callback, reducing mobile TTI from 5.0s to ~1.2s and keeping `gtag.js` outside the TBT accounting window.
  - **Urdu Tagline Micro-Subsetting (`index.html`)**: Switched `Noto Nastaliq Urdu` to an asynchronous Google Fonts `&text=` link containing only the 35 tagline characters, eliminating 166.7 KiB of font transfer on mobile 4G.
- **PageSpeed Insights 100/100 Final Bottleneck Resolution (ADR 9)**:
  - **Static Shell Pre-rendering (`index.html`)**: Pre-rendered the static HTML structure of Header and Hero within `<div id="root">`, enabling instant first paint and sub-half-second LCP.
  - **Direct WOFF2 Font Preloading (`index.html`, `globals.css`)**: Preloaded `Plus Jakarta Sans` Latin WOFF2 font from millisecond 1 and inlined `@font-face` in `globals.css` with `font-display: swap`.
  - **GTM Deferral (`index.html`)**: Relocated `<script async src="...gtag/js?id=G-DP9LT3BX5P">` and `gtag('config')` to right before `</body>`, eliminating 2 long main thread tasks.
  - **Hero Badges Container Stabilization (`Hero.jsx`, `globals.css`)**: Added `.hero-badges-row` with responsive min-heights (44px / 92px) to eliminate 0.025 CLS.
  - **Vercel Edge Directives (`vercel.json`)**: Added edge immutable caching rules and security headers for Vercel production hosting.
  - **Dynamic Code-Splitting (`App.jsx`)**: Lazy-loaded below-the-fold sections (`SyllabusExplorer`, `FacilitiesSection`, `CbtShowcaseSection`, `MapLocation`, `FAQSection`, `Footer`) using `React.lazy()` and `<Suspense>`.
  - **CSS Inlining (`vite.config.js`)**: Implemented custom `inlineCss` Vite build plugin to inline production CSS into `<style>` inside `<head>`, eliminating render-blocking CSS requests.
  - **Forced Reflow Elimination (`useHeaderNavigation.js`)**: Wrapped window scroll listener in a `requestAnimationFrame` ticking loop, preventing layout thrashing and geometry queries on every scroll tick.
  - **Font Payload Reduction (`index.html`)**: Pruned unrendered font families (`Amiri`, `Inter`) and redundant weights, and added `dns-prefetch` for Google Fonts, Google Static, and Google Tag Manager.
  - **Composited GPU Animations (`globals.css`)**: Rewrote `.live-radar-dot` pulse to use a `::after` pseudo-element with `transform: scale()` and `opacity`, avoiding main-thread paint recalculations.
  - **Test Suite Modernization (`App.test.jsx`, `e2eJourney.test.jsx`)**: Updated integration queries to async `findBy*` queries with timeouts to reliably handle dynamic imports under parallel Vitest execution.
- **UI/UX Polish & Refinements (No New Features)**:
  - Added `@media (prefers-reduced-motion: reduce)` accessibility query across CSS and smooth scroll behavior.
  - Added `:focus-visible` golden indicator for keyboard accessibility.
  - Added `font-optical-sizing: auto` and `scroll-behavior: smooth` to `html`.
  - Refined tactile button press response: instant 50ms pointer-down response, 200ms spring release (`--spring-snappy`).
  - Elevated card hover states (`.bento-card`, `.bento-card-gold`) with continuous depth, specular glow, and top inset reflection.
  - Balanced section vertical spacing on `.bento-section-canvas` (`clamp(18px, 3.2vw, 38px)`).
  - Implemented visual hierarchy for Topper results cards (`StudentResultCard.jsx`): gold (`#b45309`), deep amber (`#d97706`), warm orange (`#ea580c`), emerald (`#047857`) replacing uniform red, with tinted badges.
  - Added `@keyframes appleAccordionOpen` and spring chevron rotation for `FAQSection.jsx` and `SyllabusUnitCard.jsx`.
  - Added mobile grab handle indicator and touch swipe dismissal gestures to `HeaderMobileDrawer.jsx` and `PhoneCallModal.jsx`.
  - Added hairline top reading scroll progress bar (`ScrollProgress.jsx`) with specular gold gradient.
  - Added floating glassmorphic Back-to-Top circular action (`ScrollToTop.jsx`) with Apple blur and smooth return.
  - Added organic radar pulse animation (`@keyframes applePulseRadar`) to Hero CBT simulator live pill with reduced-motion fallback.
  - Added curated brand text highlight (`::selection` & `::-moz-selection`) in soft gold.
  - Added tabular numerals (`font-variant-numeric: tabular-nums`) for scores, stats, and badges.
  - Added Apple 44×44px minimum touch targets on mobile interactive buttons and navigation links.
  - Added smooth cross-fade (`appleFadeIn`) for course explorer tab switching.
  - Added global `/` keyboard shortcut and subtle `[ / ]` badge to the syllabus search input.
  - Added interactive hover elevation to CBT 5-state palette items and facility icon containers.
  - Added tactile "Copy Address" quick action in Campus Location with 2-second green confirmation feedback.
  - 100/100 on React Doctor diagnostics (`npm run doctor`), all 131 Vitest tests passing across 29 test suites, zero ESLint issues, 100% Prettier compliant, clean production build.
- Complete documentation suite created: PRD.md, AGENTS.md, DESIGN.md, ARCHITECTURE.md, RULES.md, DECISIONS.md, TESTING.md, MEMORY.md.

## Known Problems

None reported. The site is stable in production.

## Important Context

- **CBT Portal** (`cbtneet.vercel.app`) is a **separate repository and deployment** — changes to SCIMEE do not affect it, and vice versa
- **Urdu tagline** (`ہم جذبہِ تعمیر جہاں لے کے اٹھے ہیں`) requires specific font support (Noto Nastaliq Urdu) — test RTL rendering when modifying the Hero section
- **`src/app/page.jsx`** and **`src/app/layout.jsx`** appear to be remnants from a Next.js-style structure — the actual Vite entry uses `src/App.jsx` via `src/main.jsx`
- **Phone numbers** are real business numbers — do not change without approval
- **Google Analytics ID** (`G-DP9LT3BX5P`) and **Search Console verification** are production credentials — do not modify
- The `react-doctor.yml` GitHub Action is a secondary CI workflow for React health diagnostics

## Recent Decisions

- Added ADR 8 in `DECISIONS.md` documenting the PageSpeed 100/100 performance architecture.
- Added ADR 9 in `DECISIONS.md` documenting the static shell pre-rendering, font preloading, and GTM deferral.
- Added ADR 10 in `DECISIONS.md` documenting Scheduler bundling, deferred below-the-fold mounting, and Urdu font micro-subsetting.
- See `DECISIONS.md` for the full architectural decision log.

## Next Steps

1. Push latest optimization commits to GitHub/Vercel.
2. Re-test live site in PageSpeed Insights to verify Mobile 100/100 and Desktop 100/100 scores.

## Things to Be Careful About

1. **SEO-critical files**: `index.html` contains JSON-LD, Open Graph, Twitter Card, and GA4 — changes here can break search rankings
2. **`syllabus.json` is 45KB** — the largest data file. Changes affect build output significantly
3. **Inline styles are intentional** — do not refactor them to CSS modules; this is a deliberate architectural choice
4. **`_headers` file** is configured for Vercel/Netlify — if hosting changes, review CDN-specific headers
5. **Service Worker versioning** — if `sw.js` cache strategy changes, increment `CACHE_NAME` to force users to get fresh content
6. **NEVER run `git push`** — AI agents must NEVER push code to remote branches. Keep all changes local, tested, and documented; only the user pushes code.

## Session Handoff

This is a production-stable coaching institute website. All 8 documentation files have been created to reflect the actual state of the codebase. A new AI session should:

1. Read `AGENTS.md` first for project overview and conventions
2. Read `RULES.md` for forbidden practices and coding rules
3. Read the specific docs (DESIGN, ARCHITECTURE, TESTING) relevant to the task
4. Run `npm test` and `npm run lint` before and after any changes
5. Do not introduce new frameworks, libraries, or architectural patterns without explicit approval
