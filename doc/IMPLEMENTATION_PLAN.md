# Portfolio App — Spec-Kit Implementation Plan

> **Author:** Bechir Ben Rabia  
> **Role:** Computer Engineering Student + Freelance Developer  
> **Repo:** [Bechir-afk/Portfolio-app](https://github.com/Bechir-afk/Portfolio-app)  
> **Deploy Target:** Vercel  
> **IDE:** Antigravity  
> **Last Updated:** July 25, 2026  
> **Methodology:** [Spec-Driven Development — github/spec-kit](https://github.com/github/spec-kit)

---

## Spec-Kit Workflow Map

This plan follows the full spec-kit SDD pipeline:

```
/speckit.constitution  →  Project principles & guardrails
/speckit.specify       →  SPEC-1 through SPEC-8 (one per section/feature)
/speckit.clarify       →  Ambiguity resolution per spec
/speckit.plan          →  Technical implementation plan per spec
/speckit.analyze       →  Cross-spec consistency check
/speckit.tasks         →  Task list per spec
/speckit.implement     →  Execution (agent-assigned)
/speckit.converge      →  Gap check after implementation
```

---

## AI Agent Responsibility Matrix

| Agent | Responsibility |
|---|---|
| **Gemini 3.1 Pro** | All frontend UI components, animations, layout, visual design |
| **Claude Opus 8** | Backend logic, API routes, data layer, Next.js server actions |
| **GLM 5.2** | Utility functions, i18n (EN/FR), data processing, `resume.ts` extraction |

---

## CONSTITUTION — Project Governing Principles

> _Equivalent to `/speckit.constitution`_

### Design Principles
- Single unified light background (`#DAE3E5` → `#BBD1EA`). No section color splits. No dark backgrounds.
- All components and fonts use dark colors (`#04080F`, `#507DBC`).
- No emojis anywhere in the codebase or UI.
- No visible scrollbar (`scrollbar-width: none` + `::-webkit-scrollbar { display: none }`).
- Photo is free-floating — no frame, no clip-path, no circle/square crop.
- Buttons use Liquid Glass style exclusively.
- Icons use Phosphor Icons (`@phosphor-icons/react`) exclusively.
- All animations must enhance UX, never distract from content.
- The site must be fully responsive (mobile, tablet, desktop).
- Performance: Lighthouse score target ≥ 90 on all metrics.

### Development Principles
- Each spec is independent and implemented by its assigned agent.
- No agent modifies another agent's output without a explicit converge pass.
- All content comes from `data/resume.ts` — no hardcoded strings in components.
- All translations live in `locales/en.json` and `locales/fr.json`.
- All certificate assets live in `public/certs/`.

### Color Palette (Enforced Globally)

| Token | Hex | Usage |
|---|---|---|
| `--color-bg-primary` | `#DAE3E5` | Background base |
| `--color-bg-secondary` | `#BBD1EA` | Background gradient end |
| `--color-accent` | `#507DBC` | Accents, glows, neon hover |
| `--color-accent-light` | `#A1C6EA` | Secondary elements |
| `--color-text` | `#04080F` | All text, components |

Source: [coolors.co palette](https://coolors.co/palette/04080f-507dbc-a1c6ea-bbd1ea-dae3e5)

---

## SPEC-1 — Global Shell & Background System

> _Agent: **Gemini 3.1 Pro**_  
> _`/speckit.specify` → `/speckit.plan` → `/speckit.tasks`_

### What to Build
A single-page scrollable shell with a globally unified interactive background that persists across all sections.

### User Stories
- As a visitor, I see one continuous light background from top to bottom with no color breaks between sections.
- As a visitor, moving my mouse causes background elements to shift subtly (parallax effect).
- As a visitor, I never see a scrollbar.
- As a visitor, I see floating coding symbols (`;`, `{`, `}`, `=>`, `//`, `&&`, `||`) and tech keyword references (`Python`, `TypeScript`, `numpy`, `Arduino`, `LoRa`, `Docker`, `STM32`, `mathbot`, `stdlib`) organically scattered in the background.
- As a visitor, background elements are dark-colored (not transparent, not faded).
- As a visitor scrolling, the background elements move at a different speed than content (parallax).

### Acceptance Criteria
- [ ] Background is a single CSS radial gradient: `#DAE3E5` → `#BBD1EA`, covers 100% of viewport at all times.
- [ ] 6–8 tech keyword references rendered in VS Code RGB color tokens, randomly rotated (-15deg to +15deg), non-grid layout.
- [ ] Floating symbols implemented via `<canvas>` or absolutely positioned DOM elements with `mousemove` + `requestAnimationFrame` interactivity.
- [ ] Scrollbar hidden on all browsers (Webkit + Firefox).
- [ ] No section has its own background color.
- [ ] Background canvas does not interfere with click events on components (pointer-events: none).

### Technical Plan
```
components/Background.tsx
  - Canvas element, full-screen, position: fixed, z-index: 0, pointer-events: none
  - mousemove listener → translate symbols by (dx * 0.03, dy * 0.03)
  - scroll listener → GSAP parallax on symbol layers
  - Symbols array: [';', '{', '}', '=>', '//', '&&', '||', '/*', '*/']
  - Keywords array with VS Code color map
app/globals.css
  - ::-webkit-scrollbar { display: none }
  - scrollbar-width: none
  - html background: linear-gradient(135deg, #DAE3E5, #BBD1EA)
```

---

## SPEC-2 — Hero Section

> _Agent: **Gemini 3.1 Pro**_  
> _`/speckit.specify` → `/speckit.plan` → `/speckit.tasks`_

### What to Build
The first full-viewport section — the landing view of the portfolio.

### User Stories
- As a visitor, I see Bechir's photo centered and free-floating (no frame, no border).
- As a visitor, I see a glowing light effect radiating from the edges of the photo.
- As a visitor, I see his name in a large, high-contrast display font.
- As a visitor, I see his title: "Computer Engineering Student · Freelance Developer".
- As a visitor, I see a fixed translate button (EN/FR) in the top-right corner.
- As a visitor scrolling past the hero, the section smoothly deconstructs and disappears.

### Acceptance Criteria
- [ ] Photo is a raw `<img>` or `<Image>` with no clip-path, no border-radius.
- [ ] Glow effect uses CSS `filter: drop-shadow` with `#507DBC` color.
- [ ] Name uses Geist Sans font, weight 700+.
- [ ] Title uses Geist Sans font, weight 400, smaller size.
- [ ] Translate button uses Phosphor `Translate` icon, liquid glass style, fixed position top-right.
- [ ] GSAP ScrollTrigger: hero elements animate IN on load, animate OUT (fade + translate) on scroll-down.
- [ ] Photo source: `public/photo.png` (to be uploaded by Bechir).

### Technical Plan
```
components/Hero.tsx
  - GSAP fromTo on mount: opacity 0 → 1, y: 40 → 0
  - ScrollTrigger onLeave: opacity 1 → 0, y: 0 → -40
  - <Image src="/photo.png" style={{ filter: 'drop-shadow(0 0 32px #507DBC)' }} />
  - Name from data/resume.ts → hero.name
  - Title from data/resume.ts → hero.title
components/TranslateToggle.tsx
  - Fixed, top-right
  - Phosphor <Translate /> icon
  - onClick toggles locale context (EN ↔ FR)
  - Liquid glass styling
```

---

## SPEC-3 — Quote Section

> _Agent: **Gemini 3.1 Pro**_  
> _`/speckit.specify` → `/speckit.plan` → `/speckit.tasks`_

### What to Build
A full-viewport section displaying a developer quote with a rich coded background.

### User Stories
- As a visitor, I see a quote on the left side in a terminal/monospace font.
- As a visitor, I see Bechir's photo on the right side.
- As a visitor, I see a background rich with programming references (language names, library names) randomly rotated and scattered.
- As a visitor, background elements in this section are non-transparent and visually legible.
- As a visitor scrolling, the section animates in and out.

### Quote Content
> "In theory, theory and practice are the same. In practice, they're not."

### Acceptance Criteria
- [ ] Quote text uses JetBrains Mono font.
- [ ] Background programming elements (6–8): `Python`, `TypeScript`, `numpy`, `stdlib`, `Arduino`, `LoRa`, `Docker`, `mathbot` — rendered in VS Code RGB palette, not transparent.
- [ ] Elements are organically placed (not grid-aligned), each with a unique random rotation.
- [ ] Photo on right, quote on left (flex layout).
- [ ] GSAP ScrollTrigger: animates in from bottom on scroll-down, deconstructs on scroll-up.
- [ ] Background shares the same global gradient — no separate background color.

### Technical Plan
```
components/Quote.tsx
  - Flex row: quote (left, 55%) + photo (right, 45%)
  - Quote text: font-family JetBrains Mono
  - Background elements: absolutely positioned <span> tags, CSS transform: rotate(Xdeg)
  - VS Code color map: Python=#3572A5, TypeScript=#3178C6, numpy=#013243, Arduino=#00979D, Docker=#0db7ed
  - GSAP ScrollTrigger scrub animation
```

---

## SPEC-4 — About & Skills Section

> _Agent: **Gemini 3.1 Pro** (UI) + **GLM 5.2** (data extraction)_

### What to Build
A glassmorphic card presenting Bechir's bio and a tag cloud of skills extracted from his GitHub repos.

### User Stories
- As a visitor, I read a short bio about Bechir.
- As a visitor, I see his skills as interactive tags (hover effect).
- As a visitor, skills are grouped (Languages, Frameworks, IoT, Tools, Cloud).
- As a visitor, the section animates in on scroll.

### Skills (Extracted from GitHub Repos)

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
- [ ] Skills data from `data/resume.ts → about.skills`.
- [ ] Skills rendered as pill/tag components with liquid glass style.
- [ ] GSAP ScrollTrigger stagger animation on skill tags.
- [ ] Section uses glassmorphic card container.

---

## SPEC-5 — Experience & Education Timeline

> _Agent: **Gemini 3.1 Pro** (UI) + **GLM 5.2** (data from resume.tex)_

### What to Build
Two vertical timeline sections — one for work experience, one for education — scroll-revealed item by item.

### User Stories
- As a visitor, I see timeline entries appear one by one as I scroll.
- As a visitor, each entry shows: date range, role/degree, company/institution, short description.
- As a visitor, timeline items deconstruct when I scroll back up.
- As a visitor, the timeline has a visible animated connecting line drawn as I scroll.

### Acceptance Criteria
- [ ] Experience data from `data/resume.ts → experience[]`.
- [ ] Education data from `data/resume.ts → education[]`.
- [ ] GSAP ScrollTrigger: each item fades + slides in from the side, staggered.
- [ ] Timeline line draws progressively using SVG stroke-dashoffset animation.
- [ ] Glassmorphic card per timeline entry.
- [ ] Phosphor icons for role type (code, graduation cap, briefcase).

---

## SPEC-6 — Projects Section

> _Agent: **Gemini 3.1 Pro** (UI) + **Claude Opus 8** (GitHub API data fetching)_

### What to Build
A showcase of all public GitHub projects as glassmorphic cards with live GitHub data.

### Projects to Display (from GitHub — 18 total, public ones featured)

| # | Project | Language | Description |
|---|---|---|---|
| 1 | [vMigrate](https://github.com/Bechir-afk/vMigrate) | Python | AI-driven VM migration engine (XGBoost + SHAP, VMware → OpenShift) |
| 2 | [AI-Genius](https://github.com/Bechir-afk/AI-Genius) | TypeScript | AI-powered math education platform (React 19, Supabase, Vercel AI SDK) |
| 3 | [IEEE-Awards-Tracker](https://github.com/Bechir-afk/IEEE-Awards-Tracker) | TypeScript | IEEE awards tracking platform (TanStack, Drizzle ORM, Neon PostgreSQL) |
| 4 | [Templatr--Prints-Generator](https://github.com/Bechir-afk/Templatr--Prints-Generator) | Python | Desktop app for batch certificate/badge generation from CSV |
| 5 | [Sentinel-AI-Slop-Triage-Engine](https://github.com/Bechir-afk/Sentinel-AI-Slop-Triage-Engine) | Go | GitHub PR webhook microservice — Gemini 2.5 Flash AI triage |
| 6 | [PFA-Attandees-System](https://github.com/Bechir-afk/PFA-Attandees-System) | HTML | RFID attendance tracker (ESP32 + Firebase + web dashboard) |
| 7 | [Intelligent_Street_Lighting](https://github.com/Bechir-afk/Intelligent_Street_Lighting) | HTML | Smart city IoT — ESP32 MQTT lamp network + Firebase + SQLite |
| 8 | [BookHaven](https://github.com/Bechir-afk/BookHaven) | HTML | Static multi-page online bookstore (Vanilla HTML/CSS/JS) |
| 9 | [PhishGuard](https://github.com/Bechir-afk/PhishGuard) | HTML | Cybersecurity awareness website with interactive quiz |
| 10 | [Youtube-Downloader](https://github.com/Bechir-afk/Youtube-Downloader) | TypeScript | Full-stack media downloader (React + Node.js + yt-dlp + SSE) |
| 11 | [CLI-grade-calculator](https://github.com/Bechir-afk/CLI-grade-calculator) | C | CLI GPA calculator for FST Tunis CE curriculum (C + C#) |
| 12 | [IOT-workshop-scouts](https://github.com/Bechir-afk/IOT-workshop-scouts) | HTML | ESP32 RGB LED control panel for scouts IoT workshop |

### User Stories
- As a visitor, I see all projects displayed as cards.
- As a visitor, each card shows: project name, description, language badge, GitHub link button.
- As a visitor, I can filter projects by category (All, IoT, AI/ML, Full-Stack, Tools).
- As a visitor, liquid glass buttons link to GitHub repos.
- As a visitor, cards animate in staggered on scroll.

### Acceptance Criteria
- [ ] Project data from `data/resume.ts → projects[]`.
- [ ] Filter tabs with Phosphor icons, liquid glass style.
- [ ] Language badge color matches GitHub language color map.
- [ ] GitHub link button uses Phosphor `GithubLogo` icon.
- [ ] Private repos shown with a lock badge (Phosphor `Lock` icon), no external link.
- [ ] GSAP stagger ScrollTrigger on card grid.

---

## SPEC-7 — Certificates Section

> _Agent: **Gemini 3.1 Pro**_

### What to Build
Two rows of infinitely scrolling certificate frames — row 1 scrolls right, row 2 scrolls left. Hover pauses. Click opens a modal.

### User Stories
- As a visitor, I see two rows of certificate cards auto-scrolling.
- As a visitor, hovering over a card pauses that row's scrolling.
- As a visitor, clicking a card opens a centered modal with the certificate image/PDF.
- As a visitor, the modal closes via a close button or clicking outside.
- As a visitor, cards have a glassmorphic liquid glass appearance.

### Certificates Placeholder Slots
- **Row 1 (scrolls →):** 6–7 frames
- **Row 2 (scrolls ←):** 6–7 frames
- **Total:** 12–13 frames
- Certificate files to be placed in `doc/certifs/` then moved to `public/certs/`

### Acceptance Criteria
- [ ] Two `<div>` rows with CSS `animation: scroll-right` and `scroll-left` (infinite, linear).
- [ ] Row hover: `animation-play-state: paused` on the entire row when any card is hovered.
- [ ] Individual card hover: scale up slightly (transform: scale(1.03)), box-shadow glow.
- [ ] Click → Framer Motion `<AnimatePresence>` modal with image/PDF viewer.
- [ ] Modal close: click outside or Phosphor `X` button.
- [ ] Frames are empty placeholders until Bechir uploads cert files to `public/certs/`.
- [ ] Smooth transition: Framer Motion spring on modal open/close.

### Technical Plan
```
components/Certificates.tsx
  - Row 1: flex row, animation: scrollRight 30s linear infinite
  - Row 2: flex row, animation: scrollLeft 30s linear infinite
  - onMouseEnter row → setIsPaused(true) → style animationPlayState: 'paused'
  - onClick card → setSelectedCert(cert) → open modal
components/CertModal.tsx
  - Framer Motion AnimatePresence
  - If .pdf: <iframe> embed
  - If image: <Image> full display
  - Backdrop click closes modal
  - Phosphor X icon close button
```

---

## SPEC-8 — Contact Section & i18n Toggle

> _Agent: **Gemini 3.1 Pro** (UI) + **GLM 5.2** (i18n + data)_

### What to Build
A contact form and social links section, plus the full EN/FR translation system.

### User Stories
- As a visitor, I see a contact form with name, email, and message fields.
- As a visitor, I see social links (to be extracted from resume — GitHub + others).
- As a visitor, I can toggle the entire site language between English and French.
- As a visitor, the language toggle is always visible (fixed position).

### Acceptance Criteria
- [ ] Contact data (email, social links) from `data/resume.ts → contact`.
- [ ] Form fields styled with liquid glass inputs.
- [ ] Social link icons use Phosphor icons.
- [ ] All text content is i18n-aware via `next-intl`.
- [ ] `locales/en.json` and `locales/fr.json` contain all UI strings.
- [ ] TranslateToggle button: fixed top-right, Phosphor `Translate` icon, liquid glass.
- [ ] Locale switch triggers instant re-render with no page reload.

---

## Asset Checklist

### Drop in `doc/` folder
- [ ] `doc/photo.png` — your photo (transparent PNG preferred for free-float effect)
- [ ] `doc/resume.tex` — LaTeX CV (GLM 5.2 will extract all content from this)

### Drop in `doc/certifs/` folder
- [ ] 12–13 certificate files (PNG, JPG, or PDF)
- [ ] Name them sequentially: `cert-01.png`, `cert-02.pdf`, etc.

### After upload, move to:
- `public/photo.png`
- `public/certs/cert-01.png`, etc.

---

## Full Folder Structure

```
Portfolio-app/
├── app/
│   ├── layout.tsx                  ← root layout, fonts, global providers
│   ├── page.tsx                    ← single page, all sections composed
│   └── globals.css                 ← CSS variables, scrollbar hidden, bg gradient
├── components/
│   ├── Background.tsx              ← Gemini: canvas, mouse-reactive symbols
│   ├── Hero.tsx                    ← Gemini: free-floating photo, name, title
│   ├── Quote.tsx                   ← Gemini: terminal quote, coded bg
│   ├── About.tsx                   ← Gemini: glassmorphic bio + skills tags
│   ├── Experience.tsx              ← Gemini: scroll-reveal timeline
│   ├── Projects.tsx                ← Gemini: filtered project cards
│   ├── Certificates.tsx            ← Gemini: dual-row infinite scroll
│   ├── Education.tsx               ← Gemini: education timeline
│   ├── Contact.tsx                 ← Gemini: liquid glass form + socials
│   ├── TranslateToggle.tsx         ← Gemini: EN/FR fixed button
│   └── CertModal.tsx               ← Gemini: Framer Motion cert viewer
├── data/
│   └── resume.ts                   ← GLM 5.2: extracted from resume.tex
├── locales/
│   ├── en.json                     ← GLM 5.2
│   └── fr.json                     ← GLM 5.2
├── lib/
│   └── utils.ts                    ← GLM 5.2: shared utilities
├── public/
│   ├── photo.png                   ← drop here after upload
│   └── certs/                      ← drop cert files here
├── doc/
│   ├── IMPLEMENTATION_PLAN.md      ← this file
│   ├── photo.png                   ← upload here first
│   ├── resume.tex                  ← upload here first
│   └── certifs/                    ← upload cert files here first
└── .specify/                       ← spec-kit config (to be initialized)
```

---

## Build Phases & Agent Assignment

| Phase | Spec | Agent | Status |
|---|---|---|---|
| 0 | Repo setup: Next.js 14, Tailwind, GSAP, Phosphor, fonts, next-intl | Claude Opus 8 | Pending |
| 1 | SPEC-1: Global shell + background system | Gemini 3.1 Pro | Pending |
| 2 | SPEC-2: Hero section | Gemini 3.1 Pro | Pending |
| 3 | SPEC-3: Quote section | Gemini 3.1 Pro | Pending |
| 4 | SPEC-4: About & Skills (after resume.tex upload) | Gemini 3.1 Pro + GLM 5.2 | Blocked (needs resume.tex) |
| 5 | SPEC-5: Experience & Education timelines | Gemini 3.1 Pro + GLM 5.2 | Blocked (needs resume.tex) |
| 6 | SPEC-6: Projects section | Gemini 3.1 Pro + Claude Opus 8 | Pending |
| 7 | SPEC-7: Certificates dual-scroll | Gemini 3.1 Pro | Pending |
| 8 | SPEC-8: Contact + i18n | Gemini 3.1 Pro + GLM 5.2 | Pending |
| 9 | Converge pass: cross-agent consistency check | All agents | Pending |
| 10 | Polish: perf audit, Vercel deploy config, Lighthouse ≥ 90 | Claude Opus 8 | Pending |

---

## Spec-Kit CLI Commands (Run Locally)

Once you install spec-kit in the project root:

```bash
# Install spec-kit CLI
uv tool install specify-cli

# Initialize with your preferred agent integration
specify init Portfolio-app --integration claude  # or --integration gemini

# Run the constitution
/speckit.constitution

# Run each spec
/speckit.specify   # per SPEC-1 through SPEC-8
/speckit.clarify   # resolve ambiguities before planning
/speckit.plan      # generate technical plan per spec
/speckit.tasks     # break into tasks
/speckit.implement # execute with assigned agent
/speckit.converge  # gap check after all phases
```

---

## Pending (Unblocked After Asset Upload)

- [ ] Upload `doc/photo.png`
- [ ] Upload `doc/resume.tex`
- [ ] Upload `doc/certifs/cert-01` through `cert-13`
- [ ] Confirm remaining projects to show (all public GitHub repos confirmed above)
- [ ] Confirm contact links (will be extracted from resume.tex)
- [ ] Confirm certificate names (will be extracted from resume.tex)
