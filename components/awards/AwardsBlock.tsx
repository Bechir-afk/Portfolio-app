'use client';

import { useTranslations } from 'next-intl';
import { Trophy } from '@phosphor-icons/react';
import Section from '@/components/layout/Section';
import { resume } from '@/data/resume';

// Maps award array index -> locale key namespace
const AWARD_KEYS = ['posterChallenge', 'gameJam'] as const;

export default function AwardsBlock() {
  const t = useTranslations('awards');

  return (
    <Section
      id="awards"
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: 'clamp(3rem, 6vw, 5rem) 2rem',
      }}
    >
      {/* Heading (FR-430) */}
      <h2
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)',
          fontWeight: 800,
          color: 'var(--text-dark)',
          marginBottom: '2rem',
          lineHeight: 1.1,
        }}
      >
        {t('heading')}
      </h2>

      {/* Award entries (FR-431, FR-432, FR-433) */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {resume.awards.map((award, i) => {
          const key = AWARD_KEYS[i];
          return (
            <div
              key={award.event}
              className="glass"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1.25rem',
                borderRadius: '1rem',
              }}
            >
              <Trophy
                size={22}
                weight="fill"
                style={{ color: 'var(--accent)', flexShrink: 0 }}
                aria-hidden="true"
              />
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    color: 'var(--text-dark)',
                    marginBottom: '0.1rem',
                  }}
                >
                  {t(`${key}.title`)}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    color: 'var(--accent)',
                    opacity: 0.85,
                  }}
                >
                  {t(`${key}.event`)} · {award.year}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
