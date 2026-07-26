'use client';

import { useTranslations } from 'next-intl';
import { resume } from '@/data/resume';

export default function SkillTags() {
  const t = useTranslations('skills');

  return (
    <div style={{ marginTop: '2rem' }}>
      {resume.skills.map(({ category, items }) => (
        <div key={category} style={{ marginBottom: '1.5rem' }}>
          {/* Category heading */}
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              marginBottom: '0.6rem',
            }}
          >
            {t(`categories.${category}`)}
          </p>

          {/* Skill chips */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.4rem',
            }}
          >
            {items.map((item) => (
              <span
                key={item}
                className="skill-chip"
                style={{
                  display: 'inline-block',
                  padding: '0.25rem 0.7rem',
                  borderRadius: '999px',
                  border: '1px solid rgba(80, 125, 188, 0.35)',
                  background: 'rgba(255, 255, 255, 0.12)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.82rem',
                  color: 'var(--text-dark)',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                  cursor: 'default',
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}

      {/* CSS-only hover — no GSAP, no mount animation (FR-404, FR-405) */}
      <style>{`
        .skill-chip:hover {
          border-color: rgba(80, 125, 188, 0.6);
          box-shadow: 0 0 8px rgba(80, 125, 188, 0.2);
        }
      `}</style>
    </div>
  );
}
