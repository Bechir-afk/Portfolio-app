/**
 * Resume data extracted from doc/resume.tex.
 * All user-facing display text uses locale keys — no hardcoded strings.
 * Populated in Phase 4 by GLM 5.2.
 */

export interface RotatingTitle {
  key: 'student' | 'freelance' | 'gamer';
  color: string;
}

export interface Skill {
  category: string; // locale key, e.g. 'skills.languages'
  items: string[];
}

export interface Experience {
  role: string;
  company: string;
  start: string;
  end: string;
  technologies: string[];
  descKey: string; // locale key for description
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

// TODO (Phase 4 — GLM 5.2): Populate from doc/resume.tex
export const resume: Resume = {
  profile: {
    name: 'Bechir Ben Rabia',
    location: 'Tunis, Tunisia',
    summaryKey: 'about.summary',
    rotatingTitles: [
      { key: 'student',  color: '#507DBC' },
      { key: 'freelance', color: '#04080F' },
      { key: 'gamer',    color: '#A1C6EA' },
    ],
  },
  skills: [],
  experience: [],
  leadership: [],
  education: [],
  awards: [],
  contact: {
    email: '',
    phone: '',
    socials: [],
  },
  spokenLanguages: [],
};
