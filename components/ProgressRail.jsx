'use client';
import { useEffect, useState, useCallback } from 'react';

// PROGRESS RAIL — a fixed column of stops down the right edge.
// Purpose is scanning, not decoration: a recruiter can see how far in they are,
// see what is left, and jump straight to the thing they came for.
// Deliberately quiet — 5px dots until you approach it, labels only on hover.
// Hidden below 1100px, where it would crowd the content instead of helping.

const STOPS = [
  { id: 'top', label: 'Top' },
  { id: 'ebix', label: 'EBIXCash' },
  { id: 'work', label: 'ARC' },
  { id: 'indhi', label: 'INDHI' },
  { id: 'trumac', label: 'TruMac' },
  { id: 'public', label: 'SAKSHAM' },
  { id: 'systems', label: 'More work' },
  { id: 'ventures', label: 'Engagements' },
  { id: 'about', label: 'Method' },
  { id: 'contact', label: 'Contact' },
];

export default function ProgressRail() {
  const [active, setActive] = useState('top');
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const els = STOPS.map((s) => document.getElementById(s.id)).filter(Boolean);
    if (!els.length) return;

    let lastId = '';
    const update = () => {
      setShown(window.scrollY > window.innerHeight * 0.75);
      const mid = window.innerHeight * 0.4;
      let current = els[0];
      for (const el of els) {
        if (el.getBoundingClientRect().top <= mid) current = el;
      }
      if (current.id !== lastId) { lastId = current.id; setActive(current.id); }
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });

    // Lenis drives the scroll and mounts after this component (parent effects
    // run last), and its programmatic jumps do not always emit a native scroll
    // event. Subscribe to it directly once it exists; the native listener above
    // still covers the reduced-motion path where Lenis never initialises.
    let lenis = null;
    const attach = () => {
      if (window.__lenis && !lenis) {
        lenis = window.__lenis;
        lenis.on('scroll', update);
        return true;
      }
      return false;
    };
    let tries = 0;
    const poll = attach() ? null : setInterval(() => {
      if (attach() || ++tries > 40) clearInterval(poll);
    }, 50);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      if (poll) clearInterval(poll);
      if (lenis) lenis.off('scroll', update);
    };
  }, []);

  const go = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    // Lenis owns the scroll. Calling scrollIntoView here would fight its rAF
    // loop and stutter, so hand the jump to Lenis when it is running.
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -80 });
    else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <nav
      className={`rail-nav${shown ? ' is-shown' : ''}`}
      aria-label="Section navigation"
    >
      {STOPS.map((s) => {
        const on = active === s.id;
        return (
          <button
            key={s.id}
            className={`rail-stop${on ? ' is-active' : ''}`}
            onClick={() => go(s.id)}
            aria-label={s.label}
            aria-current={on ? 'true' : undefined}
          >
            <span className="font-mono rail-label">{s.label}</span>
            <span className="rail-dot" />
          </button>
        );
      })}
    </nav>
  );
}
