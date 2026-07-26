'use client';

import { useTranslations } from 'next-intl';
import Section from '@/components/layout/Section';
import SpokenLanguages from './SpokenLanguages';

export default function AboutSection() {
  const t = useTranslations('about');

  return (
    <Section
      id="about"
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: 'clamp(4rem, 8vw, 7rem) 2rem',
      }}
    >
      {/* Heading */}
      <h2
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          fontWeight: 800,
          color: 'var(--text-dark)',
          marginBottom: '1.5rem',
          lineHeight: 1.1,
        }}
      >
        {t('heading')}
      </h2>

      {/* Summary */}
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
          color: 'var(--text-dark)',
          lineHeight: 1.75,
          maxWidth: 720,
          opacity: 0.85,
          marginBottom: '2rem',
        }}
      >
        {t('summary')}
      </p>

      {/* Spoken languages */}
      <SpokenLanguages />
    </Section>
  );
}
