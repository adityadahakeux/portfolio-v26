'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { MobileBackButton } from '@/components/CaseStudyNav';
import ReadingProgress from '@/components/ReadingProgress';

/* ════════════════════════════════════════════════════════════════
   ARC — Workforce Operating System · cinematic dark case study
   Scroll tells the story: boot → problem → 7-stage spine → modules
   ════════════════════════════════════════════════════════════════ */

const EASE = [0.25, 1, 0.5, 1];
const INK = '#F4F5F7';
const INK2 = 'rgba(244,245,247,0.62)';
const INK3 = 'rgba(244,245,247,0.40)';
const BG = '#0E0F13';
const BG2 = '#15171D';
const BG3 = '#1C1F27';
const RULE = 'rgba(244,245,247,0.12)';
const BLUE = '#4F8DF7';
const GREEN = '#3FB873';

const rev = (d = 0, y = 18) => ({ initial: { opacity: 0, y }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.25 }, transition: { duration: 0.7, delay: d, ease: EASE } });

/* ── tiny primitives ─────────────────────────────────────────── */
function Mono({ children, color = BLUE, mb = 20, size = '0.6875rem' }) {
  return <span className="font-mono" style={{ fontSize: size, letterSpacing: '0.16em', textTransform: 'uppercase', color, display: 'block', marginBottom: mb }}>{children}</span>;
}
function H2({ children, max = '22ch' }) {
  return <h2 className="font-display" style={{ fontSize: 'clamp(1.9rem, 3.6vw, 3rem)', fontWeight: 500, lineHeight: 1.14, letterSpacing: '-0.02em', color: INK, maxWidth: max, margin: '0 0 22px' }}>{children}</h2>;
}
function Body({ children, max = 560 }) {
  return <p style={{ fontSize: '1.0625rem', lineHeight: 1.7, color: INK2, maxWidth: max, margin: '0 0 0' }}>{children}</p>;
}
function Em({ children }) {
  return <em className="font-serif" style={{ fontStyle: 'italic', color: BLUE, textShadow: '0 0 22px rgba(79,141,247,0.35)' }}>{children}</em>;
}

/* ── frames ──────────────────────────────────────────────────── */
function BrowserFrame({ src, alt, url = 'arc.sapio.systems', caption, priority = false, children }) {
  return (
    <figure style={{ margin: 0 }}>
      <div style={{ position: 'relative', borderRadius: 14, background: BG2, border: `1px solid ${RULE}`, boxShadow: '0 1px 0 rgba(244,245,247,0.06) inset, 0 24px 70px -18px rgba(0,0,0,0.65), 0 60px 120px -30px rgba(0,0,0,0.55)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', borderBottom: `1px solid ${RULE}`, background: BG3 }}>
          <span style={{ display: 'flex', gap: 6 }}>
            <i style={{ width: 9, height: 9, borderRadius: '50%', background: '#F87171', display: 'block' }} />
            <i style={{ width: 9, height: 9, borderRadius: '50%', background: '#FBBF24', display: 'block' }} />
            <i style={{ width: 9, height: 9, borderRadius: '50%', background: GREEN, display: 'block' }} />
          </span>
          <span className="font-mono" style={{ flex: 1, textAlign: 'center', fontSize: '0.625rem', letterSpacing: '0.06em', color: INK3, background: BG2, border: `1px solid ${RULE}`, borderRadius: 6, padding: '4px 12px', maxWidth: 300, margin: '0 auto', whiteSpace: 'nowrap', overflow: 'hidden' }}>{url}</span>
          <span style={{ width: 41 }} />
        </div>
        <img src={src} alt={alt} loading={priority ? 'eager' : 'lazy'} style={{ display: 'block', width: '100%', height: 'auto' }} />
        {children}
      </div>
      {caption && <figcaption className="font-mono" style={{ fontSize: '0.625rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: INK3, marginTop: 14, textAlign: 'center' }}>{caption}</figcaption>}
    </figure>
  );
}

function PhoneFrame({ src, alt, caption, w = 248 }) {
  return (
    <figure style={{ margin: 0, width: w, maxWidth: '100%' }}>
      <div style={{ position: 'relative', borderRadius: 30, background: BG3, border: `1px solid rgba(244,245,247,0.14)`, padding: 9, boxShadow: '0 1px 0 rgba(244,245,247,0.08) inset, 0 24px 60px -16px rgba(0,0,0,0.7)' }}>
        <div style={{ position: 'absolute', top: 9, left: '50%', transform: 'translateX(-50%)', width: 78, height: 18, background: BG3, borderRadius: '0 0 12px 12px', zIndex: 2 }} />
        <div style={{ borderRadius: 22, overflow: 'hidden', background: BG2 }}>
          <img src={src} alt={alt} loading="lazy" style={{ display: 'block', width: '100%', height: 'auto' }} />
        </div>
      </div>
      {caption && <figcaption className="font-mono" style={{ fontSize: '0.625rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: INK3, marginTop: 14, textAlign: 'center' }}>{caption}</figcaption>}
    </figure>
  );
}

/* auto-scrolling tall screen inside a fixed-height frame */
function ScrollFrame({ src, alt, caption, h = 470 }) {
  return (
    <figure style={{ margin: 0 }}>
      <div style={{ borderRadius: 14, background: BG2, border: `1px solid ${RULE}`, boxShadow: '0 24px 70px -18px rgba(0,0,0,0.65)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', borderBottom: `1px solid ${RULE}`, background: BG3 }}>
          <span style={{ display: 'flex', gap: 6 }}>
            <i style={{ width: 9, height: 9, borderRadius: '50%', background: '#F87171', display: 'block' }} />
            <i style={{ width: 9, height: 9, borderRadius: '50%', background: '#FBBF24', display: 'block' }} />
            <i style={{ width: 9, height: 9, borderRadius: '50%', background: GREEN, display: 'block' }} />
          </span>
          <span className="font-mono" style={{ flex: 1, textAlign: 'center', fontSize: '0.625rem', color: INK3 }}>arc.sapio.systems/mis</span>
          <span style={{ width: 41 }} />
        </div>
        <div style={{ height: h, overflow: 'hidden', position: 'relative' }}>
          <img src={src} alt={alt} loading="lazy" className="arc-autoscroll" style={{ display: 'block', width: '100%', height: 'auto', '--fh': `${h}px` }} />
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 60, background: 'linear-gradient(transparent, rgba(14,15,19,0.5))', pointerEvents: 'none' }} />
        </div>
      </div>
      {caption && <figcaption className="font-mono" style={{ fontSize: '0.625rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: INK3, marginTop: 14, textAlign: 'center' }}>{caption}</figcaption>}
    </figure>
  );
}

/* count-up */
function Counter({ to, suffix = '' }) {
  const [v, setV] = useState(0);
  const ref = useRef(null);
  const [go, setGo] = useState(false);
  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => e.isIntersecting && setGo(true), { threshold: 0.4 });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);
  useEffect(() => {
    if (!go) return;
    const t0 = performance.now(), dur = 1400;
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [go, to]);
  return <span ref={ref}>{v.toLocaleString()}{suffix}</span>;
}

/* ── data ────────────────────────────────────────────────────── */
const STAGES = [
  { n: '01', t: 'Onboard', d: 'Company, hierarchy and product master configured before anyone logs a visit.' },
  { n: '02', t: 'Train', d: 'Induction tracked location-wise. Effectiveness measured, never assumed.' },
  { n: '03', t: 'Target', d: 'Balanced scorecards weight KPIs across four categories — to exactly 100%.' },
  { n: '04', t: 'Execute', d: 'Visits, calls and proof logged from the field — geo-stamped at the source.' },
  { n: '05', t: 'Verify', d: 'Face match, location match, timestamp, human context. Trust as a pipeline.' },
  { n: '06', t: 'Govern', d: 'Anomalies detected at system level — the Potential Misuse Index.' },
  { n: '07', t: 'Pay', d: 'Performance flows into payout through approval workflows. The loop closes.' },
];

/* ════════════════════ PAGE ════════════════════ */
export default function ARCPage() {
  const reduced = useReducedMotion();

  /* hero scroll-flatten */
  const heroRef = useRef(null);
  const { scrollYProgress: heroP } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const fRotX = useTransform(heroP, [0, 1], [9, 0]);
  const fScale = useTransform(heroP, [0, 1], [0.97, 1.015]);
  const fY = useTransform(heroP, [0, 1], [0, -26]);

  /* spine pipeline */
  const spineRef = useRef(null);
  const { scrollYProgress: spineP } = useScroll({ target: spineRef, offset: ['start start', 'end end'] });
  const [active, setActive] = useState(0);
  useMotionValueEvent(spineP, 'change', (v) => setActive(Math.min(STAGES.length - 1, Math.floor(v * STAGES.length))));
  const lineScale = spineP;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} style={{ background: BG, minHeight: '100vh', color: INK }}>
      <ReadingProgress />
      <MobileBackButton />

      {/* ── fixed header ── */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: 'rgba(14,15,19,0.62)', backdropFilter: 'blur(20px) saturate(1.6)', WebkitBackdropFilter: 'blur(20px) saturate(1.6)', borderBottom: `1px solid rgba(244,245,247,0.1)` }}>
        <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 16, paddingBottom: 16 }}>
          <Link href="/" className="link-line font-mono" style={{ fontSize: '0.75rem', letterSpacing: '0.04em', color: INK }}>← Back to Home</Link>
          <span className="font-mono hide-mobile" style={{ fontSize: '0.6875rem', color: INK3, letterSpacing: '0.04em' }}>ARC — Workforce Operating System</span>
          <Link href="/work/indhi" className="link-line font-mono" style={{ fontSize: '0.75rem', letterSpacing: '0.04em', color: BLUE }}>Next: INDHI →</Link>
        </div>
      </div>

      {/* ════════ HERO — the system boots ════════ */}
      <section ref={heroRef} style={{ position: 'relative', overflow: 'hidden', paddingTop: 150 }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(58% 44% at 50% 0%, rgba(79,141,247,0.13) 0%, transparent 65%)' }} />
        <div style={{ position: 'absolute', inset: 0, opacity: 0.5, backgroundImage: 'linear-gradient(rgba(244,245,247,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(244,245,247,0.022) 1px, transparent 1px)', backgroundSize: '48px 48px', maskImage: 'radial-gradient(ellipse 75% 60% at 50% 20%, #000 30%, transparent 80%)', WebkitMaskImage: 'radial-gradient(ellipse 75% 60% at 50% 20%, #000 30%, transparent 80%)' }} />

        <div className="wrap-wide" style={{ position: 'relative', textAlign: 'center' }}>
          <motion.div {...rev(0)} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '7px 16px', borderRadius: 100, background: BG2, border: `1px solid ${RULE}`, marginBottom: 30 }}>
            <i className="arc-pulse" style={{ width: 7, height: 7, borderRadius: '50%', background: GREEN, boxShadow: `0 0 10px ${GREEN}` }} />
            <span className="font-mono" style={{ fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: INK2 }}>Sapio Analytics · Enterprise SaaS · 2024 · Flagship</span>
          </motion.div>

          <motion.h1 {...rev(0.08)} style={{ fontSize: 'clamp(2.5rem, 5.6vw, 4.6rem)', fontWeight: 600, lineHeight: 1.05, letterSpacing: '-0.035em', color: INK, maxWidth: '21ch', margin: '0 auto 24px' }}>
            One operating system for the <span className="font-serif" style={{ fontStyle: 'italic', fontWeight: 500, color: BLUE, textShadow: '0 0 26px rgba(79,141,247,0.45)' }}>entire field workforce.</span>
          </motion.h1>

          <motion.p {...rev(0.16)} style={{ fontSize: '1.0625rem', lineHeight: 1.7, color: INK2, maxWidth: 620, margin: '0 auto 26px' }}>
            ARC runs every stage of a distributed workforce — onboarding, training, targets, field execution, verification, governance and payout — for 28,000+ agents across India and Malaysia.
          </motion.p>

          <motion.div {...rev(0.22)} className="font-mono" style={{ fontSize: '0.6875rem', letterSpacing: '0.1em', color: INK3, marginBottom: 56 }}>
            <span className="arc-boot">&gt; arc os · 7 modules loaded · status: <span style={{ color: GREEN }}>LIVE</span></span>
          </motion.div>

          {/* command center flattens on scroll */}
          <div style={{ perspective: 1300, maxWidth: 1080, margin: '0 auto' }}>
            <motion.div style={{ rotateX: reduced ? 0 : fRotX, scale: reduced ? 1 : fScale, y: reduced ? 0 : fY, transformOrigin: '50% 18%', position: 'relative' }}>
              <BrowserFrame src="/arc/command-center.png" alt="ARC command center — live workforce distribution, KPIs, alerts" url="arc.sapio.systems/command-center" priority caption="The command center · 28,542 field agents on one live surface" />
              {/* floating live chips */}
              <motion.div className="hide-mobile arc-float" initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.7, ease: EASE }}
                style={{ position: 'absolute', left: -56, top: '16%', background: 'rgba(21,23,29,0.92)', border: `1px solid ${RULE}`, borderRadius: 12, padding: '12px 16px', backdropFilter: 'blur(10px)', boxShadow: '0 18px 50px -12px rgba(0,0,0,0.7)' }}>
                <div className="font-mono" style={{ fontSize: '0.56rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: INK3, marginBottom: 5 }}>Avg. productivity</div>
                <div className="font-mono" style={{ fontSize: '1.3rem', color: INK }}>92.4% <span style={{ fontSize: '0.62rem', color: GREEN }}>▲ 3.7%</span></div>
              </motion.div>
              <motion.div className="hide-mobile arc-float2" initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.65, duration: 0.7, ease: EASE }}
                style={{ position: 'absolute', right: -48, bottom: '20%', display: 'flex', alignItems: 'center', gap: 9, background: 'rgba(21,23,29,0.92)', border: `1px solid ${RULE}`, borderRadius: 100, padding: '10px 18px', backdropFilter: 'blur(10px)', boxShadow: '0 18px 50px -12px rgba(0,0,0,0.7)' }}>
                <i className="arc-pulse" style={{ width: 7, height: 7, borderRadius: '50%', background: GREEN, boxShadow: `0 0 8px ${GREEN}` }} />
                <span className="font-mono" style={{ fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: INK2 }}>All systems operational</span>
              </motion.div>
            </motion.div>
          </div>

          {/* deployed strip */}
          <motion.div {...rev(0.1)} style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(24px, 5vw, 64px)', flexWrap: 'wrap', borderTop: `1px solid ${RULE}`, maxWidth: 1080, margin: '64px auto 0', padding: '26px 0 80px' }}>
            {[['28,542', 'Field workforce'], ['7', 'Lifecycle stages'], ['2', 'Platforms · web + mobile'], ['BMC · KBZ', 'Mumbai gov · Malaysia bank']].map(([v, l], i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div className="font-mono" style={{ fontSize: 'clamp(1.3rem, 2.2vw, 1.8rem)', color: INK, letterSpacing: '-0.01em' }}>{v}</div>
                <div className="font-mono" style={{ fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: INK3, marginTop: 8 }}>{l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════ PROBLEM — signal integrity ════════ */}
      <section style={{ borderTop: `1px solid ${RULE}`, background: BG }}>
        <div className="wrap" style={{ paddingTop: 110, paddingBottom: 110 }}>
          <div className="arc-2col" style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 64, alignItems: 'center' }}>
            <div>
              <motion.div {...rev(0)}><Mono color="#E0915F">The problem · signal integrity</Mono></motion.div>
              <motion.div {...rev(0.06)}>
                <H2>The more the system demanded proof of work, <Em>the less reliable that proof became.</Em></H2>
              </motion.div>
              <motion.div {...rev(0.12)}>
                <Body>ARC existed to give organizations visibility into field teams. But real-time reporting competed with the work itself — under pressure, agents batch-updated from memory at day&apos;s end. What looked like operational truth was partly reconstruction.</Body>
              </motion.div>
              <motion.div {...rev(0.18)} style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 28 }}>
                {['batch-updated from memory', 'end-of-day reconstruction', 'proof under pressure'].map((c, i) => (
                  <span key={i} className="font-mono" style={{ fontSize: '0.62rem', letterSpacing: '0.08em', color: '#E0915F', border: '1px solid rgba(224,145,95,0.3)', background: 'rgba(224,145,95,0.07)', borderRadius: 100, padding: '7px 14px' }}>{c}</span>
                ))}
              </motion.div>
            </div>

            {/* diverging signal */}
            <motion.div {...rev(0.1)} style={{ background: BG2, border: `1px solid ${RULE}`, borderRadius: 16, padding: '30px 26px 22px' }}>
              <div className="font-mono" style={{ fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: INK3, marginBottom: 18 }}>Reported activity vs ground truth</div>
              <svg viewBox="0 0 420 190" style={{ width: '100%', height: 'auto', display: 'block' }}>
                <line x1="0" y1="160" x2="420" y2="160" stroke={RULE} strokeWidth="1" />
                <motion.path d="M8 120 C 80 112, 130 96, 190 84 S 330 58, 412 40" fill="none" stroke={BLUE} strokeWidth="2.5"
                  initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, ease: 'easeOut' }} />
                <motion.path d="M8 120 C 80 124, 130 122, 190 128 S 330 148, 412 152" fill="none" stroke="#E0915F" strokeWidth="2" strokeDasharray="5 7"
                  initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, delay: 0.35, ease: 'easeOut' }} />
                <motion.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.5 }}>
                  <text x="412" y="30" textAnchor="end" fill={BLUE} fontSize="10" fontFamily="DM Mono, monospace" letterSpacing="0.08em">REPORTED</text>
                  <text x="412" y="174" textAnchor="end" fill="#E0915F" fontSize="10" fontFamily="DM Mono, monospace" letterSpacing="0.08em">GROUND TRUTH</text>
                </motion.g>
              </svg>
              <div className="font-mono" style={{ fontSize: '0.6rem', letterSpacing: '0.1em', color: INK3, marginTop: 14, textAlign: 'right' }}>the gap is the design problem ↑</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════ THE SPINE — sticky 7-stage pipeline ════════ */}
      <section ref={spineRef} style={{ position: 'relative', height: `${STAGES.length * 58 + 64}vh`, background: BG2, borderTop: `1px solid ${RULE}` }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(50% 60% at 80% 50%, rgba(79,141,247,0.07) 0%, transparent 70%)' }} />
          <div className="wrap" style={{ width: '100%', position: 'relative' }}>
            <Mono>The operating system · one governed loop</Mono>
            <div className="arc-spine" style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 'clamp(32px, 6vw, 96px)', alignItems: 'center', minHeight: '58vh' }}>

              {/* rail */}
              <div style={{ position: 'relative', paddingLeft: 26, alignSelf: 'stretch', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingTop: 6, paddingBottom: 6 }}>
                <div style={{ position: 'absolute', left: 5, top: 8, bottom: 8, width: 2, background: RULE, borderRadius: 2 }} />
                <motion.div style={{ position: 'absolute', left: 5, top: 8, bottom: 8, width: 2, background: `linear-gradient(${BLUE}, ${GREEN})`, borderRadius: 2, transformOrigin: 'top', scaleY: lineScale }} />
                {STAGES.map((s, i) => (
                  <div key={s.n} style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 14, opacity: i <= active ? 1 : 0.36, transition: 'opacity 0.4s' }}>
                    <span style={{ position: 'absolute', left: -26, width: 12, height: 12, borderRadius: '50%', background: i < active ? BLUE : i === active ? GREEN : BG3, border: `2px solid ${i <= active ? (i === active ? GREEN : BLUE) : RULE}`, boxShadow: i === active ? `0 0 14px ${GREEN}` : 'none', transition: 'all 0.4s' }} />
                    <span className="font-mono" style={{ fontSize: '0.62rem', color: i === active ? GREEN : INK3, width: 22, transition: 'color 0.4s' }}>{s.n}</span>
                    <span className="font-mono" style={{ fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: i === active ? INK : INK2, transition: 'color 0.4s' }}>{s.t}</span>
                  </div>
                ))}
              </div>

              {/* active stage display */}
              <div style={{ position: 'relative', minHeight: 260 }}>
                {STAGES.map((s, i) => (
                  <motion.div key={s.n} animate={{ opacity: i === active ? 1 : 0, y: i === active ? 0 : (i < active ? -16 : 16) }} transition={{ duration: 0.45, ease: EASE }} style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', pointerEvents: 'none' }}>
                    <span className="font-mono" style={{ fontSize: 'clamp(4rem, 9vw, 7.5rem)', lineHeight: 1, color: 'rgba(79,141,247,0.16)', letterSpacing: '-0.04em', marginBottom: 6 }}>{s.n}</span>
                    <span style={{ fontSize: 'clamp(2rem, 4.4vw, 3.4rem)', fontWeight: 600, letterSpacing: '-0.03em', color: INK, lineHeight: 1.05, marginBottom: 16 }}>{s.t}</span>
                    <span style={{ fontSize: '1.05rem', lineHeight: 1.65, color: INK2, maxWidth: 480 }}>{s.d}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="font-mono hide-mobile" style={{ position: 'absolute', right: 56, bottom: -34, fontSize: '0.6rem', letterSpacing: '0.12em', color: INK3 }}>scroll ↓ to move through the lifecycle</div>
          </div>
        </div>
      </section>

      {/* ════════ 01–02 ONBOARD & TRAIN ════════ */}
      <section style={{ borderTop: `1px solid ${RULE}` }}>
        <div className="wrap" style={{ paddingTop: 110, paddingBottom: 110 }}>
          <motion.div {...rev(0)}><Mono>01–02 · Onboard & train</Mono></motion.div>
          <motion.div {...rev(0.06)}><H2>Getting to the field is itself <Em>a governed process.</Em></H2></motion.div>
          <motion.div {...rev(0.12)}><Body>No agent reaches a customer until the organization, product master, training programs and performance frameworks exist. ARC sequences each step — and verifies it — before fieldwork begins.</Body></motion.div>

          <div className="arc-2col" style={{ display: 'grid', gridTemplateColumns: '1.5fr 0.9fr', gap: 48, alignItems: 'start', marginTop: 64 }}>
            <motion.div {...rev(0.1)}>
              <BrowserFrame src="/arc/onboarding.png" alt="ARC admin onboarding — 7-stage governed setup" url="arc.sapio.systems/onboarding" caption="Admin onboarding · 7-stage governed setup sequence" />
            </motion.div>
            <div>
              {/* checklist cascade */}
              <div style={{ background: BG2, border: `1px solid ${RULE}`, borderRadius: 16, padding: '26px 24px', marginBottom: 36 }}>
                <div className="font-mono" style={{ fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: INK3, marginBottom: 18 }}>Setup sequence</div>
                {['Company configuration', 'Product master', 'Induction & training', 'Goals & performance', 'Payout management', 'Tool kit', 'Go live'].map((s, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 + i * 0.13, duration: 0.5, ease: EASE }}
                    style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '9px 0', borderBottom: i < 6 ? `1px solid rgba(244,245,247,0.07)` : 'none' }}>
                    <motion.span initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.13, type: 'spring', stiffness: 320, damping: 18 }}
                      style={{ width: 18, height: 18, borderRadius: '50%', background: i === 6 ? GREEN : 'rgba(79,141,247,0.16)', border: `1px solid ${i === 6 ? GREEN : 'rgba(79,141,247,0.5)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="9" height="7" viewBox="0 0 9 7"><path d="M1 3.5L3.4 6L8 1" stroke={i === 6 ? '#0E0F13' : BLUE} strokeWidth="1.6" fill="none" strokeLinecap="round" /></svg>
                    </motion.span>
                    <span style={{ fontSize: '0.85rem', color: i === 6 ? INK : INK2 }}>{s}</span>
                    <span className="font-mono" style={{ marginLeft: 'auto', fontSize: '0.58rem', color: INK3 }}>{String(i + 1).padStart(2, '0')}</span>
                  </motion.div>
                ))}
              </div>
              <motion.div {...rev(0.15)} style={{ display: 'flex', justifyContent: 'center' }}>
                <PhoneFrame src="/arc/training.png" alt="ARC training effectiveness tracking" caption="Training effectiveness · location-wise induction" w={228} />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ 03 TARGET ════════ */}
      <section style={{ borderTop: `1px solid ${RULE}`, background: BG2 }}>
        <div className="wrap" style={{ paddingTop: 110, paddingBottom: 110 }}>
          <div className="arc-2col" style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.4fr', gap: 56, alignItems: 'center', marginBottom: 64 }}>
            <div>
              <motion.div {...rev(0)}><Mono>03 · Target</Mono></motion.div>
              <motion.div {...rev(0.06)}><H2>Performance designed, <Em>not assumed.</Em></H2></motion.div>
              <motion.div {...rev(0.12)}><Body max={440}>Balanced scorecards weight KPIs across four categories. The weights must add to exactly 100% — performance becomes a designed contract, assigned and approved per agent.</Body></motion.div>

              {/* weights fill to 100 */}
              <div style={{ marginTop: 34 }}>
                {[['Product', 40], ['Operational', 25], ['Financial', 20], ['Service', 15]].map(([k, w], i) => (
                  <div key={k} style={{ marginBottom: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span className="font-mono" style={{ fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: INK2 }}>{k} KPIs</span>
                      <motion.span className="font-mono" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 + i * 0.18 }} style={{ fontSize: '0.62rem', color: BLUE }}>{w}%</motion.span>
                    </div>
                    <div style={{ height: 6, background: BG3, borderRadius: 100, overflow: 'hidden' }}>
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${w}%` }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.18, duration: 0.9, ease: EASE }}
                        style={{ height: '100%', borderRadius: 100, background: `linear-gradient(90deg, rgba(79,141,247,0.55), ${BLUE})` }} />
                    </div>
                  </div>
                ))}
                <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 1.1, duration: 0.5 }}
                  className="font-mono" style={{ display: 'flex', justifyContent: 'space-between', borderTop: `1px solid ${RULE}`, paddingTop: 12, fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  <span style={{ color: INK3 }}>Weighted total</span><span style={{ color: GREEN }}>= 100% ✓</span>
                </motion.div>
              </div>
            </div>
            <motion.div {...rev(0.1)}>
              <BrowserFrame src="/arc/scorecard.png" alt="ARC balanced scorecard templates" url="arc.sapio.systems/scorecards" caption="Balanced scorecard · 4 KPI categories weighted to 100%" />
            </motion.div>
          </div>
          <motion.div {...rev(0.05)}>
            <BrowserFrame src="/arc/target-approval.png" alt="ARC per-agent target approval and progress" url="arc.sapio.systems/targets" caption="Target approval · per-agent progress and pending review" />
          </motion.div>
        </div>
      </section>

      {/* ════════ 04 EXECUTE ════════ */}
      <section style={{ borderTop: `1px solid ${RULE}` }}>
        <div className="wrap" style={{ paddingTop: 110, paddingBottom: 110 }}>
          <div className="arc-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
            <div style={{ order: 0 }}>
              <motion.div {...rev(0)}><Mono>04 · Execute</Mono></motion.div>
              <motion.div {...rev(0.06)}><H2>Where the system <Em>meets reality.</Em></H2></motion.div>
              <motion.div {...rev(0.12)}><Body max={460}>Agents log visits and calls, update target progress and upload proof — geo-stamped at the source. The field app serves their workflow instead of competing with it: data collected at the right moment, not the worst one.</Body></motion.div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 30, maxWidth: 360 }}>
                {[['📍', 'Geo-stamped at capture', GREEN], ['⬆', 'Proof attached to the task itself', BLUE], ['◷', 'Logged in-flow — no end-of-day recall', BLUE]].map(([ic, t, c], i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.16, duration: 0.55, ease: EASE }}
                    style={{ display: 'flex', alignItems: 'center', gap: 12, background: BG2, border: `1px solid ${RULE}`, borderRadius: 12, padding: '12px 16px' }}>
                    <span style={{ fontSize: '0.85rem', color: c }}>{ic}</span>
                    <span className="font-mono" style={{ fontSize: '0.68rem', letterSpacing: '0.06em', color: INK2 }}>{t}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="arc-phones" style={{ display: 'flex', gap: 28, justifyContent: 'center', alignItems: 'flex-start' }}>
              <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, ease: EASE }} style={{ marginTop: 44 }}>
                <PhoneFrame src="/arc/field-home.png" alt="ARC field agent home with KPIs and AI assistant" caption="Agent home · KPIs & AI assistant" w={244} />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 70 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, delay: 0.15, ease: EASE }}>
                <PhoneFrame src="/arc/field-target.png" alt="ARC field target update with geo-verified proof" caption="Target update · geo-verified proof" w={244} />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ 05 VERIFY ════════ */}
      <section style={{ borderTop: `1px solid ${RULE}`, background: BG2 }}>
        <div className="wrap" style={{ paddingTop: 110, paddingBottom: 110 }}>
          <motion.div {...rev(0)}><Mono>05 · Verify</Mono></motion.div>
          <motion.div {...rev(0.06)}><H2>Trust in a distributed workforce is <Em>a design problem.</Em></H2></motion.div>
          <motion.div {...rev(0.12)}><Body>Every field record carries four independent signals. Verification that respects operational reality — &ldquo;customer was not available&rdquo; is as valid a record as a completed visit.</Body></motion.div>

          <div className="arc-2col" style={{ display: 'grid', gridTemplateColumns: '0.85fr 1.45fr', gap: 52, alignItems: 'center', marginTop: 60 }}>
            {/* verification cascade */}
            <div style={{ background: BG, border: `1px solid ${RULE}`, borderRadius: 16, padding: '28px 26px' }}>
              <div className="font-mono" style={{ fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: INK3, marginBottom: 20 }}>Verification pipeline</div>
              {[['Face recognition', 'biometric match'], ['Geo-location', 'co-ordinates matched'], ['Timestamp', 'activity window valid'], ['Human context', 'comment recorded']].map(([t, d], i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.22, duration: 0.5, ease: EASE }}
                  style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: `1px solid rgba(244,245,247,0.07)` }}>
                  <motion.span initial={{ scale: 0, rotate: -40 }} whileInView={{ scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ delay: 0.36 + i * 0.22, type: 'spring', stiffness: 300, damping: 16 }}
                    style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(63,184,115,0.14)', border: `1px solid ${GREEN}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="10" height="8" viewBox="0 0 10 8"><path d="M1 4L3.8 6.8L9 1" stroke={GREEN} strokeWidth="1.7" fill="none" strokeLinecap="round" /></svg>
                  </motion.span>
                  <div>
                    <div style={{ fontSize: '0.875rem', color: INK }}>{t}</div>
                    <div className="font-mono" style={{ fontSize: '0.58rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: INK3, marginTop: 3 }}>{d}</div>
                  </div>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 1.25, type: 'spring', stiffness: 260, damping: 18 }}
                style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
                <span className="font-mono" style={{ fontSize: '0.68rem', letterSpacing: '0.18em', color: '#0E0F13', background: GREEN, borderRadius: 7, padding: '8px 22px', boxShadow: `0 0 26px rgba(63,184,115,0.4)` }}>VERIFIED ✓</span>
              </motion.div>
            </div>
            <motion.div {...rev(0.1)}>
              <BrowserFrame src="/arc/target-setting.png" alt="ARC agent verification — face, geo, timestamp" url="arc.sapio.systems/verification" caption="Agent verification · biometric + geo-match + timestamp + comment" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════ 06 GOVERN — command center climax ════════ */}
      <section style={{ borderTop: `1px solid ${RULE}`, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(60% 50% at 50% 30%, rgba(79,141,247,0.08) 0%, transparent 70%)' }} />
        <div className="wrap" style={{ paddingTop: 110, paddingBottom: 110, position: 'relative' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <motion.div {...rev(0)}><Mono>06 · Govern</Mono></motion.div>
            <motion.div {...rev(0.06)}>
              <h2 className="font-display" style={{ fontSize: 'clamp(1.9rem, 3.6vw, 3rem)', fontWeight: 500, lineHeight: 1.14, letterSpacing: '-0.02em', color: INK, maxWidth: '24ch', margin: '0 auto 22px' }}>
                A distributed workforce made into <Em>a single decision surface.</Em>
              </h2>
            </motion.div>
            <motion.div {...rev(0.12)}>
              <p style={{ fontSize: '1.0625rem', lineHeight: 1.7, color: INK2, maxWidth: 640, margin: '0 auto' }}>
                Live workforce distribution across India, regional headcount, attendance and productivity scoring, expense breakdowns — and an alert stream surfacing anomalies the moment they happen.
              </p>
            </motion.div>
          </div>

          <div style={{ position: 'relative', maxWidth: 1040, margin: '0 auto' }}>
            <motion.div {...rev(0.08)}>
              <BrowserFrame src="/arc/command-center.png" alt="ARC command center — full decision surface" url="arc.sapio.systems/command-center" caption="Command center · distribution map, regional KPIs, live alerts, expenses, productivity" />
            </motion.div>
            {/* sliding alerts */}
            <motion.div className="hide-mobile" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.55, duration: 0.7, ease: EASE }}
              style={{ position: 'absolute', right: -40, top: '12%', width: 240, background: 'rgba(21,23,29,0.95)', border: `1px solid ${RULE}`, borderRadius: 14, padding: '16px 18px', backdropFilter: 'blur(12px)', boxShadow: '0 22px 60px -14px rgba(0,0,0,0.75)' }}>
              <div className="font-mono" style={{ fontSize: '0.56rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: INK3, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                <i className="arc-pulse" style={{ width: 6, height: 6, borderRadius: '50%', background: '#E0915F' }} />Live alerts
              </div>
              {[['High absenteeism · 3 sites', '#E0915F'], ['Location mismatch flagged', '#F87171'], ['Payroll approval pending', BLUE]].map(([a, c], i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.8 + i * 0.25, duration: 0.5 }}
                  style={{ fontSize: '0.72rem', color: INK2, padding: '8px 0', borderBottom: i < 2 ? '1px solid rgba(244,245,247,0.07)' : 'none', display: 'flex', alignItems: 'center', gap: 9 }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: c, flexShrink: 0 }} />{a}
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* PMI + MIS */}
          <div className="arc-2col" style={{ display: 'grid', gridTemplateColumns: '0.95fr 1.05fr', gap: 52, alignItems: 'center', marginTop: 96 }}>
            <div>
              <motion.div {...rev(0)}>
                <div style={{ background: BG2, border: `1px solid rgba(79,141,247,0.35)`, borderRadius: 16, padding: '30px 28px', boxShadow: '0 0 50px -18px rgba(79,141,247,0.35)' }}>
                  <Mono mb={14}>Potential Misuse Index</Mono>
                  <div style={{ fontSize: '1.35rem', fontWeight: 600, letterSpacing: '-0.02em', color: INK, marginBottom: 12, lineHeight: 1.3 }}>Detection over demand.</div>
                  <p style={{ fontSize: '0.95rem', lineHeight: 1.65, color: INK2, margin: 0 }}>
                    Instead of demanding more proof from agents, ARC watches for anomalies at the system level — login failures, onboarding flag mismatches, location discrepancies, signature inconsistencies. This is where the proof-of-work insight resolves.
                  </p>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 18 }}>
                    {['login anomalies', 'geo discrepancies', 'signature drift', 'flag mismatches'].map((t, i) => (
                      <span key={i} className="font-mono" style={{ fontSize: '0.58rem', letterSpacing: '0.08em', color: BLUE, border: '1px solid rgba(79,141,247,0.3)', borderRadius: 100, padding: '6px 12px' }}>{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
            <motion.div {...rev(0.1)}>
              <ScrollFrame src="/arc/mis.png" alt="ARC MIS dashboard — decision support" caption="MIS · decision support — the surface scrolls so leadership doesn't dig" h={470} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════ 07 PAY ════════ */}
      <section style={{ borderTop: `1px solid ${RULE}`, background: BG2 }}>
        <div className="wrap" style={{ paddingTop: 110, paddingBottom: 110 }}>
          <motion.div {...rev(0)}><Mono>07 · Pay</Mono></motion.div>
          <motion.div {...rev(0.06)}><H2>Performance connects to money <Em>through design.</Em></H2></motion.div>
          <motion.div {...rev(0.12)}><Body>Payout templates by channel, function, role and hierarchy close the loop from field execution to compensation — with approval workflows between governed performance and released payment.</Body></motion.div>

          {/* flow */}
          <motion.div {...rev(0.1)} className="arc-flow" style={{ display: 'flex', alignItems: 'center', gap: 0, margin: '52px 0 56px', maxWidth: 760 }}>
            {[['Performance', 'governed scorecards'], ['Approval', 'workflow gate'], ['Payout', 'released payment']].map(([t, d], i) => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', flex: i < 2 ? 1 : 'none' }}>
                <div style={{ background: BG, border: `1px solid ${i === 2 ? GREEN : RULE}`, borderRadius: 14, padding: '18px 24px', textAlign: 'center', minWidth: 150, boxShadow: i === 2 ? `0 0 36px -10px rgba(63,184,115,0.45)` : 'none' }}>
                  <div className="font-mono" style={{ fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: i === 2 ? GREEN : INK }}>{t}</div>
                  <div className="font-mono" style={{ fontSize: '0.56rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: INK3, marginTop: 6 }}>{d}</div>
                </div>
                {i < 2 && (
                  <div style={{ flex: 1, height: 2, background: RULE, position: 'relative', overflow: 'visible', minWidth: 40 }}>
                    <span className="arc-dot" style={{ position: 'absolute', top: -2.5, left: 0, width: 7, height: 7, borderRadius: '50%', background: BLUE, boxShadow: `0 0 10px ${BLUE}`, animationDelay: `${i * 1.1}s` }} />
                  </div>
                )}
              </div>
            ))}
          </motion.div>

          <motion.div {...rev(0.05)}>
            <BrowserFrame src="/arc/payout.png" alt="ARC payout configuration by channel, function, role" url="arc.sapio.systems/payout" caption="Payout configuration · channel · function · role · hierarchy → run payroll" />
          </motion.div>
        </div>
      </section>

      {/* ════════ DESIGN JUDGMENT ════════ */}
      <section style={{ borderTop: `1px solid ${RULE}`, background: BG }}>
        <div className="wrap-reading" style={{ paddingTop: 130, paddingBottom: 130, textAlign: 'center' }}>
          <motion.div {...rev(0)}><Mono>Design judgment</Mono></motion.div>
          <motion.blockquote {...rev(0.08)} className="font-display" style={{ fontSize: 'clamp(1.7rem, 3.4vw, 2.7rem)', fontWeight: 500, lineHeight: 1.3, letterSpacing: '-0.015em', color: INK, margin: '0 0 26px' }}>
            Accountability was preserved by <Em>decoupling reporting from completion</Em> — not by demanding more from the field.
          </motion.blockquote>
          <motion.p {...rev(0.16)} style={{ fontSize: '1rem', lineHeight: 1.7, color: INK2, margin: 0 }}>
            Data collected at the right moment, not the worst one. The system absorbs the burden of proof so the field can absorb the work.
          </motion.p>
        </div>
      </section>

      {/* ════════ OUTCOME ════════ */}
      <section style={{ borderTop: `1px solid ${RULE}`, background: BG2 }}>
        <div className="wrap" style={{ paddingTop: 110, paddingBottom: 120 }}>
          <motion.div {...rev(0)}><Mono color={GREEN}>Outcome</Mono></motion.div>
          <motion.div {...rev(0.06)}><H2 max="26ch">From tracking the workforce to <Em>understanding it.</Em></H2></motion.div>
          <motion.div {...rev(0.12)}><Body max={620}>ARC shipped across web and mobile as a complete workforce operating system — adopted across financial organizations and municipal operations, including BMC Mumbai and KBZ Bank Malaysia.</Body></motion.div>

          <motion.div {...rev(0.1)} className="arc-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, borderTop: `1px solid ${RULE}`, marginTop: 56, paddingTop: 34 }}>
            {[[28542, '', 'Field workforce on ARC'], [7, '', 'Lifecycle stages, one loop'], [2, '', 'Platforms · web + mobile'], [4, '', 'Verification signals per record']].map(([v, suf, l], i) => (
              <div key={i}>
                <div className="font-mono" style={{ fontSize: 'clamp(1.7rem, 2.8vw, 2.5rem)', color: INK, letterSpacing: '-0.02em', lineHeight: 1 }}><Counter to={v} suffix={suf} /></div>
                <div className="font-mono" style={{ fontSize: '0.6rem', letterSpacing: '0.13em', textTransform: 'uppercase', color: INK3, marginTop: 10, lineHeight: 1.5 }}>{l}</div>
              </div>
            ))}
          </motion.div>

          <div className="arc-trio" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.2fr 0.7fr', gap: 28, marginTop: 72, alignItems: 'start' }}>
            <motion.div {...rev(0.05)}><BrowserFrame src="/arc/dashboard.png" alt="ARC operations dashboard" url="arc.sapio.systems" caption="Operations dashboard" /></motion.div>
            <motion.div {...rev(0.12)}><BrowserFrame src="/arc/performance.png" alt="ARC performance governance" url="arc.sapio.systems/performance" caption="Performance governance" /></motion.div>
            <motion.div {...rev(0.19)} style={{ display: 'flex', justifyContent: 'center' }}><PhoneFrame src="/arc/field-home.png" alt="ARC field cockpit" caption="Field cockpit" w={200} /></motion.div>
          </div>
        </div>
      </section>

      {/* ════════ NEXT ════════ */}
      <Link href="/work/indhi" style={{ display: 'block', textDecoration: 'none', background: BG, borderTop: `1px solid ${RULE}` }}>
        <div className="wrap arc-next" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, paddingTop: 52, paddingBottom: 52 }}>
          <div>
            <span className="font-mono" style={{ fontSize: '0.62rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: INK3, display: 'block', marginBottom: 10 }}>Next project</span>
            <span className="font-display" style={{ fontSize: 'clamp(1.7rem, 4vw, 2.8rem)', fontWeight: 500, color: INK, letterSpacing: '-0.02em' }}>INDHI — Smart Infrastructure OS</span>
          </div>
          <span className="font-mono arc-next-arrow" style={{ fontSize: '1.5rem', color: BLUE }}>→</span>
        </div>
      </Link>

      {/* ── styles: decoration only (critical text is inline) ── */}
      <style jsx global>{`
        .arc-pulse { animation: arcPulse 2s cubic-bezier(0.4,0,0.6,1) infinite; }
        @keyframes arcPulse { 0%{box-shadow:0 0 0 0 rgba(63,184,115,0.5),0 0 10px rgba(63,184,115,0.7)} 70%{box-shadow:0 0 0 7px rgba(63,184,115,0),0 0 10px rgba(63,184,115,0.7)} 100%{box-shadow:0 0 0 0 rgba(63,184,115,0),0 0 10px rgba(63,184,115,0.7)} }
        .arc-boot { display:inline-block; overflow:hidden; white-space:nowrap; vertical-align:bottom; border-right:1px solid rgba(79,141,247,0.7); animation: arcType 2.2s steps(44,end) 0.5s both, arcCaret 1s step-end 2.8s 4; }
        @keyframes arcType { from{width:0} to{width:100%} }
        @keyframes arcCaret { 50%{border-color:transparent} }
        .arc-float { animation: arcFloat 7s ease-in-out infinite; }
        .arc-float2 { animation: arcFloat 8s ease-in-out 1.2s infinite; }
        @keyframes arcFloat { 0%,100%{margin-top:0} 50%{margin-top:-12px} }
        .arc-autoscroll { animation: arcScroll 26s ease-in-out 1.5s infinite; }
        @keyframes arcScroll { 0%,6%{transform:translateY(0)} 44%,56%{transform:translateY(calc(-100% + var(--fh,470px)))} 94%,100%{transform:translateY(0)} }
        .arc-dot { animation: arcTravel 2.2s ease-in-out infinite; }
        @keyframes arcTravel { 0%{left:0;opacity:0} 12%{opacity:1} 88%{opacity:1} 100%{left:calc(100% - 7px);opacity:0} }
        .arc-next:hover .arc-next-arrow { transform: translateX(8px); }
        .arc-next-arrow { transition: transform 0.3s cubic-bezier(0.25,1,0.5,1); display:inline-block; }
        @media (max-width: 980px) {
          .arc-2col { grid-template-columns: 1fr !important; gap: 44px !important; }
          .arc-spine { grid-template-columns: 1fr !important; gap: 36px !important; align-items: start !important; padding-top: 8vh; }
          .arc-spine > div:first-child { flex-direction: row !important; padding: 0 0 0 0 !important; gap: 14px; overflow-x: auto; }
          .arc-spine > div:first-child > div { flex-direction: column !important; gap: 8px !important; }
          .arc-spine > div:first-child > div > span:first-child { position: static !important; }
          .arc-stats { grid-template-columns: repeat(2, 1fr) !important; gap: 32px 20px !important; }
          .arc-trio { grid-template-columns: 1fr !important; }
          .arc-phones { flex-wrap: wrap; }
          .arc-flow { flex-direction: column; align-items: stretch !important; gap: 14px; }
          .arc-flow > div { flex-direction: column !important; }
          .arc-flow > div > div:last-child { display: none; }
          .hide-mobile { display: none !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .arc-boot, .arc-float, .arc-float2, .arc-autoscroll, .arc-dot, .arc-pulse { animation: none !important; width: auto; }
        }
      `}</style>
    </motion.div>
  );
}
