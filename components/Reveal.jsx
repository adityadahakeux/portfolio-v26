'use client';
import { motion } from 'framer-motion';

// Cinematic primitives — slow, breathing reveals. No decorative motion.
const EASE = [0.16, 1, 0.3, 1];

export function RiseIn({ children, delay = 0, y = 28, className, style }) {
  return (
    <motion.div className={className} style={style}
      initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1, delay, ease: EASE }}>
      {children}
    </motion.div>
  );
}

// Image revealed with a single clean vertical wipe, like uncovering a work.
export function WipeImage({ src, alt, style, imgStyle, delay = 0 }) {
  return (
    <motion.div style={{ overflow: 'hidden', ...style }}
      initial={{ clipPath: 'inset(0 0 100% 0)' }}
      whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.15, delay, ease: [0.65, 0, 0.35, 1] }}>
      <img src={src} alt={alt} style={{ width: '100%', display: 'block', ...imgStyle }} />
    </motion.div>
  );
}
