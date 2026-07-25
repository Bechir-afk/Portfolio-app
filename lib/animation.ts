'use client';

/**
 * Registers GSAP plugins once, client-side only.
 * Call this in a useEffect or useLayoutEffect — never at module level.
 */
export function registerGSAP() {
  if (typeof window === 'undefined') return;
  // Dynamic import keeps GSAP + plugins out of the SSR bundle
  import('gsap').then(({ gsap }) => {
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);
    });
  });
}

/**
 * Returns true if the user has requested reduced motion.
 * Safe to call on the server (returns false).
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Shared default tween config used across components. */
export const tweenDefaults = {
  duration: 0.6,
  ease: 'power2.out',
} as const;

/** Section entrance defaults (opacity + y). */
export const sectionEntrance = {
  from: { opacity: 0, y: 40 },
  to:   { opacity: 1, y: 0 },
  duration: 0.7,
  ease: 'power2.out',
} as const;
