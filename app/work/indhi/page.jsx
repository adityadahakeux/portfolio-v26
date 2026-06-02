'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { MobileBackButton, NextProjectCTA } from '@/components/CaseStudyNav';
import ReadingProgress from '@/components/ReadingProgress';

const EASE = [0.25, 1, 0.5, 1];
const rev = (d = 0) => ({ initial: { opacity: 0, y: 14 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 }, transition: { duration: 0.65, delay: d, ease: EASE } });
const INDHI_BLUE = '#3B5BDB';

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
function WebFrame({ src, alt, caption }) {
  return (
    <div>
      <div style={{ borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 4px rgba(26,24,20,0.04), 0 12px 40px rgba(26,24,20,0.1), 0 40px 80px rgba(26,24,20,0.08)', border: '1px solid rgba(26,24,20,0.06)' }}>
        <div style={{ background: '#F0EFED', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 6, borderBottom: '1px solid rgba(26,24,20,0.07)' }}>
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#F87171', flexShrink: 0 }} />
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#FBBF24', flexShrink: 0 }} />
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#34D399', flexShrink: 0 }} />
          <div style={{ flex: 1, height: 22, background: '#E8E6E1', borderRadius: 4, marginLeft: 8 }} />
        </div>
        <img src={src} alt={alt} style={{ width: '100%', display: 'block' }} />
      </div>
      {caption && <p className="font-mono" style={{ fontSize: '0.625rem', color: '#A8A39C', marginTop: 14, letterSpacing: '0.04em', textAlign: 'center', lineHeight: 1.5 }}>{caption}</p>}
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

function AutomationFlow() {
  const steps = [
    { type: 'block', label: 'Condition: IF', sub: 'Time based or event based', color: '#6B7CFF' },
    { type: 'arrow' },
    { type: 'block', label: 'Device / Sensor', sub: 'Temperature · Motion · Light', color: '#A23A22' },
    { type: 'arrow' },
    { type: 'block', label: 'Condition: THEN', sub: 'Scene or device response', color: '#34D399' },
  ];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, overflowX: 'auto', paddingBottom: 4, marginBottom: 32 }}>
      {steps.map((s, i) => (
        <motion.div key={i} {...rev(i * 0.1)} style={{ flexShrink: 0 }}>
          {s.type === 'arrow'
            ? <span style={{ fontSize: '1.25rem', color: 'rgba(26,23,18,0.14)', padding: '0 4px' }}>→</span>
            : <div style={{ padding: '12px 18px', borderRadius: 8, background: `${s.color}12`, border: `1px solid ${s.color}28`, minWidth: 140 }}>
                <div className="font-mono" style={{ fontSize: '0.625rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: s.color, marginBottom: 6 }}>{s.label}</div>
                <div style={{ fontSize: '0.75rem', color: '#6B6760', lineHeight: 1.4 }}>{s.sub}</div>
              </div>
          }
        </motion.div>
      ))}
    </div>
  );
}

function INDHIHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const y   = useTransform(scrollYProgress, [0, 1], [50, 0]);
  const op  = useTransform(scrollYProgress, [0, 0.4], [0.5, 1]);
  const y2  = useTransform(scrollYProgress, [0.25, 1], [80, 0]);
  const op2 = useTransform(scrollYProgress, [0.25, 0.75], [0, 1]);

  return (
    <div style={{ background: INDHI_BLUE, position: 'relative', overflow: 'hidden', paddingTop: 148 }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 50% at 70% 20%, rgba(255,255,255,0.07) 0%, transparent 70%)' }} />
      <div className="wrap-reading" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: EASE }}>
          <span className="font-mono" style={{ fontSize: '0.6875rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', display: 'block', marginBottom: 18 }}>
            Dhi Technologies · IoT SaaS · 2023 · Primary case study
          </span>
          <h1 className="font-display" style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 300, color: '#F0ECE3', lineHeight: 1.07, letterSpacing: '-0.03em', marginBottom: 24 }}>
            INDHI — Smart Infrastructure<br />Operating System
          </h1>
          <p className="font-display" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.35rem)', color: 'rgba(250,248,244,0.68)', lineHeight: 1.45, fontWeight: 300, fontStyle: 'italic', marginBottom: 48, maxWidth: 520 }}>
            A home is not a network. It is a set of intentions about how spaces should behave.
          </p>
        </motion.div>
        <div ref={ref} style={{ position: 'relative' }}>
          <motion.div style={{ position: 'absolute', right: 0, top: 20, width: '22%', y: y2, opacity: op2, zIndex: 1 }}>
            <div style={{ borderRadius: 24, overflow: 'hidden', border: '4px solid rgba(255,255,255,0.3)', boxShadow: '0 24px 50px rgba(0,0,0,0.3)' }}>
              <img src="/indhi/mobile-home.png" alt="INDHI mobile" style={{ width: '100%', display: 'block' }} />
            </div>
          </motion.div>
          <motion.div style={{ y, opacity: op, position: 'relative', zIndex: 2, marginRight: '20%' }}>
            <div style={{ borderRadius: '12px 12px 0 0', overflow: 'hidden', boxShadow: '0 -4px 30px rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderBottom: 'none' }}>
              <div style={{ background: 'rgba(255,255,255,0.08)', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 6, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.25)' }} />
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.15)' }} />
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.15)' }} />
                <div style={{ flex: 1, height: 18, background: 'rgba(255,255,255,0.1)', borderRadius: 4, marginLeft: 10 }} />
              </div>
              <img src="/indhi/dashboard.png" alt="INDHI dashboard" style={{ width: '100%', display: 'block' }} />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function INDHIPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} style={{ background: '#F0ECE3', minHeight: '100vh', color: '#1A1712' }}>
      <ReadingProgress />
      <MobileBackButton />
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: 'rgba(14,15,19,0.6)', backdropFilter: 'blur(20px) saturate(1.6)', WebkitBackdropFilter: 'blur(20px) saturate(1.6)', borderBottom: '1px solid rgba(244,245,247,0.1)' }}>
        <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 16, paddingBottom: 16 }}>
          <Link href="/" className="link-line font-mono" style={{ fontSize: '0.75rem', letterSpacing: '0.04em', color: '#F4F5F7' }}>← Back to Home</Link>
          <span className="font-mono" style={{ fontSize: '0.6875rem', color: '#A8A39C', letterSpacing: '0.04em' }}>INDHI — Smart Infrastructure OS</span>
          <Link href="/work/trumac" className="link-line font-mono" style={{ fontSize: '0.75rem', letterSpacing: '0.04em', color: '#A23A22' }}>Next project: TruMac →</Link>
        </div>
      </div>
      <main>
        <INDHIHero />
        <SectionWrap bg="#F0ECE3" py={120}>
          <motion.div {...rev(0)}>
            <Label>The problem</Label>
            <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: '#1A1712', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 28 }}>
              IoT platforms fail when they mirror device topology<br />instead of{' '}
              <em style={{ color: '#A23A22', fontStyle: 'italic' }}>how people think about their spaces.</em>
            </h2>
            <p style={{ fontSize: '1.0625rem', color: '#4A463F', lineHeight: 1.8, maxWidth: 560 }}>
              People don't think in protocols and pairing. They think in spaces, intentions, and outcomes — and they need an administrator surface that lets them govern, not just toggle.
            </p>
          </motion.div>
        </SectionWrap>
        <SectionWrap bg="#E8E3D8" border py={90}>
          <motion.div {...rev(0)} style={{ marginBottom: 36 }}>
            <Label>One model, two surfaces</Label>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.7rem, 3.2vw, 2.4rem)', fontWeight: 300, color: '#1A1712', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: 22 }}>Same hierarchy, two altitudes.</h2>
            <p style={{ fontSize: '1rem', color: '#6B6760', lineHeight: 1.75, maxWidth: 560 }}>Organization → Locations → Groups → Devices: one data model for two users. The web administrator provisions, governs, and bills. The mobile occupant monitors and controls.</p>
          </motion.div>
          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}><WebFrame src="/indhi/dashboard.png" alt="INDHI web admin dashboard" caption="Web command center · admin governance & analytics" /></div>
            <div style={{ width: '28%', flexShrink: 0 }}><PhoneFrame src="/indhi/mobile-home.png" alt="INDHI mobile" caption="Mobile · occupant control" width="100%" /></div>
          </div>
        </SectionWrap>
        <SectionWrap bg="#F0ECE3" border py={90}>
          <motion.div {...rev(0)} style={{ marginBottom: 36 }}>
            <Label>The web command center</Label>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.7rem, 3.2vw, 2.4rem)', fontWeight: 300, color: '#1A1712', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: 22 }}>The navigation is the product strategy.</h2>
            <p style={{ fontSize: '1rem', color: '#6B6760', lineHeight: 1.75, maxWidth: 540 }}>Management · Inventory · Analytics · Setup: four clusters that tell you exactly who INDHI is for. Multi-tenant infrastructure with roles, security, billing, and reports — not a smart-home gadget.</p>
          </motion.div>
          <WebFrame src="/indhi/dashboard.png" alt="INDHI admin dashboard" caption="INDHI web dashboard · Total Users · Groups · Devices · Power Usage · Notes · To-Dos" />
          <motion.div {...rev(0.1)} style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {['Management', 'Device Inventory', 'Analytics & Reports', 'Organization', 'Security', 'Billing', 'Roles'].map(c => (
              <span key={c} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 100, background: 'rgba(59,91,219,0.08)', border: '1px solid rgba(59,91,219,0.2)', fontSize: '0.75rem', color: INDHI_BLUE, marginRight: 8, marginBottom: 8, fontFamily: "'DM Mono', monospace" }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: INDHI_BLUE }} />{c}
              </span>
            ))}
          </motion.div>
        </SectionWrap>
        <SectionWrap bg="#E8E3D8" border py={90}>
          <motion.div {...rev(0)} style={{ marginBottom: 40 }}>
            <Label>Control, crafted</Label>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.7rem, 3.2vw, 2.4rem)', fontWeight: 300, color: '#1A1712', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: 22 }}>Complexity at the platform layer,<br />simplicity at the touch layer.</h2>
            <p style={{ fontSize: '1rem', color: '#6B6760', lineHeight: 1.75, maxWidth: 540 }}>For the occupant, controlling a device is one screen — warm, color, or romantic mode; a radial intensity dial; instant feedback. The same designer who built the governance logic delivered consumer-grade polish for the people inside the space.</p>
          </motion.div>
          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', justifyContent: 'center' }}>
            <PhoneFrame src="/indhi/device-control.png" alt="Device control" caption="Light control · warm / color / romantic · radial intensity" width="44%" tilt={-2} />
            <PhoneFrame src="/indhi/mobile-group.png" alt="Group view" caption="Group view · power consumption · weekly usage report" width="44%" tilt={2} />
          </div>
        </SectionWrap>
        <SectionWrap bg="#F0ECE3" border py={90}>
          <motion.div {...rev(0)} style={{ marginBottom: 36 }}>
            <Label>Automation engine · the centerpiece</Label>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 300, color: '#1A1712', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 24 }}>
              IF the room is too warm,<br /><em style={{ color: '#A23A22', fontStyle: 'italic' }}>THEN cool it — before anyone asks.</em>
            </h2>
            <p style={{ fontSize: '1.0625rem', color: '#4A463F', lineHeight: 1.8, marginBottom: 36, maxWidth: 580 }}>The automation builder turns sensors into logic — time-based or event-based triggers, seven sensor conditions, comparison operators, and alert notifications. Where INDHI stops being a remote control and becomes infrastructure that acts on its own.</p>
          </motion.div>
          <AutomationFlow />
          <WebFrame src="/indhi/automation.png" alt="INDHI web automation builder" caption="Web automation builder · IF condition → THEN scene or device" />
          <motion.div {...rev(0.1)} style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {['Time-based', 'Event-based', 'Temperature', 'Motion', 'Light intensity', 'Moisture', 'Humidity', 'Current', 'Voltage', 'Scene response'].map(c => (
              <span key={c} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 100, background: 'rgba(107,124,255,0.08)', border: '1px solid rgba(107,124,255,0.2)', fontSize: '0.75rem', color: '#6B7CFF', marginRight: 8, marginBottom: 8, fontFamily: "'DM Mono', monospace" }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#6B7CFF' }} />{c}
              </span>
            ))}
          </motion.div>
        </SectionWrap>
        <SectionWrap bg="#E8E3D8" border py={90}>
          <motion.div {...rev(0)} style={{ marginBottom: 36 }}>
            <Label>Energy as a first-class citizen</Label>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.7rem, 3.2vw, 2.4rem)', fontWeight: 300, color: '#1A1712', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: 22 }}>Every device, every group, accountable.</h2>
            <p style={{ fontSize: '1rem', color: '#6B6760', lineHeight: 1.75, maxWidth: 540 }}>Consumption surfaces on every group card, every device entry, and in both web and mobile — kW/H as the platform's native unit of truth, not a buried report.</p>
          </motion.div>
          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}><WebFrame src="/indhi/dashboard.png" alt="INDHI energy" caption="Web · 1200 kW/H average power · today across all groups" /></div>
            <div style={{ width: '30%', flexShrink: 0 }}><PhoneFrame src="/indhi/mobile-group.png" alt="Mobile energy" caption="Mobile · weekly power report" width="100%" /></div>
          </div>
        </SectionWrap>
        <SectionWrap bg="#F0ECE3" border py={90}>
          <motion.div {...rev(0)} style={{ marginBottom: 36 }}>
            <Label>Business model</Label>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.7rem, 3.2vw, 2.4rem)', fontWeight: 300, color: '#1A1712', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: 22 }}>Designed as a product, not a feature.</h2>
            <p style={{ fontSize: '1rem', color: '#6B6760', lineHeight: 1.75, maxWidth: 540 }}>Starters → Basic → Premium → Professional. A transparent feature-tier matrix with add-ons — scaling from a single-space trial to enterprise-managed properties.</p>
          </motion.div>
          <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start' }}>
            <div style={{ width: '34%', flexShrink: 0 }}><PhoneFrame src="/indhi/subscription.png" alt="INDHI subscription plans" caption="Subscription · free to enterprise" width="100%" /></div>
            <div style={{ flex: 1 }}>
              <div style={{ border: '1px solid rgba(26,23,18,0.14)', borderRadius: 10, overflow: 'hidden' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr 1fr', background: '#E8E3D8' }}>
                  <div style={{ padding: '12px 14px', borderBottom: '1px solid rgba(26,23,18,0.14)' }} />
                  {['Starters', 'Basic', 'Premium', 'Pro'].map(t => (
                    <div key={t} style={{ padding: '12px 14px', borderBottom: '1px solid rgba(26,23,18,0.14)', textAlign: 'center', background: t === 'Premium' ? '#1E2D5E' : undefined }}>
                      <span style={{ fontSize: '0.8125rem', fontWeight: 500, color: t === 'Premium' ? '#F0ECE3' : '#1A1712' }}>{t}</span>
                    </div>
                  ))}
                  {['Devices', 'Groups', 'Scenes', 'Automation', 'Users'].map((r, ri) => (
                    <div key={r} style={{ display: 'contents' }}>
                      <div style={{ padding: '10px 14px', borderBottom: ri < 4 ? '1px solid #E4DFD6' : 'none', fontSize: '0.875rem', color: '#6B6760' }}>{r}</div>
                      {['5', '10', '20', '∞'].map((v, vi) => (
                        <div key={vi} style={{ padding: '10px 14px', borderBottom: ri < 4 ? '1px solid #E4DFD6' : 'none', textAlign: 'center', background: vi === 2 ? 'rgba(30,45,94,0.04)' : 'transparent' }}>
                          <span className="font-mono" style={{ fontSize: '0.8125rem', color: vi === 2 ? '#1E2D5E' : '#A8A39C', fontWeight: vi === 2 ? 500 : 400 }}>{v}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </SectionWrap>
        <SectionWrap bg="#E8E3D8" border py={90}>
          <motion.div {...rev(0)}>
            <Label>Outcome</Label>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 300, color: '#1A1712', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: 24 }}>From devices to infrastructure.</h2>
            <p style={{ fontSize: '1rem', color: '#6B6760', lineHeight: 1.78, marginBottom: 44, maxWidth: 580 }}>INDHI shipped across web and Android/iOS as one ecosystem — monitoring, control, automation, energy, administration, and monetization. An operating system for the built environment.</p>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 16, alignItems: 'start' }}>
            <motion.div {...rev(0.05)}><WebFrame src="/indhi/dashboard.png" alt="INDHI dashboard" caption="Command center" /></motion.div>
            <motion.div {...rev(0.1)}><WebFrame src="/indhi/automation.png" alt="INDHI automation" caption="Automation engine" /></motion.div>
            <motion.div {...rev(0.15)}><PhoneFrame src="/indhi/device-control.png" alt="INDHI mobile" caption="Device control" width="100%" shadow={false} /></motion.div>
          </div>
        </SectionWrap>
        <NextProjectCTA href="/work/trumac" label="TruMac" />
        <div style={{ background: '#F0ECE3', borderTop: '1px solid rgba(26,23,18,0.14)' }}>
          <div className="wrap-reading" style={{ paddingTop: 40, paddingBottom: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href="/" className="link-line font-mono" style={{ fontSize: '0.75rem' }}>← Back to Home</Link>
            <Link href="/work/trumac" className="link-line font-mono" style={{ fontSize: '0.75rem', color: '#A23A22' }}>Next project: TruMac →</Link>
          </div>
        </div>
      </main>
    </motion.div>
  );
}
