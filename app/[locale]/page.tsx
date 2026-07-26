import Hero from '@/components/hero/Hero';
import LanguageToggle from '@/components/layout/LanguageToggle';
import Section from '@/components/layout/Section';
import QuoteBlock from '@/components/quote/QuoteBlock';
import AboutSection from '@/components/about/AboutSection';

/**
 * Phase 3 page — Hero + Quote + About live.
 * One placeholder section remains for scroll testing below About.
 * Replaced in Phase 4 (Skills) onwards.
 */
export default function HomePage() {
  return (
    <main>
      <LanguageToggle />
      <Hero />

      {/* Quote — centred, full-width section with glass card */}
      <Section
        id="quote"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(4rem, 8vw, 7rem) 2rem',
        }}
      >
        <QuoteBlock />
      </Section>

      {/* About — summary + spoken language chips */}
      <AboutSection />

      {/* Placeholder — removed in Phase 4 */}
      <Section
        id="placeholder-skills"
        style={{
          minHeight: '40vh',
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
            Phase 4 — Skills section coming next.
          </p>
        </div>
      </Section>
    </main>
  );
}
