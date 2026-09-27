# Testing Strategy

## Testing Philosophy

Tests verify that the marketing website renders correctly, links work, data integrity is maintained, and no regressions are introduced. Since SCIMEE has no backend or dynamic data, testing focuses on **component rendering**, **data integrity**, **accessibility**, and **SEO correctness**.

## Test Stack

| Tool | Purpose | Version |
|---|---|---|
| Vitest | Test runner and assertion framework | 3.0.7 |
| React Testing Library | Component rendering and querying | 16.2.0 |
| @testing-library/jest-dom | Custom DOM matchers | 6.6.3 |
| @testing-library/user-event | User interaction simulation | 14.6.1 |
| @testing-library/dom | Low-level DOM querying | 10.4.0 |
| happy-dom | DOM environment (lighter than jsdom) | 20.11.6 |
| @vitest/coverage-v8 | Code coverage via V8 | 3.2.7 |

## Configuration

- **Config location**: `vite.config.js` → `test` block
- **Environment**: happy-dom
- **Globals**: `true` (no need to import `describe`, `it`, `expect`)
- **CSS processing**: Disabled in tests (`css: false`)
- **Setup file**: `src/test/setup.js`

### Test Setup (`src/test/setup.js`)

The setup file provides:
- `@testing-library/jest-dom` matchers
- Automatic cleanup after each test
- Browser API polyfills:
  - `window.scrollTo` (mock)
  - `window.matchMedia` (mock)
  - `global.fetch` (mock — prevents real network requests)
  - `URL.createObjectURL` / `URL.revokeObjectURL` (mock)
  - `IntersectionObserver` (mock)

## Unit Testing

### Scope
Component rendering, utility function logic, data transformations.

### Pattern
Each component has a co-located test file beside its source code:

```
src/components/
├── sections/
│   ├── header/Header.test.jsx
│   ├── hero/Hero.test.jsx
│   ├── toppers/ToppersSection.test.jsx
│   ├── courses/CourseExplorer.test.jsx
│   ├── syllabus/SyllabusExplorer.test.jsx
│   ├── facilities/FacilitiesSection.test.jsx
│   ├── cbt/CbtShowcaseSection.test.jsx
│   ├── location/MapLocation.test.jsx
│   ├── faq/FAQSection.test.jsx
│   └── footer/Footer.test.jsx
└── ui/
    ├── modal/PhoneCallModal.test.jsx
    ├── ErrorBoundary.test.jsx
    ├── MobileActionBar.test.jsx
    ├── NetworkStatus.test.jsx
    ├── ScrollProgress.test.jsx
    └── ScrollToTop.test.jsx
```

### Existing Test Files (27 Test Suites / 125 Tests)

| Test File | Location | What It Tests |
|---|---|---|
| `App.test.jsx` | `src/` | Root app renders core sections (async Suspense) and modal workflow |
| `Header.test.jsx` | `src/components/sections/header/` | Navbar renders, nav links present, call button works |
| `Hero.test.jsx` | `src/components/sections/hero/` | Hero section renders with stats and CTAs |
| `ToppersSection.test.jsx` | `src/components/sections/toppers/` | Student data renders correctly, filters by rank/score |
| `CourseExplorer.test.jsx` | `src/components/sections/courses/` | Course cards render with correct data, tab switching |
| `SyllabusExplorer.test.jsx` | `src/components/sections/syllabus/` | Syllabus explorer renders, accordion interaction |
| `FacilitiesSection.test.jsx` | `src/components/sections/facilities/` | Facilities cards render, campus visit CTA |
| `CbtShowcaseSection.test.jsx` | `src/components/sections/cbt/` | CBT section renders with 5-state palette and portal link |
| `FAQSection.test.jsx` | `src/components/sections/faq/` | FAQ items render, accordion behavior |
| `MapLocation.test.jsx` | `src/components/sections/location/` | Map embed and address render, copy address button |
| `Footer.test.jsx` | `src/components/sections/footer/` | Footer renders with contact info, Urdu motto |
| `PhoneCallModal.test.jsx` | `src/components/ui/modal/` | Modal opens/closes, phone numbers display |
| `MobileActionBar.test.jsx` | `src/components/ui/` | Mobile bar renders on small screens |
| `NetworkStatus.test.jsx` | `src/components/ui/` | Network banner behavior |
| `ScrollProgress.test.jsx` | `src/components/ui/` | Scroll progress indicator updates on window scroll |
| `ScrollToTop.test.jsx` | `src/components/ui/` | Back-to-top button appears past 500px and scrolls to top |
| `ErrorBoundary.test.jsx` | `src/components/ui/` | Error UI renders on crash, reload button works |
| `analytics.test.js` | `src/utils/` | `trackEvent()` handles valid/invalid inputs |
| `whatsapp.test.js` | `src/utils/` | `getWhatsAppUrl()` generates correct contextual URLs |
| `cbt.test.js` | `src/utils/` | `getCbtUrl()` and `openCbtPortal()` resolve URLs correctly |
| `dataIntegrity.test.js` | `src/test/integration/` | All JSON data files are valid, required fields exist, values within range |
| `assetsIntegrity.test.js` | `src/test/integration/` | Critical static assets exist and are accessible |
| `seo.test.js` | `src/test/integration/` | SEO meta tags, Open Graph, Twitter Cards, JSON-LD schema |
| `pwaSecurity.test.js` | `src/test/integration/` | PWA manifest validation, security headers, service worker structure |
| `sw.test.js` | `src/test/integration/` | Service worker cache name and offline asset strategy |
| `e2eJourney.test.jsx` | `src/test/integration/` | Full user journey — hero renders, navigation works, CTAs trigger modals |
| `a11yEdgeCases.test.jsx` | `src/test/integration/` | Accessibility edge cases — ARIA labels, keyboard navigation, screen reader text |

### Utility Tests

| Test File | Location | What It Tests |
|---|---|---|
| `analytics.test.js` | `src/utils/` | Event dispatch to GA4, graceful failure handling |
| `whatsapp.test.js` | `src/utils/` | Context-specific WhatsApp URL generation |
| `cbt.test.js` | `src/utils/` | CBT URL resolution with environment variable fallback |

## Integration Testing

### Existing Integration Tests

| Test File | What It Tests |
|---|---|
| `dataIntegrity.test.js` | All JSON data files are valid, required fields exist, values are within expected ranges |
| `assetsIntegrity.test.js` | Critical static assets exist and are accessible |
| `seo.test.js` | SEO meta tags, Open Graph, Twitter Cards, JSON-LD schema validation |
| `pwaSecurity.test.js` | PWA manifest validation, security headers, service worker structure |

## End-to-End Testing

### Existing E2E Tests

| Test File | What It Tests |
|---|---|
| `e2eJourney.test.jsx` | Full user journey — hero renders, navigation works, CTAs trigger modals |
| `a11yEdgeCases.test.jsx` | Accessibility edge cases — ARIA labels, keyboard navigation, screen reader text |

> **Note**: These are rendered in happy-dom, not a real browser. They test component integration, not actual browser behavior.

### Testing Lazy-Loaded Components (Suspense)

Below-the-fold landing page components are lazy-loaded via `React.lazy()` and `<Suspense>`. When writing integration tests that render `<App />` (such as `App.test.jsx` or `e2eJourney.test.jsx`):
- **Do not** use synchronous queries like `screen.getByPlaceholderText` or `screen.getByText` for lazy-loaded sections.
- **Do** use asynchronous `await screen.findBy*` or `await screen.findAllBy*` queries with explicit timeouts (e.g., `{ timeout: 10000 }`) so the test does not time out under parallel test execution load while dynamic imports resolve.

## API Testing

Not applicable — no API exists.

## Database Testing

Not applicable — no database exists. Data integrity is tested via `dataIntegrity.test.js` which validates JSON schema.

## Mocking Strategy

- **Global fetch**: Mocked in `setup.js` to prevent network requests
- **`window.scrollTo`**: Mocked (not available in happy-dom)
- **`window.matchMedia`**: Mocked (not available in happy-dom)
- **`IntersectionObserver`**: Polyfilled as a no-op class
- **`URL.createObjectURL`**: Mocked to return a stable blob URL
- **Component props**: Passed directly in tests — no mock utility functions needed

## Test Data

- Tests use the actual `src/data/*.json` files — no test fixtures or factories
- This ensures tests validate the real production data
- If test data needs isolation, create a minimal fixture in the test file itself

## Test Naming Conventions

- Test files: `ComponentName.test.jsx` or `utilityName.test.js`
- Describe blocks: Component or function name
- Test names: Start with a verb describing the behavior ("renders hero section", "opens modal on click", "generates correct WhatsApp URL for repeater context")

## Coverage Requirements

- **Provider**: V8
- **Reporters**: text (terminal), html (report)
- **Include**: `src/**/*.{js,jsx}`
- **Exclude**: `src/test/**`, `src/main.jsx`
- No enforced minimum coverage threshold, but all components should have basic render tests

Run coverage:
```bash
npm run test:coverage
```

## Required Checks

Before a task is considered complete, these commands must all pass:

```bash
npm run lint          # ESLint — no errors
npm run check-format  # Prettier — consistent formatting
npm test              # Vitest — all tests pass
npm run build         # Vite — production build succeeds
```

## CI Testing

**GitHub Actions workflow**: `.github/workflows/ci.yml`

Triggers on every push and PR to any branch. Steps:

1. Checkout code
2. Setup Node.js 22
3. Install dependencies (`npm install --include=optional --legacy-peer-deps`)
4. Run ESLint (`npm run lint`)
5. Check formatting (`npm run check-format`)
6. Run tests (`npm test`)
7. Verify production build (`npm run build`)

All 4 checks must pass for the CI to be green.

**Secondary workflow**: `.github/workflows/react-doctor.yml` — runs React health diagnostics.

## Definition of Done

A task is done when:

1. ✅ All existing tests pass
2. ✅ New components have co-located test files
3. ✅ ESLint reports no errors
4. ✅ Prettier formatting is consistent
5. ✅ Production build succeeds without warnings or errors
6. ✅ No regressions in existing functionality
7. ✅ Data changes are reflected in both JSON files and consuming components
8. ✅ MEMORY.md is updated if the task involved meaningful changes

### Service Worker Test

| Test File | What It Tests |
|---|---|
| `sw.test.js` | Service worker structure and caching behavior validation |
