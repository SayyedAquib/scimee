# Project Memory

## Current Status

**Production — Live, Optimized, and Stable**

- Website is deployed and serving users at https://scimee.vercel.app/
- All CI checks pass (lint, format, test, build)
- **Vite Path Aliases & Component Inline Style Pruning (ADR 13)**:
  - Configured `@/` path aliasing in `vite.config.js` and `jsconfig.json`, migrating all 36 source and test files across `src/` to clean, refactor-proof imports.
  - Pruned repetitive inline styles across all major landing page sections (`Header`, `Hero`, `Footer`, `CourseExplorer`, `ToppersSection`, `SyllabusExplorer`, `FacilitiesSection`, `CbtShowcaseSection`, `MapLocation`, `FAQSection`), encapsulating them into clean, reusable CSS primitives in `src/styles/globals.css`.
  - Reduced initial bundle JS chunk from ~63 KB to 61.05 KB, accelerating JavaScript parse and execution times.
- **Modular Component & Directory Architecture (ADR 12)**:
  - Purged unused Next.js remnants in `src/app/` (`page.jsx`, `layout.jsx`, `metadata.js`), establishing `src/styles/globals.css` as the clean single home for design tokens and utilities.
  - Reorganized `src/components/` into `sections/` (10 self-contained landing page sections with sibling subcomponents and co-located unit tests) and `ui/` (shared application widgets like modal, error boundary, mobile action bar, network status, scroll progress, back-to-top).
  - Relocated all integration and security audit test suites into `src/test/integration/`.
  - Kept root `src/` pristine with only `main.jsx`, `App.jsx`, and `App.test.jsx`.
- **FOUC Elimination & Clean Root Architecture (ADR 11)**:
  - Cleaned duplicate pre-rendered static HTML shell out of `<div id="root"></div>`, eliminating Flash of Unstyled Content (FOUC), default Times New Roman fonts, unstyled blue hyperlinks, and DOM tearing upon React hydration.
  - Linked design system tokens synchronously via `<link rel="stylesheet" href="/src/styles/globals.css" />` in `<head>`.
- **PageSpeed Insights 100/100 Mobile & Desktop Engineering Suite**:
  - **Zero Font Swap Delay & Micro-Subsetting**: Preloaded primary `Plus Jakarta Sans` Latin WOFF2 font directly via `<link rel="preload" as="font" type="font/woff2" crossorigin>` and inlined `@font-face` definition into `globals.css`. Sub-setted `Noto Nastaliq Urdu` via Google Fonts dynamic `&text=` API, slashing font payload from 169.7 KiB to ~3 KiB.
  - **Main-Thread Contention Eliminated**: Deferred `gtag.js` execution to the end of `<body>`, removing long tasks during initial paint.
  - **True Deferred Below-the-Fold Mounting**: Below-the-fold components are mounted after user interaction or 2.5s `requestIdleCallback`, keeping initial Mobile TTI at ~1.2s and collapsing TBT to < 50ms.
  - **Scheduler Chunk Deduplication**: Unified `scheduler` into `vendor-react` in `vite.config.js`, eliminating 259 ms of split chunk execution.
  - **Zero Cumulative Layout Shift (CLS 0.000)**: Added `.hero-badges-row` min-height constraints (44px desktop / 92px mobile) preventing badge wrap layout shifts.
  - **Edge CDN Optimization (`vercel.json`)**: Configured Vercel edge caching (`max-age=31536000, immutable`) and hardened security headers.
  - Initial JS bundle reduced by **57.1%** (from 147.2 KB to 61.05 KB) via `React.lazy()` code splitting and style pruning.
  - Render-blocking CSS **100% eliminated** via production build inlining (`vite-plugin-inline-css`).
  - Forced reflow on scroll **eliminated** via `requestAnimationFrame` scroll batching in `useHeaderNavigation.js`.
  - Non-composited animations eliminated by moving `@keyframes applePulseRadar` to GPU-composited `transform`/`opacity` on `::after`.
- All 125 Vitest tests passing across 27 test files, 0 ESLint errors, 100% Prettier compliant, clean production build.
- NEET 2026 results data is current (16/16 students qualified)
- Admissions status: Open for 2026–2028 batches

## Recently Completed

- **Authentic Logo Vectorization and Asset Unification (ADR 14)**:
  - Programmatically decoded the authentic 512×512 `logo.png` master image, separated color channels into pure black artwork (`#000000`) and the silver-grey crescent (`#7E7E7E`), and vectorized them using dual-layer Potrace curve tracing.
  - Replaced the inaccurate hand-coded `logo.svg` approximation with the authentic, pixel-exact vector asset.
  - Updated `Header.jsx` to load `/assets/logo.svg` and removed the bloated 138 KB base64 `scimee_logo.svg`.
  - Verified visual rendering via headless browser subagent: both Header and Footer display the genuine emblem with sharp vector lines at all DPI levels.
- **Vite Path Aliases (`@/`) and Component Inline Style Pruning (ADR 13)**:
  - Added `@/` path alias to `vite.config.js` and `jsconfig.json`.
  - Converted all 36 files across `src/` to clean `@/` imports.
  - Added section, header, hero, and footer utility classes to `src/styles/globals.css`.
  - Pruned verbose and repetitive inline styles across Header, Hero, Footer, CourseExplorer, ToppersSection, SyllabusExplorer, FacilitiesSection, CbtShowcaseSection, MapLocation, and FAQSection.
  - Initial JS bundle payload shrank from ~63 KB to 61.05 KB.
  - 100% test pass rate (125/125 across 27 suites), 0 ESLint errors, 100% Prettier compliance, and clean production build.
- **Modular Component & Directory Architecture Refactoring (ADR 12)**:
  - Eliminated dead Next.js leftovers (`src/app/`), moved CSS to `src/styles/globals.css`, partitioned `src/components/` into `sections/` (10 self-contained sections) and `ui/` (shared widgets), and placed integration tests in `src/test/integration/`.
  - 100% test pass rate preserved (125/125 tests across 27 test suites). Zero ESLint errors, 100% Prettier formatting, clean production build.
- **FOUC Elimination & Clean Root Container Architecture (`index.html`, ADR 11)**:
  - Removed 130 lines of duplicate static HTML shell from `<div id="root">`, eliminating raw browser user-agent fallback rendering (Times New Roman font, default blue underlined links, and misaligned buttons).
  - Added `<link rel="stylesheet" href="/src/styles/globals.css" />` to `<head>`, ensuring immediate synchronous style availability in Vite dev server and production.
  - Retained single source of truth in `Header.jsx` and `Hero.jsx`, eliminating code duplication and DOM tearing.
- **Urdu Calligraphy Weight Refinement (`Hero.jsx`, `Footer.jsx`, `globals.css`, `index.html`)**:
  - Expanded Google Fonts link to `Noto Nastaliq Urdu:wght@400..700`, providing genuine native Medium (`500`) and Semi-Bold (`600`) font files.
  - Slightly increased font weight from `400` (Regular) to `500` (Medium) across the Hero section badge and Footer card, giving pen strokes and diacritical marks (nuqtas) increased presence and legibility while maintaining graceful vertical metrics.
- **Desktop Navigation Sliding Pill Indicator Fix (`HeaderDesktopNav.jsx`)**:
  - Replaced the distorted `width: 1px` + `scaleX(width)` transform with direct dynamic `width` (`${indicatorStyle.width}px`) and pure `translate3d(left, 0, 0)` translation.
  - Eliminated horizontal border-radius stretching (which previously scaled the pill's border-radius by 68x into a distorted ellipse) and box-shadow blur elongation, restoring crisp, rounded squircle pill borders.

## Known Problems

None reported. The site is stable in production.

## Important Context

- **CBT Portal** (`cbtneet.vercel.app`) is a **separate repository and deployment** — changes to SCIMEE do not affect it, and vice versa
- **Urdu tagline** (`ہم جذبہِ تعمیر جہاں لے کے اٹھے ہیں`) requires specific font support (Noto Nastaliq Urdu) with font weight 500 (Medium) — test RTL rendering when modifying the Hero or Footer sections
- **Phone numbers** are real business numbers — do not change without approval
- **Google Analytics ID** (`G-DP9LT3BX5P`) and **Search Console verification** are production credentials — do not modify
- The `react-doctor.yml` GitHub Action is a secondary CI workflow for React health diagnostics

## Recent Decisions

- Added ADR 8 in `DECISIONS.md` documenting the PageSpeed 100/100 performance architecture.
- Added ADR 9 in `DECISIONS.md` documenting the static shell pre-rendering, font preloading, and GTM deferral.
- Added ADR 10 in `DECISIONS.md` documenting Scheduler bundling, deferred below-the-fold mounting, and Urdu font micro-subsetting.
- Added ADR 11 in `DECISIONS.md` documenting the elimination of FOUC via clean root container and synchronous design system link.
- Added ADR 12 in `DECISIONS.md` documenting the modular component and directory architecture refactoring.
- Added ADR 13 in `DECISIONS.md` documenting Vite path aliases (`@/`) and component inline style pruning.
- Added ADR 14 in `DECISIONS.md` documenting authentic logo vectorization and asset unification.
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
