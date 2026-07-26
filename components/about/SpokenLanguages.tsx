'use client';

import { useTranslations } from 'next-intl';

// Spoken language data — label is a display string, level uses locale key
const SPOKEN_LANGUAGES = [
  { label: 'Arabic',  level: 'Native'       },
  { label: 'French',  level: 'Proficient'   },
  { label: 'English', level: 'Proficient'   },
  { label: 'German',  level: 'Elementary'   },
] as const;

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
        {SPOKEN_LANGUAGES.map(({ label, level }) => (
          <span
            key={label}
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
            <strong style={{ color: 'var(--accent)' }}>{label}</strong>
            <span style={{ opacity: 0.6 }}>{level}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
