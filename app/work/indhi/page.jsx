'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { MobileBackButton } from '@/components/CaseStudyNav';
import ReadingProgress from '@/components/ReadingProgress';

/* ════════════════════════════════════════════════════════════════
   INDHI — Smart Infrastructure OS · cinematic dark case study
   Scroll tells the story: boot → problem → 5-level spine → modules
   Same system as ARC.
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

/* ── primitives (shared system with ARC) ─────────────────────── */
function Mono({ children, color = BLUE, mb = 20, size = '0.6875rem' }) {
  return <span className="font-mono" style={{ fontSize: size, letterSpacing: '0.16em', textTransform: 'uppercase', color, display: 'block', marginBottom: mb }}>{children}</span>;
}
function H2({ children, max = '22ch' }) {
  return <h2 className="font-display" style={{ fontSize: 'clamp(1.9rem, 3.6vw, 3rem)', fontWeight: 500, lineHeight: 1.14, letterSpacing: '-0.02em', color: INK, maxWidth: max, margin: '0 0 22px' }}>{children}</h2>;
}
function Body({ children, max = 560 }) {
  return <p style={{ fontSize: '1.0625rem', lineHeight: 1.7, color: INK2, maxWidth: max, margin: 0 }}>{children}</p>;
}
function Em({ children }) {
  return <em className="font-serif" style={{ fontStyle: 'italic', color: BLUE, textShadow: '0 0 22px rgba(79,141,247,0.35)' }}>{children}</em>;
}

function BrowserFrame({ src, alt, url = 'indhi.dhi.systems', caption, priority = false, children }) {
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
function ScrollFrame({ src, alt, caption, url, h = 470 }) {
  return (
    <figure style={{ margin: 0 }}>
      <div style={{ borderRadius: 14, background: BG2, border: `1px solid ${RULE}`, boxShadow: '0 24px 70px -18px rgba(0,0,0,0.65)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', borderBottom: `1px solid ${RULE}`, background: BG3 }}>
          <span style={{ display: 'flex', gap: 6 }}>
            <i style={{ width: 9, height: 9, borderRadius: '50%', background: '#F87171', display: 'block' }} />
            <i style={{ width: 9, height: 9, borderRadius: '50%', background: '#FBBF24', display: 'block' }} />
            <i style={{ width: 9, height: 9, borderRadius: '50%', background: GREEN, display: 'block' }} />
          </span>
          <span className="font-mono" style={{ flex: 1, textAlign: 'center', fontSize: '0.625rem', color: INK3 }}>{url}</span>
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
const LEVELS = [
  { n: '01', t: 'Organization', d: 'One account governs every property beneath it. Policy flows down, never sideways.' },
  { n: '02', t: 'Locations', d: 'Buildings and homes — each with its own occupants, billing and rules.' },
  { n: '03', t: 'Groups', d: 'Rooms and zones: bedroom, living room, lobby. Spaces, not wires.' },
  { n: '04', t: 'Devices', d: 'Lights, locks, sensors, AC — provisioned, inventoried, accountable.' },
  { n: '05', t: 'Scenes', d: 'Intentions made executable: comfort, away, night, energy-saver.' },
];

/* ════════════════════ PAGE ════════════════════ */
export default function INDHIPage() {
  const reduced = useReducedMotion();

  /* hero scroll-flatten */
  const heroRef = useRef(null);
  const { scrollYProgress: heroP } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const fRotX = useTransform(heroP, [0, 1], [9, 0]);
  const fScale = useTransform(heroP, [0, 1], [0.97, 1.015]);
  const fY = useTransform(heroP, [0, 1], [0, -26]);

  /* spine: 5-level data model */
  const spineRef = useRef(null);
  const { scrollYProgress: spineP } = useScroll({ target: spineRef, offset: ['start start', 'end end'] });
  const [active, setActive] = useState(0);
  useMotionValueEvent(spineP, 'change', (v) => setActive(Math.min(LEVELS.length - 1, Math.floor(v * LEVELS.length))));
  const lineScale = spineP;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} style={{ background: BG, minHeight: '100vh', color: INK }}>
      <ReadingProgress />
      <MobileBackButton />

      {/* ── fixed header ── */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: 'rgba(14,15,19,0.62)', backdropFilter: 'blur(20px) saturate(1.6)', WebkitBackdropFilter: 'blur(20px) saturate(1.6)', borderBottom: `1px solid rgba(244,245,247,0.1)` }}>
        <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 16, paddingBottom: 16 }}>
          <Link href="/" className="link-line font-mono" style={{ fontSize: '0.75rem', letterSpacing: '0.04em', color: INK }}>← Back to Home</Link>
          <span className="font-mono hide-mobile" style={{ fontSize: '0.6875rem', color: INK3, letterSpacing: '0.04em' }}>INDHI — Smart Infrastructure OS</span>
          <Link href="/work/trumac" className="link-line font-mono" style={{ fontSize: '0.75rem', letterSpacing: '0.04em', color: BLUE }}>Next: TruMac →</Link>
        </div>
      </div>

      {/* ════════ HERO — the system boots ════════ */}
      <section ref={heroRef} style={{ position: 'relative', overflow: 'hidden', paddingTop: 150 }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(58% 44% at 50% 0%, rgba(79,141,247,0.13) 0%, transparent 65%)' }} />
        <div style={{ position: 'absolute', inset: 0, opacity: 0.5, backgroundImage: 'linear-gradient(rgba(244,245,247,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(244,245,247,0.022) 1px, transparent 1px)', backgroundSize: '48px 48px', maskImage: 'radial-gradient(ellipse 75% 60% at 50% 20%, #000 30%, transparent 80%)', WebkitMaskImage: 'radial-gradient(ellipse 75% 60% at 50% 20%, #000 30%, transparent 80%)' }} />

        <div className="wrap-wide" style={{ position: 'relative', textAlign: 'center' }}>
          <motion.div {...rev(0)} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '7px 16px', borderRadius: 100, background: BG2, border: `1px solid ${RULE}`, marginBottom: 30 }}>
            <i className="arc-pulse" style={{ width: 7, height: 7, borderRadius: '50%', background: GREEN, boxShadow: `0 0 10px ${GREEN}` }} />
            <span className="font-mono" style={{ fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: INK2 }}>Dhi Technologies · IoT SaaS · 2023 · Primary</span>
          </motion.div>

          <motion.h1 {...rev(0.08)} style={{ fontSize: 'clamp(2.5rem, 5.6vw, 4.6rem)', fontWeight: 600, lineHeight: 1.05, letterSpacing: '-0.035em', color: INK, maxWidth: '22ch', margin: '0 auto 24px' }}>
            A home is not a network. It&apos;s <span className="font-serif" style={{ fontStyle: 'italic', fontWeight: 500, color: BLUE, textShadow: '0 0 26px rgba(79,141,247,0.45)' }}>a set of intentions.</span>
          </motion.h1>

          <motion.p {...rev(0.16)} style={{ fontSize: '1.0625rem', lineHeight: 1.7, color: INK2, maxWidth: 620, margin: '0 auto 26px' }}>
            INDHI is a smart-infrastructure operating system — one data model running web governance and mobile control: monitoring, automation, energy and billing for the built environment.
          </motion.p>

          <motion.div {...rev(0.22)} className="font-mono" style={{ fontSize: '0.6875rem', letterSpacing: '0.1em', color: INK3, marginBottom: 56 }}>
            <span className="arc-boot">&gt; indhi os · spaces synced · automations armed · <span style={{ color: GREEN }}>LIVE</span></span>
          </motion.div>

          {/* command center flattens on scroll */}
          <div style={{ perspective: 1300, maxWidth: 1080, margin: '0 auto' }}>
            <motion.div style={{ rotateX: reduced ? 0 : fRotX, scale: reduced ? 1 : fScale, y: reduced ? 0 : fY, transformOrigin: '50% 18%', position: 'relative' }}>
              <BrowserFrame src="/indhi/dashboard.png" alt="INDHI web command center — users, groups, devices, power usage" url="indhi.dhi.systems/dashboard" priority caption="The web command center · users · groups · devices · power usage" />
              <motion.div className="hide-mobile arc-float" initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.7, ease: EASE }}
                style={{ position: 'absolute', left: -56, top: '16%', background: 'rgba(21,23,29,0.92)', border: `1px solid ${RULE}`, borderRadius: 12, padding: '12px 16px', backdropFilter: 'blur(10px)', boxShadow: '0 18px 50px -12px rgba(0,0,0,0.7)' }}>
                <div className="font-mono" style={{ fontSize: '0.56rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: INK3, marginBottom: 5 }}>Avg. power · today</div>
                <div className="font-mono" style={{ fontSize: '1.3rem', color: INK }}>1,200 <span style={{ fontSize: '0.62rem', color: BLUE }}>kW/H</span></div>
              </motion.div>
              <motion.div className="hide-mobile arc-float2" initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.65, duration: 0.7, ease: EASE }}
                style={{ position: 'absolute', right: -48, bottom: '20%', display: 'flex', alignItems: 'center', gap: 9, background: 'rgba(21,23,29,0.92)', border: `1px solid ${RULE}`, borderRadius: 100, padding: '10px 18px', backdropFilter: 'blur(10px)', boxShadow: '0 18px 50px -12px rgba(0,0,0,0.7)' }}>
                <i className="arc-pulse" style={{ width: 7, height: 7, borderRadius: '50%', background: GREEN, boxShadow: `0 0 8px ${GREEN}` }} />
                <span className="font-mono" style={{ fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: INK2 }}>All spaces responsive</span>
              </motion.div>
            </motion.div>
          </div>

          {/* deployed strip */}
          <motion.div {...rev(0.1)} style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(24px, 5vw, 64px)', flexWrap: 'wrap', borderTop: `1px solid ${RULE}`, maxWidth: 1080, margin: '64px auto 0', padding: '26px 0 80px' }}>
            {[['1', 'Data model, end to end'], ['2', 'Altitudes · admin + occupant'], ['7', 'Sensor conditions'], ['Web · iOS · Android', 'Shipped surfaces']].map(([v, l], i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div className="font-mono" style={{ fontSize: 'clamp(1.3rem, 2.2vw, 1.8rem)', color: INK, letterSpacing: '-0.01em' }}>{v}</div>
                <div className="font-mono" style={{ fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: INK3, marginTop: 8 }}>{l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════ PROBLEM — mental models ════════ */}
      <section style={{ borderTop: `1px solid ${RULE}`, background: BG }}>
        <div className="wrap" style={{ paddingTop: 110, paddingBottom: 110 }}>
          <div className="arc-2col" style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 64, alignItems: 'center' }}>
            <div>
              <motion.div {...rev(0)}><Mono color="#E0915F">The problem · mental models</Mono></motion.div>
              <motion.div {...rev(0.06)}>
                <H2>IoT platforms mirror device topology — <Em>not how people think about spaces.</Em></H2>
              </motion.div>
              <motion.div {...rev(0.12)}>
                <Body>People don&apos;t think in protocols and pairing. They think in spaces, intentions and outcomes — and the people running buildings need to govern infrastructure, not just toggle gadgets.</Body>
              </motion.div>
              <motion.div {...rev(0.18)} style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 28 }}>
                {['pairing-first onboarding', 'device lists as UI', 'toggling ≠ governing'].map((c, i) => (
                  <span key={i} className="font-mono" style={{ fontSize: '0.62rem', letterSpacing: '0.08em', color: '#E0915F', border: '1px solid rgba(224,145,95,0.3)', background: 'rgba(224,145,95,0.07)', borderRadius: 100, padding: '7px 14px' }}>{c}</span>
                ))}
              </motion.div>
            </div>

            {/* intent → device mapping */}
            <motion.div {...rev(0.1)} style={{ background: BG2, border: `1px solid ${RULE}`, borderRadius: 16, padding: '30px 26px 22px' }}>
              <div className="font-mono" style={{ fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: INK3, marginBottom: 18 }}>Human intent vs device topology</div>
              <svg viewBox="0 0 420 200" style={{ width: '100%', height: 'auto', display: 'block' }}>
                {[['COMFORT', 36], ['SECURITY', 100], ['EFFICIENCY', 164]].map(([t, y], i) => (
                  <g key={t}>
                    <rect x="8" y={y - 16} width="104" height="32" rx="8" fill="rgba(79,141,247,0.1)" stroke="rgba(79,141,247,0.4)" />
                    <text x="60" y={y + 4} textAnchor="middle" fill={BLUE} fontSize="10" fontFamily="DM Mono, monospace" letterSpacing="0.1em">{t}</text>
                  </g>
                ))}
                {[['AC', 24], ['LIGHTS', 72], ['LOCKS', 120], ['SENSORS', 168]].map(([t, y]) => (
                  <g key={t}>
                    <rect x="318" y={y - 13} width="94" height="26" rx="7" fill="rgba(244,245,247,0.04)" stroke="rgba(244,245,247,0.16)" />
                    <text x="365" y={y + 4} textAnchor="middle" fill={INK3} fontSize="9" fontFamily="DM Mono, monospace" letterSpacing="0.1em">{t}</text>
                  </g>
                ))}
                {[[36, 24], [36, 72], [100, 120], [100, 168], [164, 24], [164, 72]].map(([y1, y2], i) => (
                  <motion.path key={i} d={`M112 ${y1} C 210 ${y1}, 220 ${y2}, 318 ${y2}`} fill="none" stroke={BLUE} strokeWidth="1.4" strokeOpacity="0.55"
                    initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.1, delay: 0.2 + i * 0.14, ease: 'easeOut' }} />
                ))}
              </svg>
              <div className="font-mono" style={{ fontSize: '0.6rem', letterSpacing: '0.1em', color: INK3, marginTop: 14, textAlign: 'right' }}>the mapping is the design problem ↑</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════ THE SPINE — sticky 5-level data model ════════ */}
      <section ref={spineRef} style={{ position: 'relative', height: `${LEVELS.length * 58 + 64}vh`, background: BG2, borderTop: `1px solid ${RULE}` }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(50% 60% at 80% 50%, rgba(79,141,247,0.07) 0%, transparent 70%)' }} />
          <div className="wrap" style={{ width: '100%', position: 'relative' }}>
            <Mono>One data model · top to bottom</Mono>
            <div className="arc-spine" style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 'clamp(32px, 6vw, 96px)', alignItems: 'center', minHeight: '58vh' }}>

              {/* rail */}
              <div style={{ position: 'relative', paddingLeft: 26, alignSelf: 'stretch', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingTop: 6, paddingBottom: 6 }}>
                <div style={{ position: 'absolute', left: 5, top: 8, bottom: 8, width: 2, background: RULE, borderRadius: 2 }} />
                <motion.div style={{ position: 'absolute', left: 5, top: 8, bottom: 8, width: 2, background: `linear-gradient(${BLUE}, ${GREEN})`, borderRadius: 2, transformOrigin: 'top', scaleY: lineScale }} />
                {LEVELS.map((s, i) => (
                  <div key={s.n} style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 14, opacity: i <= active ? 1 : 0.36, transition: 'opacity 0.4s' }}>
                    <span style={{ position: 'absolute', left: -26, width: 12, height: 12, borderRadius: '50%', background: i < active ? BLUE : i === active ? GREEN : BG3, border: `2px solid ${i <= active ? (i === active ? GREEN : BLUE) : RULE}`, boxShadow: i === active ? `0 0 14px ${GREEN}` : 'none', transition: 'all 0.4s' }} />
                    <span className="font-mono" style={{ fontSize: '0.62rem', color: i === active ? GREEN : INK3, width: 22, transition: 'color 0.4s' }}>{s.n}</span>
                    <span className="font-mono" style={{ fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: i === active ? INK : INK2, transition: 'color 0.4s' }}>{s.t}</span>
                  </div>
                ))}
              </div>

              {/* active level display */}
              <div style={{ position: 'relative', minHeight: 260 }}>
                {LEVELS.map((s, i) => (
                  <motion.div key={s.n} animate={{ opacity: i === active ? 1 : 0, y: i === active ? 0 : (i < active ? -16 : 16) }} transition={{ duration: 0.45, ease: EASE }} style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', pointerEvents: 'none' }}>
                    <span className="font-mono" style={{ fontSize: 'clamp(4rem, 9vw, 7.5rem)', lineHeight: 1, color: 'rgba(79,141,247,0.16)', letterSpacing: '-0.04em', marginBottom: 6 }}>{s.n}</span>
                    <span style={{ fontSize: 'clamp(2rem, 4.4vw, 3.4rem)', fontWeight: 600, letterSpacing: '-0.03em', color: INK, lineHeight: 1.05, marginBottom: 16 }}>{s.t}</span>
                    <span style={{ fontSize: '1.05rem', lineHeight: 1.65, color: INK2, maxWidth: 480 }}>{s.d}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="font-mono hide-mobile" style={{ position: 'absolute', right: 56, bottom: -34, fontSize: '0.6rem', letterSpacing: '0.12em', color: INK3 }}>scroll ↓ to descend the data model</div>
          </div>
        </div>
      </section>

      {/* ════════ TWO ALTITUDES ════════ */}
      <section style={{ borderTop: `1px solid ${RULE}` }}>
        <div className="wrap" style={{ paddingTop: 110, paddingBottom: 110 }}>
          <motion.div {...rev(0)}><Mono>The split · admin & occupant</Mono></motion.div>
          <motion.div {...rev(0.06)}><H2>Same hierarchy, <Em>two altitudes.</Em></H2></motion.div>
          <motion.div {...rev(0.12)}><Body>One data model for two users. The web administrator provisions, governs and bills from above; the mobile occupant monitors and controls from inside the space.</Body></motion.div>

          <div className="arc-2col" style={{ display: 'grid', gridTemplateColumns: '1.5fr 0.9fr', gap: 48, alignItems: 'start', marginTop: 64 }}>
            <motion.div {...rev(0.1)}>
              <BrowserFrame src="/indhi/dashboard.png" alt="INDHI web admin — governance and analytics" url="indhi.dhi.systems/admin" caption="Web command center · admin governance & analytics" />
            </motion.div>
            <div>
              {/* altitude card */}
              <div style={{ background: BG2, border: `1px solid ${RULE}`, borderRadius: 16, padding: '26px 24px', marginBottom: 36 }}>
                <div className="font-mono" style={{ fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: INK3, marginBottom: 18 }}>Who does what</div>
                {[['Provisions & bills', 'admin · web', BLUE], ['Governs roles & security', 'admin · web', BLUE], ['Monitors & controls', 'occupant · mobile', GREEN]].map(([t, d, c], i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 + i * 0.16, duration: 0.5, ease: EASE }}
                    style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 0', borderBottom: i < 2 ? `1px solid rgba(244,245,247,0.07)` : 'none' }}>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: c, boxShadow: `0 0 8px ${c}`, flexShrink: 0 }} />
                    <span style={{ fontSize: '0.875rem', color: INK }}>{t}</span>
                    <span className="font-mono" style={{ marginLeft: 'auto', fontSize: '0.56rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: INK3 }}>{d}</span>
                  </motion.div>
                ))}
              </div>
              <motion.div {...rev(0.15)} style={{ display: 'flex', justifyContent: 'center' }}>
                <PhoneFrame src="/indhi/mobile-home.png" alt="INDHI mobile occupant app" caption="Mobile · occupant control" w={228} />
              </motion.div>
            </div>
          </div>

          {/* navigation strategy band */}
          <div style={{ marginTop: 96 }}>
            <motion.div {...rev(0)}><Mono>The web command center</Mono></motion.div>
            <motion.div {...rev(0.06)}><H2>The navigation is <Em>the product strategy.</Em></H2></motion.div>
            <motion.div {...rev(0.12)}><Body>Four clusters that tell you exactly who INDHI is for — multi-tenant infrastructure with roles, security, billing and reports. Not a smart-home gadget.</Body></motion.div>
            <div className="arc-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18, marginTop: 44 }}>
              {[['Management', 'users · roles · organizations'], ['Inventory', 'devices & provisioning'], ['Analytics', 'reports & power usage'], ['Setup', 'billing · security · plans']].map(([t, d], i) => (
                <motion.div key={t} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.12, duration: 0.55, ease: EASE }}
                  style={{ background: BG2, border: `1px solid ${RULE}`, borderRadius: 14, padding: '20px 20px' }}>
                  <div className="font-mono" style={{ fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: BLUE, marginBottom: 8 }}>{t}</div>
                  <div className="font-mono" style={{ fontSize: '0.58rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: INK3, lineHeight: 1.6 }}>{d}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════ TOUCH LAYER ════════ */}
      <section style={{ borderTop: `1px solid ${RULE}`, background: BG2 }}>
        <div className="wrap" style={{ paddingTop: 110, paddingBottom: 110 }}>
          <div className="arc-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
            <div>
              <motion.div {...rev(0)}><Mono>The touch layer</Mono></motion.div>
              <motion.div {...rev(0.06)}><H2>Complexity at the platform layer, <Em>simplicity at the touch layer.</Em></H2></motion.div>
              <motion.div {...rev(0.12)}><Body max={460}>For the occupant, controlling a device is one screen — warm, color or romantic mode, a radial intensity dial, instant feedback. The governance logic lives underneath; the person inside the space never feels it.</Body></motion.div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 30, maxWidth: 360 }}>
                {[['◐', 'Warm · color · romantic modes', BLUE], ['◎', 'Radial intensity dial', BLUE], ['⚡', 'Instant feedback — no app-think', GREEN]].map(([ic, t, c], i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.16, duration: 0.55, ease: EASE }}
                    style={{ display: 'flex', alignItems: 'center', gap: 12, background: BG, border: `1px solid ${RULE}`, borderRadius: 12, padding: '12px 16px' }}>
                    <span style={{ fontSize: '0.85rem', color: c }}>{ic}</span>
                    <span className="font-mono" style={{ fontSize: '0.68rem', letterSpacing: '0.06em', color: INK2 }}>{t}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="arc-phones" style={{ display: 'flex', gap: 28, justifyContent: 'center', alignItems: 'flex-start' }}>
              <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, ease: EASE }} style={{ marginTop: 44 }}>
                <PhoneFrame src="/indhi/device-control.png" alt="INDHI light control — modes and radial intensity" caption="Light control · warm / color / romantic · radial dial" w={244} />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 70 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, delay: 0.15, ease: EASE }}>
                <PhoneFrame src="/indhi/mobile-group.png" alt="INDHI group view — consumption and weekly report" caption="Group view · power & weekly usage" w={244} />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ AUTOMATION — the centerpiece ════════ */}
      <section style={{ borderTop: `1px solid ${RULE}`, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(60% 50% at 50% 30%, rgba(79,141,247,0.08) 0%, transparent 70%)' }} />
        <div className="wrap" style={{ paddingTop: 110, paddingBottom: 110, position: 'relative' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <motion.div {...rev(0)}><Mono>The automation engine · the centerpiece</Mono></motion.div>
            <motion.div {...rev(0.06)}>
              <h2 className="font-display" style={{ fontSize: 'clamp(1.9rem, 3.6vw, 3rem)', fontWeight: 500, lineHeight: 1.14, letterSpacing: '-0.02em', color: INK, maxWidth: '24ch', margin: '0 auto 22px' }}>
                IF the room is too warm, <Em>THEN cool it — before anyone asks.</Em>
              </h2>
            </motion.div>
            <motion.div {...rev(0.12)}>
              <p style={{ fontSize: '1.0625rem', lineHeight: 1.7, color: INK2, maxWidth: 640, margin: '0 auto' }}>
                Time-based or event-based triggers, seven sensor conditions, comparison operators, alert notifications. The moment INDHI stops being a remote control and becomes infrastructure that acts on its own.
              </p>
            </motion.div>
          </div>

          {/* IF → SENSOR → THEN pipeline */}
          <motion.div {...rev(0.08)} className="arc-flow" style={{ display: 'flex', alignItems: 'center', gap: 0, margin: '0 auto 56px', maxWidth: 820 }}>
            {[['IF', 'time or event trigger', BLUE], ['SENSOR', 'temperature > 26°', BLUE], ['THEN', 'scene: cool the room', GREEN]].map(([t, d, c], i) => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', flex: i < 2 ? 1 : 'none' }}>
                <div style={{ background: BG2, border: `1px solid ${i === 2 ? GREEN : RULE}`, borderRadius: 14, padding: '18px 24px', textAlign: 'center', minWidth: 170, boxShadow: i === 2 ? `0 0 36px -10px rgba(63,184,115,0.45)` : 'none' }}>
                  <div className="font-mono" style={{ fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: i === 2 ? GREEN : INK }}>{t}</div>
                  <div className="font-mono" style={{ fontSize: '0.56rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: INK3, marginTop: 6 }}>{d}</div>
                </div>
                {i < 2 && (
                  <div style={{ flex: 1, height: 2, background: RULE, position: 'relative', minWidth: 40 }}>
                    <span className="arc-dot" style={{ position: 'absolute', top: -2.5, left: 0, width: 7, height: 7, borderRadius: '50%', background: BLUE, boxShadow: `0 0 10px ${BLUE}`, animationDelay: `${i * 1.1}s` }} />
                  </div>
                )}
              </div>
            ))}
          </motion.div>

          <div style={{ position: 'relative', maxWidth: 1040, margin: '0 auto' }}>
            <motion.div {...rev(0.05)}>
              <BrowserFrame src="/indhi/automation.png" alt="INDHI web automation builder — IF condition THEN scene or device" url="indhi.dhi.systems/automation" caption="Web automation builder · IF condition → THEN scene or device" />
            </motion.div>
            <motion.div className="hide-mobile" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.55, duration: 0.7, ease: EASE }}
              style={{ position: 'absolute', right: -40, top: '10%', width: 240, background: 'rgba(21,23,29,0.95)', border: `1px solid ${RULE}`, borderRadius: 14, padding: '16px 18px', backdropFilter: 'blur(12px)', boxShadow: '0 22px 60px -14px rgba(0,0,0,0.75)' }}>
              <div className="font-mono" style={{ fontSize: '0.56rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: INK3, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                <i className="arc-pulse" style={{ width: 6, height: 6, borderRadius: '50%', background: GREEN }} />Scene log · live
              </div>
              {[['Scene triggered · AC 24°', GREEN], ['Motion → hallway 40%', BLUE], ['Humidity alert · kitchen', '#E0915F']].map(([a, c], i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.8 + i * 0.25, duration: 0.5 }}
                  style={{ fontSize: '0.72rem', color: INK2, padding: '8px 0', borderBottom: i < 2 ? '1px solid rgba(244,245,247,0.07)' : 'none', display: 'flex', alignItems: 'center', gap: 9 }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: c, flexShrink: 0 }} />{a}
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div {...rev(0.1)} style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginTop: 28, maxWidth: 760, marginLeft: 'auto', marginRight: 'auto' }}>
            {['Time-based', 'Event-based', 'Temperature', 'Motion', 'Light intensity', 'Moisture', 'Humidity', 'Current', 'Voltage', 'Scene response'].map((c) => (
              <span key={c} className="font-mono" style={{ fontSize: '0.58rem', letterSpacing: '0.08em', color: BLUE, border: '1px solid rgba(79,141,247,0.3)', borderRadius: 100, padding: '6px 12px' }}>{c}</span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════ ENERGY ════════ */}
      <section style={{ borderTop: `1px solid ${RULE}`, background: BG2 }}>
        <div className="wrap" style={{ paddingTop: 110, paddingBottom: 110 }}>
          <div className="arc-2col" style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 56, alignItems: 'center' }}>
            <div>
              <motion.div {...rev(0)}><Mono>Energy · the native unit</Mono></motion.div>
              <motion.div {...rev(0.06)}><H2>Every device, every group, <Em>accountable.</Em></H2></motion.div>
              <motion.div {...rev(0.12)}><Body max={480}>Consumption surfaces on every group card, every device entry, on web and mobile — kW/H as the platform&apos;s native unit of truth, not a buried report.</Body></motion.div>

              {/* energy meter card */}
              <motion.div {...rev(0.15)} style={{ background: BG, border: `1px solid ${RULE}`, borderRadius: 16, padding: '26px 24px', marginTop: 34, maxWidth: 460 }}>
                <div className="font-mono" style={{ fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: INK3, marginBottom: 10 }}>Avg. power · today, all groups</div>
                <div className="font-mono" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', color: INK, lineHeight: 1, marginBottom: 20 }}><Counter to={1200} /> <span style={{ fontSize: '0.9rem', color: BLUE }}>kW/H</span></div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 64 }}>
                  {[34, 52, 41, 68, 47, 78, 58].map((h, i) => (
                    <motion.div key={i} initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }} transition={{ delay: 0.25 + i * 0.09, duration: 0.7, ease: EASE }}
                      style={{ flex: 1, borderRadius: '4px 4px 0 0', background: i === 5 ? `linear-gradient(180deg, ${BLUE}, rgba(79,141,247,0.4))` : 'rgba(79,141,247,0.22)' }} />
                  ))}
                </div>
                <div className="font-mono" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.52rem', letterSpacing: '0.1em', color: INK3, marginTop: 8 }}>
                  <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span style={{ color: BLUE }}>SAT</span><span>SUN</span>
                </div>
              </motion.div>
            </div>
            <motion.div {...rev(0.1)} style={{ display: 'flex', justifyContent: 'center' }}>
              <PhoneFrame src="/indhi/mobile-group.png" alt="INDHI mobile weekly power report" caption="Mobile · weekly power report" w={262} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════ BUSINESS MODEL ════════ */}
      <section style={{ borderTop: `1px solid ${RULE}` }}>
        <div className="wrap" style={{ paddingTop: 110, paddingBottom: 110 }}>
          <motion.div {...rev(0)}><Mono>Monetization · designed as a product</Mono></motion.div>
          <motion.div {...rev(0.06)}><H2>From device count to <Em>recurring revenue.</Em></H2></motion.div>
          <motion.div {...rev(0.12)}><Body>Starters → Basic → Premium → Professional: a transparent feature-tier matrix with add-ons — scaling from a single-space trial to enterprise-managed properties.</Body></motion.div>

          <div className="arc-2col" style={{ display: 'grid', gridTemplateColumns: '0.95fr 1.05fr', gap: 52, alignItems: 'start', marginTop: 60 }}>
            <motion.div {...rev(0.05)}>
              <ScrollFrame src="/indhi/subscription.png" alt="INDHI subscription plans — free to enterprise" url="indhi.dhi.systems/plans" caption="Subscription · free trial to enterprise — the page scrolls" h={470} />
            </motion.div>
            <motion.div {...rev(0.12)}>
              <div style={{ border: `1px solid ${RULE}`, borderRadius: 14, overflow: 'hidden', background: BG2 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr 1fr 1fr 1fr' }}>
                  <div style={{ padding: '13px 16px', borderBottom: `1px solid ${RULE}` }} />
                  {['Starters', 'Basic', 'Premium', 'Pro'].map((t) => (
                    <div key={t} style={{ padding: '13px 10px', borderBottom: `1px solid ${RULE}`, textAlign: 'center', background: t === 'Premium' ? 'rgba(79,141,247,0.14)' : 'transparent' }}>
                      <span className="font-mono" style={{ fontSize: '0.66rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: t === 'Premium' ? BLUE : INK2 }}>{t}</span>
                    </div>
                  ))}
                  {[['Devices', ['5', '10', '20', '∞']], ['Groups', ['2', '5', '12', '∞']], ['Scenes', ['3', '8', '20', '∞']], ['Automation', ['—', '✓', '✓', '✓']], ['Users', ['1', '3', '10', '∞']]].map(([r, vals], ri) => (
                    <div key={r} style={{ display: 'contents' }}>
                      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 + ri * 0.1 }}
                        style={{ padding: '11px 16px', borderBottom: ri < 4 ? `1px solid rgba(244,245,247,0.07)` : 'none', fontSize: '0.875rem', color: INK2 }}>{r}</motion.div>
                      {vals.map((v, vi) => (
                        <motion.div key={vi} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.25 + ri * 0.1 + vi * 0.04 }}
                          style={{ padding: '11px 10px', borderBottom: ri < 4 ? `1px solid rgba(244,245,247,0.07)` : 'none', textAlign: 'center', background: vi === 2 ? 'rgba(79,141,247,0.06)' : 'transparent' }}>
                          <span className="font-mono" style={{ fontSize: '0.78rem', color: vi === 2 ? BLUE : INK3 }}>{v}</span>
                        </motion.div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <div className="font-mono" style={{ fontSize: '0.625rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: INK3, marginTop: 14, textAlign: 'center' }}>Feature-tier matrix · Premium highlighted</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════ DESIGN JUDGMENT ════════ */}
      <section style={{ borderTop: `1px solid ${RULE}`, background: BG }}>
        <div className="wrap-reading" style={{ paddingTop: 130, paddingBottom: 130, textAlign: 'center' }}>
          <motion.div {...rev(0)}><Mono>Design judgment</Mono></motion.div>
          <motion.blockquote {...rev(0.08)} className="font-display" style={{ fontSize: 'clamp(1.7rem, 3.4vw, 2.7rem)', fontWeight: 500, lineHeight: 1.3, letterSpacing: '-0.015em', color: INK, margin: '0 0 26px' }}>
            The interface mirrors <Em>how people think about spaces</Em> — not how devices network.
          </motion.blockquote>
          <motion.p {...rev(0.16)} style={{ fontSize: '1rem', lineHeight: 1.7, color: INK2, margin: 0 }}>
            Spaces, intentions and outcomes at the surface. Protocols, pairing and policy beneath it.
          </motion.p>
        </div>
      </section>

      {/* ════════ OUTCOME ════════ */}
      <section style={{ borderTop: `1px solid ${RULE}`, background: BG2 }}>
        <div className="wrap" style={{ paddingTop: 110, paddingBottom: 120 }}>
          <motion.div {...rev(0)}><Mono color={GREEN}>Outcome</Mono></motion.div>
          <motion.div {...rev(0.06)}><H2 max="26ch">From devices to <Em>infrastructure.</Em></H2></motion.div>
          <motion.div {...rev(0.12)}><Body max={620}>INDHI shipped across web, Android and iOS as one ecosystem — monitoring, control, automation, energy, administration and monetization. An operating system for the built environment.</Body></motion.div>

          <motion.div {...rev(0.1)} className="arc-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, borderTop: `1px solid ${RULE}`, marginTop: 56, paddingTop: 34 }}>
            {[[5, 'Levels in one data model'], [7, 'Sensor conditions'], [3, 'Shipped platforms'], [4, 'Pricing tiers']].map(([v, l], i) => (
              <div key={i}>
                <div className="font-mono" style={{ fontSize: 'clamp(1.7rem, 2.8vw, 2.5rem)', color: INK, letterSpacing: '-0.02em', lineHeight: 1 }}><Counter to={v} /></div>
                <div className="font-mono" style={{ fontSize: '0.6rem', letterSpacing: '0.13em', textTransform: 'uppercase', color: INK3, marginTop: 10, lineHeight: 1.5 }}>{l}</div>
              </div>
            ))}
          </motion.div>

          <div className="arc-trio" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.2fr 0.7fr', gap: 28, marginTop: 72, alignItems: 'start' }}>
            <motion.div {...rev(0.05)}><BrowserFrame src="/indhi/dashboard.png" alt="INDHI command center" url="indhi.dhi.systems" caption="Command center" /></motion.div>
            <motion.div {...rev(0.12)}><BrowserFrame src="/indhi/automation.png" alt="INDHI automation engine" url="indhi.dhi.systems/automation" caption="Automation engine" /></motion.div>
            <motion.div {...rev(0.19)} style={{ display: 'flex', justifyContent: 'center' }}><PhoneFrame src="/indhi/device-control.png" alt="INDHI device control" caption="Device control" w={200} /></motion.div>
          </div>
        </div>
      </section>

      {/* ════════ NEXT ════════ */}
      <Link href="/work/trumac" style={{ display: 'block', textDecoration: 'none', background: BG, borderTop: `1px solid ${RULE}` }}>
        <div className="wrap arc-next" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, paddingTop: 52, paddingBottom: 52 }}>
          <div>
            <span className="font-mono" style={{ fontSize: '0.62rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: INK3, display: 'block', marginBottom: 10 }}>Next project</span>
            <span className="font-display" style={{ fontSize: 'clamp(1.7rem, 4vw, 2.8rem)', fontWeight: 500, color: INK, letterSpacing: '-0.02em' }}>TruMac — Procurement Platform</span>
          </div>
          <span className="font-mono arc-next-arrow" style={{ fontSize: '1.5rem', color: BLUE }}>→</span>
        </div>
      </Link>

      {/* ── styles: decoration only (critical text is inline) ── */}
      <style jsx global>{`
        .arc-pulse { animation: arcPulse 2s cubic-bezier(0.4,0,0.6,1) infinite; }
        @keyframes arcPulse { 0%{box-shadow:0 0 0 0 rgba(63,184,115,0.5),0 0 10px rgba(63,184,115,0.7)} 70%{box-shadow:0 0 0 7px rgba(63,184,115,0),0 0 10px rgba(63,184,115,0.7)} 100%{box-shadow:0 0 0 0 rgba(63,184,115,0),0 0 10px rgba(63,184,115,0.7)} }
        .arc-boot { display:inline-block; overflow:hidden; white-space:nowrap; vertical-align:bottom; border-right:1px solid rgba(79,141,247,0.7); animation: arcType 2.2s steps(46,end) 0.5s both, arcCaret 1s step-end 2.8s 4; }
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
          .arc-spine > div:first-child { flex-direction: row !important; padding: 0 !important; gap: 14px; overflow-x: auto; }
          .arc-spine > div:first-child > div { flex-direction: column !important; gap: 8px !important; }
          .arc-spine > div:first-child > div > span:first-child { position: static !important; }
          .arc-stats { grid-template-columns: repeat(2, 1fr) !important; gap: 20px !important; }
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
