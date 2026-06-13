'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { MobileBackButton } from '@/components/CaseStudyNav';
import ReadingProgress from '@/components/ReadingProgress';

/* ════════════════════════════════════════════════════════════════
   TruMac — Procurement Platform
   A DEPTH story, not a sequence story. The product looks like
   e-commerce on the SURFACE and runs like embedded finance
   UNDERNEATH — so the page descends through layers, peels the
   surface to expose the machinery, and lets you DRAG the credit.
   Shares ARC's theme + type. Shares none of ARC's motion.
   ════════════════════════════════════════════════════════════════ */

const EASE = [0.22, 1, 0.36, 1];
const INK = '#F4F5F7';
const INK2 = 'rgba(244,245,247,0.62)';
const INK3 = 'rgba(244,245,247,0.40)';
const BG = '#0E0F13';
const BG2 = '#15171D';
const BG3 = '#1C1F27';
const RULE = 'rgba(244,245,247,0.12)';
const BLUE = '#4F8DF7';
const GREEN = '#3FB873';
const AMBER = '#E0915F';

/* sideways reveal — TruMac's base entrance (ARC used vertical y-rise) */
const slide = (d = 0, x = 0, y = 22) => ({ initial: { opacity: 0, x, y }, whileInView: { opacity: 1, x: 0, y: 0 }, viewport: { once: true, amount: 0.3 }, transition: { duration: 0.8, delay: d, ease: EASE } });

function Mono({ children, color = BLUE, mb = 18 }) {
  return <span className="font-mono" style={{ fontSize: '0.6875rem', letterSpacing: '0.16em', textTransform: 'uppercase', color, display: 'block', marginBottom: mb }}>{children}</span>;
}
function Display({ children, size = 'clamp(1.9rem, 3.6vw, 2.9rem)', max = '20ch', mb = 22, align = 'left' }) {
  return <h2 className="font-display" style={{ fontSize: size, fontWeight: 500, lineHeight: 1.12, letterSpacing: '-0.025em', color: INK, maxWidth: max, margin: align === 'center' ? `0 auto ${mb}px` : `0 0 ${mb}px`, textAlign: align }}>{children}</h2>;
}
function Body({ children, max = 540, align = 'left' }) {
  return <p style={{ fontSize: '1.0625rem', lineHeight: 1.75, color: INK2, maxWidth: max, margin: align === 'center' ? '0 auto' : 0, textAlign: align }}>{children}</p>;
}
function Em({ children }) {
  return <em className="font-serif" style={{ fontStyle: 'italic', color: BLUE }}>{children}</em>;
}

/* TruMac phone — crisp white-bezel device (ARC's phone was dark-bezel) */
function Phone({ src, alt, caption, w = 240, light = false, tilt = 0, float = false }) {
  return (
    <figure style={{ margin: 0, width: w, maxWidth: '100%' }}>
      <div className={float ? 'tm-float' : ''} style={{ borderRadius: 30, background: light ? '#FFFFFF' : BG3, border: `1px solid ${light ? 'rgba(255,255,255,0.9)' : 'rgba(244,245,247,0.14)'}`, padding: 7, boxShadow: light ? '0 30px 70px -20px rgba(0,0,0,0.65)' : '0 1px 0 rgba(244,245,247,0.08) inset, 0 26px 60px -18px rgba(0,0,0,0.7)', transform: `rotate(${tilt}deg)` }}>
        <div style={{ borderRadius: 24, overflow: 'hidden', background: BG2 }}>
          <img src={src} alt={alt} loading="lazy" style={{ display: 'block', width: '100%', height: 'auto' }} />
        </div>
      </div>
      {caption && <figcaption className="font-mono" style={{ fontSize: '0.625rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: INK3, marginTop: 16, textAlign: 'center', lineHeight: 1.5 }}>{caption}</figcaption>}
    </figure>
  );
}

/* a "screen window" that crops a tall mobile screen to a viewport height */
function Crop({ src, alt, h = 300, pos = 'top center' }) {
  return (
    <div style={{ borderRadius: 16, overflow: 'hidden', border: `1px solid ${RULE}`, height: h, background: BG2 }}>
      <img src={src} alt={alt} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, display: 'block' }} />
    </div>
  );
}

/* ── interactive credit slider — TruMac's signature, a TOOL not a diagram ── */
function CreditSlider() {
  const LIMIT = 50000;
  const ORDER = 38400;
  const [pct, setPct] = useState(65);
  const onCredit = Math.round((ORDER * pct) / 100);
  const balance = ORDER - onCredit;
  const remaining = LIMIT - onCredit;
  const inr = (n) => '₹' + n.toLocaleString('en-IN');
  return (
    <div style={{ background: BG2, border: `1px solid ${RULE}`, borderRadius: 18, padding: 'clamp(24px,4vw,38px)', boxShadow: '0 30px 70px -30px rgba(0,0,0,0.6)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
        <span className="font-mono" style={{ fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: INK3 }}>Order total</span>
        <span className="font-mono" style={{ fontSize: '1.05rem', color: INK }}>{inr(ORDER)}</span>
      </div>
      <div style={{ height: 1, background: RULE, margin: '16px 0 22px' }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
        <span className="font-mono" style={{ fontSize: '0.7rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: BLUE }}>On TruMac credit</span>
        <span className="font-mono" style={{ fontSize: '0.7rem', color: INK3 }}>drag ↔</span>
      </div>

      {/* the split bar */}
      <div style={{ position: 'relative', height: 14, borderRadius: 100, background: BG3, overflow: 'hidden', marginBottom: 10 }}>
        <motion.div style={{ position: 'absolute', inset: 0, width: `${pct}%`, background: `linear-gradient(90deg, rgba(79,141,247,0.5), ${BLUE})`, borderRadius: 100 }} layout transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
      </div>
      <input type="range" min="0" max="100" value={pct} onChange={(e) => setPct(+e.target.value)} aria-label="Allocate credit"
        style={{ width: '100%', accentColor: BLUE, cursor: 'pointer', marginBottom: 24 }} />

      {/* live readout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 22 }}>
        <div style={{ background: BG, border: `1px solid rgba(79,141,247,0.3)`, borderRadius: 12, padding: '16px 18px' }}>
          <div className="font-mono" style={{ fontSize: '0.56rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: INK3, marginBottom: 8 }}>Charged to credit</div>
          <div className="font-mono" style={{ fontSize: 'clamp(1.1rem,2vw,1.4rem)', color: BLUE }}>{inr(onCredit)}</div>
        </div>
        <div style={{ background: BG, border: `1px solid ${RULE}`, borderRadius: 12, padding: '16px 18px' }}>
          <div className="font-mono" style={{ fontSize: '0.56rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: INK3, marginBottom: 8 }}>Pay now (balance)</div>
          <div className="font-mono" style={{ fontSize: 'clamp(1.1rem,2vw,1.4rem)', color: INK }}>{inr(balance)}</div>
        </div>
      </div>

      {/* limit meter */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <span className="font-mono" style={{ fontSize: '0.58rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: INK3 }}>Credit limit remaining</span>
        <span className="font-mono" style={{ fontSize: '0.58rem', color: remaining < 15000 ? AMBER : GREEN }}>{inr(remaining)} / {inr(LIMIT)}</span>
      </div>
      <div style={{ height: 6, borderRadius: 100, background: BG3, overflow: 'hidden' }}>
        <motion.div animate={{ width: `${(remaining / LIMIT) * 100}%` }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{ height: '100%', borderRadius: 100, background: remaining < 15000 ? AMBER : GREEN }} />
      </div>
      <div className="font-mono" style={{ fontSize: '0.58rem', color: INK3, marginTop: 16, lineHeight: 1.6 }}>
        The limit isn&apos;t a number — it&apos;s the platform&apos;s standing judgment of this merchant. Drag to feel the tradeoff a merchant makes on every order.
      </div>
    </div>
  );
}

/* horizontal trust LOOP that draws itself (a cycle, not ARC's straight pipe) */
const LOOP = [
  { t: 'Verify', d: 'GST + shop photo' },
  { t: 'Assess', d: 'risk & capacity' },
  { t: 'Extend', d: 'credit limit set' },
  { t: 'Order', d: 'procure on credit' },
  { t: 'Repay', d: 'revolving balance' },
  { t: 'Restore', d: 'limit replenished' },
];
function TrustLoop() {
  return (
    <div style={{ position: 'relative' }}>
      <div className="tm-loop" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 0, alignItems: 'stretch' }}>
        {LOOP.map((s, i) => (
          <motion.div key={s.t} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.5, ease: EASE }}
            style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 6px' }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: i === 0 || i === 5 ? 'rgba(63,184,115,0.14)' : 'rgba(79,141,247,0.12)', border: `1px solid ${i === 0 || i === 5 ? GREEN : 'rgba(79,141,247,0.4)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14, position: 'relative', zIndex: 2 }}>
              <span className="font-mono" style={{ fontSize: '0.72rem', color: i === 0 || i === 5 ? GREEN : BLUE }}>{i + 1}</span>
            </div>
            <span className="font-mono" style={{ fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: INK, marginBottom: 6 }}>{s.t}</span>
            <span className="font-mono" style={{ fontSize: '0.56rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: INK3, lineHeight: 1.4 }}>{s.d}</span>
            {i < 5 && <div className="tm-loop-line hide-mobile" style={{ position: 'absolute', top: 22, left: '50%', width: '100%', height: 1, background: RULE, zIndex: 1 }} />}
          </motion.div>
        ))}
      </div>
      <div className="tm-loop-return hide-mobile" style={{ marginTop: 18, height: 30, borderLeft: `1px dashed ${RULE}`, borderRight: `1px dashed ${RULE}`, borderBottom: `1px dashed ${RULE}`, borderRadius: '0 0 12px 12px', position: 'relative' }}>
        <span className="font-mono" style={{ position: 'absolute', bottom: -9, left: '50%', transform: 'translateX(-50%)', background: BG, padding: '0 12px', fontSize: '0.56rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: INK3 }}>the loop repeats — trust compounds ↻</span>
      </div>
    </div>
  );
}

function Counter({ to, prefix = '', suffix = '' }) {
  const [v, setV] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const t0 = performance.now();
        const tick = (t) => { const p = Math.min(1, (t - t0) / 1300); setV(Math.round(to * (1 - Math.pow(1 - p, 3)))); if (p < 1) requestAnimationFrame(tick); };
        requestAnimationFrame(tick); ob.disconnect();
      }
    }, { threshold: 0.5 });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, [to]);
  return <span ref={ref}>{prefix}{v.toLocaleString('en-IN')}{suffix}</span>;
}

/* ════════════════════ PAGE ════════════════════ */
export default function TruMacPage() {
  const reduced = useReducedMotion();

  /* hero: the two phones drift apart subtly (no flatten — that's ARC) */
  const heroRef = useRef(null);
  const { scrollYProgress: hp } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const phoneA = useTransform(hp, [0, 1], [0, -40]);
  const phoneB = useTransform(hp, [0, 1], [0, 60]);

  /* the PEEL: surface screenshot lifts & fades to expose machinery beneath */
  const peelRef = useRef(null);
  const { scrollYProgress: pp } = useScroll({ target: peelRef, offset: ['start end', 'end start'] });
  const peelY = useTransform(pp, [0.1, 0.55], [0, -120]);
  const peelOp = useTransform(pp, [0.2, 0.5], [1, 0]);
  const peelRot = useTransform(pp, [0.1, 0.55], [0, -6]);
  const machineOp = useTransform(pp, [0.35, 0.62], [0, 1]);
  const machineY = useTransform(pp, [0.35, 0.62], [40, 0]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} style={{ background: BG, minHeight: '100vh', color: INK }}>
      <ReadingProgress />
      <MobileBackButton />

      {/* fixed header */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: 'rgba(14,15,19,0.62)', backdropFilter: 'blur(20px) saturate(1.6)', WebkitBackdropFilter: 'blur(20px) saturate(1.6)', borderBottom: `1px solid rgba(244,245,247,0.1)` }}>
        <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 16, paddingBottom: 16 }}>
          <Link href="/" className="link-line font-mono" style={{ fontSize: '0.75rem', letterSpacing: '0.04em', color: INK }}>← Back to Home</Link>
          <span className="font-mono hide-mobile" style={{ fontSize: '0.6875rem', color: INK3, letterSpacing: '0.04em' }}>TruMac — Procurement Platform</span>
          <Link href="/work/arc" className="link-line font-mono" style={{ fontSize: '0.75rem', letterSpacing: '0.04em', color: BLUE }}>Next: ARC →</Link>
        </div>
      </div>

      {/* ════════ HERO — two phones, one truth ════════ */}
      <section ref={heroRef} style={{ position: 'relative', overflow: 'hidden', paddingTop: 150, paddingBottom: 40 }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(60% 50% at 28% 30%, rgba(79,141,247,0.12) 0%, transparent 60%)' }} />
        <div className="wrap" style={{ position: 'relative' }}>
          <div className="tm-hero" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 56, alignItems: 'center' }}>
            <div>
              <motion.div {...slide(0, -20)} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '7px 16px', borderRadius: 100, background: BG2, border: `1px solid ${RULE}`, marginBottom: 28 }}>
                <i className="tm-blink" style={{ width: 7, height: 7, borderRadius: '50%', background: BLUE }} />
                <span className="font-mono" style={{ fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: INK2 }}>Sapio Analytics · B2B Procurement · 2023</span>
              </motion.div>
              <motion.h1 {...slide(0.08, -20)} style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)', fontWeight: 600, lineHeight: 1.04, letterSpacing: '-0.035em', color: INK, margin: '0 0 26px' }}>
                It looked like <span className="font-serif" style={{ fontStyle: 'italic', fontWeight: 500 }}>e-commerce.</span><br />It ran like <span className="font-serif" style={{ fontStyle: 'italic', fontWeight: 500, color: BLUE, textShadow: '0 0 26px rgba(79,141,247,0.45)' }}>embedded finance.</span>
              </motion.h1>
              <motion.p {...slide(0.16, -20)} style={{ fontSize: '1.0625rem', lineHeight: 1.7, color: INK2, maxWidth: 460, margin: '0 0 32px' }}>
                A B2B procurement app for construction merchants — a familiar storefront on top, GST verification and a revolving credit line underneath. Trust, extended to an industry that runs on relationships and cash.
              </motion.p>
              <motion.div {...slide(0.24, -20)} style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
                {[['Mobile-native', 'iOS + Android'], ['Embedded credit', '₹50K revolving'], ['Offline industry', 'GST-verified trust']].map(([v, l], i) => (
                  <div key={i}>
                    <div className="font-mono" style={{ fontSize: '0.95rem', color: INK }}>{v}</div>
                    <div className="font-mono" style={{ fontSize: '0.58rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: INK3, marginTop: 5 }}>{l}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* two overlapping phones: storefront (light) + credit (behind) */}
            <div className="tm-hero-phones" style={{ position: 'relative', height: 540, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <motion.div style={{ position: 'absolute', right: '8%', top: 30, zIndex: 1, y: reduced ? 0 : phoneB }}>
                <Phone src="/trumac/credit.png" alt="TruMac credit line" w={196} tilt={4} />
              </motion.div>
              <motion.div style={{ position: 'absolute', left: '6%', top: 0, zIndex: 2, y: reduced ? 0 : phoneA }}>
                <Phone src="/trumac/home.png" alt="TruMac storefront" w={214} light tilt={-3} />
              </motion.div>
              <div style={{ position: 'absolute', bottom: 8, left: 0, right: 0, textAlign: 'center' }}>
                <span className="font-mono" style={{ fontSize: '0.58rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: INK3 }}>surface ↑ &nbsp;·&nbsp; machinery ↑</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ PROBLEM ════════ */}
      <section style={{ borderTop: `1px solid ${RULE}` }}>
        <div className="wrap" style={{ paddingTop: 110, paddingBottom: 110 }}>
          <motion.div {...slide(0)}><Mono color={AMBER}>The problem</Mono></motion.div>
          <motion.div {...slide(0.06)}><Display size="clamp(2rem, 4vw, 3.1rem)" max="18ch">Construction merchants don&apos;t shop. <Em>They procure — on credit, on trust.</Em></Display></motion.div>
          <motion.div {...slide(0.12)}><Body max={600}>They buy against project timelines, on credit, in an industry that runs offline and on relationships. Designing TruMac with consumer-commerce patterns produced a product that felt familiar and failed operationally. The real challenge wasn&apos;t the catalog — it was extending trust without a credit bureau.</Body></motion.div>
          <motion.div {...slide(0.18)} style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 30 }}>
            {['offline industry', 'runs on relationships', 'no formal credit history', 'cash-and-trust'].map((c, i) => (
              <span key={i} className="font-mono" style={{ fontSize: '0.62rem', letterSpacing: '0.08em', color: AMBER, border: `1px solid rgba(224,145,95,0.3)`, background: 'rgba(224,145,95,0.07)', borderRadius: 100, padding: '7px 14px' }}>{c}</span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════ THE PEEL — surface lifts to reveal machinery ════════ */}
      <section ref={peelRef} style={{ borderTop: `1px solid ${RULE}`, background: BG2, position: 'relative', overflow: 'hidden' }}>
        <div className="wrap" style={{ paddingTop: 110, paddingBottom: 110 }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <motion.div {...slide(0)}><Mono>Two layers · one product</Mono></motion.div>
            <motion.div {...slide(0.06)}><Display size="clamp(1.9rem,3.8vw,3rem)" max="22ch" align="center">A familiar surface — <Em>with embedded finance underneath.</Em></Display></motion.div>
            <motion.div {...slide(0.12)}><Body max={600} align="center">The storefront was deliberate: adoption in an offline industry demands familiarity. But scroll past the surface and the machinery is a different product entirely.</Body></motion.div>
          </div>

          {/* the layered reveal stage */}
          <div className="tm-peel-stage" style={{ position: 'relative', height: 560, display: 'flex', justifyContent: 'center' }}>
            {/* machinery underneath (revealed) */}
            <motion.div style={{ position: 'absolute', top: 40, width: '100%', maxWidth: 760, opacity: reduced ? 1 : machineOp, y: reduced ? 0 : machineY }}>
              <div className="tm-peel-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
                {[['/trumac/documents.png', 'GST + shop verification', 'top center'], ['/trumac/credit.png', 'Revolving credit line', 'top center'], ['/trumac/credit-payment.png', 'Allocate & repay', 'top center']].map(([s, c, p], i) => (
                  <div key={i}>
                    <Crop src={s} alt={c} h={300} pos={p} />
                    <div className="font-mono" style={{ fontSize: '0.58rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: BLUE, marginTop: 12, textAlign: 'center' }}>{c}</div>
                  </div>
                ))}
              </div>
              <div className="font-mono" style={{ textAlign: 'center', fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: INK3, marginTop: 26 }}>↑ the machinery: verification → credit → repayment</div>
            </motion.div>

            {/* surface storefront (lifts away) */}
            <motion.div className="hide-mobile" style={{ position: 'absolute', top: 0, zIndex: 3, opacity: reduced ? 0 : peelOp, y: reduced ? 0 : peelY, rotate: reduced ? 0 : peelRot }}>
              <Phone src="/trumac/home.png" alt="TruMac storefront surface" w={240} light />
              <div className="font-mono" style={{ fontSize: '0.58rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: INK3, marginTop: 14, textAlign: 'center' }}>the surface · scroll to peel ↑</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════ THE STOREFRONT (surface, in detail) ════════ */}
      <section style={{ borderTop: `1px solid ${RULE}` }}>
        <div className="wrap" style={{ paddingTop: 110, paddingBottom: 110 }}>
          <div className="tm-2col" style={{ display: 'grid', gridTemplateColumns: '0.95fr 1.05fr', gap: 56, alignItems: 'center' }}>
            <div>
              <motion.div {...slide(0)}><Mono>The surface</Mono></motion.div>
              <motion.div {...slide(0.06)}><Display>Familiar on purpose.</Display></motion.div>
              <motion.div {...slide(0.12)}><Body max={460}>Search by HSU code, best-sellers, categories, brand and size filters, Add+. Consumer-commerce patterns chosen deliberately — because adoption in an offline trade depends on the product feeling like something merchants already understand.</Body></motion.div>
              <motion.div {...slide(0.18)} style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 28 }}>
                {['HSU search', 'best-sellers', 'category & brand', 'size filters', 'Add+'].map((c, i) => (
                  <span key={i} className="font-mono" style={{ fontSize: '0.6rem', letterSpacing: '0.06em', color: INK2, border: `1px solid ${RULE}`, borderRadius: 100, padding: '6px 13px' }}>{c}</span>
                ))}
              </motion.div>
            </div>
            <div className="tm-phone-pair" style={{ display: 'flex', gap: 24, justifyContent: 'center' }}>
              <motion.div {...slide(0, 30)}><Phone src="/trumac/home.png" alt="TruMac home — discovery" caption="Home · discovery" w={224} tilt={-2} /></motion.div>
              <motion.div {...slide(0.12, 30)} style={{ marginTop: 40 }}><Phone src="/trumac/category.png" alt="TruMac category — filters" caption="Category · filters · Add+" w={224} tilt={2} /></motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ THE PIVOT — the cart drops the disguise ════════ */}
      <section style={{ borderTop: `1px solid ${RULE}`, background: BG2 }}>
        <div className="wrap" style={{ paddingTop: 110, paddingBottom: 110 }}>
          <div className="tm-2col" style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 56, alignItems: 'center' }}>
            <div className="tm-pivot-phone" style={{ display: 'flex', justifyContent: 'center' }}>
              <motion.div {...slide(0, -30)}>
                <Phone src="/trumac/cart.png" alt="TruMac cart — My Truck with GST split" caption="My Truck · GST split · wholesale discount · pincode" w={262} />
              </motion.div>
            </div>
            <div>
              <motion.div {...slide(0)}><Mono color={AMBER}>The pivot</Mono></motion.div>
              <motion.div {...slide(0.06)}><Display max="16ch">The cart is where <Em>the disguise drops.</Em></Display></motion.div>
              <motion.div {...slide(0.12)}><Body max={460}>Deliver-to pincodes. MRP versus net price. CGST and SGST broken out. Wholesale discount. Express delivery as a procurement decision, not a consumer treat. This is procurement accounting — the moment the consumer mask comes off.</Body></motion.div>
              <motion.div {...slide(0.18)} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 30, maxWidth: 420 }}>
                {[['MRP → net price', BLUE], ['CGST 9% + SGST 9%', BLUE], ['52% wholesale discount', GREEN], ['Pincode + express', BLUE]].map(([t, c], i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: EASE }}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, background: BG, border: `1px solid ${RULE}`, borderRadius: 10, padding: '11px 14px' }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: c, flexShrink: 0 }} />
                    <span className="font-mono" style={{ fontSize: '0.62rem', letterSpacing: '0.04em', color: INK2 }}>{t}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ VERIFICATION — the front door ════════ */}
      <section style={{ borderTop: `1px solid ${RULE}` }}>
        <div className="wrap" style={{ paddingTop: 110, paddingBottom: 110 }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <motion.div {...slide(0)}><Mono>The front door</Mono></motion.div>
            <motion.div {...slide(0.06)}><Display size="clamp(1.9rem,3.8vw,3rem)" max="20ch" align="center">Before credit can exist, <Em>trust must be established.</Em></Display></motion.div>
            <motion.div {...slide(0.12)}><Body max={600} align="center">Onboarding captures the GST document and a photo of the shop — proving the merchant is a real, registered, physical business. Not a settings page. The front door. Credit does not exist without it.</Body></motion.div>
          </div>
          <div className="tm-verify" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center', maxWidth: 880, margin: '0 auto' }}>
            <motion.div {...slide(0, -24)} style={{ display: 'flex', justifyContent: 'center' }}>
              <Phone src="/trumac/documents.png" alt="TruMac verification — GST + shop photo" caption="GST document + shop photo capture" w={250} />
            </motion.div>
            <div>
              {[['Capture GST registration', '01'], ['Photograph the shopfront', '02'], ['Risk & capacity assessment', '03'], ['Credit line unlocked', '04']].map(([t, n], i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.14, duration: 0.6, ease: EASE }}
                  style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 0', borderBottom: i < 3 ? `1px solid ${RULE}` : 'none' }}>
                  <span className="font-mono" style={{ fontSize: '0.7rem', color: i === 3 ? GREEN : BLUE, width: 28 }}>{n}</span>
                  <span style={{ fontSize: '0.95rem', color: i === 3 ? INK : INK2 }}>{t}</span>
                  {i === 3 && <span className="font-mono" style={{ marginLeft: 'auto', fontSize: '0.56rem', letterSpacing: '0.12em', color: GREEN, border: `1px solid ${GREEN}`, borderRadius: 6, padding: '4px 10px' }}>UNLOCKED</span>}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════ CREDIT ENGINE — interactive centerpiece ════════ */}
      <section style={{ borderTop: `1px solid ${RULE}`, background: BG2, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(60% 50% at 70% 30%, rgba(79,141,247,0.1) 0%, transparent 65%)' }} />
        <div className="wrap" style={{ paddingTop: 110, paddingBottom: 110, position: 'relative' }}>
          <motion.div {...slide(0)}><Mono>The credit engine · the real product</Mono></motion.div>
          <motion.div {...slide(0.06)}><Display size="clamp(2rem,4vw,3rem)" max="20ch">The credit limit wasn&apos;t a number. <Em>It was the relationship.</Em></Display></motion.div>
          <motion.div {...slide(0.12)}><Body max={620}>Verification unlocks credit, and credit is the real product. A merchant allocates how much of a purchase to charge against their TruMac line, pays the balance, then repays the revolving credit. Try it — drag the allocation and watch the limit respond.</Body></motion.div>

          <div className="tm-credit" style={{ display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: 52, alignItems: 'center', marginTop: 60 }}>
            <motion.div {...slide(0, -24)} style={{ display: 'flex', justifyContent: 'center' }}>
              <Phone src="/trumac/credit-payment.png" alt="TruMac credit allocation screen" caption="In-product · allocate credit via slider" w={244} />
            </motion.div>
            <motion.div {...slide(0.12, 24)}>
              <CreditSlider />
            </motion.div>
          </div>

          <motion.blockquote {...slide(0.1)} className="font-display" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.3rem)', color: INK, lineHeight: 1.3, fontWeight: 500, letterSpacing: '-0.02em', margin: '72px auto 0', maxWidth: '24ch', textAlign: 'center', fontStyle: 'italic' }}>
            &ldquo;The credit limit belonged <Em>before</Em> the order — not buried after it.&rdquo;
          </motion.blockquote>
        </div>
      </section>

      {/* ════════ THE TRUST LOOP ════════ */}
      <section style={{ borderTop: `1px solid ${RULE}` }}>
        <div className="wrap" style={{ paddingTop: 110, paddingBottom: 110 }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <motion.div {...slide(0)}><Mono>The trust loop</Mono></motion.div>
            <motion.div {...slide(0.06)}><Display size="clamp(1.9rem,3.8vw,2.9rem)" max="22ch" align="center">Every repayment <Em>compounds the relationship.</Em></Display></motion.div>
          </div>
          <motion.div {...slide(0.1)}><TrustLoop /></motion.div>
        </div>
      </section>

      {/* ════════ REFERRAL ════════ */}
      <section style={{ borderTop: `1px solid ${RULE}`, background: BG2 }}>
        <div className="wrap" style={{ paddingTop: 110, paddingBottom: 110 }}>
          <div className="tm-2col" style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 56, alignItems: 'center' }}>
            <div>
              <motion.div {...slide(0)}><Mono>Growth, denominated in credit</Mono></motion.div>
              <motion.div {...slide(0.06)}><Display max="18ch">Referrals that pay back into <Em>the trust economy.</Em></Display></motion.div>
              <motion.div {...slide(0.12)}><Body max={460}>Referrals don&apos;t pay cash — they pay credits. One referral equals 100 credits, and every new merchant enters the same verification-and-credit loop that retains the existing ones. Growth and product are the same system.</Body></motion.div>
              <motion.div {...slide(0.18)} style={{ display: 'inline-flex', alignItems: 'center', gap: 14, marginTop: 30, background: BG, border: `1px solid rgba(79,141,247,0.3)`, borderRadius: 12, padding: '16px 22px' }}>
                <span className="font-mono" style={{ fontSize: '0.8rem', color: INK }}>1 referral</span>
                <span style={{ color: INK3 }}>=</span>
                <span className="font-mono" style={{ fontSize: '1.1rem', color: BLUE }}><Counter to={100} /> credits</span>
              </motion.div>
            </div>
            <motion.div {...slide(0.1, 24)} style={{ display: 'flex', justifyContent: 'center' }}>
              <Phone src="/trumac/referral.png" alt="TruMac Refer & Earn" caption="Refer & Earn · 1 referral = 100 credits" w={250} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════ DESIGN JUDGMENT ════════ */}
      <section style={{ borderTop: `1px solid ${RULE}` }}>
        <div className="wrap-reading" style={{ paddingTop: 130, paddingBottom: 130, textAlign: 'center' }}>
          <motion.div {...slide(0)}><Mono>Design judgment</Mono></motion.div>
          <motion.blockquote {...slide(0.08)} className="font-display" style={{ fontSize: 'clamp(1.8rem, 3.6vw, 2.8rem)', fontWeight: 500, lineHeight: 1.25, letterSpacing: '-0.02em', color: INK, margin: '0 0 26px' }}>
            Familiarity on top. <Em>Embedded finance underneath.</Em>
          </motion.blockquote>
          <motion.p {...slide(0.16)} style={{ fontSize: '1.0625rem', lineHeight: 1.75, color: INK2, margin: '0 auto', maxWidth: 540 }}>
            TruMac used a familiar commerce surface to win adoption, then used verification and credit to do what consumer e-commerce never could — extend trust to an informal industry that runs on relationships and cash.
          </motion.p>
        </div>
      </section>

      {/* ════════ OUTCOME ════════ */}
      <section style={{ borderTop: `1px solid ${RULE}`, background: BG2 }}>
        <div className="wrap" style={{ paddingTop: 110, paddingBottom: 120 }}>
          <motion.div {...slide(0)}><Mono color={GREEN}>Outcome</Mono></motion.div>
          <motion.div {...slide(0.06)}><Display max="24ch">From a storefront to <Em>a credit relationship.</Em></Display></motion.div>
          <motion.div {...slide(0.12)}><Body max={620}>TruMac shipped as a mobile-native procurement platform — discovery, GST and shop verification, embedded credit, repayment, and a credit-based referral economy — bringing trust-based purchasing to an offline construction-materials industry.</Body></motion.div>

          <motion.div {...slide(0.1)} className="tm-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, borderTop: `1px solid ${RULE}`, marginTop: 56, paddingTop: 34 }}>
            {[['₹', 50, 'K', 'Revolving credit line'], ['', 18, '%', 'GST broken out at cart'], ['', 100, '', 'Credits per referral'], ['', 2, '', 'Platforms · iOS + Android']].map(([pre, v, suf, l], i) => (
              <div key={i}>
                <div className="font-mono" style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)', color: INK, letterSpacing: '-0.02em', lineHeight: 1 }}><Counter to={v} prefix={pre} suffix={suf} /></div>
                <div className="font-mono" style={{ fontSize: '0.6rem', letterSpacing: '0.13em', textTransform: 'uppercase', color: INK3, marginTop: 10, lineHeight: 1.5 }}>{l}</div>
              </div>
            ))}
          </motion.div>

          {/* journey filmstrip — the whole product as one horizontal pass */}
          <div className="tm-strip" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18, marginTop: 64 }}>
            {[['/trumac/home.png', 'Discovery'], ['/trumac/documents.png', 'Verification'], ['/trumac/credit.png', 'Credit'], ['/trumac/referral.png', 'Growth']].map(([s, c], i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6, ease: EASE }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Phone src={s} alt={c} caption={c} w="100%" tilt={i % 2 === 0 ? -1.5 : 1.5} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ NEXT ════════ */}
      <Link href="/work/arc" style={{ display: 'block', textDecoration: 'none', background: BG, borderTop: `1px solid ${RULE}` }}>
        <div className="wrap tm-next" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, paddingTop: 52, paddingBottom: 52 }}>
          <div>
            <span className="font-mono" style={{ fontSize: '0.62rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: INK3, display: 'block', marginBottom: 10 }}>Next project</span>
            <span className="font-display" style={{ fontSize: 'clamp(1.7rem, 4vw, 2.8rem)', fontWeight: 500, color: INK, letterSpacing: '-0.02em' }}>ARC — Workforce Operating System</span>
          </div>
          <span className="font-mono tm-next-arrow" style={{ fontSize: '1.5rem', color: BLUE }}>→</span>
        </div>
      </Link>

      {/* ── TruMac-specific styles (distinct from ARC) ── */}
      <style jsx global>{`
        .tm-blink { animation: tmBlink 1.8s ease-in-out infinite; }
        @keyframes tmBlink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        .tm-float { animation: tmFloat 6s ease-in-out infinite; }
        @keyframes tmFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        .tm-next:hover .tm-next-arrow { transform: translateX(8px); }
        .tm-next-arrow { transition: transform 0.3s cubic-bezier(0.22,1,0.36,1); display:inline-block; }
        input[type=range]{ -webkit-appearance:none; appearance:none; height:6px; border-radius:100px; background:transparent; }
        input[type=range]::-webkit-slider-thumb{ -webkit-appearance:none; appearance:none; width:24px; height:24px; border-radius:50%; background:${BLUE}; border:3px solid ${BG2}; box-shadow:0 0 0 1px ${BLUE}, 0 4px 12px rgba(79,141,247,0.5); cursor:grab; }
        input[type=range]::-webkit-slider-thumb:active{ cursor:grabbing; transform:scale(1.1); }
        input[type=range]::-moz-range-thumb{ width:24px; height:24px; border-radius:50%; background:${BLUE}; border:3px solid ${BG2}; box-shadow:0 0 0 1px ${BLUE}; cursor:grab; }
        @media (max-width: 980px) {
          .tm-hero { grid-template-columns: 1fr !important; gap: 40px !important; }
          .tm-hero-phones { height: 460px !important; }
          .tm-2col { grid-template-columns: 1fr !important; gap: 44px !important; }
          .tm-pivot-phone { order: 2; }
          .tm-credit { grid-template-columns: 1fr !important; gap: 40px !important; }
          .tm-verify { grid-template-columns: 1fr !important; gap: 36px !important; }
          .tm-peel-stage { height: auto !important; }
          .tm-peel-stage > div:first-child { position: static !important; }
          .tm-peel-grid { grid-template-columns: 1fr !important; gap: 14px; }
          .tm-loop { grid-template-columns: repeat(3, 1fr) !important; row-gap: 28px; }
          .tm-loop-return { display: none; }
          .tm-stats { grid-template-columns: repeat(2, 1fr) !important; gap: 28px 20px !important; }
          .tm-strip { grid-template-columns: repeat(2, 1fr) !important; gap: 16px !important; }
          .tm-phone-pair > div:nth-child(2) { margin-top: 0 !important; }
          .hide-mobile { display: none !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .tm-blink, .tm-float { animation: none !important; }
        }
      `}</style>
    </motion.div>
  );
}
