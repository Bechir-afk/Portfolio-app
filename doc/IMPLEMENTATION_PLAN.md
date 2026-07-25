# Portfolio App — Implementation Plan

> **Author:** Bechir Ben Rabia  
> **Repo:** [Bechir-afk/Portfolio-app](https://github.com/Bechir-afk/Portfolio-app)  
> **Deploy Target:** Vercel  
> **Last Updated:** July 25, 2026

---

## Quote

> "In theory, theory and practice are the same. In practice, they're not."

---

## Color Palette

| Name | Hex | Usage |
|---|---|---|
| Rich Black | `#04080F` | Text, components, buttons |
| Steel Blue | `#507DBC` | Accents, glows, neon hover |
| Baby Blue Eyes | `#A1C6EA` | Secondary elements |
| Pale Cerulean | `#BBD1EA` | Card borders, glass tint |
| Gainsboro | `#DAE3E5` | Background base (light, unified) |

Source: [https://coolors.co/palette/04080f-507dbc-a1c6ea-bbd1ea-dae3e5](https://coolors.co/palette/04080f-507dbc-a1c6ea-bbd1ea-dae3e5)

---

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 14 (App Router) | SSR + performance, existing expertise |
| Styling | Tailwind CSS + custom CSS | Utility-first + custom animations |
| Animations | GSAP + ScrollTrigger | Scroll-driven 3D build/deconstruct effects |
| 3D / Parallax | CSS 3D transforms + canvas | Background mouse interactivity |
| Icons | Phosphor Icons (`@phosphor-icons/react`) | As specified |
| Fonts | Geist Sans (headings) + JetBrains Mono (terminal) | Complementary pair |
| i18n | next-intl | EN/FR language toggle |
| Cert Modal | Framer Motion | Smooth popup for certificate viewer |
| Deploy | Vercel | Zero-config Next.js deployment |

---

## Page Architecture (Single Scroll)

```
/ (index)
├── Hero             → Free-floating photo, name, title, glowing effect
├── Quote            → Terminal font quote (left), photo (right), coded bg elements
├── About            → Glassmorphic card, skills tags
├── Experience       → Scroll-reveal timeline
├── Projects         → Liquid glass cards (featured: vMigrate + others)
├── Certificates     → 2-row infinite scroll (row 1: →, row 2: ←), hover-pause
├── Education        → Timeline variant
└── Contact          → Liquid glass form + social links (Phosphor icons)
```

---

## Folder Structure

```
Portfolio-app/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Hero.tsx
│   ├── Quote.tsx
│   ├── About.tsx
│   ├── Experience.tsx
│   ├── Projects.tsx
│   ├── Certificates.tsx
│   ├── Education.tsx
│   ├── Contact.tsx
│   ├── Background.tsx          ← interactive canvas, mouse-reactive symbols
│   ├── TranslateToggle.tsx     ← EN/FR toggle button
│   └── CertModal.tsx           ← popup viewer for clicked certificate
├── locales/
│   ├── en.json
│   └── fr.json
├── public/
│   ├── photo.png               ← your photo (add here)
│   └── certs/                  ← certificate images/PDFs (add here)
├── data/
│   └── resume.ts               ← CV content (populated from your resume.tex)
└── doc/
    ├── IMPLEMENTATION_PLAN.md  ← this file
    ├── photo.png               ← drop your photo here
    └── resume.tex              ← drop your LaTeX resume here
```

---

## Key Design Rules

- **Background:** Single unified light gradient (`#DAE3E5` → `#BBD1EA`) — no section splits, no dark background
- **Components & fonts:** Dark colors (`#04080F`, `#507DBC`)
- **Photo:** Free-floating, no frame, no clip-path, no circle/square — raw `<img>` with `drop-shadow` glow
- **Scrollbar:** Hidden via CSS (`scrollbar-width: none` + `::-webkit-scrollbar { display: none }`)
- **Buttons:** Liquid glass style (`backdrop-filter: blur`, `rgba` fill, neon `box-shadow` on hover)
- **Icons:** Phosphor Icons only
- **Emojis:** Never used anywhere
- **Translations:** Single button (Phosphor `Translate` icon), fixed top-right corner

---

## Background System

- Single `#DAE3E5` → `#BBD1EA` radial gradient canvas
- Floating coding symbols: `;`, `{`, `}`, `=>`, `//`, `&&`, `||` — dark colored, organically scattered
- Background language/library references (VS Code RGB colors, not transparent): `Python`, `TypeScript`, `numpy`, `stdlib`, `Arduino`, `LoRa`, `Docker`, `mathbot`, `STM32`
- All background elements are mouse-reactive via `mousemove` + `requestAnimationFrame`
- GSAP parallax on scroll

---

## Certificates Section

- **Total frames:** 12–13 (split across 2 rows)
- **Row 1:** ~6–7 frames, scrolls continuously to the **right**
- **Row 2:** ~6–7 frames, scrolls continuously to the **left**
- **Hover:** frame stops moving (`animation-play-state: paused`)
- **Click:** opens Framer Motion modal with certificate image/PDF viewer
- Frames are glassmorphic cards (liquid glass style)

---

## Featured Projects

| # | Project | Notes |
|---|---|---|
| 1 | vMigrate | VM migration to OpenShift/Kubernetes |
| 2–4 | TBD | To be confirmed by Bechir |

---

## Build Phases

| Phase | Scope | Status |
|---|---|---|
| 1 | Project setup: Next.js + Tailwind + GSAP + Phosphor + fonts | Pending |
| 2 | Interactive background canvas (unified, mouse-reactive, symbols) | Pending |
| 3 | Hero section (free-floating photo, glow, name, title) | Pending |
| 4 | Quote section (terminal font, coded bg elements) | Pending |
| 5 | About + Experience + Projects sections | Pending |
| 6 | Certificates dual-scroll rows (12–13 frames) | Pending |
| 7 | Education + Contact sections | Pending |
| 8 | EN/FR translation system | Pending |
| 9 | Polish: liquid glass buttons, perf audit, Vercel deploy config | Pending |

---

## Assets Needed (Drop in `/doc`)

- [ ] `photo.png` — your photo (transparent background preferred for free-float effect)
- [ ] `resume.tex` — your LaTeX CV for content extraction
- [ ] Certificate images/PDFs (12–13 files) — to be added to `public/certs/`

---

## Pending Decisions

- [ ] Which other projects to feature beyond vMigrate?
- [ ] Resume content (will be extracted from `resume.tex` once uploaded)
- [ ] Any additional sections or preferences?
