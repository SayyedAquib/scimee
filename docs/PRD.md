# Product Requirements Document

## Product Overview

SCIMEE (Sara Coaching Institute of Medical Entrance Examination) is a production marketing and information website for a medical & engineering entrance coaching institute located in Bhusawal, Maharashtra, India. The website serves as the digital storefront — communicating the institute's programs, track record, facilities, and contact channels to prospective students and their parents.

- **Live URL**: https://scimee.vercel.app/
- **Founded by**: Ansari Rehan Ahmed
- **Type**: Single-page marketing website (SPA)
- **Status**: Production — live and stable

## Target Users

| Audience | Intent |
|---|---|
| NEET-UG aspirants (Class 11/12 and repeaters) | Find coaching details, syllabus, results |
| Parents of aspirants | Evaluate institute credibility, contact for admissions counseling |
| Engineering/CET aspirants | Explore MHT-CET & JEE Foundation programs |
| Younger students (Class 5–10) | Discover pre-foundation programs |
| Google Search / Social traffic | Land via SEO-optimized queries like "NEET coaching Bhusawal" |

## Problem Statement

Prospective students and parents in the Bhusawal/Jalgaon region need a trusted, easily accessible source of information about SCIMEE's programs, proven results (100% NEET 2026 qualification rate), facilities, and a frictionless way to initiate contact (phone call, WhatsApp).

## Goals

1. Present SCIMEE's academic programs and track record with high credibility
2. Maximize phone call and WhatsApp enquiry conversions from visitors
3. Rank well in local SEO searches for NEET/CET coaching in Bhusawal and Jalgaon
4. Provide an installable, offline-capable PWA experience for users with unreliable connectivity
5. Showcase the NEET 2026 topper results (16/16 qualified) prominently
6. Link to the external CBT (Computer-Based Test) simulator portal at cbtneet.vercel.app

## Non-Goals

- Online course delivery or LMS functionality
- Student/parent login portal or dashboard
- Online payments or fee collection
- Blog or content management system
- Multi-page routing (SPA with hash-based section navigation is sufficient)
- E-commerce or merchandise sales

## Core Features

### 1. Hero Section
- Institute branding with Urdu tagline and founder attribution
- Key stats displayed in bento-style cards (45+ medical selections, 100% qualify rate, 332/360 biology score, 1-on-1 mentorship)
- Primary CTA: "Direct Call Helpline" (opens phone call modal)
- Secondary CTAs: "100% NEET 2026 Results" and "NMC 2026 Syllabus" (anchor links)
- Link to external CBT simulator

### 2. Toppers / Results Section
- Showcase of all 16 qualified NEET UG 2026 students with scores
- Subject-wise highest scores (Biology: 332/360, Physics: 116/180, Chemistry: 104/180)
- "16/16 ALL STUDENTS QUALIFIED" badge

### 3. Course Explorer
- 5 programs: NEET Repeater, NEET Freshers (11th/12th Integrated), Post-NEET Counseling, Pre-Foundation (5th–10th), MHT-CET & JEE Foundation
- Each program shows target audience, duration, description, highlights, subjects, eligibility
- Per-course CTA triggering contextual WhatsApp/call enquiry

### 4. Syllabus Explorer
- Full NMC/NTA NEET 2026 syllabus with subject-wise and chapter-wise breakdown
- Interactive accordion/explorer UI
- Data-driven from `src/data/syllabus.json` (45KB comprehensive dataset)

### 5. Facilities Section
- Library & reading room, OMR testing, mentorship, and campus facilities
- Visual bento card layout

### 6. CBT Showcase Section
- Promotional section linking to the external NTA NEET CBT Online Test Simulator
- Portal URL configurable via `VITE_CBT_PORTAL_URL` environment variable

### 7. Map & Location
- Embedded Google Maps showing institute location at Khadka Square, Bhusawal
- Full address, operating hours, and direct navigation link

### 8. FAQ Section
- Common questions about enrollment, testing frequency, medium of instruction, track record
- JSON-LD FAQ schema for Google Search rich snippets

### 9. Phone Call Modal
- Apple-style bottom sheet (mobile) / centered card (desktop)
- Two phone numbers: primary (+91 9175013140) and secondary (+91 9226134986)
- Context-aware — tracks which section triggered the call

### 10. Mobile Action Bar
- Sticky bottom bar on mobile with quick-access CTA buttons
- Hidden on desktop (≥768px)

### 11. Network Status Banner
- Detects offline/online connectivity and shows user-facing notification

### 12. PWA & Service Worker
- Installable progressive web app with offline caching (network-first strategy)
- Custom service worker pre-caches core application shell

### 13. SEO & Structured Data
- Full Open Graph, Twitter Card, and JSON-LD schema markup
- Google Analytics 4 integration (G-DP9LT3BX5P)
- Google Search Console verified
- Sitemap and robots.txt

## User Flows

### Primary Flow: Parent/Student Enquiry
1. User lands on homepage (via Google Search, WhatsApp share, or direct URL)
2. Scans hero section for credibility signals (100% qualify rate, 45+ doctors)
3. Browses results, courses, facilities
4. Clicks "Call Helpline" → phone call modal opens → user calls institute
5. OR clicks WhatsApp button → pre-filled contextual WhatsApp message opens

### Secondary Flow: Syllabus Exploration
1. User navigates to Syllabus Explorer section
2. Expands subject → chapter → views NEET 2026 topic breakdown
3. Decides to enquire → clicks CTA → WhatsApp or call

### Tertiary Flow: CBT Simulator Access
1. User sees CBT Showcase or hero badge
2. Clicks "NTA NEET CBT Simulator Live" → opens cbtneet.vercel.app in new tab

## Future Features

No features are currently planned. The following are potential future enhancements if decided:

- Student testimonial video section
- Online admission form with document upload
- Student/parent login portal with test scores
- Blog or educational content section
- Deeper integration with the CBT simulator portal
- Multi-language content (Hindi/Marathi/Urdu page variants)

## Technical Constraints

- **Hosting**: Vercel (may change in the future)
- **No backend**: Purely static SPA — no server, database, or API
- **Data**: All content is in static JSON files under `src/data/`
- **External dependency**: CBT portal is a separate Vercel deployment (cbtneet.vercel.app)
- **Fonts**: Google Fonts (Plus Jakarta Sans, Inter, Amiri, Noto Nastaliq Urdu) — requires network on first load
- **Browser support**: Modern browsers; PWA features require Service Worker support

## Success Metrics

| Metric | Measurement |
|---|---|
| Phone call enquiry conversions | Google Analytics event tracking (`phone_call_click`) |
| WhatsApp enquiry clicks | Google Analytics event tracking |
| CBT portal click-through | Analytics event `cbt_portal_click` |
| Google Search ranking | Position for "NEET coaching Bhusawal" and related keywords |
| Page load performance | Lighthouse score, Core Web Vitals (CLS target: 0.00) |
| PWA install rate | Service worker registration success rate |
| NEET 2026 results page dwell time | GA4 engagement metrics |

## Acceptance Criteria

1. All sections render correctly on mobile (320px) through desktop (1440px+)
2. Phone call modal opens from every section that has a CTA
3. WhatsApp links generate contextually correct pre-filled messages based on course context
4. CBT portal links resolve to the correct `VITE_CBT_PORTAL_URL`
5. JSON-LD structured data passes Google Rich Results Test
6. Lighthouse Performance score ≥ 90 on mobile
7. All 16 student toppers render with correct names and scores
8. Syllabus explorer shows complete NMC 2026 NEET syllabus data
9. Site is installable as a PWA and functions offline (cached shell)
10. All automated tests pass (`npm test`)
11. ESLint reports no errors (`npm run lint`)
12. Prettier formatting is consistent (`npm run check-format`)
13. Production build succeeds without errors (`npm run build`)
