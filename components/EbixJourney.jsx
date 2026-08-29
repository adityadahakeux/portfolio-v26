'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// CURRENT WORK — EBIXCash. Sits directly under the hero because this is the
// most recent and most relevant work. Deliberately shallow: three products,
// one line each. The deep case studies (ARC, INDHI, TruMac) come after.
// Client names are withheld on purpose.

const WORK = [
  {
    no: '01',
    name: 'Private Equity',
    domain: 'US market',
    line: 'Capital placed into property and land, held and tracked as shareholdings. Built for a US client.',
    shot: null,
  },
  {
    no: '02',
    name: 'RM Dashboards',
    domain: 'Wealth management',
    line: 'Where a relationship manager sees every client at once — portfolio status, wealth under management, and what needs attention today.',
    shot: null,
  },
  {
    no: '03',
    name: 'Vantage',
    domain: 'Loan against securities',
    line: 'Clients borrow against the portfolio they already hold, without having to sell any of it.',
    shot: null,
  },
];

function Shot({ src, alt }) {
  if (src) {
    return (
      <div className="mount" style={{ overflow: 'hidden', borderRadius: 10 }}>
        <img src={src} alt={alt} style={{ width: '100%', display: 'block' }} />
      </div>
    );
  }
  return (
    <div
      aria-hidden
      style={{
        aspectRatio: '16 / 10',
        borderRadius: 10,
        border: '1px dashed var(--rule, rgba(244,245,247,0.12))',
        background:
          'linear-gradient(180deg, rgba(244,245,247,0.035) 0%, rgba(244,245,247,0.012) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span
        className="font-mono"
        style={{
          fontSize: '0.6rem',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'var(--ink-3, rgba(244,245,247,0.38))',
        }}
      >
        Screenshot to come
      </span>
    </div>
  );
}

export default function EbixJourney() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="ebix" ref={ref} style={{ position: 'relative', paddingTop: 86, paddingBottom: 86 }}>
      <div className="wrap-wide" style={{ position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 52, maxWidth: 640 }}
        >
          <span className="label" style={{ color: 'var(--accent)', display: 'block', marginBottom: 16 }}>
            Currently · EBIXCash
          </span>
          <h2
            style={{
              fontSize: 'clamp(1.6rem, 3.4vw, 2.6rem)',
              fontWeight: 600,
              color: 'var(--ink)',
              letterSpacing: '-0.025em',
              lineHeight: 1.12,
            }}
          >
            Three products inside one{' '}
            <span className="font-serif" style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--accent)' }}>
              wealth platform.
            </span>
          </h2>
        </motion.div>

        <div className="ebix-grid">
          {WORK.map((w, i) => (
            <motion.div
              key={w.no}
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <Shot src={w.shot} alt={w.name} />

              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginTop: 20 }}>
                <span
                  className="font-mono"
                  style={{ fontSize: '0.62rem', letterSpacing: '0.14em', color: 'var(--accent)' }}
                >
                  {w.no}
                </span>
                <h3 style={{ fontSize: '1.0625rem', fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.01em' }}>
                  {w.name}
                </h3>
              </div>

              <div
                className="font-mono"
                style={{
                  fontSize: '0.6rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--ink-3, rgba(244,245,247,0.38))',
                  marginTop: 8,
                  marginBottom: 12,
                }}
              >
                {w.domain}
              </div>

              <p style={{ fontSize: '0.9375rem', lineHeight: 1.62, color: 'var(--ink-2, rgba(244,245,247,0.62))', margin: 0 }}>
                {w.line}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .ebix-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
        }
        @media (max-width: 900px) {
          .ebix-grid { grid-template-columns: 1fr; gap: 48px; }
        }
      `}</style>
    </section>
  );
}
