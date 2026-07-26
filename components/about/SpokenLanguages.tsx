'use client';

import { useTranslations } from 'next-intl';
import { resume } from '@/data/resume';

// Maps locale key suffix -> about.levels.* key
const LEVEL_KEY: Record<string, 'native' | 'proficient' | 'elementary'> = {
  arabic:  'native',
  french:  'proficient',
  english: 'proficient',
};

// Display label for each language (not translatable — language names are proper nouns)
const LANGUAGE_LABEL: Record<string, string> = {
  arabic:  'Arabic',
  french:  'French',
  english: 'English',
};

export default function SpokenLanguages() {
  const t = useTranslations('about');

  return (
    <div>
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
          marginBottom: '0.75rem',
        }}
      >
        {t('spokenLanguages')}
      </p>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
        }}
      >
        {resume.spokenLanguages.map((lang) => (
          <span
            key={lang}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.3rem 0.8rem',
              borderRadius: '999px',
              border: '1px solid rgba(80, 125, 188, 0.4)',
              background: 'rgba(255,255,255,0.12)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.82rem',
              color: 'var(--text-dark)',
            }}
          >
            <strong style={{ color: 'var(--accent)' }}>
              {LANGUAGE_LABEL[lang] ?? lang}
            </strong>
            <span style={{ opacity: 0.6 }}>
              {t(`levels.${LEVEL_KEY[lang] ?? 'proficient'}`)}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
