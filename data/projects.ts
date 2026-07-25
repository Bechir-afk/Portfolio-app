/**
 * Project data for all GitHub projects (public + private).
 * Banners stored in public/projects/[id].webp
 * Description text lives in locale files under projects.[id].description
 * Populated / finalized in Phase 6.
 */

export type ProjectCategory =
  | 'IoT'
  | 'AI/ML'
  | 'Full-Stack'
  | 'Tools'
  | 'DevOps/Cloud';

export interface Project {
  id: string;
  title: string;
  repositoryUrl: string;
  visibility: 'public' | 'private';
  category: ProjectCategory[];
  technologies: string[];
  banner: string; // path: /projects/[id].webp
  descriptionKey: string; // locale key: projects.[id].description
  featured?: boolean;
}

// TODO (Phase 6 — Claude Opus 8 + all agents): finalize with private repos,
// vMigrate URL, Math Genius URL, and banner assets.
export const projects: Project[] = [
  {
    id: 'portfolio-app',
    title: 'Portfolio App',
    repositoryUrl: 'https://github.com/Bechir-afk/Portfolio-app',
    visibility: 'public',
    category: ['Full-Stack'],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Framer Motion'],
    banner: '/projects/portfolio-app.webp',
    descriptionKey: 'projects.portfolio-app.description',
    featured: true,
  },
  {
    id: 'sentinel-ai',
    title: 'Sentinel AI',
    repositoryUrl: 'https://github.com/Bechir-afk/Sentinel-AI-Slop-Triage-Engine',
    visibility: 'public',
    category: ['DevOps/Cloud'],
    technologies: ['Go'],
    banner: '/projects/sentinel-ai.webp',
    descriptionKey: 'projects.sentinel-ai.description',
  },
  {
    id: 'templatr',
    title: 'Templatr',
    repositoryUrl: 'https://github.com/Bechir-afk/Templatr--Prints-Generator',
    visibility: 'public',
    category: ['Tools'],
    technologies: ['Python'],
    banner: '/projects/templatr.webp',
    descriptionKey: 'projects.templatr.description',
  },
  {
    id: 'bookhaven',
    title: 'BookHaven',
    repositoryUrl: 'https://github.com/Bechir-afk/BookHaven',
    visibility: 'public',
    category: ['Full-Stack'],
    technologies: ['HTML', 'CSS', 'JavaScript'],
    banner: '/projects/bookhaven.webp',
    descriptionKey: 'projects.bookhaven.description',
  },
  {
    id: 'phishguard',
    title: 'PhishGuard',
    repositoryUrl: 'https://github.com/Bechir-afk/PhishGuard',
    visibility: 'public',
    category: ['Tools'],
    technologies: ['HTML'],
    banner: '/projects/phishguard.webp',
    descriptionKey: 'projects.phishguard.description',
  },
  {
    id: 'pfa-attendees',
    title: 'PFA Attendees System',
    repositoryUrl: 'https://github.com/Bechir-afk/PFA-Attandees-System',
    visibility: 'public',
    category: ['IoT'],
    technologies: ['ESP32', 'C++'],
    banner: '/projects/pfa-attendees.webp',
    descriptionKey: 'projects.pfa-attendees.description',
  },
  {
    id: 'smart-street-lighting',
    title: 'Smart Street Lighting',
    repositoryUrl: 'https://github.com/Bechir-afk/Intelligent_Street_Lighting',
    visibility: 'public',
    category: ['IoT'],
    technologies: ['ESP32', 'MQTT', 'C++'],
    banner: '/projects/smart-street-lighting.webp',
    descriptionKey: 'projects.smart-street-lighting.description',
  },
  {
    id: 'ieee-badge-writer',
    title: 'IEEE Badge Writer',
    repositoryUrl: 'https://github.com/Bechir-afk/IEEE-BadgeWriter',
    visibility: 'public',
    category: ['Tools'],
    technologies: ['C#', '.NET'],
    banner: '/projects/ieee-badge-writer.webp',
    descriptionKey: 'projects.ieee-badge-writer.description',
  },
  {
    id: 'vmigrate',
    title: 'vMigrate',
    repositoryUrl: '', // TODO: user to provide URL
    visibility: 'public',
    category: ['AI/ML', 'DevOps/Cloud'],
    technologies: ['Python', 'XGBoost', 'SHAP', 'React', 'FastAPI', 'OpenShift', 'KubeVirt', 'Docker', 'PostgreSQL'],
    banner: '/projects/vmigrate.webp',
    descriptionKey: 'projects.vmigrate.description',
    featured: true,
  },
  {
    id: 'math-genius',
    title: 'Math Genius',
    repositoryUrl: '', // TODO: user to provide URL
    visibility: 'public',
    category: ['Full-Stack'],
    technologies: ['React', 'Vite', 'TanStack', 'Tailwind CSS', 'Flask'],
    banner: '/projects/math-genius.webp',
    descriptionKey: 'projects.math-genius.description',
    featured: true,
  },
  // TODO (Phase 6): Add private repositories after user provides list
];
