'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

// PLATE II — INDHI · INFRASTRUCTURE. ~30%. Keeps the dark blueprint room and
// EXPANDS the ecosystem: a web command center + mobile + automation arranged
// as a connected grid with drawn links, larger screenshots, architectural feel.
export default function ProjectINDHI() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const drift = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const wipe = { initial: { clipPath: 'inset(0 0 100% 0)' }, animate: inView ? { clipPath: 'inset(0 0 0% 0)' } : {} };

  return (
    <section ref={ref} style={{ position: 'relative', background: 'var(--bg-2)', paddingTop: 90, paddingBottom: 90, overflow: 'hidden' }}>
      {/* blueprint grid + connection ambience */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, opacity: 0.6, backgroundImage: 'linear-gradient(rgba(244,245,247,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(244,245,247,0.04) 1px, transparent 1px)', backgroundSize: '38px 38px' }} />
      <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 60% at 25% 40%, rgba(130,120,240,0.12) 0%, transparent 60%)' }} />

      <div className="wrap-wide" style={{ position: 'relative' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 44, flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 18 }}>
            <span className="plate-no" style={{ color: '#9A8CF0' }}>SYSTEM / 02</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', fontWeight: 600, color: 'var(--ink)', lineHeight: 1, letterSpacing: '-0.03em' }}>INDHI</h2>
            <span className="label" style={{ display: 'inline' }}>Infrastructure · Connected Ecosystem</span>
          </div>
        </motion.div>

        {/* Connected ecosystem grid — bigger screens, drawn links */}
        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: 36, alignItems: 'center' }} className="indhi-grid">
          {/* web command center — large */}
          <motion.div {...wipe} transition={{ duration: 1.1, ease: [0.65,0,0.35,1] }} style={{ position: 'relative' }}>
            <div className="mount" style={{ padding: 10 }}>
              <img src="/indhi/dashboard.png" alt="INDHI web control center" style={{ width: '100%', display: 'block', borderRadius: 8 }} />
            </div>
            <span className="label" style={{ marginTop: 10, display: 'block' }}>Fig. 01 — Web control center · administration, automation, energy</span>
          </motion.div>

          {/* right column: mobile + automation stacked, connected feeling */}
          <motion.div style={{ display: 'flex', flexDirection: 'column', gap: 24, y: drift }}>
            <motion.div {...wipe} transition={{ duration: 1, delay: 0.15, ease: [0.65,0,0.35,1] }}>
              <p className="font-serif" style={{ fontSize: 'clamp(1.4rem, 2.4vw, 2rem)', fontStyle: 'italic', fontWeight: 400, color: 'var(--ink)', lineHeight: 1.3, letterSpacing: '-0.015em', marginBottom: 14 }}>
                A home is not a network of devices. It's a set of intentions the system must understand.
              </p>
              <p style={{ fontSize: '0.98rem', color: 'var(--ink-2)', lineHeight: 1.7 }}>
                One connected ecosystem across web and mobile — device control, automation, energy, and administration, unified so a resident and a facility administrator operate the same infrastructure at different altitudes.
              </p>
            </motion.div>
            <motion.div {...wipe} transition={{ duration: 1, delay: 0.3, ease: [0.65,0,0.35,1] }}
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="mount" style={{ padding: 6 }}>
                <img src="/indhi/mobile-home.png" alt="INDHI mobile control" style={{ width: '100%', display: 'block', borderRadius: 14 }} />
              </div>
              <div className="mount" style={{ padding: 6 }}>
                <img src="/indhi/device-control.png" alt="INDHI device control" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: 8 }} />
              </div>
            </motion.div>
            <motion.a {...wipe} transition={{ duration: 0.8, delay: 0.4 }} href="/work/indhi" className="link-line font-mono"
              style={{ fontSize: '0.82rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9A8CF0' }}>
              Open the INDHI case study →
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
