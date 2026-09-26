# Project Rules

## General Rules

- This is a **static SPA** — treat it as a marketing website, not a web application
- All content lives in `src/data/*.json` — never hardcode content in components
- Every component must be defensive: use `?.` and `??` for all data access
- Keep the bundle lean — do not add dependencies without strong justification
- All changes must pass the CI pipeline: lint → format → test → build
- **Documentation Maintenance (Mandatory for ALL AI Agents/LLMs)**: Regardless of which AI model or tool you are, you must update `MEMORY.md`, `DECISIONS.md`, and other affected docs whenever making code, architecture, or test changes. Never consider a task done without updating the documentation.

## Code Organization

- One component per file, default export
- Co-locate test files: `Component.jsx` → `Component.test.jsx` (same directory)
- Sub-components go in a named subdirectory: `components/header/HeaderDesktopNav.jsx`
- Utilities go in `src/utils/` — named exports only
- JSON data goes in `src/data/` — one file per content domain
- Global CSS goes in `src/app/globals.css` — use CSS custom properties for all tokens

## Naming Conventions

- **Components**: PascalCase files and exports (`CourseExplorer.jsx`, `export default function CourseExplorer`)
- **Utilities**: camelCase files and exports (`analytics.js`, `export function trackEvent`)
- **Data files**: kebab-case JSON (`site-config.json`, `cbt-features.json`)
- **CSS classes**: kebab-case (`bento-section-canvas`, `btn-primary`, `grid-responsive-3`)
- **CSS variables**: kebab-case with category prefix (`--canvas-white`, `--text-heading`, `--radius-card`)
- **Test files**: Match source file name with `.test` suffix (`Hero.test.jsx`, `whatsapp.test.js`)
- **Event names**: snake_case for analytics events (`cbt_portal_click`, `phone_call_click`)

## Type Safety

- No TypeScript — project is plain JavaScript
- Use optional chaining (`?.`) for all object property access that could be null/undefined
- Use nullish coalescing (`??`) with sensible defaults for all config/data reads
- Validate function parameters at the top of the function body (type check + early return)

## Error Handling

- Wrap `window.*` calls in try/catch with `typeof` guards (`typeof window !== 'undefined'`)
- Analytics failures must never crash the app — catch and suppress silently
- Use `ErrorBoundary` for component render errors — it wraps the entire app
- Log errors in development only (`import.meta?.env?.DEV`)
- Never throw from event handlers — always catch and recover

## API Rules

- No backend API exists — do not add API calls or fetch requests
- Google Analytics events are fire-and-forget — never await them
- WhatsApp URLs are generated client-side via `getWhatsAppUrl()` — never call a WhatsApp API
- CBT portal links use `window.open()` — never embed the portal via iframe

## Database Rules

- No database — all data is in `src/data/*.json`
- To change content, edit the JSON file — never hardcode strings in JSX
- JSON schema changes must be reflected in the components that consume them

## Security Rules

- Never store secrets in `VITE_*` environment variables (they are client-visible)
- All external links must use `rel="noopener noreferrer" target="_blank"`
- All `window.open()` calls must include `noopener,noreferrer` features
- Do not add forms or user input without explicit approval
- Do not add authentication or session management

## Dependency Rules

- **Allowed icon library**: lucide-react only
- **Allowed animation library**: framer-motion only
- **Allowed CSS**: Vanilla CSS with custom properties only (no Tailwind, no CSS-in-JS)
- **Forbidden additions**: routing libraries, state management libraries, CSS frameworks, heavy UI libraries (MUI, Chakra, Ant Design)
- Run `npm run build` after adding any dependency to verify it doesn't break tree-shaking or chunk sizes

## UI Rules

- Use design tokens from `globals.css` — do not hardcode colors, radii, or shadows
- Use `clamp()` for fluid font sizes and spacing — avoid fixed `px` for responsive values
- All new components must be mobile-first (320px minimum)
- Buttons must have hover (`translateY(-1px)`) and active (`scale(0.96)`) transitions
- Cards must use the `.bento-card` pattern with existing shadow/border variables
- Use `className` for reusable styles from `globals.css`, inline `style={{}}` for one-off component-specific values

## State Management

- Use `useState` for local component state only
- Use `useCallback` for handler props passed to children
- Do not add Context API, Redux, Zustand, or any state management library
- The only cross-component state is the phone call modal (managed in `App.jsx`)

## Testing Rules

- Every new component must have a co-located `.test.jsx` file
- Use React Testing Library — query by text, role, or test ID, not by DOM structure
- Mock browser APIs in `src/test/setup.js` if needed
- Tests must not make real network requests (global fetch is mocked in setup)
- Run `npm test` before every commit

## Git Rules

- CI runs on every push and PR to any branch
- All four checks must pass: lint, format check, test, build
- Do not commit `node_modules/`, `dist/`, `.env`, or `coverage/`

## Performance Rules

- Chunk size warning limit: 600KB (per `vite.config.js`)
- Preload critical assets (logo SVG) with `fetchpriority="high"`
- Load Google Fonts non-render-blocking (async pattern in `index.html`)
- Use SVG for logos and icons — avoid raster images where possible
- Service worker pre-caches core shell — do not cache large data files

## Forbidden Practices

- **Do not** convert to TypeScript
- **Do not** add Tailwind CSS or any CSS framework
- **Do not** add a routing library
- **Do not** add a state management library
- **Do not** add server-side rendering
- **Do not** add dark mode
- **Do not** modify the JSON-LD schema without validating with Google Rich Results Test
- **Do not** remove optional chaining (`?.`) — it is deliberately used everywhere
- **Do not** change the GA4 tracking ID or Google Search Console verification tag
- **Do not** embed the CBT portal in an iframe — always link externally
- **Do not** add `console.log` in production code — use `import.meta?.env?.DEV` guard
