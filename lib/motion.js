'use client';
// ── Shared cinematic motion tokens ──────────────────────────────
// One easing curve, one set of distances, one stagger rhythm —
// so pacing is consistent across all three worlds even when the
// choreography differs.

export const EXPO = [0.16, 1, 0.3, 1];   // refined expo-out — the house curve
export const EASE = [0.25, 1, 0.5, 1];   // secondary, slightly softer

export const DUR = { fast: 0.45, base: 0.7, slow: 1.0 };

// Standard reveal — used for all "fade up into place" moments
export const reveal = (delay = 0, y = 18) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: DUR.base, delay, ease: EXPO },
});

// Stagger container + child
export const stagger = (delay = 0) => ({
  initial: 'hidden', whileInView: 'show', viewport: { once: true, amount: 0.2 },
  variants: { show: { transition: { staggerChildren: 0.08, delayChildren: delay } } },
});
export const staggerChild = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EXPO } },
};

// Reduced-motion check (for conditionally disabling parallax)
export const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
