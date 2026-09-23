# Design System

## Design Philosophy

SCIMEE follows an **Apple-inspired light design language** — clean, luminous, and premium. The design prioritizes:

- **White-first canvas** with subtle ambient color gradients
- **Glassmorphism** via frosted backdrop-filter blur on navigation and sections
- **Bento-style card layouts** with generous padding and rounded corners
- **Tactile micro-interactions** — buttons respond instantly with scale transforms
- **Typographic hierarchy** — large bold display headings with tight letter-spacing
- **Restrained color use** — gold accent as primary brand color, used sparingly

## Visual Direction

The site feels like an Apple product page — clean, spacious, white-dominant with subtle gradient accents. No dark mode. No busy patterns. Every element has breathing room.

## Colors

### CSS Custom Properties (defined in `globals.css`)

**Canvas / Background**
| Variable | Value | Usage |
|---|---|---|
| `--canvas-white` | `#ffffff` | Base background |
| `--canvas-bg` | `#f8fafc` | Page background tint |
| `--canvas-surface` | `#ffffff` | Card surfaces |
| `--canvas-elevated` | `rgba(255, 255, 255, 0.85)` | Elevated glassmorphic panels |
| `--canvas-input` | `#ffffff` | Input fields |

**Brand Accents (WCAG AA/AAA compliant)**
| Variable | Value | Usage |
|---|---|---|
| `--apple-gold` | `#b45309` | Primary gold accent (text on light bg) |
| `--apple-gold-light` | `#92400e` | Darker gold for emphasis |
| `--apple-gold-glow` | `rgba(245, 158, 11, 0.2)` | Gold glow/aura |
| `--apple-cyan` | `#0369a1` | Informational accent |
| `--apple-emerald` | `#047857` | Success / positive accent |
| `--apple-emerald-light` | `#059669` | Lighter emerald |
| `--apple-purple` | `#7e22ce` | Chemistry / rare accent |

**Typography Colors**
| Variable | Value | Usage |
|---|---|---|
| `--text-title` | `#0f172a` | Primary text |
| `--text-heading` | `#020617` | Headings (near-black) |
| `--text-sub` | `#475569` | Subheadings / descriptions |
| `--text-muted` | `#64748b` | Secondary / muted text |
| `--text-tertiary` | `#94a3b8` | Tertiary / placeholder text |

**Borders**
| Variable | Value | Usage |
|---|---|---|
| `--border-glass` | `rgba(0, 0, 0, 0.08)` | Default subtle border |
| `--border-glass-bright` | `rgba(0, 0, 0, 0.14)` | Hover/active border |
| `--border-gold-specular` | `rgba(217, 119, 6, 0.35)` | Gold-accented card borders |

### Gradient Usage

- **Hero title gradient**: `linear-gradient(135deg, #d97706 → #b45309 → #92400e)` — gold text via `background-clip: text`
- **Primary button**: `linear-gradient(135deg, #fef08a → #fbbf24 → #f59e0b → #d97706)` — warm gold
- **WhatsApp button**: `linear-gradient(135deg, #22c55e → #16a34a)` — green
- **Canvas mesh**: Multi-layered radial gradients creating ambient gold/cyan/emerald/purple glows on white

## Typography

### Font Stack

| Priority | Font | Usage |
|---|---|---|
| Primary | **Plus Jakarta Sans** (400–900) | All UI text, headings, body |
| Secondary | **Inter** (400–800) | Fallback / system-adjacent |
| Urdu | **Noto Nastaliq Urdu** (400, 700) | Urdu tagline (`ہم جذبہِ تعمیر جہاں لے کے اٹھے ہیں`) |
| Arabic | **Amiri** (400, 700, italic) | Arabic/Urdu decorative text |
| System | `-apple-system, BlinkMacSystemFont, sans-serif` | Final fallback |

### Type Scale

| Element | Size | Weight | Letter-Spacing |
|---|---|---|---|
| Display heading (h1) | `clamp(2.4rem, 5.5vw, 4.2rem)` | 900 | `-0.04em` |
| Section heading | ~1.4rem | 900 | `-0.02em` |
| Subheading | `clamp(1.05rem, 2.2vw, 1.25rem)` | 400 | `-0.01em` |
| Body text | 0.88–0.92rem | 400–600 | normal |
| Badge text | 0.72rem | 800 | `0.04em` (uppercase) |
| Small label | 0.68–0.74rem | 600 | normal |
| Stat value | `clamp(1.8rem, 3.4vw, 2.4rem)` | 900 | `-0.04em` |

- **Line height**: Body `1.6`, headings `1.06`
- **Font loading**: Preloaded asynchronously with `media="print"` swap pattern (non-render-blocking)

## Spacing

Spacing uses `clamp()` for fluid responsiveness:

| Context | Value |
|---|---|
| Section padding | `clamp(18px, 4vw, 44px)` |
| Section margin-bottom | `clamp(24px, 4.5vw, 56px)` |
| Container padding | `16px` (mobile), `32px` (≥768px) |
| Card padding | `22px 18px` |
| Button padding | `12px 24px` (standard), `8px 18px` (compact) |
| Gap between elements | `8px` – `24px` depending on context |

## Border Radius

All border radii are defined as CSS custom properties following Apple's continuous squircle philosophy:

| Variable | Value | Usage |
|---|---|---|
| `--radius-pill` | `9999px` | Buttons, badges, nav links |
| `--radius-section` | `32px` | Section containers |
| `--radius-card-lg` | `26px` | Featured / gold cards |
| `--radius-card` | `20px` | Standard cards |
| `--radius-inner` | `14px` | Inner elements, small cards |

Mobile (≤480px) reduces section radius to `24px`, extreme mobile (≤380px) to `18px`.

## Shadows

| Variable | Value | Usage |
|---|---|---|
| `--shadow-subtle` | `0 4px 16px -2px rgba(0,0,0,0.05)` | Subtle elevation |
| `--shadow-card` | Multi-layer (0.06 + 0.03 opacity) | Card resting state |
| `--shadow-card-hover` | Multi-layer (0.1 + 0.05 opacity) | Card hover state |
| `--shadow-navbar` | `0 14px 34px -8px rgba(0,0,0,0.08)` | Floating navbar |

Gold cards use colored shadows: `0 16px 36px rgba(217, 119, 6, 0.12)`.

## Layout

- **Max width**: 1200px (`container-custom`) / 1100px (navbar)
- **Single-page**: No routing — sections stack vertically, navigated via `scroll-margin-top: 85px`
- **Flexbox**: Primary layout method for component internals
- **CSS Grid**: Used for responsive card grids (`grid-responsive-2/3/4`)

## Responsive Breakpoints

| Breakpoint | Target |
|---|---|
| `max-width: 380px` | Extreme small mobile (reduced padding, smaller navbar) |
| `max-width: 480px` | Small mobile (reduced section radius) |
| `min-width: 480px` | 2-column grid for `grid-responsive-4` |
| `min-width: 640px` | 2-column grid for `grid-responsive-3` |
| `min-width: 768px` | Tablet — mobile action bar hidden, modal centers, container padding increases |
| `min-width: 992px` | Desktop nav visible, mobile hamburger hidden |
| `min-width: 1024px` | 3/4 column grids |

## Component Patterns

### Buttons

Three button variants — all use `--radius-pill`, inline-flex, centered:

| Class | Appearance | Usage |
|---|---|---|
| `.btn-primary` | Gold gradient, dark text, gold glow shadow | Primary CTAs (Call, Enquire) |
| `.btn-secondary` | White bg, subtle border, dark text | Secondary actions (View Results, Syllabus) |
| `.btn-whatsapp` | Green gradient, white text | WhatsApp links |

**Interaction**: All buttons have:
- Hover: `translateY(-1px)` + enhanced shadow
- Active: `scale(0.96) translateY(1px)` — tactile press-down effect

### Forms

No forms exist in the current site. If added, use `--canvas-input` background and `--border-glass` borders.

### Cards

| Class | Usage |
|---|---|
| `.bento-card` | Standard white card with glass border and shadow |
| `.bento-card-gold` | Featured card with warm gold gradient background |
| `.bento-section-canvas` | Section wrapper with frosted glass effect |

Cards hover with `translateY(-2px)` and enhanced shadow.

### Navigation

**Floating Island Navbar** (`floating-navbar`):
- Fixed position, top: 10px (14px desktop)
- Frosted glass: `backdrop-filter: blur(32px) saturate(210%)`
- Pill shape: `border-radius: 9999px`
- Dynamic sliding pill indicator tracks active section
- Desktop: horizontal nav links + CTA button
- Mobile: logo + call button + hamburger toggle → full-screen drawer

### Modals

**Apple Bottom Sheet** pattern:
- Mobile: slides up from bottom (`appleSlideUp` animation), top corners rounded
- Desktop: centered card with scale-in animation (`appleScaleIn`)
- Backdrop: `rgba(15, 23, 42, 0.45)` with blur
- Grab handle visible on mobile only

### Tables

No table components exist. If needed, follow card-based layouts over traditional HTML tables.

### Loading States

Not currently implemented. If needed, use skeleton cards matching `bento-card` dimensions.

### Empty States

Not applicable — all data is static and always present.

### Error States

**ErrorBoundary** component:
- Full-viewport centered card
- Warning icon in gold pill
- Error message in monospace red box
- Two CTAs: "Reload Application" (primary) and "Call Admissions" (secondary)

## Animations

### CSS Keyframes

| Name | Effect | Duration |
|---|---|---|
| `appleFadeIn` | opacity 0→1 | 200ms ease |
| `appleSlideUp` | translateY(100%→0) | 300ms spring-snappy |
| `appleScaleIn` | scale(0.94)→1, opacity 0→1 | 260ms spring-snappy |

### Spring Physics Easings

| Variable | Value | Character |
|---|---|---|
| `--spring-snappy` | `cubic-bezier(0.16, 1, 0.3, 1)` | Fast, slightly bouncy |
| `--spring-bounce` | `cubic-bezier(0.34, 1.4, 0.64, 1)` | Playful overshoot |

### Transitions

- Card hover: `all 240ms var(--spring-snappy)`
- Button hover: `transform 100ms ease, box-shadow 150ms ease`
- Nav link hover: `all 150ms ease`

## Accessibility

- **Color contrast**: Badge text colors are WCAG AA/AAA compliant (≥5.0:1 ratio)
- **Font smoothing**: `-webkit-font-smoothing: antialiased`
- **Touch targets**: Buttons are ≥34px height on mobile, ≥46px on desktop
- **ARIA labels**: Hamburger toggle uses `aria-label="Toggle menu"`, call button uses `aria-label="Call Helpline"`
- **Semantic HTML**: `<header>`, `<main>`, `<section>`, `<footer>` elements used
- **`scroll-margin-top`**: Sections offset by 85px to account for fixed navbar
- **Safe area insets**: Mobile action bar respects `env(safe-area-inset-bottom)`
- **`prefers-reduced-motion`**: Not currently implemented but should be added for framer-motion animations

## Do Not

- **Do not** introduce dark mode — the design is intentionally light-only
- **Do not** use Tailwind CSS classes — all styling is vanilla CSS with custom properties
- **Do not** add new Google Fonts without verifying preload and performance impact
- **Do not** change the gold accent color family (`#d97706` / `#b45309` / `#92400e`) — it is the brand identity
- **Do not** use border-radius values outside the defined `--radius-*` variables
- **Do not** use box shadows outside the defined `--shadow-*` variables
- **Do not** add heavy animation libraries — framer-motion is sufficient
- **Do not** replace inline styles with CSS modules or styled-components — inline styles are intentional for component-scoped design
- **Do not** use `px` for font sizes in headings — use `clamp()` for fluid typography
- **Do not** add fixed-pixel breakpoints that conflict with the existing system
