# AGENTS.md — AI Coding Agent Handbook

> **Canonical AI-agent reference for the SCIMEE project.**
> Read this file before making any code changes.

## Project Overview

SCIMEE is a single-page React marketing website for a coaching institute in Bhusawal, India. It is deployed on Vercel, has no backend, no database, and no API. All content lives in static JSON files.

## Architecture Overview

- **Framework**: React 19 (Vite-based SPA, not Next.js)
- **Language**: JavaScript (JSX) — no TypeScript
- **Styling**: Vanilla CSS with CSS custom properties (no Tailwind, no CSS-in-JS)
- **Icons**: lucide-react (tree-shakeable SVG icons)
- **Animations**: framer-motion (used selectively)
- **Class utilities**: clsx (conditional class joining)
- **Package manager**: npm (lockfile: `package-lock.json`)
- **Node version**: 22 (per CI)
- **Module system**: ES Modules (`"type": "module"`)

## Repository Structure

```
scimee/
├── index.html              # HTML shell with SEO/OG/JSON-LD/GA4
├── package.json
├── vite.config.js           # Vite + Vitest config
├── eslint.config.js         # ESLint flat config
├── .prettierrc              # Prettier config
├── .env                     # VITE_CBT_PORTAL_URL
├── public/
│   ├── assets/              # logo.svg, logo.png, og-preview.jpg
│   ├── sw.js                # PWA service worker
│   ├── manifest.json        # PWA manifest
│   ├── _headers             # CDN security & cache headers
│   ├── _redirects            # SPA fallback redirect
│   ├── sitemap.xml
│   └── robots.txt
├── src/
│   ├── main.jsx             # App bootstrap + SW registration
│   ├── App.jsx              # Root component (manages call modal state)
│   ├── app/
│   │   ├── globals.css      # Design system (all CSS variables & base styles)
│   │   ├── page.jsx         # Alternative page component (Next.js-style, unused by Vite)
│   │   ├── layout.jsx       # Layout wrapper
│   │   └── metadata.js      # SEO metadata constants
│   ├── components/          # All UI components + co-located tests
│   │   ├── Header.jsx
│   │   ├── header/          # Header sub-components (desktop nav, mobile drawer, hook)
│   │   ├── Hero.jsx
│   │   ├── ToppersSection.jsx
│   │   ├── CourseExplorer.jsx
│   │   ├── SyllabusExplorer.jsx
│   │   ├── FacilitiesSection.jsx
│   │   ├── CbtShowcaseSection.jsx
│   │   ├── MapLocation.jsx
│   │   ├── FAQSection.jsx
│   │   ├── Footer.jsx
│   │   ├── PhoneCallModal.jsx
│   │   ├── modal/           # Modal sub-components (header, body)
│   │   ├── MobileActionBar.jsx
│   │   ├── NetworkStatus.jsx
│   │   └── ErrorBoundary.jsx # Class-based error boundary
│   ├── data/                # Static JSON content (single source of truth)
│   │   ├── site-config.json
│   │   ├── courses.json
│   │   ├── toppers.json
│   │   ├── syllabus.json
│   │   ├── facilities.json
│   │   ├── faq.json
│   │   └── cbt-features.json
│   ├── utils/
│   │   ├── analytics.js     # GA4 + Vercel Analytics event tracking
│   │   ├── whatsapp.js      # Context-aware WhatsApp URL generator
│   │   └── cbt.js           # CBT portal URL resolver + opener
│   └── test/
│       └── setup.js         # Vitest global test setup
└── .github/workflows/
    ├── ci.yml               # Lint → Format → Test → Build
    └── react-doctor.yml     # React health diagnostics
```

## Development Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start Vite dev server on port 3000 |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build locally |

## Build Commands

| Command | Purpose |
|---|---|
| `npm run build` | Vite production build (output: `dist/`) |
| Build includes manual chunk splitting: `vendor-react`, `vendor-icons`, `vendor` |

## Testing Commands

| Command | Purpose |
|---|---|
| `npm test` | Run all tests once (vitest run) |
| `npm run test:watch` | Watch mode (vitest) |
| `npm run test:coverage` | Coverage report (v8 provider) |

- **Test framework**: Vitest + React Testing Library + happy-dom
- **Setup file**: `src/test/setup.js` (polyfills matchMedia, scrollTo, fetch, IntersectionObserver)
- **Test files**: Co-located with components as `*.test.jsx` or `*.test.js`

## Linting & Formatting

| Command | Purpose |
|---|---|
| `npm run lint` | ESLint check |
| `npm run lint:fix` | ESLint auto-fix |
| `npm run format` | Prettier format all src files |
| `npm run check-format` | Prettier check (CI gate) |

**ESLint config**: Flat config (`eslint.config.js`), React + React Hooks plugins, `prop-types: off`, `react-in-jsx-scope: off`.

**Prettier config**: Single quotes, no trailing commas, 2-space indent, 100 print width, auto end-of-line.

## Code Conventions

- **No TypeScript** — project uses plain JavaScript (`.js`, `.jsx`)
- **Defensive coding** — extensive use of optional chaining (`?.`) and nullish coalescing (`??`) throughout all code
- **No prop-types** — prop validation is not enforced
- **Functional components** — all components are functional (except ErrorBoundary which must be a class)
- **`useCallback`** for handler props passed to children (e.g., `openCallModal`, `closeCallModal`)
- **Named exports** for utilities, **default exports** for components
- **Co-located tests** — each component has a `.test.jsx` file in the same directory
- **Inline styles** — components use inline `style={{}}` objects extensively (this is intentional for component-scoped styling)
- **CSS classes** — global design tokens and layout utilities are in `globals.css`, applied via `className`
- **JSON data separation** — all content (courses, toppers, config, etc.) lives in `src/data/*.json`, never hardcoded in components

## Architecture Conventions

- **Single-page SPA** — one HTML entry, no routing library, hash-based section navigation
- **Lazy loading** — below-the-fold landing page components (`SyllabusExplorer`, `FacilitiesSection`, `CbtShowcaseSection`, `MapLocation`, `FAQSection`, `Footer`) are lazy-loaded via `React.lazy()` and `<Suspense>` to keep initial JS payload small (~63 KB)
- **Inlined production CSS** — production CSS is automatically inlined into `<style>` inside `<head>` by `vite-plugin-inline-css` in `vite.config.js` to eliminate render-blocking stylesheets
- **State management** — local `useState` only (no Redux, Zustand, or Context API)
- **Component composition** — larger sections (Header, Modal) decompose into sub-components in named subdirectories
- **Utility modules** — cross-cutting concerns (analytics, WhatsApp, CBT) are in `src/utils/`
- **Environment variables** — prefixed with `VITE_` for Vite exposure (currently only `VITE_CBT_PORTAL_URL`)
- **Error boundary** — wraps entire app in `main.jsx`

## Database Conventions

No database. All data is static JSON files in `src/data/`.

## API Conventions

No API. The site is entirely static. External integrations:
- Google Analytics 4 (via gtag.js in index.html)
- Google Maps embed (iframe URL in site-config.json)
- WhatsApp deep links (generated in `utils/whatsapp.js`)

## Security Requirements

- Security headers defined in `public/_headers` (X-Frame-Options, HSTS, CSP via Permissions-Policy)
- All external links use `rel="noopener noreferrer"` and `target="_blank"`
- `window.open` uses `noopener,noreferrer` features
- No user-submitted data, no forms, no authentication
- Environment variables must never contain secrets (Vite exposes all `VITE_*` variables to the client)

## Dependency Guidelines

- **Minimize new dependencies** — the bundle is intentionally lean
- **Do not add** Tailwind CSS, CSS-in-JS libraries (styled-components, emotion), or state management libraries
- **Do not add** routing libraries (react-router) — the site uses hash-based section navigation
- **Icon library**: Use lucide-react exclusively — do not add other icon libraries
- **Animation library**: framer-motion is available — do not add GSAP, anime.js, etc.

## Testing Requirements

Before considering any task complete:
1. All existing tests must pass: `npm test`
2. ESLint must report no errors: `npm run lint`
3. Prettier formatting must be consistent: `npm run check-format`
4. Production build must succeed: `npm run build`
5. New components should have co-located test files

## Mandatory Documentation Updates (All AI Agents / LLMs)

> [!IMPORTANT]
> **It does not matter which LLM, model, or tool you are** (Claude, Gemini, GPT, etc.) — you MUST keep the documentation suite synchronized with the code. Never complete a task without updating the relevant documentation:
>
> 1. **`MEMORY.md`**: Update after **every** task (Current Status, Recently Completed, Next Steps).
> 2. **`DECISIONS.md`**: Add an Architecture Decision Record (ADR) whenever any architectural, build, or structural choice is made.
> 3. **`ARCHITECTURE.md`**: Update when component structures, data flow, bundling, or deployment configurations change.
> 4. **`TESTING.md`**: Update when test counts, test files, or testing patterns change.
> 5. **`RULES.md` / `AGENTS.md`**: Update when new constraints, patterns, or commands are introduced.

## Verification Checklist

Run these commands before committing:

```bash
npm run lint
npm run check-format
npm test
npm run build
```

All four must pass. In addition, verify that **`MEMORY.md`** and relevant documentation files have been updated with your changes. CI (`ci.yml`) runs the same code checks on every push and PR.

## Forbidden Changes

- **Do not convert to TypeScript** without explicit approval
- **Do not add Tailwind CSS** or any CSS framework
- **Do not add a routing library** (react-router, etc.)
- **Do not add state management libraries** (Redux, Zustand, Jotai, etc.)
- **Do not modify** `index.html` JSON-LD schema without verifying Google Rich Results compatibility
- **Do not remove** the `?.` optional chaining pattern — it is used deliberately for defensive null safety
- **Do not hardcode** content that belongs in `src/data/*.json`
- **Do not modify** GA4 tracking ID, Google Search Console verification, or canonical URL without approval
- **Do not introduce** server-side rendering or API routes
- **Do not push code (`git push`)** — never push commits to remote repositories; all pushing is strictly reserved for the user

## Additional Documentation

| File | Purpose |
|---|---|
| `PRD.md` | Product requirements and feature specification |
| `DESIGN.md` | Design system, colors, typography, component patterns |
| `ARCHITECTURE.md` | System architecture, data flow, deployment |
| `RULES.md` | Coding rules and forbidden practices |
| `TESTING.md` | Testing strategy and tools |
| `DECISIONS.md` | Architecture decision records |
| `MEMORY.md` | Project working memory for session continuity |
