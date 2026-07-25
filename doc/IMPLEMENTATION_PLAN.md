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
- Styling: Tailwind CSS v3 + custom CSS for animations.
- Animations: GSAP + ScrollTrigger for scroll/parallax, Framer Motion for modals only.
- i18n: Included from day one via `next-intl` (EN/FR).

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
│   ├── photo.png                   ← transparent PNG (confirmed ready)
│   ├── resume.pdf                  ← downloadable CV
│   └── certs/                      ← certificate images (11 files)
├── doc/
│   ├── IMPLEMENTATION_PLAN.md      ← this file
│   └── SPECS.md                    ← all 8 feature specs
└── .specify/                       ← spec-kit config (initialize locally)
```

---

## Resume Content (Extracted from resume.tex)

### Contact

| Field | Value |
|---|---|
| Name | Bechir Ben Rabie |
| Title | Computer Engineering Student |
| Email | bachirbenrabia56@gmail.com |
| Phone | +216 21 277 855 |
| Location | Tunis, Tunisia |
| LinkedIn | [linkedin.com/in/bechir-ben-rabie](https://linkedin.com/in/bechir-ben-rabie) |
| GitHub | [github.com/Bechir-afk](https://github.com/Bechir-afk) |

### Summary

Computer Engineering student focused on AI workflows, embedded systems, cloud infrastructure, and full-stack web development. I enjoy taking on messy infrastructure problems and writing clean, straightforward code—whether that means orchestrating multi-agent AI systems, designing ESP32 sensor networks, or building an AI-powered OpenShift migration tool.

### Professional Experience

**Graduation Project Intern — NEXT STEP IT** (Feb 2026 – May 2026)
- Built vMigrate, an AI tool that automates virtual machine migrations to Red Hat OpenShift using KubeVirt.
- Wrote an XGBoost model to check if a VM is ready to migrate (98.3% accuracy) and predict how long it will take (92.6% accuracy).
- Added SHAP so that when the AI makes a migration decision, the engineering team can actually see why.
- Created a dashboard to monitor active migrations in real time, manage VM lifecycles, and handle automated rollbacks if things fail.
- **Tech:** Python, XGBoost, SHAP, React, FastAPI, OpenShift, KubeVirt, Docker, PostgreSQL

**Freelance Developer — Upwork** (March 2025 – Present)
- Built and shipped full-stack web apps for freelance clients, including custom platforms like Math Genius and BookHeaven.
- Wrote fast, responsive frontends from scratch using React, Vite, TanStack, and Tailwind CSS.
- Set up the backends and APIs using Python (Flask, Django) and PHP.

**Summer Intern — TriWeb (Charguia 2)** (June 2024 – July 2024)
- Set up a secure network infrastructure for an office of 80 workers.
- Hardened servers and applied standard cybersecurity practices.
- Reconfigured routing to speed up data flow and prevent bottlenecks.

### Skills

| Category | Skills |
|---|---|
| Languages | Python, JavaScript, PHP, C/C++, SQL, HTML/CSS |
| AI & Agents | Multi-Agent Workflows, Task Delegation, Custom Agent Skills/Rules, XGBoost, Deep Learning |
| Embedded & IoT | ESP32, Arduino, Sensor Integration, Embedded Architecture, MQTT |
| Frontend | React, Vite, Tailwind CSS, TanStack |
| Backend & Cloud | Flask, Django, FastAPI, AWS, Linux, Kubernetes, Docker, Firebase, PostgreSQL |
| Security & Networking | Nmap, Vulnerability Scanning, Routing |

### Education

| Degree | Institution | Year |
|---|---|---|
| Bachelor's in Computer Engineering, IoT and Embedded Systems | Faculty of Sciences of Tunis | June 2026 |
| Baccalaureate in Information Technology | Lycée Hay Amal Fouchena, Tunis | 2022 |

### Leadership & Volunteering

- **Chairperson**, IEEE MTTS Chapter-ESPRIT Student Branch (Feb 2024 – Jan 2025)
  - WIE Wave event (120 attendees), Tech Day Conference at SUP'COM (156 attendees), RadioLink conference (92 attendees), cybersecurity workshop (33 attendees)
- **Marketing Manager & Active Member**, GDSC FSS & GDSC FST (2023 – Present)
- **Community Volunteer**, Alert International, JCI, Youth Club, Spark Engineer ENIS

### Certifications (11 total)

1. Fundamentals of Deep Learning — NVIDIA (2025)
2. Vulnerability Scanning with Nmap — Coursera (2025)
3. Encryption and Decryption using C++ — Coursera (2025)
4. Networking Basics — Cisco (2025)
5. Introduction to Cybersecurity — Cisco (2025)
6. Introduction to IoT — Cisco (2025)
7. Creating Routing Policies with AWS Route53 — Coursera (2025)
8. Create a Virtual Private Cloud Using AWS — Coursera (2025)
9. Getting Started with Linux Terminal — Coursera (2025)
10. Python Scripting for DevOps — Coursera (2025)
11. Learn CSS — Google Developer Program (2025)

### Awards

- Winner of the Poster Challenge at the Tech Day Conference (2024)

---

## Featured Projects (from GitHub API + resume.tex)

Projects pulled dynamically from `https://api.github.com/users/Bechir-afk/repos` at build time (Next.js ISR). Featured repos pinned to top.

| # | Project | Repo | Description |
|---|---|---|---|
| 1 | vMigrate | (private / NEXT STEP IT) | AI-powered VM migration to OpenShift/Kubernetes |
| 2 | Sentinel AI Slop Triage Engine | Bechir-afk/Sentinel-AI-Slop-Triage-Engine | Go webhook to triage GitHub PRs via Gemini AI |
| 3 | Templatr Prints Generator | Bechir-afk/Print-Generator | Python desktop app for batch certificate generation |
| 4 | Intelligent Street Lighting | Bechir-afk/Intelligent_Street_Lighting | ESP32 + MQTT smart city IoT system |
| 5 | PFA Attendees System | Bechir-afk/PFA-Attandees-System | RFID attendance tracker with ESP32 + Firebase |

---

## Build Phases & Agent Assignment

| Phase | Scope | Agent | Status |
|---|---|---|---|
| 0 | Repo setup: Next.js 14, Tailwind v3, GSAP, Framer Motion, Phosphor, fonts, next-intl | Claude Opus 8 | Pending |
| 1 | SPEC-1: Global shell + interactive background | Gemini 3.1 Pro | Pending |
| 2 | SPEC-2: Hero section (+ download CV button) | Gemini 3.1 Pro | Pending |
| 3 | SPEC-3: Quote section | Gemini 3.1 Pro | Pending |
| 4 | SPEC-4: About & Skills | Gemini 3.1 Pro + GLM 5.2 | Pending (resume.tex extracted) |
| 5 | SPEC-5: Experience & Education timelines | Gemini 3.1 Pro + GLM 5.2 | Pending (resume.tex extracted) |
| 6 | SPEC-6: Projects section (GitHub API) | Gemini 3.1 Pro + Claude Opus 8 | Pending |
| 7 | SPEC-7: Certificates dual-scroll rows (11 frames) | Gemini 3.1 Pro | Pending |
| 8 | SPEC-8: Contact + i18n (EN/FR from day one) | Gemini 3.1 Pro + GLM 5.2 | Pending |
| 9 | Converge pass: cross-agent consistency check | All agents | Pending |
| 10 | Polish: perf audit, Vercel deploy config, Lighthouse ≥ 90 | Claude Opus 8 | Pending |

---

## Asset Checklist

### Drop in `public/`
- [x] `photo.png` — transparent PNG (confirmed ready)
- [ ] `resume.pdf` — compiled CV for download button
- [ ] `certs/cert-01.png` … `cert-11.png` — certificate images (confirmed ready, pending drop)

### Already Resolved
- [x] `resume.tex` content — fully extracted (see Resume Content section)
- [x] Contact links — extracted from resume.tex
- [x] Certificate names — extracted from resume.tex (11 certifications)

---

## Resolved Decisions

| Decision | Resolution |
|---|---|
| Projects source | GitHub API (dynamic) + 5 featured repos pinned |
| Resume content | Extracted from `resume.tex` — see above |
| Styling | Tailwind CSS v3 confirmed |
| Animations | GSAP for scroll/parallax, Framer Motion for modals |
| i18n | Included from day one (EN/FR) |
| Photo | Transparent PNG ready |
| Download CV | Button in Hero section, links to `/resume.pdf` |
| Certificates count | 11 (matching certifications list) |
| Additional features | Download CV button (added to Hero) |

---

## Pending Decisions

- [ ] Upload `public/photo.png`
- [ ] Upload `public/resume.pdf`
- [ ] Upload `public/certs/` files (11 certs)

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
