'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { MobileBackButton, NextProjectCTA } from '@/components/CaseStudyNav';
import ReadingProgress from '@/components/ReadingProgress';

const EASE = [0.25, 1, 0.5, 1];
const rev = (d = 0) => ({ initial: { opacity: 0, y: 14 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 }, transition: { duration: 0.65, delay: d, ease: EASE } });
const TM_BLUE = '#1A4ED8';

function Label({ children, color = '#A23A22' }) {
  return <span className="font-mono" style={{ fontSize: '0.6875rem', letterSpacing: '0.14em', textTransform: 'uppercase', color, display: 'block', marginBottom: 22 }}>{children}</span>;
}
function SectionWrap({ bg = '#F0ECE3', border, children, py = 90 }) {
  return (
    <div style={{ background: bg, borderTop: border ? '1px solid rgba(26,23,18,0.14)' : 'none' }}>
      <div className="wrap-reading" style={{ paddingTop: py, paddingBottom: py }}>{children}</div>
    </div>
  );
}
function PhoneFrame({ src, alt, caption, width = '48%', tilt = 0, shadow = true }) {
  return (
    <div style={{ width, flexShrink: 0 }}>
      <div style={{ borderRadius: 32, overflow: 'hidden', border: '6px solid #FFF', boxShadow: shadow ? '0 8px 24px rgba(26,24,20,0.08), 0 32px 64px rgba(26,24,20,0.12)' : 'none', transform: `rotate(${tilt}deg)`, background: '#FFF' }}>
        <img src={src} alt={alt} style={{ width: '100%', display: 'block' }} />
      </div>
      {caption && <p className="font-mono" style={{ fontSize: '0.625rem', color: '#A8A39C', marginTop: 14, letterSpacing: '0.04em', textAlign: 'center', lineHeight: 1.5 }}>{caption}</p>}
    </div>
  );
}

function TruMacHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-5, 0]);
  const rise   = useTransform(scrollYProgress, [0.25, 1], [80, 0]);
  const fade   = useTransform(scrollYProgress, [0.25, 0.75], [0, 1]);

  return (
    <div style={{ background: TM_BLUE, position: 'relative', overflow: 'hidden', paddingTop: 148, paddingBottom: 80 }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 30% 40%, rgba(255,255,255,0.06) 0%, transparent 70%)' }} />
      <div className="wrap-reading" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: EASE }}>
            <span className="font-mono" style={{ fontSize: '0.6875rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', display: 'block', marginBottom: 18 }}>
              Sapio Analytics · B2B Procurement · 2023 · Primary case study
            </span>
            <h1 className="font-display" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)', fontWeight: 300, color: '#F0ECE3', lineHeight: 1.07, letterSpacing: '-0.03em', marginBottom: 22 }}>
              TruMac —<br />Procurement Platform
            </h1>
            <p className="font-display" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.3rem)', color: 'rgba(250,248,244,0.68)', lineHeight: 1.45, fontWeight: 300, fontStyle: 'italic' }}>
              It looked like e-commerce.<br />It ran like embedded finance.
            </p>
          </motion.div>
          <div ref={ref} style={{ position: 'relative', width: 240, flexShrink: 0, minHeight: 360 }} className="hide-mobile">
            {/* Credits rises behind */}
            <motion.div style={{ position: 'absolute', right: -14, top: 24, width: 132, y: rise, opacity: fade, zIndex: 1 }}>
              <div style={{ borderRadius: 22, overflow: 'hidden', border: '4px solid rgba(255,255,255,0.15)', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', aspectRatio: '1 / 2.05' }}>
                <img src="/trumac/credit.png" alt="TruMac credit" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} />
              </div>
            </motion.div>
            {/* Home phone — foreground */}
            <motion.div style={{ rotate, transformOrigin: 'bottom center', width: 178, position: 'relative', zIndex: 2 }}>
              <div style={{ borderRadius: 28, overflow: 'hidden', border: '5px solid rgba(255,255,255,0.9)', boxShadow: '0 32px 64px rgba(0,0,0,0.4)', aspectRatio: '1 / 2.05' }}>
                <img src="/trumac/home.png" alt="TruMac home" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TruMacPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} style={{ background: '#F0ECE3', minHeight: '100vh', color: '#1A1712' }}>
      <ReadingProgress />
      <MobileBackButton />
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: 'rgba(14,15,19,0.6)', backdropFilter: 'blur(20px) saturate(1.6)', WebkitBackdropFilter: 'blur(20px) saturate(1.6)', borderBottom: '1px solid rgba(244,245,247,0.1)' }}>
        <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 16, paddingBottom: 16 }}>
          <Link href="/" className="link-line font-mono" style={{ fontSize: '0.75rem', color: '#F4F5F7' }}>← Back to Home</Link>
          <span className="font-mono" style={{ fontSize: '0.6875rem', color: '#A8A39C', letterSpacing: '0.04em' }}>TruMac — Procurement Platform</span>
          <Link href="/work/arc" className="link-line font-mono" style={{ fontSize: '0.75rem', color: '#A23A22' }}>Next project: ARC →</Link>
        </div>
      </div>
      <main>
        <TruMacHero />

        {/* ── 02 Problem ─────────────────────────────── */}
        <SectionWrap bg="#F0ECE3" py={120}>
          <motion.div {...rev(0)}>
            <Label>The problem</Label>
            <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: '#1A1712', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 28 }}>
              It looked like e-commerce.<br />
              <em style={{ color: '#A23A22', fontStyle: 'italic' }}>It ran like procurement.</em>
            </h2>
            <p style={{ fontSize: '1.0625rem', color: '#4A463F', lineHeight: 1.8, maxWidth: 560 }}>
              Construction merchants don't shop — they procure, on credit, against project timelines, in an industry that runs offline and on trust. Designing TruMac using consumer-commerce patterns produced a product that felt familiar and failed operationally.
            </p>
          </motion.div>
        </SectionWrap>

        {/* ── 03 Familiar Surface — compressed ──────── */}
        <SectionWrap bg="#E8E3D8" border py={80}>
          <motion.div {...rev(0)} style={{ marginBottom: 36 }}>
            <Label>The familiar surface</Label>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 300, color: '#1A1712', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: 18 }}>
              Familiar on the surface — by design.
            </h2>
            <p style={{ fontSize: '0.9375rem', color: '#6B6760', lineHeight: 1.75, maxWidth: 540 }}>
              The home screen used consumer-commerce patterns — search by HSU code, best-sellers, categories, brands — because adoption in an offline industry requires familiarity. The surface was deliberate. The machinery underneath it was not.
            </p>
          </motion.div>
          <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', justifyContent: 'center' }}>
            <PhoneFrame src="/trumac/home.png" alt="TruMac home" caption="Home · best-sellers, categories, brand discovery" width="42%" tilt={-2} />
            <PhoneFrame src="/trumac/category.png" alt="TruMac category" caption="Category · plumbing, brand + size filters, Add+" width="42%" tilt={2} />
          </div>
        </SectionWrap>

        {/* ── 04 Procurement Pivot ───────────────────── */}
        <SectionWrap bg="#F0ECE3" border py={90}>
          <motion.div {...rev(0)} style={{ marginBottom: 40 }}>
            <Label>Where it stops being retail</Label>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.7rem, 3.2vw, 2.4rem)', fontWeight: 300, color: '#1A1712', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: 22 }}>
              The cart is where the disguise drops.
            </h2>
            <p style={{ fontSize: '1rem', color: '#6B6760', lineHeight: 1.75, maxWidth: 540 }}>
              Deliver-to pincodes. MRP versus net price. CGST and SGST broken out. Wholesale discount. Express delivery as a procurement choice, not a consumer treat. This is procurement accounting — not a consumer checkout.
            </p>
          </motion.div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <PhoneFrame src="/trumac/cart.png" alt="TruMac cart — My Truck" caption="My Truck · GST split, wholesale discount, delivery to pincode" width="52%" />
          </div>
          <motion.div {...rev(0.1)} style={{ marginTop: 24, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {['Pincode delivery', 'MRP vs net price', 'CGST 9%', 'SGST 9%', '52% wholesale discount', 'Express delivery', 'Grand total'].map(c => (
              <span key={c} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 100, background: 'rgba(26,78,216,0.08)', border: '1px solid rgba(26,78,216,0.2)', fontSize: '0.75rem', color: TM_BLUE, marginRight: 8, marginBottom: 8, fontFamily: "'DM Mono', monospace" }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: TM_BLUE }} />{c}
              </span>
            ))}
          </motion.div>
        </SectionWrap>

        {/* ── 05 Verification — before credit ───────── */}
        <SectionWrap bg="#E8E3D8" border py={90}>
          <motion.div {...rev(0)} style={{ marginBottom: 40 }}>
            <Label>Verification — the front door</Label>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.7rem, 3.2vw, 2.4rem)', fontWeight: 300, color: '#1A1712', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: 22 }}>
              Before credit can exist,<br />trust must be established.
            </h2>
            <p style={{ fontSize: '1rem', color: '#6B6760', lineHeight: 1.75, maxWidth: 540 }}>
              TruMac's onboarding captures the GST document and the shop's photo — verifying the merchant is a real, registered, physical business. This isn't a settings page. It is the front door. Credit doesn't exist without it.
            </p>
          </motion.div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <PhoneFrame src="/trumac/documents.png" alt="TruMac merchant verification — GST and shop photo" caption="Merchant verification · GST document + shop photo capture" width="52%" />
          </div>
          <motion.div {...rev(0.1)} style={{ marginTop: 24, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {['GST registration capture', 'Shop photo verification', 'Progressive steps', 'Verification before credit'].map(c => (
              <span key={c} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 100, background: 'rgba(184,150,90,0.1)', border: '1px solid rgba(184,150,90,0.25)', fontSize: '0.75rem', color: '#A23A22', marginRight: 8, marginBottom: 8, fontFamily: "'DM Mono', monospace" }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#A23A22' }} />{c}
              </span>
            ))}
          </motion.div>
        </SectionWrap>

        {/* ── 06 Credit Engine — the largest ────────── */}
        <SectionWrap bg="#F0ECE3" border py={100}>
          <motion.div {...rev(0)} style={{ marginBottom: 48 }}>
            <Label>The credit engine · the centerpiece</Label>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 300, color: '#1A1712', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 28 }}>
              The credit system wasn't a feature.<br />
              <em style={{ color: '#A23A22', fontStyle: 'italic' }}>It was the entire trust relationship.</em>
            </h2>
            <p style={{ fontSize: '1.0625rem', color: '#4A463F', lineHeight: 1.8, maxWidth: 580, marginBottom: 0 }}>
              Verification unlocks credit, and credit is the real product. A merchant sees their limit, allocates how much of a purchase to charge against TruMac credit via a slider, pays the balance, then repays the revolving line. The credit limit isn't a number — it's the platform's expressed judgment of the merchant's trustworthiness, earned through verification.
            </p>
          </motion.div>

          {/* Two credit screens — the two sides */}
          <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start', justifyContent: 'center', marginBottom: 40 }}>
            <PhoneFrame src="/trumac/credit.png" alt="TruMac credit overview — 50000 remaining" caption="Credit overview · available limit & repayment" width="44%" tilt={-2} />
            <PhoneFrame src="/trumac/credit-payment.png" alt="TruMac credit payment — slider allocation" caption="Credit allocation · choose amount via slider · proceed" width="44%" tilt={2} />
          </div>

          {/* Credit cycle diagram */}
          <motion.div {...rev(0.1)}>
            <div style={{ background: '#E8E3D8', borderRadius: 12, border: '1px solid rgba(26,23,18,0.14)', padding: '24px 28px' }}>
              <div className="font-mono" style={{ fontSize: '0.6875rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#A8A39C', marginBottom: 20 }}>The trust loop</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 0, overflowX: 'auto' }}>
                {['Verify GST + shop', 'Assessment', 'Credit extended', 'Merchant orders', 'Goods delivered', 'Repayment', 'Limit restored'].map((s, i, arr) => (
                  <div key={s} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                    <div style={{ padding: '10px 14px', borderRadius: 8, background: i === 2 || i === 5 ? 'rgba(184,150,90,0.12)' : 'rgba(26,78,216,0.07)', border: `1px solid ${i === 2 || i === 5 ? 'rgba(184,150,90,0.3)' : 'rgba(26,78,216,0.18)'}`, textAlign: 'center' }}>
                      <span className="font-mono" style={{ fontSize: '0.625rem', letterSpacing: '0.04em', textTransform: 'uppercase', color: i === 2 || i === 5 ? '#A23A22' : TM_BLUE }}>{s}</span>
                    </div>
                    {i < arr.length - 1 && <span style={{ color: 'rgba(26,23,18,0.14)', padding: '0 6px', fontSize: '1rem' }}>→</span>}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Pull quote */}
          <motion.blockquote {...rev(0.15)} className="font-display" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: '#1A1712', lineHeight: 1.28, fontWeight: 300, letterSpacing: '-0.022em', margin: '52px 0 0', fontStyle: 'normal' }}>
            "The credit limit wasn't a number. It was the platform's expressed judgment of the merchant's trustworthiness — so it belonged before the order, not buried after it."
          </motion.blockquote>
        </SectionWrap>

        {/* ── 07 Referral ───────────────────────────── */}
        <SectionWrap bg="#E8E3D8" border py={80}>
          <motion.div {...rev(0)} style={{ marginBottom: 36 }}>
            <Label>Growth, denominated in credit</Label>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 300, color: '#1A1712', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: 18 }}>
              Referrals that pay back into the trust economy.
            </h2>
            <p style={{ fontSize: '0.9375rem', color: '#6B6760', lineHeight: 1.75, maxWidth: 520 }}>
              Referrals don't pay cash — they pay credits: 1 referral = 100 credits. New merchants enter the same verification-and-credit loop that retains existing ones. Growth and product are the same system.
            </p>
          </motion.div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <PhoneFrame src="/trumac/referral.png" alt="TruMac Refer & Earn" caption="Refer & Earn · 1 referral = 100 credits · claimed coupon history" width="52%" />
          </div>
        </SectionWrap>

        {/* ── 08 Resolution ─────────────────────────── */}
        <div style={{ background: '#1A1712', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #1A1712 50%, rgba(26,78,216,0.12) 100%)' }} />
          <div className="wrap-reading" style={{ paddingTop: 110, paddingBottom: 110, position: 'relative', zIndex: 1 }}>
            <Label color="rgba(184,150,90,0.75)">Design judgment</Label>
            <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 300, color: '#F0ECE3', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 28 }}>
              Familiarity on top.<br />
              <em style={{ color: '#A23A22', fontStyle: 'italic' }}>Embedded finance underneath.</em>
            </h2>
            <p style={{ fontSize: '1.0625rem', color: 'rgba(250,248,244,0.6)', lineHeight: 1.78, maxWidth: 520 }}>
              TruMac used a familiar commerce surface to win adoption, then used verification and credit to do what consumer e-commerce never could — extend trust to an informal industry that runs on relationships and cash.
            </p>
          </div>
        </div>

        {/* ── 09 Outcome ─────────────────────────────── */}
        <SectionWrap bg="#F0ECE3" border py={90}>
          <motion.div {...rev(0)}>
            <Label>Outcome</Label>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 300, color: '#1A1712', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: 24 }}>
              From a storefront to a credit relationship.
            </h2>
            <p style={{ fontSize: '1rem', color: '#6B6760', lineHeight: 1.78, marginBottom: 44, maxWidth: 580 }}>
              TruMac shipped as a mobile-native procurement platform combining product discovery, GST and shop verification, embedded credit, repayment, and a credit-based referral economy — bringing trust-based purchasing to an offline construction-materials industry.
            </p>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
            {[
              { src: '/trumac/home.png', alt: 'Home', cap: 'Discovery' },
              { src: '/trumac/documents.png', alt: 'Verification', cap: 'Verification' },
              { src: '/trumac/credit.png', alt: 'Credit', cap: 'Credit' },
              { src: '/trumac/referral.png', alt: 'Referral', cap: 'Growth' },
            ].map((s, i) => (
              <motion.div key={s.cap} {...rev(i * 0.08)}>
                <PhoneFrame src={s.src} alt={s.alt} caption={s.cap} width="100%" shadow={false} tilt={i % 2 === 0 ? -1 : 1} />
              </motion.div>
            ))}
          </div>
        </SectionWrap>

        <NextProjectCTA href="/work/arc" label="ARC" />
        <div style={{ background: '#E8E3D8', borderTop: '1px solid rgba(26,23,18,0.14)' }}>
          <div className="wrap-reading" style={{ paddingTop: 40, paddingBottom: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href="/" className="link-line font-mono" style={{ fontSize: '0.75rem' }}>← Back to Home</Link>
            <Link href="/work/arc" className="link-line font-mono" style={{ fontSize: '0.75rem', color: '#A23A22' }}>Next project: ARC →</Link>
          </div>
        </div>
      </main>
    </motion.div>
  );
}
