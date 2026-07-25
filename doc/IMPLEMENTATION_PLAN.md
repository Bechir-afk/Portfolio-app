# Portfolio App -- Implementation Plan

## Goal

Build a single-page, production-ready portfolio website for Bechir Ben Rabia, deployed on Vercel. The site showcases professional identity, skills, experience, education, leadership, awards, all GitHub projects (public and private), certificates, and contact links in English and French. The visual identity is a continuous light background with liquid-glass UI, coding-themed interactive background, and scroll-driven animations.

This document is the source of truth for architecture, ownership, implementation order, and delivery constraints. It was revised against `doc/CONSTITUTION.md`, `doc/resume.tex`, and the actual GitHub profile.

---

## Blocking Items

> [!IMPORTANT]
> **Private repositories.** User confirmed private repos exist. The plan has a placeholder section. User must provide: repo name, display title, URL, category, technologies, and a short description for each before Phase 6.

> [!IMPORTANT]
> **vMigrate and Math Genius.** Both confirmed as project cards AND experience entries. User must provide the repository URLs (even if private) before Phase 6.

---

## Revision Log (vs. Original ChatGPT Draft)

| Issue | Original Draft | Correction |
|---|---|---|
| Rotating title colors | Freelance=#04080F, Gamer=#A1C6EA | Confirmed by user. Constitution updated to match. |
| Skills list | Invented skills (Ruby, Express, Node.js, Supabase, Vercel AI SDK, STM32) | Source from resume + validate against GitHub repos. Confirmed additions: Go (Sentinel repo), C# (IEEE-BadgeWriter repo). Removed unverified skills. |
| Leadership section | Omitted entirely | Added -- merged into timeline system. |
| Awards | Omitted | Added -- 2 awards: Poster Challenge (Tech Day 2024), Game Jam Tunis 2026 (2nd place). |
| Project list | 12 banner names, several invented | 8 verified public repos + vMigrate + Math Genius + private repos TBD. |
| `ai-genius-banner` naming | Wrong name | Resume says "Math Genius", not "AI Genius". |
| Certificate localization | Titles/issuers as plain strings | User wants EN/FR translations for certificate titles and issuers. |
| Phone number | Not mentioned | Include with `tel:` link (opens phone app on mobile). |
| Contact links | GitHub, LinkedIn, email only | Add Facebook. Exclude Instagram (user did not select it). |
| Three.js reference | Mentioned as something to avoid | Removed -- not in stack, should not be referenced. |
| Background "noise texture" layer | Suggested optional noise/grid | Removed -- not in constitution, scope creep. |
| Font | "Geist Sans or comparable" | Confirmed: Geist Sans. |
| IEEE-BadgeWriter | Not mentioned | Include as a project (fork with contribution). |
| Mobile responsiveness | Mentioned but not emphasized | User explicitly requested "fully responsive to mobile". Elevated priority. |
| vMigrate | Listed as open question | Confirmed: show as project card AND as internship experience. |
| Math Genius | Listed as open question | Confirmed: show as project card AND as freelance experience mention. |

---

## Data Architecture

### `data/resume.ts`

Extracted from `doc/resume.tex`:

```ts
export const resume = {
  profile: {
    name: "Bechir Ben Rabia",
    location: "Tunis, Tunisia",
    summary: "Computer Engineering student focused on AI workflows, embedded systems, cloud infrastructure, and full-stack web development...",
    rotatingTitles: [
      { key: "student",   color: "#507DBC" }, // label from locale
      { key: "freelance", color: "#04080F" },
      { key: "gamer",     color: "#A1C6EA" },
    ],
  },

  skills: [
    { category: "languages",    items: ["Python", "JavaScript", "TypeScript", "Go", "C/C++", "C#", "PHP", "SQL", "HTML/CSS"] },
    { category: "ai",           items: ["Multi-Agent Workflows", "Task Delegation", "Custom Agent Skills/Rules", "XGBoost", "SHAP", "Deep Learning"] },
    { category: "embedded",     items: ["ESP32", "Arduino", "Sensor Integration", "Embedded Architecture", "MQTT"] },
    { category: "frontend",     items: ["React", "Vite", "Tailwind CSS", "TanStack"] },
    { category: "backend",      items: ["Flask", "Django", "FastAPI", "Firebase", "PostgreSQL", "SQLite"] },
    { category: "cloud",        items: ["AWS", "Docker", "Kubernetes", "OpenShift", "Linux"] },
    { category: "security",     items: ["Nmap", "Vulnerability Scanning", "Routing"] },
  ],

  experience: [
    {
      role: "Graduation Project Intern",
      company: "NEXT STEP IT",
      start: "Feb 2026",
      end: "May 2026",
      // description from locale files
      technologies: ["Python", "XGBoost", "SHAP", "React", "FastAPI", "OpenShift", "KubeVirt", "Docker", "PostgreSQL"],
    },
    {
      role: "Freelance Developer",
      company: "Upwork",
      start: "March 2025",
      end: "Present",
      technologies: ["React", "Vite", "TanStack", "Tailwind CSS", "Flask", "Django", "PHP"],
    },
    {
      role: "Summer Intern",
      company: "TriWeb (Charguia 2)",
      start: "June 2024",
      end: "July 2024",
      technologies: [],
    },
  ],

  leadership: [
    {
      role: "Chairperson",
      org: "IEEE MTTS Chapter-ESPRIT Student Branch",
      start: "Feb 2024",
      end: "Jan 2025",
    },
    {
      role: "Marketing Manager & Active Member",
      org: "GDSC FSS & GDSC FST",
      start: "2023",
      end: "Present",
    },
    {
      role: "Community Volunteer",
      org: "Alert International, JCI, Youth Club, Spark Engineer ENIS",
      start: "Various",
      end: "",
    },
  ],

  education: [
    {
      degree: "Bachelor's in Computer Engineering, IoT and Embedded Systems",
      institution: "Faculty of Sciences of Tunis",
      date: "June 2026",
      coursework: ["Embedded Systems", "Networking", "Cloud Computing", "Machine Learning"],
    },
    {
      degree: "Baccalaureate in Information Technology",
      institution: "Lycee Hay Amal Fouchena, Tunis",
      date: "2022",
    },
  ],

  awards: [
    { title: "Winner of the Poster Challenge", event: "Tech Day Conference", year: "2024" },
    { title: "2nd Place", event: "Game Jam Tunis 2026", year: "2026" },
  ],

  contact: {
    email: "bachirbenrabia56@gmail.com",
    phone: "+216 21 277 855",
    socials: [
      { platform: "github",   url: "https://github.com/Bechir-afk" },
      { platform: "linkedin", url: "https://linkedin.com/in/bechir-ben-rabie" },
      { platform: "facebook", url: "https://www.facebook.com/bechir.benrabii.7/" },
    ],
  },

  spokenLanguages: ["Arabic (native)", "French (fluent)", "English"],
};
```

All user-facing text (descriptions, labels) lives in locale files, not in this data structure. The data file holds only structured metadata and keys.

---

### `data/projects.ts`

**Verified public repositories (8):**

| # | Repo Name | Display Title | Lang | Category | URL |
|---|---|---|---|---|---|
| 1 | Portfolio-app | Portfolio App | TS | Full-Stack | https://github.com/Bechir-afk/Portfolio-app |
| 2 | Sentinel-AI-Slop-Triage-Engine | Sentinel AI | Go | DevOps/Cloud | https://github.com/Bechir-afk/Sentinel-AI-Slop-Triage-Engine |
| 3 | Templatr--Prints-Generator | Templatr | Python | Tools | https://github.com/Bechir-afk/Templatr--Prints-Generator |
| 4 | BookHaven | BookHaven | HTML/CSS/JS | Full-Stack | https://github.com/Bechir-afk/BookHaven |
| 5 | PhishGuard | PhishGuard | HTML | Tools | https://github.com/Bechir-afk/PhishGuard |
| 6 | PFA-Attandees-System | PFA Attendees | ESP32/C++ | IoT | https://github.com/Bechir-afk/PFA-Attandees-System |
| 7 | Intelligent_Street_Lighting | Smart Street Lighting | ESP32/MQTT | IoT | https://github.com/Bechir-afk/Intelligent_Street_Lighting |
| 8 | IEEE-BadgeWriter | IEEE Badge Writer | C#/.NET | Tools | https://github.com/Bechir-afk/IEEE-BadgeWriter |

**Resume-mentioned projects (confirmed as project cards):**

| # | Display Title | Category | Status |
|---|---|---|---|
| 9 | vMigrate | AI/ML, DevOps/Cloud | URL pending from user (also shown as internship experience) |
| 10 | Math Genius | Full-Stack | URL pending from user (also mentioned in freelance experience) |

**Private repositories:** TBD -- user will provide list before Phase 6.

```ts
export type ProjectCategory = "IoT" | "AI/ML" | "Full-Stack" | "Tools" | "DevOps/Cloud";

export interface Project {
  id: string;
  title: string;
  repositoryUrl: string;
  visibility: "public" | "private";
  category: ProjectCategory[];
  technologies: string[];
  banner: string; // path in public/projects/
  descriptionKey: string; // locale key for EN/FR descriptions
  featured?: boolean;
}
```

**Banner naming convention:**

```
public/projects/
  portfolio-app.webp
  sentinel-ai.webp
  templatr.webp
  bookhaven.webp
  phishguard.webp
  pfa-attendees.webp
  smart-street-lighting.webp
  ieee-badge-writer.webp
  vmigrate.webp
  math-genius.webp
  [private-repos-tbd].webp
```

---

### `data/certificates.ts`

11 certificates from resume. User may add more when uploading files.

```ts
export interface Certificate {
  id: string;
  titleKey: string;    // locale key -- user wants EN/FR
  issuerKey: string;   // locale key -- user wants EN/FR
  issueDate: string;
  asset: string;       // path in public/certs/
  format: "image" | "pdf";
  credentialUrl?: string;
}
```

---

## Application Structure

```
Portfolio-app/
  app/
    [locale]/
      layout.tsx
      page.tsx
    globals.css
    providers.tsx

  components/
    layout/
      PageShell.tsx          # global wrapper, scrollbar hiding
      Section.tsx            # reusable scroll-animated section
      LanguageToggle.tsx     # fixed EN/FR toggle

    background/
      InteractiveBackground.tsx
      CodeSymbols.tsx
      TechKeywords.tsx

    hero/
      Hero.tsx
      RotatingTitle.tsx
      FloatingPortrait.tsx

    quote/
      Quote.tsx
      CodeVisual.tsx         # right-side coding-themed visual

    about/
      About.tsx
      SkillTags.tsx

    timeline/
      Timeline.tsx           # shared component for exp/edu/leadership
      TimelineItem.tsx

    projects/
      Projects.tsx
      ProjectFilters.tsx
      ProjectGrid.tsx
      ProjectCard.tsx

    certificates/
      Certificates.tsx
      CertificateRow.tsx
      CertificateCard.tsx
      CertificateModal.tsx

    contact/
      ContactLinks.tsx

  data/
    resume.ts
    projects.ts
    certificates.ts

  locales/
    en.json
    fr.json

  lib/
    constants.ts            # palette, breakpoints
    animation.ts            # GSAP/ScrollTrigger helpers, reduced-motion
    utils.ts

  public/
    photo.png
    projects/
    certs/

  doc/
    CONSTITUTION.md
    IMPLEMENTATION_PLAN.md
    SPECS.md
    photo.png
    resume.tex
    certifs/
```

---

## Technology Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js + App Router | TypeScript strict mode |
| Styling | Tailwind CSS + custom CSS | Custom CSS for liquid-glass, scrollbar hiding, gradients, background layers |
| Animation | GSAP + ScrollTrigger | Scroll-driven section reveals, parallax, timeline drawing |
| Transitions | Framer Motion | Modal open/close, filter layout changes, card state |
| Icons | `@phosphor-icons/react` | Exclusive -- no other icon lib |
| i18n | `next-intl` | EN default, FR first-class |
| Fonts | Geist Sans (headings/UI), JetBrains Mono (code/quote) | |
| Deploy | Vercel | |

The background uses DOM layers with CSS transforms and `requestAnimationFrame` for pointer tracking. Canvas only if DOM performance proves insufficient.

---

## Design System

### Palette

| Token | Hex | Usage |
|---|---|---|
| `--bg-primary` | `#DAE3E5` | Page background base |
| `--bg-secondary` | `#BBD1EA` | Gradient partner |
| `--accent` | `#507DBC` | Primary interactive color |
| `--accent-light` | `#A1C6EA` | Secondary accents, soft glow |
| `--text-dark` | `#04080F` | Text, dark UI elements |

### Liquid Glass Recipe

```css
.glass {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(187, 209, 234, 0.3);
  box-shadow: 0 4px 16px rgba(4, 8, 15, 0.08);
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
}
.glass:hover,
.glass:focus-visible {
  border-color: rgba(80, 125, 188, 0.5);
  box-shadow: 0 4px 24px rgba(80, 125, 188, 0.15);
}
```

Applied to: buttons, filter tabs, skill tags, timeline cards, certificate cards, certificate modal, contact links, language toggle.

---

## Section Details

### Hero

- Free-floating `photo.png` with `drop-shadow(0 0 20px rgba(80,125,188,0.5))`.
- Rotating title: infinite loop, 3 titles, each with its confirmed color. Fixed height container to prevent layout shift.
- Fixed language toggle (top-right) with Phosphor `Translate` icon.
- GSAP entrance animation on load, deconstruction on scroll-out.

### Quote

- Left: quote text in JetBrains Mono.
- Right: coding-themed visual (NOT the hero photo). Options: floating code blocks, abstract terminal panel, or animated node graph -- all in light palette.
- Scattered programming references in background (non-interactive).

### About and Skills

- Biography from resume summary.
- Skills in categorized liquid-glass tags.
- Categories: Languages, AI & Agents, Embedded/IoT, Frontend, Backend & Cloud, Security & Networking.
- Spoken languages: Arabic (native), French (fluent), English -- displayed as a small detail.

### Experience, Education, Leadership

- Single `Timeline` component, used three times with different data and icons:
  - Experience: Phosphor `Briefcase`
  - Education: Phosphor `GraduationCap`
  - Leadership: Phosphor `UsersThree`
- vMigrate appears both as a project card and in the experience timeline (internship at NEXT STEP IT).
- Math Genius appears both as a project card and is mentioned in the freelance experience.
- Progressive line draw on scroll via SVG `stroke-dashoffset`.
- Reverse on scroll-up.
- Mobile: single-column.

### Awards

- Small mention section near education or as a callout.
- Two awards:
  1. Winner of the Poster Challenge -- Tech Day Conference (2024)
  2. 2nd Place -- Game Jam Tunis 2026

### Projects

- Banner-first cards, liquid-glass info overlay.
- Clickable to repo URL. Private repos show Phosphor `Lock` icon.
- Filters: All, IoT, AI/ML, Full-Stack, Tools, DevOps/Cloud.
- Framer Motion `AnimatePresence` for filter transitions.
- GSAP staggered scroll reveal.
- vMigrate and Math Genius included as project cards (URLs pending from user).

### Certificates

- Two CSS-animated marquee rows (Row 1 right, Row 2 left).
- `animation-play-state: paused` on row hover.
- Click opens Framer Motion modal with liquid-glass surface.
- Modal: image display or PDF `<iframe>`. Focus trap, Escape close, backdrop close, Phosphor `X` button.
- Placeholder cards for missing assets.

### Contact

- Liquid-glass link buttons with Phosphor icons:
  - GitHub: `GithubLogo`
  - LinkedIn: `LinkedinLogo`
  - Email: `EnvelopeSimple` (mailto: link)
  - Phone: `Phone` (tel: link -- opens dialer on mobile)
  - Facebook: `FacebookLogo`
- No contact form.

---

## Internationalization

- `next-intl` with `[locale]` route segment.
- Default: `en`. Supported: `fr`.
- All user-facing text in locale files, including:
  - Section headings, labels, navigation
  - Hero text, rotating titles
  - Quote text
  - About content, skill category names
  - Experience/education/leadership descriptions
  - Project descriptions
  - Certificate titles and issuer names (user confirmed)
  - Contact labels, modal labels, accessibility labels
  - Filter labels, empty states
- Language switch preserves scroll position (no full reload).

---

## Interactive Background

**Layers (4):**
1. Base gradient (`--bg-primary` to `--bg-secondary`)
2. Large coding symbols (`;`, `{`, `}`, `=>`, `//`, `&&`, `||`)
3. Technical keywords (Python, TypeScript, Docker, Arduino, STM32, LoRa, numpy, stdlib, mathbot, React, Kubernetes, PostgreSQL)
4. Small decorative code elements

**Behavior:**
- DOM-based (no Canvas unless perf-required).
- `pointer-events: none` on all layers.
- Organic scatter, unique rotation/size per item.
- Mouse: subtle parallax via `requestAnimationFrame` + refs (no React state).
- Scroll: GSAP ScrollTrigger parallax at different speeds per depth.
- `prefers-reduced-motion`: disable parallax, show static positions.

---

## Accessibility

- Semantic HTML5 landmarks and heading hierarchy.
- Keyboard-navigable: all interactive elements, filters, modal.
- Focus states: visible `outline` or `box-shadow` on all focusable elements.
- Modal: focus trap, Escape close, restore focus to trigger.
- `alt` text: portrait, all project banners, certificate images.
- Contrast: validated over glass surfaces (may need higher opacity fallback).
- Touch targets: minimum 44x44 CSS pixels on mobile.
- `prefers-reduced-motion`: all animations respect it.
- No information conveyed by color alone.

---

## Mobile-First Responsiveness

- Breakpoints: mobile (< 640px), tablet (640-1024px), desktop (> 1024px).
- Hero: stack photo above name/title on mobile.
- Timeline: single-column on mobile and tablet.
- Projects: 1-column mobile, 2-column tablet, 3-column desktop.
- Certificate rows: narrower, smaller cards on mobile.
- Background: reduce item count on mobile for performance.
- Phone link: opens native dialer via `tel:` URI.

---

## Implementation Phases

### Phase 0 -- Foundation (Claude Opus 8)

- `npx create-next-app` with TypeScript, Tailwind, App Router.
- Install: `gsap`, `@gsap/react`, `framer-motion`, `@phosphor-icons/react`, `next-intl`.
- Configure: Geist Sans font, JetBrains Mono font, strict TS, ESLint.
- Create folder structure, CSS variables, palette tokens.
- Vercel project config.
- Verify: `npm run dev` works, production build passes, locale routing works.

### Phase 1 -- Global Shell and Background (Gemini 3.1 Pro)

- `PageShell` with hidden scrollbar CSS.
- Continuous gradient background.
- `InteractiveBackground` with symbol/keyword layers.
- Mouse parallax + scroll parallax.
- Reduced-motion fallback.
- Verify: background renders, doesn't block clicks, parallax works.

### Phase 2 -- Hero and Language Toggle (Gemini 3.1 Pro)

- `Hero`, `FloatingPortrait` (glow via drop-shadow), `RotatingTitle`.
- Fixed `LanguageToggle` (top-right).
- GSAP entrance/exit animations.
- Verify: no image frame, smooth title rotation, no layout shift, toggle switches locale.

### Phase 3 -- Quote (Gemini 3.1 Pro)

- Quote layout (left text, right visual).
- JetBrains Mono for quote.
- Right-side coding visual (not the hero photo).
- ScrollTrigger reveal.
- Verify: visual is distinct from hero, matches light palette.

### Phase 4 -- Resume Data Extraction (GLM 5.2)

- Parse `doc/resume.tex` into `data/resume.ts`.
- Structure: profile, skills, experience, leadership, education, awards, contact.
- Create initial `locales/en.json` and `locales/fr.json`.
- Verify: typed, complete, no hardcoded content in components.

### Phase 5 -- About, Skills, Timelines, Awards (Gemini 3.1 Pro + GLM 5.2)

- `About` with biography from data.
- `SkillTags` with categorized liquid-glass tags.
- `Timeline` component used for Experience, Education, Leadership.
- Awards mention.
- Scroll animations, mobile layout.
- Verify: renders from data, works in EN and FR, responsive.

### Phase 6 -- Projects (All agents)

- Finalize `data/projects.ts` (after user provides private repo list + vMigrate/Math Genius URLs).
- Generate/collect banner assets per project.
- `ProjectFilters`, `ProjectGrid`, `ProjectCard`.
- Private repo lock indicator.
- Animated filtering with Framer Motion.
- Verify: all projects visible, all cards clickable, filters work, banners load.

### Phase 7 -- Certificates (Gemini 3.1 Pro + GLM 5.2)

- `data/certificates.ts` with 11+ entries.
- Process assets from `doc/certifs/` to `public/certs/`.
- Dual-row marquee with pause-on-hover.
- `CertificateModal` with image/PDF support.
- Focus trap and keyboard behavior.
- Placeholder cards for missing assets.
- Verify: rows scroll, pause on hover, modal opens/closes accessibly.

### Phase 8 -- Contact and Full i18n (Gemini 3.1 Pro + GLM 5.2)

- `ContactLinks` with GitHub, LinkedIn, email (`mailto:`), phone (`tel:`), Facebook.
- Complete both locale files.
- Verify every section updates on locale change.
- Verify: phone link opens dialer on mobile.

### Phase 9 -- Integration and Convergence (All agents)

- Compare implementation to constitution, plan, and specs.
- Check data/visual/animation consistency.
- Remove dead code and unused dependencies.
- Update docs if decisions changed.
- Verify: coherent, maintainable, matches all requirements.

### Phase 10 -- QA and Deployment (Claude Opus 8)

- Lint, TypeScript, production build.
- Test: responsive breakpoints, keyboard nav, reduced-motion, EN/FR, project links, certificate modal.
- Lighthouse audit (target 90+ all categories).
- Optimize: images, bundle size.
- Deploy to Vercel.

---

## Verification Plan

### Automated Tests

```bash
npm run lint          # ESLint passes
npx tsc --noEmit      # TypeScript strict passes
npm run build         # Production build succeeds
```

### Manual Verification

- [ ] Continuous light background, no per-section colors
- [ ] Scrollbar hidden, scroll works (mouse, touch, keyboard)
- [ ] Hero photo free-floating, no frame, blue glow
- [ ] Rotating title loops, no layout shift, correct colors
- [ ] Quote uses different right-side visual from hero
- [ ] All projects visible with custom banners (including vMigrate and Math Genius)
- [ ] Private repos show lock icon, cards still clickable
- [ ] Certificate rows scroll opposite directions, pause on hover
- [ ] Certificate modal opens image/PDF, closes on Escape/backdrop
- [ ] Contact phone link opens dialer on mobile
- [ ] EN/FR toggle works without page reload, preserves scroll
- [ ] All text translated in FR (no English leaks)
- [ ] Keyboard navigation reaches all interactive elements
- [ ] Reduced-motion mode works
- [ ] Mobile layout (portrait phone), tablet, desktop all functional
- [ ] Lighthouse 90+ on all four categories

---

## Required Assets (Before Final Delivery)

| Asset | Status |
|---|---|
| `doc/photo.png` | Done |
| `doc/resume.tex` | Done |
| `doc/certifs/*` | Pending -- user will upload |
| Private repo list with details | Pending -- user will provide |
| vMigrate repo URL | Pending -- user will provide |
| Math Genius repo URL | Pending -- user will provide |
| Custom banners for each project | Generated during Phase 6 |

---

## Definition of Done

The project is complete only when **all** of the following are true:

1. Single-page portfolio with one continuous light background
2. Hidden scrollbar, accessible scroll
3. Free-floating hero photo with blue glow
4. Rotating title loops through 3 identities with correct colors
5. Quote section with distinct right-side coding visual
6. All projects (public + private) shown with custom banner cards, including vMigrate and Math Genius
7. Every project card links to its GitHub URL
8. Two-direction certificate carousel with pause-on-hover
9. Certificate image/PDF modal with full accessibility
10. Contact links only (no form), phone opens dialer on mobile
11. Complete EN/FR translation, no English leaks in FR mode
12. Mobile-first responsive design validated at 3 breakpoints
13. Keyboard navigation and reduced-motion support verified
14. Production build, lint, and TypeScript pass
15. Lighthouse 90+ on Performance, Accessibility, Best Practices, SEO
16. Convergence review confirms compliance with constitution, specs, and this plan
17. Deployed to Vercel
