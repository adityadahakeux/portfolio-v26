'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// PUBLIC SECTOR — SAKSHAM. Sits after TruMac.
// Attribution is deliberate: the design work is claimed in the first person,
// the programme and its outcomes are attributed to TIFAC and Sapio Analytics.
// SAKSHAM being India's first PPP livelihood model is the programme's
// achievement, not the designer's, and is written that way on purpose.

const EASE = [0.16, 1, 0.3, 1];

const REACH = [
  { v: '80,000+', l: 'Candidates matched' },
  { v: '250+', l: 'Talukas covered' },
  { v: '11,000+', l: 'Job seekers connected' },
];

const CREDENTIALS = [
  { src: '/logos/ministry.svg', alt: 'Ministry of Science and Technology', h: 46 },
  { src: '/logos/samarth.png', alt: 'Samarth', h: 34 },
  { src: '/logos/saksham.png', alt: 'Saksham', h: 34 },
  { src: '/logos/mysba.png', alt: 'Swavalambi Bharat Abhiyan', h: 38 },
];

export default function PublicSector() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="public" ref={ref} className="ps-sec">
      <div className="ps-glow" aria-hidden />

      <div className="wrap-wide" style={{ position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 30, flexWrap: 'wrap', gap: 16 }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, flexWrap: 'wrap' }}>
            <span className="plate-no" style={{ color: 'var(--live)' }}>PUBLIC SECTOR / 04</span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 4.2vw, 3.2rem)', fontWeight: 600, color: 'var(--ink)', lineHeight: 1, letterSpacing: '-0.03em' }}>SAKSHAM</h2>
            <span className="label" style={{ display: 'inline' }}>Shramik Shakti Manch · 2022–2023</span>
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 12px', borderRadius: 100, background: 'rgba(63,184,115,0.1)', border: '1px solid rgba(63,184,115,0.3)' }}>
            <span className="pulse-dot" />
            <span className="font-mono" style={{ fontSize: '0.62rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--live)' }}>Government of India · national scale</span>
          </div>
        </motion.div>

        <div className="ps-grid">
          {/* the work */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          >
            <h3 className="ps-h3">
              A job portal for people the internet was{' '}
              <span className="font-serif ps-em">never designed for.</span>
            </h3>

            <p className="ps-p">
              SAKSHAM matches the skills of <em>shramiks</em> — India's informal workforce — against
              what MSMEs actually need, and removes the middlemen who normally sit in between. Run by
              TIFAC under the Ministry of Science &amp; Technology.
            </p>

            <p className="ps-p">
              <strong className="ps-strong">I designed the candidate side of it</strong> — the
              onboarding journey, the job-discovery flows, and the platform screens. The constraint
              shaped everything: a first-time smartphone user, low literacy, patchy connection,
              often filling this in on someone else's phone. Nothing could assume prior knowledge.
            </p>

            <div className="ps-reach">
              {REACH.map((r, i) => (
                <motion.div key={r.l}
                  initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease: EASE }}
                >
                  <div className="font-mono ps-v">{r.v}</div>
                  <div className="ps-l">{r.l}</div>
                </motion.div>
              ))}
            </div>
            <p className="ps-note">Programme reach, delivered by TIFAC with Sapio Analytics as implementation partner.</p>
          </motion.div>

          {/* on the record */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.24, ease: EASE }}
          >
            <div className="ps-card">
              <div className="ps-card-head">
                <span className="font-mono ps-card-src">Press Information Bureau · Government of India</span>
              </div>
              <p className="ps-quote">
                TIFAC unveiled SAKSHAM — Shramik Shakti Manch — a job portal mapping the skills of
                shramiks against the requirements of MSMEs. India's first public–private partnership
                model for livelihood.
              </p>
              <div className="ps-card-foot">
                <span className="font-mono ps-card-tag">On public record</span>
              </div>
            </div>

            <div className="ps-logos">
              {CREDENTIALS.map((c) => (
                <img key={c.alt} src={c.src} alt={c.alt} className="trust-logo" style={{ height: c.h }} />
              ))}
            </div>

            <p className="ps-why">
              Fintech pays the bills. This is the work I'd point at if someone asked whether design
              can matter — a screen that ends with somebody getting a job.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
