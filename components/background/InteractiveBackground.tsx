'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CodeSymbols, { getCodeSymbols, type SymbolItem } from './CodeSymbols';
import TechKeywords, { getTechKeywords, type KeywordItem } from './TechKeywords';
import { BREAKPOINTS } from '@/lib/constants';

gsap.registerPlugin(ScrollTrigger);

type BgItem = SymbolItem | KeywordItem;

function isMobileViewport(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < BREAKPOINTS.mobile;
}

export default function InteractiveBackground() {
  // ─── Detect mobile on first render (client-side only) ─────────────────────
  const isMobile = typeof window !== 'undefined'
    ? window.innerWidth < BREAKPOINTS.mobile
    : false;

  // ─── Static item lists ────────────────────────────────────────────────────
  const symbolItems  = useMemo(() => getCodeSymbols(isMobile),  [isMobile]);
  const keywordItems = useMemo(() => getTechKeywords(isMobile), [isMobile]);

  // All items combined for unified parallax processing
  const allItems: BgItem[] = useMemo(
    () => [...symbolItems, ...keywordItems],
    [symbolItems, keywordItems]
  );

  // ─── DOM refs ─────────────────────────────────────────────────────────────
  const symRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const kwRefs  = useRef<(HTMLSpanElement | null)[]>([]);

  // Unified flat ref array for parallax (symbols first, then keywords)
  const allRefs = useMemo(
    () => [...symRefs.current, ...kwRefs.current],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [] // intentionally stable — populated via callback refs
  );

  // ─── Mouse parallax ───────────────────────────────────────────────────────
  const mouseX   = useRef(0);
  const mouseY   = useRef(0);
  const rafId    = useRef<number | null>(null);

  useEffect(() => {
    // Skip on touch-only devices (no hover capability)
    const canHover = window.matchMedia('(hover: hover)').matches;
    if (!canHover) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = (e.clientX / window.innerWidth  - 0.5) * 2; // -1 to 1
      mouseY.current = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1
    };

    const tick = () => {
      const symEls = symRefs.current;
      const kwEls  = kwRefs.current;

      symbolItems.forEach((item, i) => {
        const el = symEls[i];
        if (!el) return;
        const strength = item.depthFactor === 1 ? 8 : 18;
        const tx = mouseX.current * strength;
        const ty = mouseY.current * strength;
        el.style.transform = `rotate(${item.rotation}deg) scale(${item.scale}) translate(${tx}px, ${ty}px)`;
      });

      keywordItems.forEach((item, i) => {
        const el = kwEls[i];
        if (!el) return;
        const strength = 12; // medium layer
        const tx = mouseX.current * strength;
        const ty = mouseY.current * strength;
        el.style.transform = `rotate(${item.rotation}deg) translate(${tx}px, ${ty}px)`;
      });

      rafId.current = requestAnimationFrame(tick);
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId.current = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [symbolItems, keywordItems]);

  // ─── Scroll parallax via GSAP ScrollTrigger ───────────────────────────────
  useGSAP(() => {
    gsap.matchMedia().add(
      // Only animate when reduced-motion is NOT requested
      '(prefers-reduced-motion: no-preference)',
      () => {
        const symEls = symRefs.current;
        const kwEls  = kwRefs.current;

        // Large symbols (depthFactor 1) — slowest parallax
        symbolItems.forEach((item, i) => {
          const el = symEls[i];
          if (!el) return;
          const yDist = item.depthFactor === 1 ? -60 : -120;
          gsap.to(el, {
            y: yDist,
            ease: 'none',
            scrollTrigger: {
              trigger: 'body',
              start: 'top top',
              end: 'bottom bottom',
              scrub: true,
            },
          });
        });

        // Keywords (depthFactor 2) — medium speed
        keywordItems.forEach((item, i) => {
          const el = kwEls[i];
          if (!el) return;
          gsap.to(el, {
            y: -90,
            ease: 'none',
            scrollTrigger: {
              trigger: 'body',
              start: 'top top',
              end: 'bottom bottom',
              scrub: true,
            },
          });
        });
      }
    );
  }, { dependencies: [symbolItems, keywordItems] });

  return (
    <div
      aria-hidden="true"
      style={{
        position:      'fixed',
        inset:         0,
        zIndex:        0,
        pointerEvents: 'none',
        overflow:      'hidden',
      }}
    >
      <CodeSymbols  items={symbolItems}  refs={symRefs} />
      <TechKeywords items={keywordItems} refs={kwRefs}  />
    </div>
  );
}
