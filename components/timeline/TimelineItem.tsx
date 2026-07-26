'use client';

import { useTranslations } from 'next-intl';

export interface TimelineItemProps {
  role: string;
  org: string;
  start: string;
  end: string;
  descKey: string;
  technologies?: string[];
  icon: React.ReactNode;
}

export default function TimelineItem({
  role,
  org,
  start,
  end,
  descKey,
  technologies,
  icon,
}: TimelineItemProps) {
  const t = useTranslations();
  const endLabel = end === 'Present' ? t('timeline.present') : end;

  return (
    <div
      className="glass"
      style={{
        display: 'flex',
        gap: '1rem',
        padding: '1.25rem 1.5rem',
        borderRadius: '1rem',
        marginBottom: '1rem',
      }}
    >
      {/* Icon circle (FR-416) */}
      <div
        style={{
          flexShrink: 0,
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: 'rgba(80, 125, 188, 0.15)',
          border: '1px solid rgba(80, 125, 188, 0.35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--accent)',
          marginTop: '0.15rem',
        }}
      >
        {icon}
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Date range (FR-411) */}
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--accent)',
            opacity: 0.8,
            marginBottom: '0.25rem',
          }}
        >
          {start}{end ? ` — ${endLabel}` : ''}
        </p>

        {/* Role + org (FR-412) */}
        <p style={{ marginBottom: '0.4rem' }}>
          <strong
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              fontWeight: 700,
              color: 'var(--text-dark)',
            }}
          >
            {role}
          </strong>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.9rem',
              color: 'var(--text-dark)',
              opacity: 0.75,
              marginLeft: '0.5rem',
            }}
          >
            {org}
          </span>
        </p>

        {/* Description (FR-413) */}
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.9rem',
            color: 'var(--text-dark)',
            opacity: 0.8,
            lineHeight: 1.6,
            marginBottom: technologies && technologies.length > 0 ? '0.6rem' : 0,
          }}
        >
          {t(descKey as Parameters<typeof t>[0])}
        </p>

        {/* Technology chips (FR-414) */}
        {technologies && technologies.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
            {technologies.map((tech) => (
              <span
                key={tech}
                style={{
                  padding: '0.15rem 0.5rem',
                  borderRadius: '4px',
                  background: 'rgba(80, 125, 188, 0.12)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--text-dark)',
                  opacity: 0.85,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
