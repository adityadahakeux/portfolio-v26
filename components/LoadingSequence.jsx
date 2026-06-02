'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Exhibition opening — a paper title card that lifts away like a gallery
// curtain. Minimal, cinematic. Skipped under reduced-motion.
export default function LoadingSequence({ onDone }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onDone?.(); return;
    }
    const t1 = setTimeout(() => setExiting(true), 2000);
    const t2 = setTimeout(() => onDone?.(), 2850);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'var(--bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28, overflow: 'hidden' }}
        >
          {/* drafting grid */}
          <div aria-hidden style={{ position: 'absolute', inset: 0, opacity: 0.5, backgroundImage: 'linear-gradient(rgba(244,245,247,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(244,245,247,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px', maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, #000 20%, transparent 75%)' }} />
          {/* minimal wireframe accents drawing in around the title */}
          <svg aria-hidden viewBox="0 0 400 300" style={{ position: 'absolute', width: 'min(70vw, 460px)', height: 'auto', opacity: 0.5 }}>
            <motion.rect x="40" y="40" width="120" height="70" rx="6" fill="none" stroke="rgba(79,141,247,0.5)" strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1, delay: 0.2 }} />
            <motion.rect x="300" y="190" width="60" height="80" rx="10" fill="none" stroke="rgba(79,141,247,0.5)" strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1, delay: 0.4 }} />
            <motion.circle cx="50" cy="250" r="4" fill="#3FB873"
              initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0.4, 1] }} transition={{ duration: 1.4, delay: 0.6, repeat: Infinity }} />
            <motion.line x1="160" y1="75" x2="300" y2="210" stroke="rgba(79,141,247,0.25)" strokeWidth="1" strokeDasharray="3 4"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 0.7 }} />
          </svg>

          <motion.span
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            animate={{ opacity: 1, letterSpacing: '0.32em' }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono" style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--accent)', position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 9 }}>
            <span className="pulse-dot" /> UI/UX &amp; Product Design Portfolio
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="font-display" style={{ fontSize: 'clamp(2rem, 5vw, 3.4rem)', fontWeight: 400, color: 'var(--ink)', letterSpacing: '-0.02em', position: 'relative' }}>
            Aditya Dahake
          </motion.span>
          {/* thin loading progress line */}
          <motion.div style={{ position: 'relative', width: 140, height: 2, background: 'rgba(244,245,247,0.1)', borderRadius: 2, overflow: 'hidden' }}>
            <motion.div initial={{ x: '-100%' }} animate={{ x: '0%' }} transition={{ duration: 1.4, ease: 'easeInOut' }}
              style={{ position: 'absolute', inset: 0, background: 'var(--accent)' }} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
