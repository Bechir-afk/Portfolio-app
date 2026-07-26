/speckit-plan

Generate a technical implementation plan for every remaining phase of the
Portfolio App, grounded in doc/CONSTITUTION.md, doc/IMPLEMENTATION_PLAN.md,
and doc/SPECS.md (SPEC-001 through SPEC-008).

This plan is the agent-facing execution reference. Each phase maps to one or
more specifications. Every task in this plan must be traceable to a
constitution rule, a functional requirement, or an acceptance criterion.

---

PHASE 0 — FOUNDATION
Owner: GLM 5.2
Spec dependency: None (prerequisite for all specs)
Blocking: All other phases

Goal:
Stand up a working, deployable Next.js project with the full stack configured,
folder structure created, and base tokens defined. No content. No UI beyond
a blank page that compiles.

Tasks:

P0-01  Run: npx create-next-app@latest Portfolio-app
         --typescript --tailwind --app --use-npm --no-src-dir
         --import-alias "@/*"
       Verify: dev server starts, no TypeScript errors.

P0-02  Install runtime dependencies:
         gsap @gsap/react
         framer-motion
         @phosphor-icons/react
         next-intl

P0-03  Install GSAP AI skills (project-scoped):
         npx skills add https://github.com/greensock/gsap-skills
         Select: gsap-core, gsap-scrolltrigger, gsap-timeline,
                 gsap-react, gsap-utils, gsap-plugins
         Scope: project (.claude/skills/)

P0-04  Configure fonts in app/layout.tsx:
         - Geist Sans from next/font/google (or local) -> CSS var --font-sans
         - JetBrains Mono from next/font/google -> CSS var --font-mono
       Apply both to html element.

P0-05  Define CSS custom properties in app/globals.css:
         --bg-primary:     #DAE3E5;
         --bg-secondary:   #BBD1EA;
         --accent:         #507DBC;
         --accent-light:   #A1C6EA;
         --text-dark:      #04080F;
         --font-sans:      (from next/font);
         --font-mono:      (from next/font);

P0-06  Add base glass utility class in globals.css:
         .glass {
           background: rgba(255,255,255,0.15);
           backdrop-filter: blur(12px);
           -webkit-backdrop-filter: blur(12px);
           border: 1px solid rgba(187,209,234,0.3);
           box-shadow: 0 4px 16px rgba(4,8,15,0.08);
           transition: box-shadow 0.3s ease, border-color 0.3s ease;
         }
         .glass:hover, .glass:focus-visible {
           border-color: rgba(80,125,188,0.5);
           box-shadow: 0 4px 24px rgba(80,125,188,0.15);
         }

P0-07  Add scrollbar-hiding CSS to globals.css:
         html { scrollbar-width: none; -ms-overflow-style: none; }
         html::-webkit-scrollbar { display: none; }
         (overflow-y must remain scroll/auto — do NOT set overflow: hidden)

P0-08  Add continuous gradient background to globals.css:
         body {
           background: linear-gradient(180deg,
             var(--bg-primary) 0%,
             var(--bg-secondary) 50%,
             var(--bg-primary) 100%
           );
           min-height: 100vh;
         }
         IMPORTANT: Do NOT use background-attachment: fixed.
         On iOS Safari, background-attachment: fixed causes rendering
         glitches and performance issues. Use a fixed-position pseudo-
         element or the InteractiveBackground component instead.

P0-09  Configure next-intl:
         - Create next.config.ts with next-intl plugin
         - Create i18n/routing.ts with locales: ['en', 'fr'], defaultLocale: 'en'
         - Create i18n/request.ts
         - Create app/[locale]/layout.tsx with NextIntlClientProvider
         - Create app/[locale]/page.tsx (blank for now)
         - Create locales/en.json and locales/fr.json (empty objects for now)
         - Verify: /en and /fr routes both render

P0-10  Configure strict TypeScript in tsconfig.json:
         "strict": true,
         "noUncheckedIndexedAccess": true,
         "exactOptionalPropertyTypes": true

P0-11  Create folder structure (empty files with /* TODO */ stubs):
         components/layout/PageShell.tsx
         components/layout/Section.tsx
         components/layout/LanguageToggle.tsx
         components/background/InteractiveBackground.tsx
         components/background/CodeSymbols.tsx
         components/background/TechKeywords.tsx
         components/hero/Hero.tsx
         components/hero/RotatingTitle.tsx
         components/hero/FloatingPortrait.tsx
         components/quote/Quote.tsx
         components/quote/CodeVisual.tsx
         components/about/About.tsx
         components/about/SkillTags.tsx
         components/timeline/Timeline.tsx
         components/timeline/TimelineItem.tsx
         components/projects/Projects.tsx
         components/projects/ProjectFilters.tsx
         components/projects/ProjectGrid.tsx
         components/projects/ProjectCard.tsx
         components/certificates/Certificates.tsx
         components/certificates/CertificateRow.tsx
         components/certificates/CertificateCard.tsx
         components/certificates/CertificateModal.tsx
         components/contact/ContactLinks.tsx
         data/resume.ts
         data/projects.ts
         data/certificates.ts
         lib/constants.ts
         lib/animation.ts
         lib/utils.ts

P0-12  Create lib/constants.ts:
         export const PALETTE = {
           bgPrimary:    '#DAE3E5',
           bgSecondary:  '#BBD1EA',
           accent:       '#507DBC',
           accentLight:  '#A1C6EA',
           textDark:     '#04080F',
         } as const;
         export const BREAKPOINTS = {
           mobile:  640,
           tablet:  1024,
         } as const;

P0-13  Configure Vercel:
         - Create vercel.json if needed for locale routing
         - Confirm root directory is repo root
         - Set Node version to LTS

P0-14  Verify production build:
         npm run build — must pass with zero errors and zero TypeScript
         violations before Phase 1 begins.

Phase 0 exit criteria:
  - npm run dev shows blank page at /en and /fr
  - npm run build passes
  - npx tsc --noEmit passes
  - npm run lint passes
  - All folder stubs exist
  - CSS variables, glass utility, scrollbar CSS, and background
    gradient are in globals.css
  - GSAP skills installed in .claude/skills/

---

PHASE 1 — GLOBAL SHELL AND INTERACTIVE BACKGROUND
Owner: Gemini 3.1 Pro
Spec: SPEC-001
Blocking: All visible content phases

IMPORTANT: Read skills/gsap-core/SKILL.md, skills/gsap-scrolltrigger/SKILL.md,
           skills/gsap-react/SKILL.md, and skills/gsap-performance/SKILL.md
           BEFORE writing any GSAP code in this phase.

Goal:
Deliver PageShell, Section wrapper, and InteractiveBackground with mouse
parallax and scroll parallax. After this phase, the page shows a continuous
light gradient with animated coding symbols and keywords that react to mouse
and scroll — all with correct cleanup and reduced-motion support.

Tasks:

P1-01  Implement components/layout/PageShell.tsx:
         - "use client" directive
         - Renders InteractiveBackground (z-index: 0, fixed)
         - Renders {children} in a relative wrapper (z-index: 10)
         - Verify: global gradient visible, no per-section bg colors

P1-02  Implement components/layout/Section.tsx:
         - "use client" directive
         - Props: children, id (optional), className (optional)
         - On mount: GSAP ScrollTrigger entrance (opacity 0->1, y 40->0)
         - toggleActions: "play reverse play reverse"
         - Use useGSAP() from @gsap/react for cleanup (see gsap-react skill)
         - Verify: sections animate in on scroll-down, reverse on scroll-up

P1-03  Implement components/background/InteractiveBackground.tsx:
         - "use client"
         - position: fixed, inset: 0, z-index: 0
         - pointer-events: none, aria-hidden="true"
         - Renders CodeSymbols and TechKeywords as children
         - Owns mouse parallax orchestration (passes depth factor to children)
         - Mouse position stored in useRef — NO setState on mousemove
         - requestAnimationFrame loop applies transforms via refs
         - gsap.matchMedia() to disable parallax under prefers-reduced-motion
         - Skip mousemove listener on touch-only devices:
             matchMedia('(hover: hover)').matches
         - Register and remove listener in useEffect cleanup

P1-04  Implement components/background/CodeSymbols.tsx:
         - Symbols: [';', '{', '}', '=>', '//', '&&', '||']
         - Desktop: ~15-20 large + ~20-25 small decorative
         - Mobile (<640px): reduce counts by 50%
         - Use STATIC pre-computed position array (no Math.random() — SSR safe)
           Each item: { x, y, rotation, scale, opacity, depthFactor }
         - Expose a ref array for parent to apply transforms
         - Symbols colored with palette: --accent, --accent-light, --text-dark
         - will-change: transform on each item
         - aria-hidden="true" on container

P1-05  Implement components/background/TechKeywords.tsx:
         - Keywords: Python, TypeScript, Docker, Arduino, STM32, LoRa,
                     numpy, stdlib, mathbot, React, Kubernetes, PostgreSQL
         - Desktop: ~10-12 items. Mobile: reduce by 50%
         - Static pre-computed positions, same pattern as CodeSymbols
         - Font: JetBrains Mono (--font-mono)
         - Colored with palette accent colors
         - will-change: transform
         - aria-hidden="true"

P1-06  Implement scroll parallax:
         - GSAP ScrollTrigger on InteractiveBackground items
         - Different y-offset amounts per depthFactor (large symbols: slow,
           small items: faster)
         - scrub: true (smooth scroll-linked)
         - Use useGSAP context for cleanup
         - Kill all ScrollTriggers on unmount

P1-07  Implement lib/animation.ts:
         - Export REDUCED_MOTION: boolean (read once from matchMedia)
         - Export gsapDefaults: GSAPTweenVars (shared duration/ease)
         - Export registerGSAP(): registers ScrollTrigger, called once client-side

P1-08  Wire PageShell into app/[locale]/layout.tsx:
         - Wrap NextIntlClientProvider with PageShell
         - Confirm gradient + background visible on /en and /fr

Phase 1 exit criteria (maps to SPEC-001 AC-01 through AC-13):
  - Continuous light gradient, no per-section backgrounds
  - Scrollbar hidden in Chrome, Firefox, Safari, Edge
  - Page scrolls via mouse, touch, keyboard, screen reader
  - Coding symbols and keywords visible, organically scattered
  - Mouse causes subtle parallax (different speeds per layer)
  - Scrolling causes parallax (different speeds per layer)
  - Background items do not intercept clicks
  - prefers-reduced-motion: no parallax, static positions
  - Mobile viewport: fewer items, smooth performance
  - No hydration mismatch errors in console
  - Section wrapper animates in on scroll-down, reverses on scroll-up
  - No memory leaks (React StrictMode double-mount test)
  - npm run build passes

---

PHASE 2 — HERO AND LANGUAGE TOGGLE
Owner: Gemini 3.1 Pro
Spec: SPEC-002 (to be written)
Blocking: Visible first impression; language switching for all phases

Goal:
Deliver the Hero section with free-floating photo, rotating title, and fixed
language toggle. After this phase, the first viewport shows Bechir's name,
correctly rotating titles in the right colors, and a working EN/FR switch.

Tasks:

P2-01  Implement components/hero/FloatingPortrait.tsx:
         - Source: /photo.png (copy from doc/photo.png to public/photo.png)
         - Render with Next.js <Image> component
         - NO border-radius, clip-path, border, wrapper frame, or card
         - Apply: style={{ filter: 'drop-shadow(0 0 20px rgba(80,125,188,0.5))
                                   drop-shadow(0 0 60px rgba(161,198,234,0.3))' }}
         - Provide descriptive alt text: "Bechir Ben Rabia"
         - Priority: true (above the fold)

P2-02  Implement components/hero/RotatingTitle.tsx:
         - Three titles from locales (keys: hero.title.student,
           hero.title.freelance, hero.title.gamer)
         - Colors per constitution:
             student:  #507DBC  (--accent)
             freelance: #04080F (--text-dark)
             gamer:    #A1C6EA  (--accent-light)
         - Fixed height container (prevents layout shift)
         - Animation: vertical slide + fade (GSAP timeline, infinite loop)
         - Interval: ~2.5s per title
         - Reduced-motion: cycle titles with simple opacity fade only,
           or show all three statically stacked
         - NO layout shift at any breakpoint

P2-03  Implement components/hero/Hero.tsx:
         - Section layout: name (large, Geist Sans 800), RotatingTitle,
           FloatingPortrait
         - Desktop: side-by-side layout (photo left/right, text opposite)
         - Mobile: photo centered above name and title
         - GSAP entrance on load: opacity 0->1, y 40->0 for all elements
         - GSAP ScrollTrigger exit: on scroll past hero, deconstruct
           (opacity 1->0, y 0->-40) using toggleActions
         - Name and title text from locales (hero.name, hero.subtitle)
         - No hardcoded strings in component

P2-04  Implement components/layout/LanguageToggle.tsx:
         - "use client"
         - position: fixed, top: 1.5rem, right: 1.5rem, z-index: 100
         - Phosphor <Translate size={20} /> icon
         - .glass styling
         - Uses next-intl useLocale() and useRouter() for locale switching
         - Switches locale without full page reload
         - Accessible: aria-label="Switch language" (localized)
         - Shows current locale as text next to icon: "EN" or "FR"

P2-05  Add hero locale keys to locales/en.json and locales/fr.json:
         {
           "hero": {
             "name": "Bechir Ben Rabia",
             "subtitle": "Based in Tunis, Tunisia",
             "title": {
               "student":  "Computer Engineering Student",
               "freelance": "Freelance Developer by Day",
               "gamer":    "Gamer by Night"
             }
           },
           "languageToggle": {
             "label": "Switch language"
           }
         }

Phase 2 exit criteria:
  - Hero photo is free-floating, no visible frame, blue glow visible
  - Rotating title loops through all 3 titles in correct colors
  - No layout shift during title rotation
  - Hero entrance animates on page load
  - Hero deconstructs when scrolling past it
  - Language toggle is visible and fixed at top-right on all viewports
  - Clicking toggle switches EN/FR without page reload
  - Mobile layout: photo above name/title, no overflow

---

PHASE 3 — QUOTE SECTION
Owner: Gemini 3.1 Pro
Spec: SPEC-003 (to be written)

Goal:
Deliver the Quote section with terminal-style left text and a distinct
coding-themed right-side visual. The right visual must NOT be the hero photo.

Tasks:

P3-01  Implement components/quote/CodeVisual.tsx:
         - A coding-themed visual distinct from the hero photo
         - Options (pick one that respects light palette + dark text rule):
             a) Animated floating code blocks (JSX/Python snippets as styled
                DOM elements, subtle float animation)
             b) Stylized terminal panel with light bg, dark code text, glass border
             c) Abstract node-graph animation (SVG, palette colors)
         - Must use --bg-primary / --bg-secondary as surface colors
         - Must use --text-dark / --accent for text/line colors
         - Not a dark terminal (would violate constitution IV)
         - Fully responsive (stack below quote on mobile)
         - Reduced-motion: static version of the visual

P3-02  Implement components/quote/Quote.tsx:
         - Desktop layout: quote on left (55%), CodeVisual on right (45%)
         - Mobile layout: quote on top, CodeVisual below
         - Quote text from locales (quote.text, quote.attribution if added)
         - Font: JetBrains Mono (--font-mono)
         - Color: --text-dark
         - 6-8 programming reference background decorations:
             Scattered <span> elements, absolute positioned, rotated,
             palette accent colors, aria-hidden, pointer-events: none
         - GSAP ScrollTrigger: enter from y:60 opacity:0, exit reverse
         - Section uses <Section> wrapper from Phase 1

P3-03  Add quote locale keys:
         {
           "quote": {
             "text": "In theory, theory and practice are the same. In practice, they're not."
           }
         }

Phase 3 exit criteria:
  - Quote text uses JetBrains Mono
  - Right side is a different visual from the hero photo
  - Right side uses light palette (not dark terminal)
  - Background programming references are visible and not grid-aligned
  - Section animates in on scroll, reverses on scroll-up
  - Mobile: single-column layout, both elements visible

---

PHASE 4 — RESUME DATA EXTRACTION
Owner: GLM 5.2
Spec: SPEC-004 (to be written)
Blocking: Phases 5, 6, 7, 8

Goal:
Parse doc/resume.tex and produce typed, complete data structures in
data/resume.ts, data/projects.ts (partial — public repos only at this stage),
and data/certificates.ts. Create base locale content for all sections.

Tasks:

P4-01  Read doc/resume.tex in full.

P4-02  Create data/resume.ts with the following shape (fully typed):
         profile:   name, location, summary, rotatingTitles (with keys + colors)
         skills:    array of { category: string, items: string[] }
         experience: array of { role, company, start, end, technologies, descKey }
         leadership: array of { role, org, start, end, descKey }
         education:  array of { degree, institution, date, coursework?, descKey }
         awards:     array of { title, event, year }
         contact:   { email, phone, socials: { platform, url }[] }
         spokenLanguages: string[]
       All user-facing text (descriptions, labels) must use locale keys.
       No hardcoded display strings in data/resume.ts.

P4-03  Create data/certificates.ts:
         11 certificates from constitution section VII.
         Each entry:
           id, titleKey, issuerKey, issueDate,
           asset (public/certs/cert-01.png placeholder),
           format: "image" | "pdf",
           credentialUrl?: string
         Assets are placeholders until doc/certifs/ is populated.

P4-04  Create data/projects.ts (public repos only at this stage):
         8 verified public repos + vMigrate + Math Genius as placeholders.
         Each entry follows the Project interface from the plan.
         descriptionKey points to locale key.
         banner points to public/projects/[name].webp placeholder.
         Private repo entries: empty array with TODO comment.

P4-05  Complete locales/en.json with all section content:
         - hero, quote, about (bio, skill categories), experience descriptions,
           leadership descriptions, education descriptions, awards,
           project descriptions (for all 10 entries so far),
           certificate titles and issuer names,
           contact labels,
           filter labels: All, IoT, AI/ML, Full-Stack, Tools, DevOps/Cloud,
           section headings, modal labels, accessibility labels,
           footer/contact section labels

P4-06  Complete locales/fr.json with complete French translations of all
         keys added in P4-05. No English leaks.

P4-07  Verify all data files are TypeScript-valid:
         npx tsc --noEmit — must pass with zero errors.

Phase 4 exit criteria:
  - data/resume.ts is complete, typed, no hardcoded display strings
  - data/projects.ts has 10 entries (8 public + 2 placeholders)
  - data/certificates.ts has 11 entries
  - locales/en.json is complete
  - locales/fr.json is complete, no missing keys
  - npx tsc --noEmit passes

---

PHASE 5 — ABOUT, SKILLS, TIMELINES, AWARDS
Owner: Gemini 3.1 Pro + GLM 5.2
Spec: SPEC-005 (to be written)
Depends on: Phase 4 complete

Goal:
Render About bio, categorized skills, Experience/Education/Leadership
timelines with animated connectors, and Awards. All data-driven from
data/resume.ts and locale files.

Tasks:

P5-01  Implement components/about/About.tsx:
         - Biography from resume.profile.summary via locale
         - Glassmorphic card (.glass)
         - <Section> wrapper (GSAP entrance)
         - Spoken languages as a small detail line

P5-02  Implement components/about/SkillTags.tsx:
         - Read resume.skills[] (7 categories)
         - Render each category with a heading and pill tags
         - Tags: .glass styling, --text-dark text, --accent border
         - Hover: box-shadow glow (#507DBC)
         - GSAP stagger on tag entry: stagger: 0.04, from bottom
         - Skill category names from locale (fully translated in FR)
         - Spoken languages section below skills

P5-03  Implement components/timeline/TimelineItem.tsx:
         - Props: date, role, org, descKey, icon, side ('left'|'right'|'single')
         - Glassmorphic card
         - Phosphor icon prop (Briefcase, GraduationCap, or UsersThree)
         - Description loaded via useTranslations(descKey)

P5-04  Implement components/timeline/Timeline.tsx:
         - Props: items[], icon, heading
         - Animated vertical SVG connector line
           (stroke-dashoffset animated by ScrollTrigger progress)
         - Desktop: alternating left/right layout
         - Mobile/Tablet: single-column
         - GSAP ScrollTrigger: each item slides in from side, staggered
         - Reverse on scroll-up
         - Used 3 times on the page:
             <Timeline items={experience} icon={Briefcase} />
             <Timeline items={education} icon={GraduationCap} />
             <Timeline items={leadership} icon={UsersThree} />

P5-05  Implement awards display:
         - Small callout card (or banner) near Education
         - Two awards from resume.awards[]
         - Glassmorphic style
         - Phosphor Trophy icon

P5-06  Wire all components into app/[locale]/page.tsx:
         Import and render About, SkillTags, and three Timeline instances

Phase 5 exit criteria:
  - Biography renders from data, not hardcoded
  - Skills display in all 7 categories with correct EN and FR labels
  - Experience, Education, and Leadership timelines all render
  - Timeline SVG line draws progressively on scroll
  - All timeline cards reverse/deconstruct on scroll-up
  - Awards visible
  - Mobile: single-column timelines
  - EN/FR toggle updates all text in these sections

---

PHASE 6 — PROJECTS
Owner: All agents
Spec: SPEC-006 (to be written)
Depends on: Phase 4 complete
Blocked by: Private repo list, vMigrate URL, Math Genius URL

Goal:
Render all projects as banner-first, glassmorphic, filterable cards.
Every card links to its repository. Private repos show a lock indicator.

Agent split:
  Claude Opus 8: finalize data/projects.ts, generate/collect banner assets
  Gemini 3.1 Pro: ProjectFilters, ProjectGrid, ProjectCard UI
  GLM 5.2: EN/FR project descriptions in locale files

Tasks:

P6-01  (Claude Opus 8) Finalize data/projects.ts:
         - Add private repos once user provides list
         - Add vMigrate and Math Genius URLs
         - Verify all entries have: id, title, repositoryUrl, visibility,
           category[], technologies[], banner, descriptionKey

P6-02  (Claude Opus 8) Generate or collect banner assets:
         - One banner per project, 16:9 ratio
         - WebP format, saved to public/projects/
         - Descriptive original visuals (not just screenshots)
         - Naming: [project-id].webp
         - Provide alt text for each in locale files

P6-03  (Gemini 3.1 Pro) Implement components/projects/ProjectCard.tsx:
         - Banner as main visual (Next.js <Image>, fill/cover)
         - Liquid-glass overlay on hover: reveals title, tech chips, desc
         - Entire card is a clickable anchor (href to repositoryUrl)
         - target="_blank" rel="noopener noreferrer" for external links
         - If visibility === "private": show Phosphor <Lock /> badge
         - Keyboard accessible: focusable, Enter activates
         - Alt text from locale for banner image

P6-04  (Gemini 3.1 Pro) Implement components/projects/ProjectFilters.tsx:
         - Filters: All, IoT, AI/ML, Full-Stack, Tools, DevOps/Cloud
         - Each filter: glass button + Phosphor icon
         - Active state: --accent border + box-shadow glow
         - Keyboard accessible
         - Labels from locale

P6-05  (Gemini 3.1 Pro) Implement components/projects/ProjectGrid.tsx:
         - Responsive grid: 1-col mobile, 2-col tablet, 3-col desktop
         - Framer Motion <AnimatePresence mode="popLayout"> on card list
         - Each card: <motion.div layout> for smooth filter transitions
         - GSAP stagger on initial scroll reveal

P6-06  (Gemini 3.1 Pro) Implement components/projects/Projects.tsx:
         - useState for active filter
         - Computed filteredProjects array
         - Renders ProjectFilters + ProjectGrid
         - <Section> wrapper

P6-07  (GLM 5.2) Write EN and FR project descriptions in locale files.
         One paragraph per project. All 10+ entries. Include banner alt text.

Phase 6 exit criteria:
  - All projects visible (including private with lock badge)
  - All cards clickable to correct URLs
  - Filters work: correct projects shown per category
  - Filter transitions animated (Framer Motion)
  - Cards animate in staggered on scroll
  - Project descriptions correct in EN and FR
  - Mobile: 1-column grid
  - No hardcoded project data in UI components

---

PHASE 7 — CERTIFICATES
Owner: Gemini 3.1 Pro + GLM 5.2
Spec: SPEC-007 (to be written)
Depends on: Phase 4 complete
Blocked by: doc/certifs/ files (user must upload)

Goal:
Deliver a dual-direction certificate marquee with pause-on-hover and a
fully accessible modal for image and PDF viewing.

Tasks:

P7-01  (GLM 5.2) Process certificates:
         - Once doc/certifs/ is populated, map files to certificates.ts entries
         - Copy assets: doc/certifs/ -> public/certs/
         - Update asset paths and formats in data/certificates.ts
         - Add title and issuer translations to locales/en.json + fr.json

P7-02  (Gemini 3.1 Pro) Add CSS keyframe animations to globals.css:
         @keyframes scrollRight {
           from { transform: translateX(0); }
           to   { transform: translateX(-50%); }
         }
         @keyframes scrollLeft {
           from { transform: translateX(-50%); }
           to   { transform: translateX(0); }
         }

P7-03  (Gemini 3.1 Pro) Implement components/certificates/CertificateCard.tsx:
         - Glassmorphic card
         - Shows: certificate title (from locale), issuer name, year
         - Hover: scale(1.03), glow box-shadow
         - onClick: calls onSelect(certificate)
         - Keyboard: focusable, Enter/Space triggers onSelect
         - Image preview thumbnail if format is "image"

P7-04  (Gemini 3.1 Pro) Implement components/certificates/CertificateRow.tsx:
         - Props: certificates[], direction: 'right'|'left', duration (default 30s)
         - Renders items duplicated (items + items) for seamless loop
         - CSS animation: scrollRight or scrollLeft, linear, infinite
         - useState: isPaused
         - onMouseEnter row: setIsPaused(true)
           -> style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
         - onMouseLeave row: setIsPaused(false)
         - Reduced-motion: disable animation, show static scrollable row

P7-05  (Gemini 3.1 Pro) Implement components/certificates/CertificateModal.tsx:
         - Framer Motion <AnimatePresence>
         - Backdrop: fixed inset-0, backdrop-filter: blur(20px),
           rgba(4,8,15,0.4) overlay
         - Modal card: .glass, centered, spring transition
         - Image certs: Next.js <Image> fill, object-contain
         - PDF certs: <iframe src={cert.asset} /> with title attribute
         - Close controls:
             Phosphor <X /> button (top-right of modal)
             Click backdrop
             Escape key (useEffect keydown listener, cleanup on unmount)
         - Focus trap: on open, focus first focusable element inside modal
         - On close: restore focus to the card that triggered the modal
         - aria-modal="true", role="dialog", aria-labelledby pointing to title
         - Mobile: full-screen modal with scroll for PDF

P7-06  (Gemini 3.1 Pro) Implement components/certificates/Certificates.tsx:
         - useState: selectedCert (Certificate | null)
         - Split data: row1 = first 6, row2 = remaining certs
         - <CertificateRow direction="right" certificates={row1} />
         - <CertificateRow direction="left"  certificates={row2} />
         - <CertificateModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
         - Placeholder cards for any missing asset files
         - <Section> wrapper

Phase 7 exit criteria:
  - Row 1 scrolls right, Row 2 scrolls left, continuously
  - Hovering a row pauses animation for that row only
  - Leaving resumes animation
  - Clicking a card opens modal
  - Modal displays image correctly
  - Modal displays PDF correctly (iframe)
  - Escape closes modal
  - Backdrop click closes modal
  - Focus trap works inside modal
  - Focus restored to triggering card after close
  - Reduced-motion: rows static
  - Mobile: modal is full-screen, scrollable

---

PHASE 8 — CONTACT AND FULL i18n
Owner: Gemini 3.1 Pro + GLM 5.2
Spec: SPEC-008 (to be written)
Depends on: Phase 4 complete

Goal:
Deliver the Contact section with professional links only (no form), and
verify the complete EN/FR translation coverage across the entire site.

Tasks:

P8-01  (Gemini 3.1 Pro) Implement components/contact/ContactLinks.tsx:
         - Links from data/resume.contact.socials + email + phone
         - Layout: horizontal row of liquid-glass link buttons
         - Per link:
             GitHub:   Phosphor <GithubLogo />   href to GitHub URL
             LinkedIn: Phosphor <LinkedinLogo />  href to LinkedIn URL
             Email:    Phosphor <EnvelopeSimple /> href="mailto:..."
             Phone:    Phosphor <Phone />          href="tel:..."
             Facebook: Phosphor <FacebookLogo />   href to Facebook URL
         - All external links: target="_blank" rel="noopener noreferrer"
         - Accessible labels via aria-label (from locale, e.g. "Visit GitHub")
         - Phone link opens native dialer on mobile via tel: URI
         - Hover: glow effect using --accent
         - Mobile: wrap to 2 or 3 per row as needed
         - NO contact form

P8-02  (GLM 5.2) Complete i18n audit:
         - Open every component file
         - Identify any string that appears in the rendered UI
         - Verify it uses useTranslations() and a locale key
         - Add any missing keys to both en.json and fr.json
         - Especially check: section headings, filter labels, aria-labels,
           modal close buttons, loading/empty states, footer

P8-03  (GLM 5.2) Verify FR translations are complete:
         - Every key present in en.json must be present in fr.json
         - No English strings appearing when locale is "fr"
         - Write a simple script or manual checklist to compare key counts:
             Object.keys(en).length === Object.keys(fr).length

P8-04  (Gemini 3.1 Pro) Add contact locale keys:
         {
           "contact": {
             "heading": "Get in touch",
             "github":   "Visit GitHub",
             "linkedin": "Visit LinkedIn",
             "email":    "Send email",
             "phone":    "Call",
             "facebook": "Visit Facebook"
           }
         }

Phase 8 exit criteria:
  - Contact section shows 5 links: GitHub, LinkedIn, email, phone, Facebook
  - No contact form anywhere
  - Phone link opens dialer on mobile
  - All external links open safely
  - Every section renders correctly in French
  - No English text visible when locale is "fr"
  - en.json and fr.json have identical key structure

---

PHASE 9 — INTEGRATION AND CONVERGENCE
Owner: All agents
Spec: Constitution + all SPECS
Depends on: Phases 0-8 complete

Goal:
Ensure the final application matches the constitution, plan, and all
specifications. Resolve cross-agent inconsistencies. No new features.

Tasks:

P9-01  Side-by-side comparison:
         - Constitution vs. rendered app: every rule verified
         - Implementation plan vs. components: every section exists
         - SPEC-001 AC-01 through AC-13: each criterion tested

P9-02  Visual consistency audit:
         - Palette: only approved hex values used (check DevTools)
         - Liquid-glass: applied consistently to all required surfaces
         - Phosphor icons: no other icon library present
         - No emojis in DOM or source

P9-03  Animation consistency audit:
         - Section animations use Section wrapper (not ad-hoc)
         - Modal transitions use Framer Motion
         - Filter transitions use Framer Motion AnimatePresence
         - Background parallax uses GSAP + requestAnimationFrame
         - All ScrollTriggers and listeners cleaned up

P9-04  Data audit:
         - No hardcoded display strings in any component
         - All components read from data/ or locales/
         - locale keys consistent between en.json and fr.json

P9-05  Cleanup:
         - Remove unused imports, dead code, TODO stubs
         - Remove unused dependencies
         - Remove console.log statements

P9-06  Update docs if any decisions changed during implementation:
         - Update IMPLEMENTATION_PLAN.md
         - Update SPECS.md
         - Note any deviations and their justifications

Phase 9 exit criteria:
  - Zero constitution violations
  - All SPEC acceptance criteria pass
  - No dead code or unused dependencies
  - Documentation reflects final state

---

PHASE 10 — QA AND DEPLOYMENT
Owner: Claude Opus 8
Spec: Constitution section X
Depends on: Phase 9 complete

Goal:
Run the full pre-deployment checklist, optimize, and deploy to Vercel.

Tasks:

P10-01  Automated checks:
           npm run lint       -- zero warnings or errors
           npx tsc --noEmit   -- zero TypeScript errors
           npm run build      -- production build succeeds

P10-02  Manual cross-browser test matrix:
           Chrome (latest), Firefox (latest), Safari (latest), Edge (latest)
           - Scrollbar hidden in all
           - Background parallax works
           - Glass effects render correctly (backdrop-filter support check)
           - Provide graceful fallback for browsers without backdrop-filter

P10-03  Responsive layout test:
           Mobile portrait (375px), Mobile landscape (667px),
           Tablet portrait (768px), Tablet landscape (1024px),
           Desktop (1280px), Large desktop (1440px)

P10-04  Keyboard navigation test:
           - Tab through all interactive elements
           - Filter buttons, project cards, certificate cards, contact links
           - Certificate modal: focus trap, Escape close, focus restore
           - Language toggle: keyboard operable

P10-05  Reduced-motion test:
           - Enable prefers-reduced-motion in OS or DevTools
           - Background: static, no parallax
           - Section animations: instant or disabled
           - Rotating title: simplified
           - Certificate rows: static

P10-06  EN/FR coverage test:
           - Toggle to FR, scroll entire page
           - Verify: zero English-only text visible in FR mode
           - Verify: language toggle itself switches correctly

P10-07  Project links test:
           - Click every project card
           - Verify correct URL opens in new tab
           - Verify lock badge on private repos

P10-08  Certificate modal test:
           - Open each certificate card
           - Image certs: image displays, fills modal
           - PDF certs: iframe loads, scrollable
           - Escape closes, backdrop click closes, X button closes
           - Focus restored after close

P10-09  Performance optimization:
           - Run Lighthouse in Chrome DevTools (incognito)
           - Target: Performance 90+, Accessibility 90+,
                     Best Practices 90+, SEO 90+
           - If below target:
               Compress images (TinyPNG or Squoosh for WebP)
               Lazy-load below-fold sections
               Remove unused Tailwind classes (PurgeCSS is built-in)
               Check for render-blocking resources

P10-10  Deploy to Vercel:
           - Verify environment variables if any
           - Push to main branch (triggers Vercel auto-deploy)
           - Verify production URL opens correctly
           - Re-run Lighthouse on production URL (not localhost)
           - Verify certificate files are served correctly (MIME types)

Phase 10 exit criteria (Definition of Done from plan):
  1. Single-page portfolio with one continuous light background
  2. Hidden scrollbar, accessible scroll
  3. Free-floating hero photo with blue glow, no frame
  4. Rotating title loops through 3 identities with correct colors
  5. Quote section with distinct right-side coding visual
  6. All projects (public + private) with custom banner cards
  7. Every project card links to its GitHub URL
  8. Two-direction certificate carousel with pause-on-hover
  9. Certificate modal with full accessibility
  10. Contact links only, phone opens dialer on mobile
  11. Complete EN/FR translation, no English leaks in FR mode
  12. Mobile-first responsive at 3 breakpoints
  13. Keyboard navigation and reduced-motion verified
  14. Production build, lint, TypeScript pass
  15. Lighthouse 90+ on all four categories
  16. Convergence review confirmed
  17. Deployed and live on Vercel

---

OPEN BLOCKERS (must be resolved before Phase 6 and Phase 7 can complete)

1. Private repository list
   User must provide: repo name, display title, URL, category, technologies,
   short description for each private repo.

2. vMigrate repository URL
   Confirm whether the URL is public or private.

3. Math Genius repository URL
   Confirm whether the URL is public or private.

4. Certificate files
   Upload 11 certificate files to doc/certifs/.
   Naming: cert-01.png ... cert-11.png (or .pdf where applicable).
   See doc/CONSTITUTION.md section VII for the full list.

---

REMAINING SPECS TO WRITE (before agents begin Phases 2-8)

SPEC-002: Hero and Language Toggle
SPEC-003: Quote Section
SPEC-004: Resume Data Extraction
SPEC-005: About, Skills, Timelines, Awards
SPEC-006: Projects
SPEC-007: Certificates
SPEC-008: Contact and i18n

Each spec must follow the SPEC-001 format:
  Objective, Deliverables, Functional Requirements, Non-Functional Requirements,
  Technical Constraints, File-Level Implementation Guidance,
  Acceptance Criteria, Required Skills.