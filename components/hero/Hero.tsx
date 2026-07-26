'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslations } from 'next-intl';
import FloatingPortrait from './FloatingPortrait';
import RotatingTitle from './RotatingTitle';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Hero() {
  const t          = useTranslations('hero');
  const heroRef    = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const textRef    = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLParagraphElement>(null);
  const headingRef  = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const portrait = portraitRef.current;
    const text     = textRef.current;
    const heading  = headingRef.current;
    const location = locationRef.current;
    if (!portrait || !text || !heading || !location) return;

    const animated = [portrait, heading, location];
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Entrance: staggered fade + rise on page load
      gsap.fromTo(
        animated,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power2.out',
        }
      );

      // Exit: scrub fade + rise as hero scrolls out of view
      gsap.to(animated, {
        opacity: 0,
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'bottom 70%',
          end:   'bottom top',
          scrub: true,
        },
      });
    });

    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(animated, { opacity: 1, y: 0 });
    });

    return () => mm.revert();
  }, { scope: heroRef });

  return (
    <section
      ref={heroRef}
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        alignItems: 'center',
        gap: '3rem',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem',
      }}
    >
      {/* Portrait */}
      <div
        ref={portraitRef}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}
      >
        <FloatingPortrait />
      </div>

      {/* Text */}
      <div
        ref={textRef}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.85rem',
        }}
      >
        <h1
          ref={headingRef}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(2.6rem, 6vw, 4.8rem)',
            fontWeight: 800,
            lineHeight: 1.05,
            color: 'var(--text-dark)',
          }}
        >
          {t('name')}
        </h1>

        <RotatingTitle />

        <p
          ref={locationRef}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
            color: 'var(--accent)',
            marginTop: '0.25rem',
          }}
        >
          {t('location')}
        </p>
      </div>
    </section>
  );
}
