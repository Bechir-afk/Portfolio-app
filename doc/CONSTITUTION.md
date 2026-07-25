# Portfolio App -- Project Constitution

> Non-negotiable rules that govern every agent, every commit, and every review.
> Any change that conflicts with this document must amend the constitution first.

---

## Project Identity

- **Subject:** Bechir Ben Rabia -- Computer Engineering student (IoT and Embedded Systems, Faculty of Sciences of Tunis), freelance developer, gamer.
- **Deliverable:** A production-ready, single-page portfolio/CV website deployed on Vercel.
- **Method:** Spec-Driven Development. No implementation begins without an approved specification (`doc/SPECS.md`), implementation plan (`doc/IMPLEMENTATION_PLAN.md`), and task breakdown.

---

## I. Specification-First Governance

1. `doc/SPECS.md` is the source of truth for functional requirements.
2. `doc/IMPLEMENTATION_PLAN.md` is the source of truth for architecture, ownership, implementation order, and delivery constraints.
3. When a requirement is ambiguous, **stop and ask** -- never invent a product decision.
4. Every change that affects behavior, UX, data, or architecture must update the relevant spec and/or plan **before** implementation.
5. A convergence review against specs is mandatory before declaring the project complete.

---

## II. Architecture and Code Quality

| Rule | Detail |
|---|---|
| Framework | Next.js with TypeScript, App Router |
| Separation | Components, data, utilities, translations, and static assets in distinct directories |
| Data files | `data/resume.ts`, `data/projects.ts`, `data/certificates.ts` |
| Locale files | `locales/en.json`, `locales/fr.json` |
| No hardcoding | CV, project, certificate, and social-link content must never live inside UI components |
| Code style | Descriptive names, strict TypeScript, no dead code, no duplicated logic |
| Dependencies | Add a dependency only when the existing stack cannot achieve the same result cleanly |
| Components | Clear, small, reusable, typed |

---

## III. AI-Agent Responsibilities

| Agent | Owns |
|---|---|
| **Gemini 3.1 Pro** | Frontend UI, responsive layouts, visual styling, animations, interaction design |
| **Claude Opus 8** | Project setup, architecture, data modeling, integration, quality review, GitHub logic, performance, deployment |
| **GLM 5.2** | Resume extraction, metadata transformation, utility functions, EN/FR translation data |

- No agent may overwrite another agent's completed output without an explicit integration or convergence review.
- Every cross-agent change must preserve the design and functional requirements in the specifications.

---

## IV. Visual System

### Palette

| Token | Value | Usage |
|---|---|---|
| `--bg-primary` | `#DAE3E5` | Background primary |
| `--bg-secondary` | `#BBD1EA` | Background secondary / gradient partner |
| `--accent` | `#507DBC` | Interactive accents, glow, highlights |
| `--accent-light` | `#A1C6EA` | Secondary accents, hover states |
| `--text-dark` | `#04080F` | Body text, dark UI elements |

### Rules

- One continuous, unified, light gradient background from top to bottom. Never split into per-section backgrounds. Never use a dark page background.
- Dark text and dark UI components over the light background for readability.
- **Liquid-glass styling** on: buttons, filters, cards, link controls, any future inputs, and modal surfaces.
- **Phosphor Icons** exclusively -- no other icon library.
- **No emojis** in UI, source code, content, or documentation.
- **Typography:** A clean display font for headings; JetBrains Mono (or equivalent terminal font) for code/quote contexts.
- **Personal photo:** Free-floating, no circle/square crop, no card, border, clip-path, or frame. Subtle blue glow around natural edges.

---

## V. Interaction and Animation

### Scrollbar

- Hide the browser scrollbar while preserving normal, accessible vertical scrolling.

### Interactive Background

- Fixed layer behind all content, containing:
  - Coding symbols: `;` `{` `}` `=>` `//` `&&` `||`
  - Technical keywords: Python, TypeScript, Docker, Arduino, STM32, LoRa, numpy, stdlib, mathbot
- Items must be visibly colored, organically positioned, slightly rotated, and **not grid-based**.
- Items must **not** intercept clicks or block content.
- Mouse movement creates subtle background parallax.
- Scrolling creates layered parallax at different depths.

### Section Animation

- Sections build into view on downward scroll and reverse/deconstruct on upward scroll.
- Use **GSAP + ScrollTrigger** for scroll-controlled animation.
- Use **Framer Motion** for modal and layout transitions.

### Motion Accessibility

- All motion must respect `prefers-reduced-motion`; provide a reduced-motion fallback.
- Motion must improve hierarchy and feedback -- never obscure content, block access, or reduce readability.

---

## VI. Content and Portfolio Rules

### Hero

- Large name and professional introduction.
- Free-floating photo with blue glow (see IV).
- Fixed EN/FR language toggle in top-right corner.
- Scroll-triggered entrance and deconstruction animation.

### Rotating Title

- Infinite loop beneath the name, rotating between:
  1. **Computer Engineering Student** -- uses `--accent` (#507DBC)
  2. **Freelance Developer by Day** -- uses `--text-dark` (#04080F)
  3. **Gamer by Night** -- uses `--accent-light` (#A1C6EA)
- Smooth transitions, no layout shifts.

### Quote

- Left side: quote in terminal-style font.
  > "In theory, theory and practice are the same. In practice, they're not."
- Right side: a coding-inspired visual **different from the Hero photo** (abstract illustration, 3D composition, terminal scene, or interactive developer-themed visual).
- Non-transparent, scattered programming references in the background.

### About and Skills

- Biography, education, contact info, certificates, and experience extracted from `doc/resume.tex`.
- Skills validated against GitHub repos and resume.
- Displayed in categorized liquid-glass tags: Languages, Frameworks, Embedded/IoT, AI/ML, Databases, Cloud/DevOps, Tools.

### Experience and Education

- Animated vertical timelines.
- Each item: date, role/degree, company/institution, description.
- Timeline connectors draw progressively on scroll, reverse on scroll-up.

### Projects

- Show **all** GitHub projects, including private repositories.
- Every project uses a **custom local banner** stored in `public/projects/`.
- Each card: banner, title, technologies, category, optional localized description.
- Every card is clickable and routes to its GitHub repository URL (including private repo URLs).
- Filters: All, IoT, AI/ML, Full-Stack, Tools, DevOps/Cloud.
- Staggered scroll reveals and animated filtering.

### Contact

- Professional links only (GitHub, LinkedIn, email, plus any additional supplied links). **No contact form.**
- Liquid-glass link buttons with Phosphor icons.

---

## VII. Certificates

- Metadata in `data/certificates.ts`.
- Each record: title, issuer, issue date, asset path, asset format, optional credential URL.
- Two continuously scrolling rows:
  - Row 1 scrolls right.
  - Row 2 scrolls left.
- Hovering a card pauses its **entire** row.
- Clicking opens an accessible liquid-glass modal displaying the certificate image or PDF.
- Source files: `doc/certifs/` -> copied to `public/certs/` for runtime.

### Known Certificates (from resume)

| Title | Issuer | Year |
|---|---|---|
| Fundamentals of Deep Learning | NVIDIA | 2025 |
| Vulnerability Scanning with Nmap | Coursera | 2025 |
| Encryption and Decryption using C++ | Coursera | 2025 |
| Networking Basics | Cisco | 2025 |
| Introduction to Cybersecurity | Cisco | 2025 |
| Introduction to IoT | Cisco | 2025 |
| Creating Routing Policies with AWS Route53 | Coursera | 2025 |
| Create a Virtual Private Cloud Using AWS | Coursera | 2025 |
| Getting Started with Linux Terminal | Coursera | 2025 |
| Python Scripting for DevOps | Coursera | 2025 |
| Learn CSS | Google Developer Program | 2025 |

---

## VIII. Internationalization

- **Default language:** English.
- **French:** First-class, complete translation -- not partial.
- Translate all user-facing text: headings, labels, navigation, section content, project descriptions, certificate metadata, calls to action.
- Locale files (`locales/en.json`, `locales/fr.json`) must stay complete and synchronized.
- Fixed, always-available EN/FR toggle using a Phosphor translation icon.
- Language switch must not cause a full page reload or lose scroll position (where technically feasible).

---

## IX. Accessibility and Responsiveness

- Mobile-first design; validate mobile, tablet, and desktop.
- Semantic HTML, proper heading hierarchy, descriptive `alt` text, visible keyboard focus, accessible labels.
- All interactive elements reachable and usable by keyboard.
- Modals: trap focus, close on Escape, include accessible close control, restore focus to trigger element.
- Maintain accessible contrast ratios despite glass effects and animation.
- Hover must never be the only path to essential content or functionality.

---

## X. Performance and Release Quality

| Concern | Requirement |
|---|---|
| Images | Optimize via Next.js image handling where compatible with visual design |
| Animation | No expensive continuous animation, unnecessary re-renders, or unbounded listeners |
| Mouse parallax | Use `requestAnimationFrame` |
| Cleanup | Destroy GSAP contexts, ScrollTriggers, timers, listeners, and animation frames on unmount |
| Lighthouse | Target 90+ on Performance, Accessibility, Best Practices, and SEO |
| Pre-deploy checklist | Production build, lint, TypeScript, responsive, keyboard nav, reduced-motion, EN/FR coverage, certificate modal |
| Gate | Do not deploy until convergence pass confirms compliance with specs, plan, and this constitution |

---

## Asset and Data Structure

```
doc/
  CONSTITUTION.md        # This file
  IMPLEMENTATION_PLAN.md
  SPECS.md
  photo.png
  resume.tex
  certifs/               # Certificate source files

public/
  photo.png
  certs/                 # Runtime certificate assets
  projects/              # Custom project banners

data/
  resume.ts
  projects.ts
  certificates.ts

locales/
  en.json
  fr.json
```

---

## Delivery Sequence

1. Project init: dependencies, fonts, linting, Vercel config.
2. Global shell: hidden scrollbar, unified background, mouse parallax.
3. Hero and rotating-title system.
4. Quote section with coding-inspired right-side visual.
5. Resume extraction -> `data/resume.ts`.
6. About, Skills, Experience, Education.
7. Project banners and filterable Projects section.
8. Certificate metadata and dual-direction carousel/modal.
9. Contact links and complete EN/FR translations.
10. Accessibility, responsiveness, animation, performance, and cross-agent convergence review.
11. Deploy to Vercel.
