import Hero from '@/components/hero/Hero';
import LanguageToggle from '@/components/layout/LanguageToggle';
import Section from '@/components/layout/Section';

/**
 * Phase 2 page — Hero + LanguageToggle live.
 * Placeholder Sections below for scroll animation testing.
 * Replaced section by section from Phase 3 onwards.
 */
export default function HomePage() {
  return (
    <main style={{ minHeight: '260vh' }}>
      <LanguageToggle />
      <Hero />

      <Section
        id="placeholder-2"
        style={{
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4rem 2rem',
        }}
      >
        <div
          className="glass"
          style={{ padding: '2rem 3rem', borderRadius: '1rem', maxWidth: 520 }}
        >
          <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dark)', opacity: 0.8 }}>
            Placeholder — scroll down to test section entrance animations.
          </p>
        </div>
      </Section>

      <Section
        id="placeholder-3"
        style={{
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4rem 2rem',
        }}
      >
        <div
          className="glass"
          style={{ padding: '2rem 3rem', borderRadius: '1rem', maxWidth: 520 }}
        >
          <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>
            Scroll back up — Hero should deconstruct as it leaves the viewport.
          </p>
        </div>
      </Section>
    </main>
  );
}
