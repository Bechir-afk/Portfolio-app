import Section from '@/components/layout/Section';

/**
 * Phase 1 placeholder page.
 * Renders enough sections to verify scroll animations and parallax.
 * Replaced with real content in Phases 2–8.
 */
export default function HomePage() {
  return (
    <main style={{ minHeight: '400vh' }}>
      <Section
        id="hero-placeholder"
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
        }}
      >
        <div style={{ textAlign: 'center', fontFamily: 'var(--font-sans)' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', color: 'var(--text-dark)', fontWeight: 800 }}>
            Bechir Ben Rabia
          </h1>
          <p style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', marginTop: '1rem' }}>
            Phase 1 — Interactive Background Active
          </p>
        </div>
      </Section>

      <Section
        id="section-2"
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
          style={{ padding: '2rem 3rem', borderRadius: '1rem', maxWidth: 480 }}
        >
          <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dark)', opacity: 0.8 }}>
            Scroll down to test section entrance animations and background parallax.
          </p>
        </div>
      </Section>

      <Section
        id="section-3"
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
          style={{ padding: '2rem 3rem', borderRadius: '1rem', maxWidth: 480 }}
        >
          <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>
            Glass card — Phase 1 acceptance criteria test.
          </p>
        </div>
      </Section>

      <Section
        id="section-4"
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
          style={{ padding: '2rem 3rem', borderRadius: '1rem', maxWidth: 480 }}
        >
          <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-dark)' }}>
            Scroll back up — sections should reverse and deconstruct.
          </p>
        </div>
      </Section>
    </main>
  );
}
