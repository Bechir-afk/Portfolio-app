'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useTranslations } from 'next-intl';

gsap.registerPlugin(useGSAP);

const TITLES = ['student', 'freelance', 'gamer'] as const;
type TitleKey = (typeof TITLES)[number];

const COLORS: Record<TitleKey, string> = {
  student:   '#507DBC',
  freelance: '#04080F',
  gamer:     '#A1C6EA',
};

export default function RotatingTitle() {
  const t            = useTranslations('hero.title');
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs     = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const items = itemRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!items.length) return;

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Initialise: first item visible, rest hidden below
      gsap.set(items, { opacity: 0, yPercent: 100 });
      gsap.set(items[0]!, { opacity: 1, yPercent: 0 });

      const tl = gsap.timeline({ repeat: -1 });

      items.forEach((item, i) => {
        const next = items[(i + 1) % items.length]!;
        tl.to(item, {
            opacity: 0,
            yPercent: -100,
            duration: 0.4,
            ease: 'power2.inOut',
            delay: 2.1,
          })
          .fromTo(
            next,
            { opacity: 0, yPercent: 100 },
            { opacity: 1, yPercent: 0, duration: 0.4, ease: 'power2.inOut' },
            '<' // overlap with exit
          );
      });
    });

    mm.add('(prefers-reduced-motion: reduce)', () => {
      // Show all titles stacked — user can read, no motion
      gsap.set(items, { clearProps: 'all' });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      aria-live="polite"
      style={{
        position: 'relative',
        height: '2rem',
        overflow: 'hidden',
      }}
    >
      {TITLES.map((key, i) => (
        <div
          key={key}
          ref={(el) => { itemRefs.current[i] = el; }}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            color: COLORS[key],
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
            fontWeight: 600,
            whiteSpace: 'nowrap',
          }}
        >
          {t(key)}
        </div>
      ))}
    </div>
  );
}
