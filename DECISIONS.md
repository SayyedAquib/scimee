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
