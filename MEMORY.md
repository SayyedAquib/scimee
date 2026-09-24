# Project Memory

## Current Status

**Production — Live and Stable**

- Website is deployed and serving users at https://scimee.vercel.app/
- All CI checks pass (lint, format, test, build)
- No active development work in progress
- NEET 2026 results data is current (16/16 students qualified)
- Admissions status: Open for 2026–2028 batches

## Recently Completed

- **UI/UX Polish & Refinements (No New Features)**:
  - Added `@media (prefers-reduced-motion: reduce)` accessibility query across CSS and smooth scroll behavior.
  - Added `:focus-visible` golden indicator for keyboard accessibility.
  - Added `font-optical-sizing: auto` and `scroll-behavior: smooth` to `html`.
  - Refined tactile button press response: instant 50ms pointer-down response, 200ms spring release (`--spring-snappy`).
  - Elevated card hover states (`.bento-card`, `.bento-card-gold`) with continuous depth and specular glow.
  - Balanced section vertical spacing on `.bento-section-canvas` (`clamp(18px, 3.2vw, 38px)`).
  - Implemented visual hierarchy for Topper results cards (`StudentResultCard.jsx`): gold (`#b45309`), deep amber (`#d97706`), warm orange (`#ea580c`), emerald (`#047857`) replacing uniform red, with tinted badges.
  - Added `@keyframes appleAccordionOpen` and spring chevron rotation for `FAQSection.jsx` and `SyllabusUnitCard.jsx`.
  - Added mobile grab handle indicator and touch swipe dismissal gestures to `HeaderMobileDrawer.jsx` and `PhoneCallModal.jsx`.
  - All 126 Vitest tests passing across 27 suites, zero ESLint issues, 100% Prettier compliant, clean production build.
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

- Comprehensive documentation foundation established for AI-assisted development
- See `DECISIONS.md` for the full architectural decision log

## Next Steps

No planned features or changes at this time. The documentation foundation is ready for future AI-assisted development sessions.

## Things to Be Careful About

1. **SEO-critical files**: `index.html` contains JSON-LD, Open Graph, Twitter Card, and GA4 — changes here can break search rankings
2. **`syllabus.json` is 45KB** — the largest data file. Changes affect build output significantly
3. **Inline styles are intentional** — do not refactor them to CSS modules; this is a deliberate architectural choice
4. **`_headers` file** is configured for Vercel/Netlify — if hosting changes, review CDN-specific headers
5. **Service Worker versioning** — if `sw.js` cache strategy changes, increment `CACHE_NAME` to force users to get fresh content

## Session Handoff

This is a production-stable coaching institute website. All 8 documentation files have been created to reflect the actual state of the codebase. A new AI session should:

1. Read `AGENTS.md` first for project overview and conventions
2. Read `RULES.md` for forbidden practices and coding rules
3. Read the specific docs (DESIGN, ARCHITECTURE, TESTING) relevant to the task
4. Run `npm test` and `npm run lint` before and after any changes
5. Do not introduce new frameworks, libraries, or architectural patterns without explicit approval
