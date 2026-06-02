'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const NAV = [
  { label: 'Work',    href: '#work' },
  { label: 'Archive', href: '#systems' },
  { label: 'Method',  href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on(); window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  const go = (href) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <motion.header
      initial={false}
      animate={{
        backgroundColor: scrolled ? 'rgba(14,15,19,0.55)' : 'rgba(14,15,19,0)',
        borderColor: scrolled ? 'rgba(244,245,247,0.1)' : 'rgba(0,0,0,0)',
      }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, borderBottom: '1px solid transparent', backdropFilter: scrolled ? 'blur(20px) saturate(1.6)' : 'none', WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(1.6)' : 'none' }}
    >
      <div className="wrap-wide" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 18, paddingBottom: 18 }}>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-display" style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--ink)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, letterSpacing: '-0.01em' }}>
          Aditya Dahake
        </button>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 30 }} className="hide-mobile">
          {NAV.map(l => (
            <button key={l.label} onClick={() => go(l.href)} className="link-line font-mono"
              style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{l.label}</button>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
