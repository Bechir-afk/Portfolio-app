import Hero from '@/components/hero/Hero';
import LanguageToggle from '@/components/layout/LanguageToggle';
import Section from '@/components/layout/Section';
import QuoteBlock from '@/components/quote/QuoteBlock';
import AboutSection from '@/components/about/AboutSection';
import Timeline from '@/components/timeline/Timeline';
import AwardsBlock from '@/components/awards/AwardsBlock';
import { resume } from '@/data/resume';
import { Briefcase, GraduationCap, UsersThree } from '@phosphor-icons/react/dist/ssr';

/**
 * Phase 4 page — Hero + Quote + About (with Skills) + Timelines + Awards live.
 * placeholder-projects remains for scroll testing; removed in Phase 5/6.
 */
export default function HomePage() {
  return (
    <main>
      <LanguageToggle />
      <Hero />

      {/* Quote */}
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

      {/* About — summary + spoken languages + skill tags */}
      <AboutSection />

      {/* Experience Timeline (FR-451) */}
      <Timeline
        items={resume.experience}
        icon={<Briefcase size={20} weight="bold" />}
        headingKey="timeline.experience"
      />

      {/* Education Timeline (FR-452) */}
      <Timeline
        items={resume.education}
        icon={<GraduationCap size={20} weight="bold" />}
        headingKey="timeline.education"
      />

      {/* Leadership Timeline (FR-453) */}
      <Timeline
        items={resume.leadership}
        icon={<UsersThree size={20} weight="bold" />}
        headingKey="timeline.leadership"
      />

      {/* Awards (FR-454) */}
      <AwardsBlock />

      {/* Placeholder — removed in Phase 5/6 (FR-455) */}
      <Section
        id="placeholder-projects"
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
            Phase 5 — Projects section coming next.
          </p>
        </div>
      </Section>
    </main>
  );
}
