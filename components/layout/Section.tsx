'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

/**
 * Reusable scroll-animated section wrapper.
 * Entrance: opacity 0→1, y 40→0 on scroll-down.
 * Exit reverse: y 0→40, opacity 1→0 on scroll-up.
 *
 * SPEC-001 FR-070 to FR-073
 */
export default function Section({ children, id, className }: SectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = sectionRef.current;
      if (!el) return;

      gsap.matchMedia().add(
        '(prefers-reduced-motion: no-preference)',
        () => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 88%',
                end: 'top 40%',
                toggleActions: 'play reverse play reverse',
              },
            }
          );
        }
      );

      // Reduced motion: ensure section is visible (no animation)
      gsap.matchMedia().add(
        '(prefers-reduced-motion: reduce)',
        () => {
          gsap.set(el, { opacity: 1, y: 0 });
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id={id} className={className}>
      {children}
    </section>
  );
}
