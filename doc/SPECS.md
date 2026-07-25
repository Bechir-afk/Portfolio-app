# Portfolio App — Feature Specifications

> **Author:** Bechir Ben Rabia  
> **Methodology:** [Spec-Driven Development — github/spec-kit](https://github.com/github/spec-kit)  
> **Last Updated:** July 25, 2026  
> **Implementation Plan:** See [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md)

This document contains all 8 feature specifications for the Portfolio App, each following the spec-kit format: What to Build → User Stories → Acceptance Criteria → Technical Plan.

---

## SPEC-1 — Global Shell & Background System

> **Agent:** Gemini 3.1 Pro  
> **Phase:** 1  
> **Status:** Pending

### What to Build
A single-page scrollable shell with a globally unified interactive background that persists across all sections. No section has its own background color.

### User Stories
- As a visitor, I see one continuous light background from top to bottom with no color breaks between sections.
- As a visitor, moving my mouse causes background elements to shift subtly (interactive parallax).
- As a visitor, I never see a scrollbar on any browser.
- As a visitor, I see floating coding symbols (`;`, `{`, `}`, `=>`, `//`, `&&`, `||`, `/*`, `*/`) organically scattered in the background.
- As a visitor, I see tech keyword references (`Python`, `TypeScript`, `numpy`, `Arduino`, `LoRa`, `Docker`, `STM32`, `mathbot`, `stdlib`) scattered non-transparently in VS Code RGB colors.
- As a visitor scrolling, background elements move at a different speed than content (parallax depth).

### Acceptance Criteria
- [ ] Background is a single CSS gradient: `#DAE3E5` → `#BBD1EA`, fixed, covers 100% of viewport at all times.
- [ ] 6–8 tech keyword references rendered in VS Code RGB colors, randomly rotated (-15deg to +15deg), organically placed (not grid-aligned).
- [ ] Floating symbols react to `mousemove` via `requestAnimationFrame`; translate by `(dx * 0.03, dy * 0.03)`.
- [ ] Scrollbar hidden on all browsers: `scrollbar-width: none` (Firefox) + `::-webkit-scrollbar { display: none }` (Webkit).
- [ ] No section has its own `background` or `background-color` CSS property.
- [ ] Background layer uses `pointer-events: none` — does not block any UI interaction.
- [ ] GSAP parallax applied to symbol layers on scroll.

### Technical Plan

```
components/Background.tsx
  - <canvas> full-screen, position: fixed, z-index: 0, pointer-events: none
  - mousemove listener → update symbol offsets via requestAnimationFrame
  - GSAP ScrollTrigger → parallax on keyword/symbol layers
  - Symbols: [';', '{', '}', '=>', '//', '&&', '||', '/*', '*/']
  - VS Code color map:
      Python      = #3572A5
      TypeScript  = #3178C6
      numpy       = #013243
      Arduino     = #00979D
      Docker      = #0db7ed
      LoRa        = #507DBC
      STM32       = #04080F
      mathbot     = #A1C6EA
      stdlib      = #BBD1EA

app/globals.css
  - html, body { background: linear-gradient(135deg, #DAE3E5, #BBD1EA); }
  - ::-webkit-scrollbar { display: none; }
  - * { scrollbar-width: none; }
```

---

## SPEC-2 — Hero Section

> **Agent:** Gemini 3.1 Pro  
> **Phase:** 2  
> **Status:** Pending  
> **Blocked by:** `public/photo.png` upload

### What to Build
The first full-viewport section — the landing view. Bechir's photo floats freely on the page beside his name and title.

### User Stories
- As a visitor, I see Bechir's photo free-floating on the page with no border, no frame, no crop.
- As a visitor, I see a blue glow radiating from the edges of the photo.
- As a visitor, I see his full name in a large display font.
- As a visitor, I see his title: "Computer Engineering Student · Freelance Developer".
- As a visitor, I see a fixed EN/FR translate button in the top-right corner at all times.
- As a visitor scrolling down past the hero, the section smoothly deconstructs (fades and translates out).
- As a visitor scrolling back up, the hero section reconstructs.

### Acceptance Criteria
- [ ] Photo rendered as `<Image>` (Next.js) with no `clip-path`, no `border-radius`, no wrapping frame.
- [ ] Glow: `filter: drop-shadow(0 0 40px #507DBC) drop-shadow(0 0 80px #A1C6EA)`.
- [ ] Name: Geist Sans, `font-weight: 800`, `color: #04080F`.
- [ ] Title: Geist Sans, `font-weight: 400`, `color: #507DBC`.
- [ ] TranslateToggle: `position: fixed`, `top: 1.5rem`, `right: 1.5rem`, Phosphor `<Translate />` icon, liquid glass style.
- [ ] GSAP `fromTo` on mount: `opacity: 0, y: 40` → `opacity: 1, y: 0`.
- [ ] GSAP ScrollTrigger `onLeave`: `opacity: 1, y: 0` → `opacity: 0, y: -40`.
- [ ] GSAP ScrollTrigger `onEnterBack`: reverse animation reconstructs section.
- [ ] Photo source: `public/photo.png`.

### Technical Plan

```
components/Hero.tsx
  - useLayoutEffect → gsap.context()
  - gsap.fromTo('.hero-content', { opacity:0, y:40 }, { opacity:1, y:0, duration:1 })
  - ScrollTrigger on section: onLeave → gsap.to('.hero-content', { opacity:0, y:-40 })
  - <Image src="/photo.png" unoptimized style={{ filter: '...' }} />
  - Content: data/resume.ts → hero.name, hero.title

components/TranslateToggle.tsx
  - position: fixed, top/right
  - useLocale() from next-intl
  - onClick → router.replace(pathname, { locale: newLocale })
  - Liquid glass: backdrop-filter: blur(12px), bg: rgba(255,255,255,0.2)
  - Phosphor <Translate size={20} />
```

---

## SPEC-3 — Quote Section

> **Agent:** Gemini 3.1 Pro  
> **Phase:** 3  
> **Status:** Pending

### What to Build
A full-viewport section with a developer quote in terminal font on the left, Bechir's photo on the right, and a background dense with programming references.

### Quote
> "In theory, theory and practice are the same. In practice, they're not."

### User Stories
- As a visitor, I see the quote displayed in a terminal/monospace font on the left side.
- As a visitor, I see Bechir's photo on the right side.
- As a visitor, I see 6–8 programming language/library names scattered in the background, visibly colored, organically rotated.
- As a visitor, the background programming references are not transparent or faded.
- As a visitor scrolling, the section animates in from below and out to above.

### Acceptance Criteria
- [ ] Quote text: `font-family: 'JetBrains Mono', monospace`, `color: #04080F`.
- [ ] Layout: flex row, quote occupies 55% width, photo 45% width.
- [ ] 6–8 background `<span>` elements: tech names in VS Code RGB colors, `position: absolute`, unique `transform: rotate(Xdeg)` per element, organically spread (no grid).
- [ ] Background elements: `opacity: 1`, fully visible, dark colors.
- [ ] GSAP ScrollTrigger: section enters from `y: 60, opacity: 0` → `y: 0, opacity: 1` on scroll-down.
- [ ] GSAP ScrollTrigger: section exits to `y: -60, opacity: 0` on scroll-up past it.
- [ ] No separate background color on this section — global gradient shows through.

### Technical Plan

```
components/Quote.tsx
  - Section: position: relative, overflow: hidden
  - Flex row layout
  - Background elements: map over keyword array, assign fixed positions + rotations
  - Quote: <blockquote> with JetBrains Mono
  - Photo: same <Image> as Hero, right-aligned
  - GSAP ScrollTrigger scrub: 0.5
```

---

## SPEC-4 — About & Skills Section

> **Agent:** Gemini 3.1 Pro (UI) + GLM 5.2 (data)  
> **Phase:** 4  
> **Status:** Blocked (needs `resume.tex`)

### What to Build
A glassmorphic card section with Bechir's short bio and a categorized, interactive skill tag cloud.

### User Stories
- As a visitor, I read a concise bio about Bechir (extracted from resume).
- As a visitor, I see skills grouped by category as interactive pill tags.
- As a visitor, hovering a skill tag triggers a subtle glow effect.
- As a visitor, the section and tags animate in staggered on scroll.

### Skills (Extracted from 18 GitHub Repos)

| Category | Skills |
|---|---|
| Languages | Python, TypeScript, JavaScript, C, C#, Go, Ruby, HTML/CSS |
| Frameworks | React, Next.js, TanStack Start, Flask, Express.js, Node.js |
| IoT / Embedded | ESP32, MFRC522, MQTT, Firebase, STM32, Arduino, LoRa |
| Databases | PostgreSQL, Supabase, Firebase RTDB, SQLite, Neon, Drizzle ORM |
| AI / ML | XGBoost, SHAP, Gemini API, Vercel AI SDK, Groq API |
| DevOps / Cloud | Docker, OpenShift, Kubernetes, Vercel, Redis |
| Other Tools | GSAP, Framer Motion, TanStack Query, Phosphor Icons |

### Acceptance Criteria
- [ ] Bio text from `data/resume.ts → about.bio`.
- [ ] Skills from `data/resume.ts → about.skills` (categorized array).
- [ ] Skill tags: liquid glass pill style, `color: #04080F`, `border: 1px solid #507DBC`.
- [ ] Hover: `box-shadow: 0 0 12px #507DBC`.
- [ ] Section container: glassmorphic card (`backdrop-filter: blur(16px)`, `bg: rgba(255,255,255,0.25)`).
- [ ] GSAP ScrollTrigger stagger: tags animate in with `stagger: 0.04`.
- [ ] GLM 5.2 extracts bio and validates skills list from `resume.tex`.

---

## SPEC-5 — Experience & Education Timelines

> **Agent:** Gemini 3.1 Pro (UI) + GLM 5.2 (data)  
> **Phase:** 5  
> **Status:** Blocked (needs `resume.tex`)

### What to Build
Two vertical scroll-revealed timelines — Work Experience and Education — each with animated connecting lines and glassmorphic entry cards.

### User Stories
- As a visitor, I see timeline entries reveal one by one as I scroll down.
- As a visitor, each entry shows: date range, role or degree, company or institution, short description.
- As a visitor, the timeline connecting line draws progressively as I scroll.
- As a visitor, entries deconstruct when I scroll back up.
- As a visitor, Phosphor icons distinguish role types (briefcase for work, graduation cap for education).

### Acceptance Criteria
- [ ] Experience data from `data/resume.ts → experience[]`.
- [ ] Education data from `data/resume.ts → education[]`.
- [ ] Timeline line: SVG with `stroke-dashoffset` animated by ScrollTrigger progress.
- [ ] Each entry: GSAP `fromTo` with `x: -40, opacity: 0` → `x: 0, opacity: 1`, staggered.
- [ ] Glassmorphic card per entry: `backdrop-filter: blur(12px)`, `bg: rgba(255,255,255,0.2)`.
- [ ] Phosphor `<Briefcase />` for work, `<GraduationCap />` for education.
- [ ] Reverse animation on `onEnterBack` (scroll up).

---

## SPEC-6 — Projects Section

> **Agent:** Gemini 3.1 Pro (UI) + Claude Opus 8 (data layer)  
> **Phase:** 6  
> **Status:** Pending

### What to Build
A filterable grid of all GitHub projects as glassmorphic cards. All 12 public repos are included. Private repos are shown with a lock badge.

### Projects Registry

| # | Name | Language | Category | Visibility |
|---|---|---|---|---|
| 1 | [vMigrate](https://github.com/Bechir-afk/vMigrate) | Python | AI/ML + DevOps | Private |
| 2 | [AI-Genius](https://github.com/Bechir-afk/AI-Genius) | TypeScript | AI/ML + Full-Stack | Private |
| 3 | [IEEE-Awards-Tracker](https://github.com/Bechir-afk/IEEE-Awards-Tracker) | TypeScript | Full-Stack | Private |
| 4 | [Templatr--Prints-Generator](https://github.com/Bechir-afk/Templatr--Prints-Generator) | Python | Tools | Public |
| 5 | [Sentinel-AI-Slop-Triage-Engine](https://github.com/Bechir-afk/Sentinel-AI-Slop-Triage-Engine) | Go | AI/ML + Tools | Public |
| 6 | [PFA-Attandees-System](https://github.com/Bechir-afk/PFA-Attandees-System) | HTML | IoT | Public |
| 7 | [Intelligent_Street_Lighting](https://github.com/Bechir-afk/Intelligent_Street_Lighting) | HTML | IoT | Public |
| 8 | [BookHaven](https://github.com/Bechir-afk/BookHaven) | HTML | Full-Stack | Public |
| 9 | [PhishGuard](https://github.com/Bechir-afk/PhishGuard) | HTML | Tools | Public |
| 10 | [Youtube-Downloader](https://github.com/Bechir-afk/Youtube-Downloader) | TypeScript | Full-Stack | Private |
| 11 | [CLI-grade-calculator](https://github.com/Bechir-afk/CLI-grade-calculator) | C | Tools | Private |
| 12 | [IOT-workshop-scouts](https://github.com/Bechir-afk/IOT-workshop-scouts) | HTML | IoT | Private |

### User Stories
- As a visitor, I see all 12 projects in a responsive card grid.
- As a visitor, I can filter by category: All, IoT, AI/ML, Full-Stack, Tools.
- As a visitor, each card shows: name, description, language badge, category tag, GitHub link.
- As a visitor, private repos show a Phosphor `<Lock />` badge and no external link.
- As a visitor, cards animate in staggered on scroll.

### Acceptance Criteria
- [ ] Project data from `data/resume.ts → projects[]`.
- [ ] Filter tabs: liquid glass style, Phosphor icons per category.
- [ ] Language badge colors match GitHub language color map.
- [ ] Public repos: Phosphor `<GithubLogo />` button links to repo URL.
- [ ] Private repos: Phosphor `<Lock />` badge, no clickable link.
- [ ] GSAP stagger ScrollTrigger: `stagger: 0.08` on card grid.
- [ ] Filter transition: Framer Motion `<AnimatePresence>` on card list.

### Technical Plan

```
components/Projects.tsx
  - useState: activeFilter ('All' | 'IoT' | 'AI/ML' | 'Full-Stack' | 'Tools')
  - filteredProjects = projects.filter(p => activeFilter === 'All' || p.category === activeFilter)
  - <AnimatePresence mode="popLayout"> on card list
  - Each card: Framer Motion layout animation
  - GSAP ScrollTrigger on section entry

data/resume.ts → projects[]
  - Claude Opus 8 builds this array from GitHub repo data
  - Fields: name, description, language, languageColor, category, url, isPrivate
```

---

## SPEC-7 — Certificates Section

> **Agent:** Gemini 3.1 Pro  
> **Phase:** 7  
> **Status:** Pending  
> **Blocked by:** `doc/certifs/` files upload

### What to Build
Two rows of infinitely auto-scrolling certificate frames. Row 1 scrolls right, Row 2 scrolls left. Hovering pauses the row. Clicking opens a modal.

### User Stories
- As a visitor, I see two rows of certificate cards continuously scrolling in opposite directions.
- As a visitor, hovering over any card in a row pauses that entire row.
- As a visitor, moving the cursor off the row resumes scrolling.
- As a visitor, clicking a certificate card opens a full modal with the certificate image or PDF.
- As a visitor, the modal closes by clicking outside it or clicking the close button.
- As a visitor, certificate cards have a glassmorphic liquid glass appearance.

### Certificate Slots
- **Row 1 (right):** 6–7 frames (cert-01 — cert-06/07)
- **Row 2 (left):** 6–7 frames (cert-07/08 — cert-13)
- **Total:** 12–13 frames
- Files: drop in `doc/certifs/`, move to `public/certs/`
- Naming convention: `cert-01.png`, `cert-02.pdf`, etc.

### Acceptance Criteria
- [ ] Row 1: `animation: scrollRight 30s linear infinite`.
- [ ] Row 2: `animation: scrollLeft 30s linear infinite`.
- [ ] Row `onMouseEnter`: `animationPlayState: 'paused'` on the row container.
- [ ] Row `onMouseLeave`: `animationPlayState: 'running'`.
- [ ] Individual card hover: `transform: scale(1.03)`, `box-shadow: 0 0 20px #507DBC`.
- [ ] Click → `setSelectedCert(cert)` → Framer Motion `<AnimatePresence>` modal.
- [ ] Modal: centered overlay, `backdrop-filter: blur(20px)`, Phosphor `<X />` close button.
- [ ] PDF certs: rendered via `<iframe src="..." />` inside modal.
- [ ] Image certs: rendered via Next.js `<Image />` inside modal.
- [ ] Clicking backdrop outside modal closes it.
- [ ] Frames show placeholder card ("Certificate Coming Soon") until files are uploaded.

### Technical Plan

```
components/Certificates.tsx
  - certRow1 = certs.slice(0, 7)
  - certRow2 = certs.slice(7)
  - <div className="row row-right" style={{ animationPlayState: isPaused1 ? 'paused' : 'running' }}>
  - <div className="row row-left"  style={{ animationPlayState: isPaused2 ? 'paused' : 'running' }}>
  - onMouseEnter/Leave on row div toggles isPaused state

components/CertModal.tsx
  - <AnimatePresence>
  - <motion.div> backdrop: fixed inset-0, blur, dark overlay
  - <motion.div> card: centered, spring transition
  - Detects .pdf extension → <iframe>, else → <Image>
  - Phosphor <X /> button top-right of modal

globals.css
  @keyframes scrollRight { from { transform: translateX(0) } to { transform: translateX(-50%) } }
  @keyframes scrollLeft  { from { transform: translateX(-50%) } to { transform: translateX(0) } }
```

---

## SPEC-8 — Contact Section & i18n System

> **Agent:** Gemini 3.1 Pro (UI) + GLM 5.2 (i18n + data)  
> **Phase:** 8  
> **Status:** Pending  
> **Blocked by:** `resume.tex` (for contact links)

### What to Build
A contact form with liquid glass inputs, social links with Phosphor icons, and a full EN/FR internationalization system powered by `next-intl`.

### User Stories
- As a visitor, I see a contact form with Name, Email, and Message fields.
- As a visitor, I see social/professional links with Phosphor icons below the form.
- As a visitor, I can switch the entire site between English and French with one click.
- As a visitor, the language toggle button is always visible regardless of scroll position.
- As a French-speaking visitor, all UI labels, section titles, and placeholder text appear in French.

### Acceptance Criteria
- [ ] Contact info (email, social URLs) from `data/resume.ts → contact`.
- [ ] Form inputs: liquid glass style, `border: 1px solid rgba(80, 125, 188, 0.4)`, `backdrop-filter: blur(8px)`.
- [ ] Focus state: `box-shadow: 0 0 0 2px #507DBC`.
- [ ] Social icons: Phosphor icons matched to platform (GitHub, LinkedIn, email, etc.).
- [ ] All visible text strings wrapped in `t('key')` from `next-intl`.
- [ ] `locales/en.json` and `locales/fr.json` cover all UI strings (section titles, labels, buttons, placeholders).
- [ ] TranslateToggle (defined in SPEC-2): switches locale without page reload.
- [ ] GLM 5.2 generates both locale JSON files from master string list.

### Technical Plan

```
locales/en.json
  { "hero": { "title": "Computer Engineering Student" }, "nav": { ... }, ... }

locales/fr.json
  { "hero": { "title": "Etudiant en G\u00e9nie Informatique" }, "nav": { ... }, ... }

app/layout.tsx
  - NextIntlClientProvider wraps all children
  - Locale from cookie or URL param

components/Contact.tsx
  - useTranslations('contact')
  - <input placeholder={t('namePlaceholder')} />
  - Social links mapped from data/resume.ts → contact.socials[]
  - Each social: { platform, url, phosphorIcon }
```
