'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Scroll micro-interactions — the page "unwrapping" as you move.
// Small, layered, reduced-motion-safe (transforms only, no layout shift).

// Section that lifts + fades + subtly scales as it enters the viewport.
export function UnwrapSection({ children, id, style }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.92', 'start 0.55'] });
  const y = useTransform(scrollYProgress, [0, 1], [48, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.985, 1]);
  return (
    <motion.section ref={ref} id={id} style={{ y, opacity, scale, transformOrigin: 'top center', ...style }}>
      {children}
    </motion.section>
  );
}

// Gentle vertical parallax for any element (images, panels).
export function Parallax({ children, amount = 40, style, className }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);
  return <motion.div ref={ref} className={className} style={{ y, ...style }}>{children}</motion.div>;
}

// A thin progress line that fills as the section is traversed — "system loading".
export function SectionScrubLine({ color = 'var(--accent)' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'end 0.4'] });
  const w = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  return (
    <div ref={ref} style={{ height: 1, background: 'var(--rule)', position: 'relative', overflow: 'hidden' }}>
      <motion.div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: w, background: color }} />
    </div>
  );
}

// Div wrapper version — unwrap effect around a whole component without
// nesting <section>. Use for project blocks on the homepage.
export function Unwrap({ children, amount = 44 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.98', 'start 0.72'] });
  const y = useTransform(scrollYProgress, [0, 1], [amount, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [0.55, 1]);
  return <motion.div ref={ref} style={{ y, opacity }}>{children}</motion.div>;
}
