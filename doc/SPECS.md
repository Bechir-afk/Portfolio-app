# Portfolio App -- Specifications

> This file is the source of truth for functional requirements.
> Every specification must be approved before implementation begins.
> Specs are updated as decisions change or new features are added.

---

## SPEC-001: Global Shell and Interactive Background

| Field | Value |
|---|---|
| **Phase** | 1 |
| **Status** | Draft |
| **Owner** | Gemini 3.1 Pro |
| **Depends on** | Phase 0 (Foundation) complete: Next.js app running, dependencies installed, folder structure created, CSS variables and palette tokens defined. |
| **Constitution refs** | IV (Visual System), V (Interaction and Animation), IX (Accessibility), X (Performance) |

---

### 1. Objective

Deliver the global page shell and persistent interactive background that every subsequent section will render inside. After this spec is complete, the app must show a continuous light gradient with floating coding symbols and tech keywords that respond to mouse movement and scroll, with a hidden scrollbar, working at all breakpoints and respecting reduced-motion preferences.

---

### 2. Deliverables

| # | Component / File | Purpose |
|---|---|---|
| D1 | `components/layout/PageShell.tsx` | Root wrapper: renders children inside a scrollbar-hidden container with the background behind all content |
| D2 | `components/layout/Section.tsx` | Reusable scroll-animated section wrapper (GSAP ScrollTrigger enter/exit) |
| D3 | `components/background/InteractiveBackground.tsx` | Fixed-position container for all background layers |
| D4 | `components/background/CodeSymbols.tsx` | Layer 2: large coding symbols |
| D5 | `components/background/TechKeywords.tsx` | Layer 3: technical keyword text elements |
| D6 | CSS in `app/globals.css` | Scrollbar hiding, gradient background, background item base styles |

---

### 3. Functional Requirements

#### 3.1 Page Shell (`PageShell.tsx`)

| ID | Requirement |
|---|---|
| FR-001 | Wrap all page content as a layout-level component |
| FR-002 | Apply hidden scrollbar CSS cross-browser (Chrome/Safari/Firefox/Edge) while preserving vertical scroll via mouse, touch, keyboard, and assistive technology |
| FR-003 | Render `InteractiveBackground` as a fixed layer behind all content (z-index below content) |
| FR-004 | Apply the continuous gradient background from `--bg-primary` (#DAE3E5) to `--bg-secondary` (#BBD1EA) to the `<body>` or root element |
| FR-005 | The gradient must be visually continuous across the full page height -- no per-section background colors |
| FR-006 | Never use a dark page background |

#### 3.2 Scrollbar Hiding

| ID | Requirement |
|---|---|
| FR-010 | Hide scrollbar in WebKit browsers: `::-webkit-scrollbar { display: none; }` |
| FR-011 | Hide scrollbar in Firefox: `scrollbar-width: none;` |
| FR-012 | Hide scrollbar in IE/Edge legacy: `-ms-overflow-style: none;` |
| FR-013 | `overflow-y` must remain `scroll` or `auto` -- never `hidden` (would break scrolling) |

#### 3.3 Interactive Background (`InteractiveBackground.tsx`)

| ID | Requirement |
|---|---|
| FR-020 | Render as a `position: fixed` element covering the full viewport. Items are scattered within this viewport-sized box; scroll parallax at varying speeds creates the illusion of depth across the full page. |
| FR-021 | Set `z-index` below all content layers |
| FR-022 | Set `pointer-events: none` on the container and all children -- background must never intercept clicks |
| FR-023 | Contain 4 logical layers: (1) base gradient (CSS, not a layer component), (2) `CodeSymbols`, (3) `TechKeywords`, (4) small decorative code elements (can be part of `CodeSymbols` with a size variant) |
| FR-024 | **Item counts (desktop):** ~15-20 large coding symbols, ~10-12 tech keywords, ~20-25 small decorative elements. Total ~50 items. |
| FR-025 | **Item counts (mobile < 640px):** Reduce all counts by at least 50%. Total ~25 items. Must be implemented in a hydration-safe way (e.g., render a stable default count on server, adjust after mount, or use CSS media queries) to avoid `window.innerWidth` mismatch on first render. |

#### 3.4 Code Symbols (`CodeSymbols.tsx`)

| ID | Requirement |
|---|---|
| FR-030 | Render the following symbols as DOM elements: `;` `{` `}` `=>` `//` `&&` `\|\|` |
| FR-031 | Each symbol must have a unique position, rotation (slight, organic), and size -- not arranged in a grid |
| FR-032 | Symbols must be visibly colored using palette colors (`--accent`, `--accent-light`, `--text-dark` at reduced opacity) |
| FR-033 | Include a set of smaller decorative code elements (same symbols, smaller font size, lower opacity) as the 4th background layer |
| FR-034 | Positions must be deterministic per render (use seeded or static values, e.g. a static array of pre-computed `{x, y, rotation, scale, opacity}` objects) to avoid layout shift on hydration |

#### 3.5 Tech Keywords (`TechKeywords.tsx`)

| ID | Requirement |
|---|---|
| FR-040 | Render the following keywords as DOM text elements: Python, TypeScript, Docker, Arduino, STM32, LoRa, numpy, stdlib, mathbot, React, Kubernetes, PostgreSQL |
| FR-041 | Each keyword must have a unique position, slight rotation, and font size -- not grid-based |
| FR-042 | Keywords must be visibly colored using palette accent colors |
| FR-043 | Use JetBrains Mono or the configured monospace font for keywords |
| FR-044 | Positions must be deterministic (same as FR-034) |

#### 3.6 Mouse Parallax

| ID | Requirement |
|---|---|
| FR-050 | Track mouse position on the document |
| FR-051 | Apply subtle CSS `translate` offsets to background items based on mouse position relative to viewport center |
| FR-052 | Different layers must move at different speeds (depth factor): large symbols slower, small elements faster |
| FR-053 | Use `requestAnimationFrame` for updates -- no direct React `setState` on mousemove |
| FR-054 | Store mouse position in a `useRef`, apply transforms via direct DOM manipulation or GSAP `quickTo` |
| FR-055 | Register the `mousemove` listener once on mount, remove on unmount |

#### 3.7 Scroll Parallax

| ID | Requirement |
|---|---|
| FR-060 | Use GSAP ScrollTrigger to create vertical parallax movement on background items |
| FR-061 | Different layers must scroll at different rates (scrub-based parallax with varying `y` offsets) |
| FR-062 | ScrollTrigger must be created on mount and killed on unmount (cleanup via `gsap.context()` or `useGSAP`) |

#### 3.8 Section Wrapper (`Section.tsx`)

| ID | Requirement |
|---|---|
| FR-070 | Accept `children`, optional `id` (for anchor linking), optional `className`, and optional `style` (`React.CSSProperties`) |
| FR-071 | Apply a GSAP ScrollTrigger-based entrance animation (opacity + translateY) when scrolling down |
| FR-072 | Reverse/deconstruct the animation when scrolling back up (use `toggleActions: "play reverse play reverse"`) |
| FR-073 | Use `gsap.context()` for cleanup on unmount |

---

### 4. Non-Functional Requirements

#### 4.1 Performance

| ID | Requirement |
|---|---|
| NF-001 | Animate only `transform` and `opacity` properties -- never `top`, `left`, `width`, `height` |
| NF-002 | Use `will-change: transform` on animated background elements |
| NF-003 | Background must not cause dropped frames on a mid-range mobile device |
| NF-004 | On mobile (< 640px), reduce the number of background items by at least 50% to maintain performance |
| NF-005 | No unbounded event listeners -- all listeners cleaned up on unmount |
| NF-006 | All GSAP contexts and ScrollTriggers destroyed on unmount |

#### 4.2 Reduced Motion

| ID | Requirement |
|---|---|
| NF-010 | Detect `prefers-reduced-motion: reduce` via `gsap.matchMedia()` or `window.matchMedia` |
| NF-011 | When reduced motion is active: disable mouse parallax, disable scroll parallax, show background items in their static positions |
| NF-012 | Section entrance animations must also be disabled or replaced with instant display |

#### 4.3 Responsiveness

| ID | Requirement |
|---|---|
| NF-020 | Background must render correctly at mobile (< 640px), tablet (640-1024px), and desktop (> 1024px) |
| NF-021 | On mobile, reduce item count and scale down font sizes for background elements |
| NF-022 | Touch devices: skip mouse parallax (no `mousemove` listener needed) -- detect via `matchMedia('(hover: hover)')` or similar |

#### 4.4 Accessibility

| ID | Requirement |
|---|---|
| NF-030 | Background elements must have `aria-hidden="true"` -- they are decorative |
| NF-031 | Scrollbar hiding must not break keyboard or screen-reader scroll navigation |
| NF-032 | Background must never reduce text contrast below WCAG AA (4.5:1 for normal text) -- items must be low enough opacity |

---

### 5. Technical Constraints

| Constraint | Detail |
|---|---|
| DOM-based rendering | Use React DOM elements for background items. Canvas only if DOM proves insufficient for performance. |
| No React state for continuous motion | Mouse position stored in `useRef`. Transforms applied via direct ref manipulation or GSAP. |
| GSAP registration | `gsap.registerPlugin(ScrollTrigger)` must be called once, in a client-side context (not during SSR). |
| Next.js SSR safety | All GSAP and DOM-dependent code must be inside `useEffect` or `useLayoutEffect`, or guarded with `typeof window !== 'undefined'`. Components using GSAP must include `"use client"` directive. |
| Hydration safety | Background item positions must be deterministic -- no `Math.random()` without a seed. Use a static array of pre-computed positions or a seeded PRNG. Avoid viewport-dependent branching (like `window.innerWidth`) during initial render to prevent hydration mismatches. |
| No `background-attachment: fixed` | Known to cause iOS Safari rendering glitches. Use a fixed-position element for any layered background effects instead. |

---

### 6. File-Level Implementation Guidance

#### `app/globals.css` additions

```css
/* Scrollbar hiding */
html {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
html::-webkit-scrollbar {
  display: none;
}

/* Continuous gradient background */
body {
  background: linear-gradient(
    180deg,
    var(--bg-primary) 0%,
    var(--bg-secondary) 50%,
    var(--bg-primary) 100%
  );
  min-height: 100vh;
}

/* Background item base */
.bg-item {
  position: absolute;
  pointer-events: none;
  will-change: transform;
  user-select: none;
}
```

#### Component hierarchy

```
app/[locale]/layout.tsx
  --> PageShell
        --> InteractiveBackground (fixed, z-0, aria-hidden)
              --> CodeSymbols (large + small variants)
              --> TechKeywords
        --> {children} (z-10, relative)
              --> Section (per content block)
```

---

### 7. Acceptance Criteria

| # | Criterion | Verification |
|---|---|---|
| AC-01 | Page shows a continuous light gradient with no per-section backgrounds | Visual inspection at all breakpoints |
| AC-02 | Browser scrollbar is not visible in Chrome, Firefox, Safari, and Edge | Cross-browser test |
| AC-03 | Page scrolls normally with mouse wheel, touch, keyboard (Space, PgDown, arrow keys), and screen reader | Manual test |
| AC-04 | Coding symbols and tech keywords are visible, organically scattered, and not grid-aligned | Visual inspection |
| AC-05 | Moving the mouse causes subtle background parallax (different speeds per layer) | Desktop test |
| AC-06 | Scrolling causes vertical parallax (different speeds per layer) | Scroll test |
| AC-07 | Background items do not intercept clicks -- clicking through background reaches content | Click test on content overlapping background items |
| AC-08 | With `prefers-reduced-motion: reduce`, no parallax or entrance animations play | Toggle in browser DevTools, verify static display |
| AC-09 | On mobile viewport (< 640px), fewer background items render and performance is smooth | Responsive mode test |
| AC-10 | No console errors related to hydration mismatches | Check browser console |
| AC-11 | `Section` wrapper animates children in on scroll-down and reverses on scroll-up | Scroll up and down through placeholder sections |
| AC-12 | All GSAP ScrollTriggers and event listeners are cleaned up on unmount (no memory leaks) | React StrictMode double-mount test, no duplicate listeners |
| AC-13 | Production build passes (`npm run build`) | CLI verification |

---

### 8. Required Skills for Worker

Read and apply the following skill files before implementation:

| Skill | Path | Why |
|---|---|---|
| **gsap-core** | `skills/gsap-core/SKILL.md` | Core tween API, `gsap.to()`, `gsap.matchMedia()` for responsive and reduced-motion handling |
| **gsap-scrolltrigger** | `skills/gsap-scrolltrigger/SKILL.md` | ScrollTrigger setup, `toggleActions`, scrub-based parallax, cleanup patterns |
| **gsap-react** | `skills/gsap-react/SKILL.md` | `useGSAP` hook, `gsap.context()` for React cleanup, ref-based element selection |
| **gsap-performance** | `skills/gsap-performance/SKILL.md` | Prefer transforms, `will-change`, avoid layout thrashing, batching |

---

### 9. Out of Scope

- Hero, quote, about, or any content sections
- Project cards, certificate modal, contact section
- Any SEO metadata or Open Graph tags
- Vercel deployment configuration

---

## SPEC-002: Hero Section and Language Toggle

| Field | Value |
|---|---|
| **Phase** | 2 |
| **Status** | Implemented |
| **Owner** | Gemini 3.1 Pro |
| **Depends on** | SPEC-001 complete |
| **Constitution refs** | IV, V, VI (Hero, Rotating Title), VIII (i18n), IX |

---

### 1. Objective

Deliver the Hero section and the fixed language toggle. The Hero must display a free-floating portrait with a blue glow, a rotating title, the subject's name, and their location. The language toggle must switch the locale without a full page reload.

---

### 2. Deliverables

| # | File | Purpose |
|---|---|---|
| D1 | `i18n/navigation.ts` | `createNavigation(routing)` exports for locale-aware routing |
| D2 | `components/layout/LanguageToggle.tsx` | Fixed top-right EN/FR toggle |
| D3 | `components/hero/FloatingPortrait.tsx` | `next/image` with priority, drop-shadow filter |
| D4 | `components/hero/RotatingTitle.tsx` | GSAP infinite title crossfade loop |
| D5 | `components/hero/Hero.tsx` | Full hero layout with entrance + scroll-exit animations |
| D6 | `app/[locale]/page.tsx` | Wires Hero + LanguageToggle into the page |

---

### 3. Functional Requirements

| ID | Requirement |
|---|---|
| FR-100 | Hero section fills at least 100vh |
| FR-101 | Portrait rendered with `next/image`, `priority` prop enabled (LCP element) |
| FR-102 | Portrait has no border, no clip-path, no frame, no card -- free-floating silhouette |
| FR-103 | Portrait has a blue glow: `drop-shadow(0 0 20px rgba(80,125,188,0.5)) drop-shadow(0 0 60px rgba(161,198,234,0.3))` |
| FR-104 | Rotating title loops infinitely through: "Computer Engineering Student" (`#507DBC`), "Freelance Developer by Day" (`#04080F`), "Gamer by Night" (`#A1C6EA`) |
| FR-105 | Rotating title uses a fixed-height container to prevent layout shift during transitions |
| FR-106 | Entrance animation: opacity 0 to 1, y 40 to 0, staggered, on page load |
| FR-107 | Exit animation: scrub-based fade + y offset as hero scrolls out of viewport |
| FR-108 | Language toggle is fixed at `top: 1.5rem; right: 1.5rem; z-index: 100` |
| FR-109 | Language toggle uses `.glass` utility class |
| FR-110 | Language toggle uses Phosphor `Translate` icon |
| FR-111 | Locale switch calls `router.replace(pathname, { locale })` -- no full page reload |
| FR-112 | All hero text consumed from `hero.*` locale keys |
| FR-113 | `i18n/navigation.ts` exports `Link`, `redirect`, `usePathname`, `useRouter`, `getPathname` via `createNavigation(routing)` |

---

### 4. Non-Functional Requirements

| ID | Requirement |
|---|---|
| NF-100 | All GSAP animations inside `useGSAP()` with `{ scope }` |
| NF-101 | `gsap.matchMedia()` used for all motion, `return () => mm.revert()` cleanup |
| NF-102 | `prefers-reduced-motion: reduce` path shows elements statically (no animation) |
| NF-103 | No `window` access at module level -- SSR safe |
| NF-104 | Portrait uses `sizes` prop for responsive image delivery |

---

### 5. Acceptance Criteria

| # | Criterion |
|---|---|
| AC-100 | Portrait visible, no border/clip/frame, glowing blue |
| AC-101 | Title rotates smoothly through all 3 identities, no layout shift |
| AC-102 | Hero deconstructs (fades + rises) as it scrolls out of view |
| AC-103 | Language toggle fixed top-right, glass style, switches locale without reload |
| AC-104 | EN and FR locale keys display correctly for all hero text |
| AC-105 | Production build passes |

---

## SPEC-003: Quote Section and About Section

| Field | Value |
|---|---|
| **Phase** | 3 |
| **Status** | Implemented |
| **Owner** | Gemini 3.1 Pro |
| **Depends on** | SPEC-002 complete |
| **Constitution refs** | IV, V, VI (Quote, About and Skills), VIII, IX |

---

### 1. Objective

Deliver the Quote block (glass card with word-by-word reveal) and the About section (heading, summary paragraph, spoken language chips). Both sections use `Section` wrapper for scroll entrance and consume all text from locale files.

---

### 2. Deliverables

| # | File | Purpose |
|---|---|---|
| D1 | `components/quote/QuoteBlock.tsx` | Glass card, quote glyph, word-split GSAP stagger reveal |
| D2 | `components/about/SpokenLanguages.tsx` | Pill chips for spoken languages with i18n level labels |
| D3 | `components/about/AboutSection.tsx` | Heading + summary + SpokenLanguages, wrapped in Section |
| D4 | `app/[locale]/page.tsx` | Wire Quote + About, remove placeholder-2 |

---

### 3. Functional Requirements

| ID | Requirement |
|---|---|
| FR-200 | QuoteBlock renders inside a `.glass` card with `borderRadius: 1.25rem` |
| FR-201 | Opening `"` glyph positioned absolute, large (`clamp(5rem, 10vw, 8rem)`), `color: var(--accent)`, `opacity: 0.18`, `aria-hidden="true"` |
| FR-202 | Quote text in JetBrains Mono, italic, `color: var(--text-dark)` |
| FR-203 | Quote text split into word-wrapped `<span data-word>` elements for GSAP stagger |
| FR-204 | Words animate: opacity 0 to 1, y 20 to 0, stagger 0.035s, on scroll into view |
| FR-205 | ScrollTrigger `toggleActions: 'play reverse play reverse'` |
| FR-206 | AboutSection heading from `about.heading` locale key |
| FR-207 | AboutSection summary paragraph from `about.summary` locale key |
| FR-208 | SpokenLanguages section label from `about.spokenLanguages` locale key |
| FR-209 | Proficiency level labels (`about.levels.native`, `about.levels.proficient`, `about.levels.elementary`) from locale files -- not hardcoded strings |
| FR-210 | Language chips: pill border `1px solid rgba(80,125,188,0.4)`, glass background, mono font |
| FR-211 | AboutSection wrapped in `<Section id="about">` for scroll entrance |

---

### 4. Non-Functional Requirements

| ID | Requirement |
|---|---|
| NF-200 | `useGSAP({ scope })` on QuoteBlock |
| NF-201 | `gsap.matchMedia()` + `return () => mm.revert()` cleanup |
| NF-202 | `reduced-motion` path: `gsap.set(words, { opacity: 1, y: 0 })` |
| NF-203 | No `window` at module level |

---

### 5. Acceptance Criteria

| # | Criterion |
|---|---|
| AC-200 | Quote card visible, glass style, opening glyph decorative |
| AC-201 | Words reveal staggered on scroll-in, reverse on scroll-up |
| AC-202 | About heading + summary visible in EN and FR |
| AC-203 | Spoken language chips display label + proficiency level in both locales |
| AC-204 | Production build passes |

---

## SPEC-004: Skills, Timelines, and Awards

| Field | Value |
|---|---|
| **Phase** | 4 |
| **Status** | Approved |
| **Owner** | Claude Opus 8 |
| **Depends on** | SPEC-003 complete; `doc/resume.tex` present |
| **Constitution refs** | II (No hardcoding), IV (Visual System), V (Animation), VI (About/Skills, Experience/Education), VIII (i18n), IX (Accessibility) |

---

### 1. Objective

Populate `data/resume.ts` from `doc/resume.tex`, fix the `SpokenLanguages` i18n bug (hardcoded English level strings), implement categorized skill tags, a shared animated vertical timeline used for Experience, Education, and Leadership, and an Awards callout. After this phase the app shows the full professional profile from Hero through Awards.

---

### 2. Deliverables

| # | File | Purpose |
|---|---|---|
| D1 | `data/resume.ts` | Fully populated from `resume.tex` -- profile, skills, experience, leadership, education, awards, contact |
| D2 | `locales/en.json` | Add `about.levels.*`, `timeline.*` labels; verify all Phase 4 keys present |
| D3 | `locales/fr.json` | Same additions in French |
| D4 | `components/about/SpokenLanguages.tsx` | Fix: level labels from `about.levels.*` locale keys, not hardcoded strings |
| D5 | `components/about/SkillTags.tsx` | Categorized liquid-glass skill chips, grouped by 6 categories |
| D6 | `components/about/AboutSection.tsx` | Update: add `<SkillTags>` below spoken languages |
| D7 | `components/timeline/TimelineItem.tsx` | Single timeline entry: date range, role/degree, company/institution, description, technology tags |
| D8 | `components/timeline/Timeline.tsx` | Vertical timeline: SVG connector line drawn on scroll, staggered item reveals, Phosphor icon prop |
| D9 | `components/awards/AwardsBlock.tsx` | Two-item award callout section |
| D10 | `app/[locale]/page.tsx` | Wire SkillTags (inside AboutSection), Experience Timeline, Education Timeline, Leadership Timeline, AwardsBlock; remove placeholder-skills |

---

### 3. Data Requirements

#### 3.1 `data/resume.ts` -- Exact values from `resume.tex`

| Field | Value |
|---|---|
| `profile.name` | `'Bechir Ben Rabia'` |
| `profile.location` | `'Tunis, Tunisia'` |
| `profile.summaryKey` | `'about.summary'` |
| `contact.email` | `'bachirbenrabia56@gmail.com'` |
| `contact.phone` | `'+216 21 277 855'` |
| `contact.socials[0]` | `{ platform: 'github', url: 'https://github.com/Bechir-afk' }` |
| `contact.socials[1]` | `{ platform: 'linkedin', url: 'https://linkedin.com/in/bechir-ben-rabie' }` |
| `contact.socials[2]` | `{ platform: 'facebook', url: 'https://www.facebook.com/bechir.benrabii.7/' }` |

#### 3.2 Skills -- exact items from `resume.tex`

| Category key | Items |
|---|---|
| `languages` | `['Python', 'JavaScript', 'PHP', 'C/C++', 'SQL', 'HTML/CSS']` |
| `ai` | `['Multi-Agent Workflows', 'Task Delegation', 'Custom Agent Skills/Rules', 'XGBoost', 'Deep Learning']` |
| `embedded` | `['ESP32', 'Arduino', 'Sensor Integration', 'Embedded Architecture', 'MQTT']` |
| `frontend` | `['React', 'Vite', 'Tailwind CSS', 'TanStack']` |
| `backend` | `['Flask', 'Django', 'FastAPI', 'AWS', 'Linux', 'Kubernetes', 'Docker', 'Firebase', 'PostgreSQL']` |
| `security` | `['Nmap', 'Vulnerability Scanning', 'Routing']` |

Note: TypeScript, Go, C# are confirmed by GitHub repos but are NOT in `resume.tex`. Do not add them to `data/resume.ts` skills array without user confirmation. They may be added in Phase 9 convergence review.

#### 3.3 Experience -- exact values from `resume.tex`

| Field | Entry 1 | Entry 2 | Entry 3 |
|---|---|---|---|
| `role` | `'Graduation Project Intern'` | `'Freelance Developer'` | `'Summer Intern'` |
| `company` | `'NEXT STEP IT'` | `'Upwork'` | `'TriWeb (Charguia 2)'` |
| `start` | `'Feb 2026'` | `'March 2025'` | `'June 2024'` |
| `end` | `'May 2026'` | `'Present'` | `'July 2024'` |
| `descKey` | `'experience.nextStepIT.description'` | `'experience.upwork.description'` | `'experience.triWeb.description'` |
| `technologies` | `['Python','XGBoost','SHAP','React','FastAPI','OpenShift','KubeVirt','Docker','PostgreSQL']` | `['React','Vite','TanStack','Tailwind CSS','Flask','Django','PHP']` | `[]` |

#### 3.4 Leadership -- exact values from `resume.tex`

| Field | Entry 1 | Entry 2 | Entry 3 |
|---|---|---|---|
| `role` | `'Chairperson'` | `'Marketing Manager & Active Member'` | `'Community Volunteer'` |
| `org` | `'IEEE MTTS Chapter-ESPRIT Student Branch'` | `'GDSC FSS & GDSC FST'` | `'Alert International, JCI, Youth Club, Spark Engineer ENIS'` |
| `start` | `'Feb 2024'` | `'2023'` | `'Various'` |
| `end` | `'Jan 2025'` | `'Present'` | `''` |
| `descKey` | `'leadership.ieee.description'` | `'leadership.gdsc.description'` | `'leadership.volunteer.description'` |

#### 3.5 Education -- exact values from `resume.tex`

| Field | Entry 1 | Entry 2 |
|---|---|---|
| `degree` | `"Bachelor's in Computer Engineering, IoT and Embedded Systems"` | `'Baccalaureate in Information Technology'` |
| `institution` | `'Faculty of Sciences of Tunis'` | `'Lycee Hay Amal Fouchena, Tunis'` |
| `date` | `'June 2026'` | `'2022'` |
| `descKey` | `'education.fst.description'` | `'education.lycee.description'` |
| `coursework` | `['Embedded Systems','Networking','Cloud Computing','Machine Learning']` | `undefined` |

#### 3.6 Awards -- exact values from `resume.tex`

| Field | Entry 1 |
|---|---|
| `title` | `'Winner of the Poster Challenge'` |
| `event` | `'Tech Day Conference'` |
| `year` | `'2024'` |

Note: Game Jam Tunis 2026 (2nd place) is listed in `IMPLEMENTATION_PLAN.md` but is **not** in `resume.tex`. Include it in `data/resume.ts` only with the following values, sourced from the plan:

| Field | Entry 2 |
|---|---|
| `title` | `'2nd Place'` |
| `event` | `'Game Jam Tunis 2026'` |
| `year` | `'2026'` |

---

### 4. Locale Requirements

#### 4.1 New keys to add to both `en.json` and `fr.json`

**`about.levels`** (fixes SpokenLanguages i18n bug from Phase 3):

```json
"about": {
  ...,
  "levels": {
    "native": "Native",
    "proficient": "Proficient",
    "elementary": "Elementary"
  }
}
```

French equivalents: `"Natif"`, `"Courant"`, `"Élémentaire"`

**`awards.heading`** already exists. Add per-award keys:

```json
"awards": {
  "heading": "Awards",
  "posterChallenge": {
    "title": "Winner of the Poster Challenge",
    "event": "Tech Day Conference"
  },
  "gameJam": {
    "title": "2nd Place",
    "event": "Game Jam Tunis 2026"
  }
}
```

**`timeline`** section labels:

```json
"timeline": {
  "present": "Present",
  "experience": "Experience",
  "education": "Education",
  "leadership": "Leadership & Volunteering"
}
```

All keys must be present in both `en.json` and `fr.json` before components consume them.

---

### 5. Functional Requirements

#### 5.1 SkillTags (`components/about/SkillTags.tsx`)

| ID | Requirement |
|---|---|
| FR-400 | Render all skills from `resume.skills` array |
| FR-401 | Group by category; render category heading from `skills.categories.[key]` locale key |
| FR-402 | Each skill item is a liquid-glass chip: `border: 1px solid rgba(80,125,188,0.35)`, `background: rgba(255,255,255,0.12)`, `borderRadius: 999px`, mono font, `fontSize: 0.82rem` |
| FR-403 | Categories are separated by a visible label (small caps, accent color, mono font) |
| FR-404 | On hover, chip border transitions to `rgba(80,125,188,0.6)` and `box-shadow` to `0 0 8px rgba(80,125,188,0.2)` -- CSS transition, no GSAP |
| FR-405 | No animation on mount -- static render |
| FR-406 | Chips wrap to multiple lines naturally (`flex-wrap: wrap`) |

#### 5.2 TimelineItem (`components/timeline/TimelineItem.tsx`)

| ID | Requirement |
|---|---|
| FR-410 | Accept props: `role: string`, `org: string`, `start: string`, `end: string`, `descKey: string`, `technologies?: string[]`, `icon: React.ReactNode` |
| FR-411 | Display date range as `{start} — {end}` using `timeline.present` locale key when `end === 'Present'` |
| FR-412 | Role displayed in bold, org in regular weight, both in `var(--text-dark)` |
| FR-413 | Description consumed from locale via `descKey` |
| FR-414 | Technologies (if provided) rendered as small flat chips below description: no border, `background: rgba(80,125,188,0.12)`, `borderRadius: 4px`, mono font, `fontSize: 0.75rem` |
| FR-415 | Card uses `.glass` utility class |
| FR-416 | Left side: icon (Phosphor, `size={20}`) in an accent-colored circle |

#### 5.3 Timeline (`components/timeline/Timeline.tsx`)

| ID | Requirement |
|---|---|
| FR-420 | Accept props: `items: TimelineEntry[]`, `icon: React.ReactNode`, `headingKey: string` |
| FR-421 | Render section heading from `headingKey` locale key |
| FR-422 | Render a vertical SVG connector line left-aligned, spanning the full list height |
| FR-423 | SVG line drawn progressively on scroll using `stroke-dashoffset` animation via GSAP ScrollTrigger (`scrub: true`) |
| FR-424 | Line reverses (un-draws) on scroll-up |
| FR-425 | Timeline items stagger-reveal on scroll: opacity 0 to 1, x -20 to 0, stagger 0.1s |
| FR-426 | Item reveal reverses on scroll-up (`toggleActions: 'play reverse play reverse'`) |
| FR-427 | On mobile (< 640px): single column, connector line hidden |
| FR-428 | `useGSAP({ scope })` with `gsap.matchMedia()` + `return () => mm.revert()` cleanup |
| FR-429 | `reduced-motion` path: show all items and full line statically |

#### 5.4 AwardsBlock (`components/awards/AwardsBlock.tsx`)

| ID | Requirement |
|---|---|
| FR-430 | Render section heading from `awards.heading` locale key |
| FR-431 | Render 2 award entries from `resume.awards` array |
| FR-432 | Each entry: title from `awards.[key].title`, event from `awards.[key].event`, year plain string |
| FR-433 | Each award entry uses `.glass` chip style with Phosphor `Trophy` icon in accent color |
| FR-434 | Wrapped in `<Section id="awards">` for scroll entrance |

#### 5.5 AboutSection update

| ID | Requirement |
|---|---|
| FR-440 | Add `<SkillTags />` below `<SpokenLanguages />` inside `AboutSection` |
| FR-441 | Section heading, summary, spoken languages, and skills all remain within the same `<Section id="about">` scroll wrapper |

#### 5.6 Page wiring (`app/[locale]/page.tsx`)

| ID | Requirement |
|---|---|
| FR-450 | Remove `placeholder-skills` section |
| FR-451 | Render Experience Timeline with Phosphor `Briefcase` icon, `headingKey: 'timeline.experience'` |
| FR-452 | Render Education Timeline with Phosphor `GraduationCap` icon, `headingKey: 'timeline.education'` |
| FR-453 | Render Leadership Timeline with Phosphor `UsersThree` icon, `headingKey: 'timeline.leadership'` |
| FR-454 | Render `<AwardsBlock />` after Leadership |
| FR-455 | Add one placeholder `<Section id="placeholder-projects">` as the final child (removed in Phase 5/6) |

---

### 6. Non-Functional Requirements

| ID | Requirement |
|---|---|
| NF-400 | All data in `data/resume.ts` -- no CV content in component files |
| NF-401 | All user-facing strings in locale files -- no hardcoded English or French in components |
| NF-402 | `data/resume.ts` must pass TypeScript strict mode with the existing `Resume` interface |
| NF-403 | Timeline SVG line drawn with `stroke-dasharray` + `stroke-dashoffset` -- no JS width/height calculation |
| NF-404 | Animate only `opacity`, `transform` (`translateX`, `translateY`), and SVG `stroke-dashoffset` |
| NF-405 | All GSAP cleanup via `return () => mm.revert()` inside `useGSAP` |
| NF-406 | No new dependencies -- use existing stack (GSAP, Framer Motion, Phosphor, next-intl) |
| NF-407 | Mobile layout: timeline single-column, skill chips wrap, awards chips wrap |

---

### 7. Acceptance Criteria

| # | Criterion | Verification |
|---|---|---|
| AC-400 | `data/resume.ts` values match `doc/resume.tex` exactly | Side-by-side diff |
| AC-401 | `SpokenLanguages` proficiency labels translate correctly in FR mode | Toggle locale, verify chips show French levels |
| AC-402 | All 6 skill categories render with correct items and translated headings | EN + FR visual check |
| AC-403 | Timeline connector line draws progressively on scroll-down | Scroll test |
| AC-404 | Timeline connector line reverses on scroll-up | Scroll back up test |
| AC-405 | Timeline items stagger in from the left on scroll-down | Scroll test |
| AC-406 | Timeline items reverse on scroll-up | Scroll back up test |
| AC-407 | Experience, Education, Leadership each use their correct Phosphor icon | Visual inspection |
| AC-408 | Timeline descriptions display in both EN and FR | Locale toggle test |
| AC-409 | Awards section shows 2 entries with Trophy icon, glass chips | Visual inspection |
| AC-410 | No hardcoded English strings remain in any Phase 4 component | Code review |
| AC-411 | On mobile (< 640px): timeline is single-column, connector line hidden | Responsive mode test |
| AC-412 | `prefers-reduced-motion`: all items visible statically, no line draw animation | DevTools toggle |
| AC-413 | TypeScript strict mode passes (`npx tsc --noEmit`) | CLI verification |
| AC-414 | Production build passes (`npm run build`) | CLI verification |

---

### 8. Out of Scope

- Projects section (Phase 6)
- Certificates section (Phase 7)
- Contact section (Phase 8)
- `data/projects.ts` and `data/certificates.ts` population
- Any banner image generation
- CodeVisual component for Quote right side (deferred -- no right-side visual was implemented in Phase 3; to be addressed in convergence review Phase 9)
