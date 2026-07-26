/**
 * Resume data extracted from doc/resume.tex.
 * All user-facing display text uses locale keys — no hardcoded strings.
 * Populated in Phase 4 — SPEC-004 §3.
 */

export interface RotatingTitle {
  key: 'student' | 'freelance' | 'gamer';
  color: string;
}

export interface Skill {
  category: string; // locale key suffix, e.g. 'languages' -> 'skills.categories.languages'
  items: string[];
}

export interface Experience {
  role: string;
  company: string;
  start: string;
  end: string;
  technologies: string[];
  descKey: string; // full locale key, e.g. 'experience.nextStepIT.description'
}

export interface Leadership {
  role: string;
  org: string;
  start: string;
  end: string;
  descKey: string;
}

export interface Education {
  degree: string;
  institution: string;
  date: string;
  coursework?: string[];
  descKey: string;
}

export interface Award {
  title: string;
  event: string;
  year: string;
}

export interface SocialLink {
  platform: 'github' | 'linkedin' | 'facebook';
  url: string;
}

export interface Contact {
  email: string;
  phone: string;
  socials: SocialLink[];
}

export interface Resume {
  profile: {
    name: string;
    location: string;
    summaryKey: string;
    rotatingTitles: RotatingTitle[];
  };
  skills: Skill[];
  experience: Experience[];
  leadership: Leadership[];
  education: Education[];
  awards: Award[];
  contact: Contact;
  spokenLanguages: string[];
}

export const resume: Resume = {
  profile: {
    name: 'Bechir Ben Rabia',
    location: 'Tunis, Tunisia',
    summaryKey: 'about.summary',
    rotatingTitles: [
      { key: 'student',   color: '#507DBC' },
      { key: 'freelance', color: '#04080F' },
      { key: 'gamer',     color: '#A1C6EA' },
    ],
  },

  // ── Skills ──────────────────────────────────────────────────────────────────
  // Source: resume.tex \section{Skills}
  // Note: TypeScript, Go, C# appear in GitHub repos but are NOT in resume.tex.
  // Do not add them here without explicit user confirmation (Phase 9 review).
  skills: [
    {
      category: 'languages',
      items: ['Python', 'JavaScript', 'PHP', 'C/C++', 'SQL', 'HTML/CSS'],
    },
    {
      category: 'ai',
      items: [
        'Multi-Agent Workflows',
        'Task Delegation',
        'Custom Agent Skills/Rules',
        'XGBoost',
        'Deep Learning',
      ],
    },
    {
      category: 'embedded',
      items: ['ESP32', 'Arduino', 'Sensor Integration', 'Embedded Architecture', 'MQTT'],
    },
    {
      category: 'frontend',
      items: ['React', 'Vite', 'Tailwind CSS', 'TanStack'],
    },
    {
      category: 'backend',
      items: [
        'Flask',
        'Django',
        'FastAPI',
        'AWS',
        'Linux',
        'Kubernetes',
        'Docker',
        'Firebase',
        'PostgreSQL',
      ],
    },
    {
      category: 'security',
      items: ['Nmap', 'Vulnerability Scanning', 'Routing'],
    },
  ],

  // ── Experience ──────────────────────────────────────────────────────────────
  // Source: resume.tex \section{Experience}
  experience: [
    {
      role: 'Graduation Project Intern',
      company: 'NEXT STEP IT',
      start: 'Feb 2026',
      end: 'May 2026',
      descKey: 'experience.nextStepIT.description',
      technologies: [
        'Python',
        'XGBoost',
        'SHAP',
        'React',
        'FastAPI',
        'OpenShift',
        'KubeVirt',
        'Docker',
        'PostgreSQL',
      ],
    },
    {
      role: 'Freelance Developer',
      company: 'Upwork',
      start: 'March 2025',
      end: 'Present',
      descKey: 'experience.upwork.description',
      technologies: ['React', 'Vite', 'TanStack', 'Tailwind CSS', 'Flask', 'Django', 'PHP'],
    },
    {
      role: 'Summer Intern',
      company: 'TriWeb (Charguia 2)',
      start: 'June 2024',
      end: 'July 2024',
      descKey: 'experience.triWeb.description',
      technologies: [],
    },
  ],

  // ── Leadership ──────────────────────────────────────────────────────────────
  // Source: resume.tex \section{Leadership}
  leadership: [
    {
      role: 'Chairperson',
      org: 'IEEE MTTS Chapter — ESPRIT Student Branch',
      start: 'Feb 2024',
      end: 'Jan 2025',
      descKey: 'leadership.ieee.description',
    },
    {
      role: 'Marketing Manager & Active Member',
      org: 'GDSC FSS & GDSC FST',
      start: '2023',
      end: 'Present',
      descKey: 'leadership.gdsc.description',
    },
    {
      role: 'Community Volunteer',
      org: 'Alert International, JCI, Youth Club, Spark Engineer ENIS',
      start: 'Various',
      end: '',
      descKey: 'leadership.volunteer.description',
    },
  ],

  // ── Education ───────────────────────────────────────────────────────────────
  // Source: resume.tex \section{Education}
  education: [
    {
      degree: "Bachelor's in Computer Engineering, IoT and Embedded Systems",
      institution: 'Faculty of Sciences of Tunis',
      date: 'June 2026',
      coursework: ['Embedded Systems', 'Networking', 'Cloud Computing', 'Machine Learning'],
      descKey: 'education.fst.description',
    },
    {
      degree: 'Baccalaureate in Information Technology',
      institution: 'Lycee Hay Amal Fouchena, Tunis',
      date: '2022',
      descKey: 'education.lycee.description',
    },
  ],

  // ── Awards ──────────────────────────────────────────────────────────────────
  // Entry 1: resume.tex \section{Awards}
  // Entry 2: IMPLEMENTATION_PLAN.md (confirmed — not yet in resume.tex)
  awards: [
    {
      title: 'Winner of the Poster Challenge',
      event: 'Tech Day Conference',
      year: '2024',
    },
    {
      title: '2nd Place',
      event: 'Game Jam Tunis 2026',
      year: '2026',
    },
  ],

  // ── Contact ─────────────────────────────────────────────────────────────────
  // Source: resume.tex header
  contact: {
    email: 'bachirbenrabia56@gmail.com',
    phone: '+216 21 277 855',
    socials: [
      { platform: 'github',   url: 'https://github.com/Bechir-afk' },
      { platform: 'linkedin', url: 'https://linkedin.com/in/bechir-ben-rabie' },
      { platform: 'facebook', url: 'https://www.facebook.com/bechir.benrabii.7/' },
    ],
  },

  // ── Spoken Languages ────────────────────────────────────────────────────────
  // Values are locale keys consumed by SpokenLanguages.tsx
  // Source: resume.tex \section{Languages}
  spokenLanguages: ['arabic', 'french', 'english'],
};
