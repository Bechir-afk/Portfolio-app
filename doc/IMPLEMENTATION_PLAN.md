# Portfolio App — Implementation Plan

> **Author:** Bechir Ben Rabia  
> **Role:** Computer Engineering Student + Freelance Developer  
> **Repo:** [Bechir-afk/Portfolio-app](https://github.com/Bechir-afk/Portfolio-app)  
> **Deploy Target:** Vercel  
> **IDE:** Antigravity  
> **Last Updated:** July 25, 2026  
> **Methodology:** [Spec-Driven Development — github/spec-kit](https://github.com/github/spec-kit)  
> **Specs:** See [SPECS.md](./SPECS.md)

---

## Spec-Kit Workflow Map

```
/speckit.constitution  →  Project principles & guardrails
/speckit.specify       →  SPEC-1 through SPEC-8 (see SPECS.md)
/speckit.clarify       →  Ambiguity resolution per spec
/speckit.plan          →  Technical plan per spec
/speckit.analyze       →  Cross-spec consistency check
/speckit.tasks         →  Task list per spec
/speckit.implement     →  Execution by assigned agent
/speckit.converge      →  Gap check after implementation
```

---

## AI Agent Responsibility Matrix

| Agent | Responsibility |
|---|---|
| **Gemini 3.1 Pro** | All frontend UI components, animations, layout, visual design |
| **Claude Opus 8** | Backend logic, API routes, data layer, Next.js server actions, repo setup |
| **GLM 5.2** | Utility functions, i18n (EN/FR), data processing, `resume.ts` extraction |

---

## CONSTITUTION — Project Governing Principles

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
- No agent modifies another agent's output without an explicit converge pass.
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

## Full Folder Structure

```
Portfolio-app/
├── app/
│   ├── layout.tsx                  ← Claude: root layout, fonts, global providers
│   ├── page.tsx                    ← Claude: single page, all sections composed
│   └── globals.css                 ← Claude: CSS variables, scrollbar hidden, bg
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
│   ├── photo.png                   ← upload here
│   └── certs/                      ← certificate files
├── doc/
│   ├── IMPLEMENTATION_PLAN.md      ← this file
│   ├── SPECS.md                    ← all 8 feature specs
│   ├── photo.png                   ← drop your photo here
│   ├── resume.tex                  ← drop your LaTeX CV here
│   └── certifs/                    ← drop certificate files here
└── .specify/                       ← spec-kit config (initialize locally)
```

---

## Build Phases & Agent Assignment

| Phase | Scope | Agent | Status |
|---|---|---|---|
| 0 | Repo setup: Next.js 14, Tailwind, GSAP, Phosphor, fonts, next-intl | Claude Opus 8 | Pending |
| 1 | SPEC-1: Global shell + interactive background | Gemini 3.1 Pro | Pending |
| 2 | SPEC-2: Hero section | Gemini 3.1 Pro | Pending |
| 3 | SPEC-3: Quote section | Gemini 3.1 Pro | Pending |
| 4 | SPEC-4: About & Skills | Gemini 3.1 Pro + GLM 5.2 | Blocked (needs resume.tex) |
| 5 | SPEC-5: Experience & Education timelines | Gemini 3.1 Pro + GLM 5.2 | Blocked (needs resume.tex) |
| 6 | SPEC-6: Projects section | Gemini 3.1 Pro + Claude Opus 8 | Pending |
| 7 | SPEC-7: Certificates dual-scroll rows | Gemini 3.1 Pro | Pending |
| 8 | SPEC-8: Contact + i18n | Gemini 3.1 Pro + GLM 5.2 | Pending |
| 9 | Converge pass: cross-agent consistency check | All agents | Pending |
| 10 | Polish: perf audit, Vercel deploy config, Lighthouse ≥ 90 | Claude Opus 8 | Pending |

---

## Asset Checklist

### Drop in `doc/`
- [ ] `doc/photo.png` — transparent PNG preferred
- [ ] `doc/resume.tex` — LaTeX CV (unlocks Phases 4, 5, 8)

### Drop in `doc/certifs/`
- [ ] 12–13 certificate files (PNG, JPG, or PDF)
- [ ] Name sequentially: `cert-01.png`, `cert-02.pdf`, etc.

### Then move to `public/`
- `public/photo.png`
- `public/certs/cert-01.png` … `cert-13.png`

---

## Spec-Kit CLI (Run Locally)

```bash
# Install
uv tool install specify-cli

# Init project
specify init Portfolio-app --integration claude

# Workflow commands
/speckit.constitution
/speckit.specify
/speckit.clarify
/speckit.plan
/speckit.tasks
/speckit.implement
/speckit.converge
```

---

## Pending Decisions

- [ ] Upload `doc/photo.png`
- [ ] Upload `doc/resume.tex`
- [ ] Upload `doc/certifs/` files (12–13 certs)
- [ ] Contact links — to be extracted from `resume.tex`
- [ ] Certificate names — to be extracted from `resume.tex`
