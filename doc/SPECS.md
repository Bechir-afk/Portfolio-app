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
| **Owner** | GLM 5.2 (sole project worker -- all phases) |
| **Depends on** | Phase 0 (Foundation) complete: Next.js app running, dependencies installed, folder structure created, CSS variables and palette tokens defined. Phase 0 is also owned by GLM 5.2. |
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
| FR-025 | **Item counts (mobile < 640px):** Reduce all counts by at least 50%. Total ~25 items. |

#### 3.4 Code Symbols (`CodeSymbols.tsx`)

| ID | Requirement |
|---|---|
| FR-030 | Render the following symbols as DOM elements: `;` `{` `}` `=>` `//` `&&` `||` |
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
| FR-070 | Accept `children`, optional `id` (for anchor linking), and optional `className` |
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
| Hydration safety | Background item positions must be deterministic -- no `Math.random()` without a seed. Use a static array of pre-computed positions or a seeded PRNG. |

---

### 6. File-Level Implementation Guidance

#### `app/globals.css` additions

```css
/* Scrollbar hiding */
html {
  scrollbar-width: none;          /* Firefox */
  -ms-overflow-style: none;       /* IE/Edge */
}
html::-webkit-scrollbar {
  display: none;                  /* Chrome/Safari/Edge */
}

/* Continuous 3-stop gradient: lighter at top/bottom, bluer in the middle.
   background-attachment: fixed keeps it stable while scrolling. */
body {
  background: linear-gradient(
    180deg,
    var(--bg-primary) 0%,
    var(--bg-secondary) 50%,
    var(--bg-primary) 100%
  );
  background-attachment: fixed;
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

GLM 5.2 is the sole worker for all project phases. For this spec, read and apply the following skill files before implementation:

| Skill | Path | Why |
|---|---|---|
| **gsap-core** | `skills/gsap-core/SKILL.md` | Core tween API, `gsap.to()`, `gsap.matchMedia()` for responsive and reduced-motion handling |
| **gsap-scrolltrigger** | `skills/gsap-scrolltrigger/SKILL.md` | ScrollTrigger setup, `toggleActions`, scrub-based parallax, cleanup patterns |
| **gsap-react** | `skills/gsap-react/SKILL.md` | `useGSAP` hook, `gsap.context()` for React cleanup, ref-based element selection |
| **gsap-performance** | `skills/gsap-performance/SKILL.md` | Prefer transforms, `will-change`, avoid layout thrashing, batching |

**Additional knowledge required:**
- Next.js App Router: `"use client"` directive, `layout.tsx` vs `page.tsx`, SSR safety
- CSS: `position: fixed`, `backdrop-filter`, `pointer-events`, `scrollbar-width`, custom properties
- React: `useRef` for mutable values without re-render, `useEffect` cleanup, `useCallback`
- `requestAnimationFrame` pattern for continuous mouse tracking
- Hydration-safe deterministic positioning (no random values during SSR)

---

### 9. Out of Scope

- Hero, quote, about, or any content section components (those are later specs)
- Language toggle (Phase 2)
- Liquid-glass component styling (applied per-component in later specs; the base `.glass` class may be defined in globals.css during Phase 0 but is not part of this spec)
- Content rendering or data integration
