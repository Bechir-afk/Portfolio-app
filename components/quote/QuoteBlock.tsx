'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslations } from 'next-intl';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Splits a string into word-wrapped spans for GSAP stagger reveal. */
function WordSpans({ text }: { text: string }) {
  return (
    <>
      {text.split(' ').map((word, i) => (
        <span
          key={i}
          data-word
          style={{
            display: 'inline-block',
            marginRight: '0.3em',
            willChange: 'transform',
          }}
        >
          {word}
        </span>
      ))}
    </>
  );
}

export default function QuoteBlock() {
  const t          = useTranslations('quote');
  const blockRef   = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = blockRef.current;
    if (!el) return;

    const words = Array.from(el.querySelectorAll<HTMLSpanElement>('[data-word]'));
    if (!words.length) return;

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        words,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.035,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 82%',
            end: 'top 45%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    });

    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(words, { opacity: 1, y: 0 });
    });

    return () => mm.revert();
  }, { scope: blockRef });

  return (
    <div
      ref={blockRef}
      className="glass"
      style={{
        maxWidth: 720,
        margin: '0 auto',
        padding: 'clamp(2rem, 4vw, 3rem) clamp(2rem, 5vw, 4rem)',
        borderRadius: '1.25rem',
        position: 'relative',
      }}
    >
      {/* Opening quote glyph */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-0.5rem',
          left: '1.5rem',
          fontSize: 'clamp(5rem, 10vw, 8rem)',
          lineHeight: 1,
          color: 'var(--accent)',
          opacity: 0.18,
          fontFamily: 'Georgia, serif',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        &ldquo;
      </span>

      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          fontStyle: 'italic',
          color: 'var(--text-dark)',
          lineHeight: 1.7,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <WordSpans text={t('text')} />
      </p>
    </div>
  );
}
