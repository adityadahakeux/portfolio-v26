'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Case-study navigation — never let the user feel trapped.
// Desktop: the fixed top header already carries ← Back to Home / Title / Next →.
// This adds the MOBILE pieces: a sticky floating back button (appears on scroll)
// and a bottom Next-Project CTA. Both hidden on desktop.
export function MobileBackButton() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 300);
    on(); window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <motion.div className="show-mobile"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : 10 }}
      transition={{ duration: 0.3 }}
      style={{ position: 'fixed', left: 16, bottom: 16, zIndex: 60, pointerEvents: show ? 'auto' : 'none' }}>
      <Link href="/" aria-label="Back to home"
        style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 18px', borderRadius: 100, background: 'rgba(26,23,18,0.92)', backdropFilter: 'blur(12px)', color: '#F0ECE3', textDecoration: 'none', boxShadow: '0 12px 30px rgba(0,0,0,0.25)', fontFamily: "'DM Mono', monospace", fontSize: '0.75rem', letterSpacing: '0.04em' }}>
        ← Home
      </Link>
    </motion.div>
  );
}

export function NextProjectCTA({ href, label }) {
  return (
    <Link href={href}
      style={{ display: 'block', textDecoration: 'none', background: '#1A1712', color: '#F0ECE3', padding: '40px 0' }}>
      <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <div>
          <span className="font-mono" style={{ fontSize: '0.65rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(240,236,227,0.5)', display: 'block', marginBottom: 8 }}>Next project</span>
          <span className="font-display" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.6rem)', fontWeight: 500, color: '#F0ECE3', letterSpacing: '-0.02em' }}>{label}</span>
        </div>
        <span className="font-mono" style={{ fontSize: '1.4rem', color: '#A23A22' }}>→</span>
      </div>
    </Link>
  );
}
