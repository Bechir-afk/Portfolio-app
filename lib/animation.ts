/**
 * GSAP utilities for the Portfolio App.
 * These are plain functions — not React components.
 * Call registerGSAP() inside a useEffect/useLayoutEffect in client components.
 */

/**
 * Registers GSAP plugins once, client-side only.
 * Must be called inside useEffect or useLayoutEffect — never at module level.
 *
 * Usage:
 *   useEffect(() => { registerGSAP(); }, []);
 */
export function registerGSAP(): void {
  if (typeof window === 'undefined') return;
  // Import is synchronous at runtime (GSAP is a bundled dep).
  // The typeof window guard is sufficient for SSR safety.
  Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
  ]).then(([{ gsap }, { ScrollTrigger }]) => {
    gsap.registerPlugin(ScrollTrigger);
  });
}

/**
 * Returns true if the user has requested reduced motion.
 * Safe to call server-side (returns false).
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Shared default tween configuration used across components. */
export const tweenDefaults = {
  duration: 0.6,
  ease: 'power2.out',
} as const;

/** Section entrance animation defaults (opacity + translateY). */
export const sectionEntrance = {
  from: { opacity: 0, y: 40 },
  to:   { opacity: 1, y: 0 },
  duration: 0.7,
  ease: 'power2.out',
} as const;
