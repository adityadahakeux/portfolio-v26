'use client';
import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

// BEFORE / AFTER — the one interaction on this site that is evidence rather
// than navigation. Drag the handle and the old fund factsheet wipes into the
// redesign. Both images are the real screens, cropped identically by CSS
// (cover + top) so the comparison is like for like rather than two different
// framings dressed up as a pair.
// Keyboard accessible: focus the handle, arrow keys move it.

const EASE = [0.16, 1, 0.3, 1];

export default function BeforeAfter() {
  const secRef = useRef(null);
  const frameRef = useRef(null);
  const inView = useInView(secRef, { once: true, amount: 0.3 });
  const [pos, setPos] = useState(38);
  const [dragging, setDragging] = useState(false);
  const [touched, setTouched] = useState(false);

  const setFromClientX = useCallback((clientX) => {
    const el = frameRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const pct = ((clientX - r.left) / r.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const move = (e) => {
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      setFromClientX(x);
    };
    const up = () => setDragging(false);
    window.addEventListener('mousemove', move);
    window.addEventListener('touchmove', move, { passive: true });
    window.addEventListener('mouseup', up);
    window.addEventListener('touchend', up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('touchmove', move);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('touchend', up);
    };
  }, [dragging, setFromClientX]);

  const start = (e) => {
    setDragging(true);
    setTouched(true);
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    setFromClientX(x);
  };

  const onKey = (e) => {
    if (e.key === 'ArrowLeft') { setTouched(true); setPos((p) => Math.max(0, p - 4)); }
    if (e.key === 'ArrowRight') { setTouched(true); setPos((p) => Math.min(100, p + 4)); }
  };

  return (
    <section id="rebuild" ref={secRef} className="ba-sec">
      <div className="wrap-wide">
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="ba-head"
        >
          <span className="label" style={{ color: 'var(--accent)' }}>The same fund factsheet</span>
          <h2 className="ba-h2">One screen, rebuilt.</h2>
          <p className="ba-p">
            Advisors read this page in front of a client who is deciding where to put their
            money. The old version buried the numbers that decide it and left half its own
            fields empty. Drag the handle.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 26 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.12, ease: EASE }}
          className="ba-frame"
          ref={frameRef}
          onMouseDown={start}
          onTouchStart={start}
        >
          <img className="ba-img" src="/ebix/factsheet-before.png" alt="The fund factsheet before the redesign" draggable="false" />

          <div className="ba-clip" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
            <img className="ba-img" src="/ebix/factsheet-after.png" alt="The fund factsheet after the redesign" draggable="false" />
          </div>

          <span className="font-mono ba-tag ba-tag-before" style={{ opacity: pos > 14 ? 1 : 0 }}>Before</span>
          <span className="font-mono ba-tag ba-tag-after" style={{ opacity: pos < 86 ? 1 : 0 }}>After</span>

          <div className="ba-handle" style={{ left: `${pos}%` }}>
            <button
              className={`ba-grip${dragging ? ' is-dragging' : ''}${touched ? '' : ' is-nudging'}`}
              onKeyDown={onKey}
              aria-label="Drag to compare before and after"
              aria-valuenow={Math.round(pos)} aria-valuemin={0} aria-valuemax={100} role="slider"
              type="button"
            >
              <span className="ba-arrow">‹</span>
              <span className="ba-arrow">›</span>
            </button>
            {/* retires permanently once the handle has been used */}
            {!touched && <span className="font-mono ba-hint">Drag</span>}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="font-mono ba-foot"
        >
          EBIXCash · wealth platform · advisor-facing
        </motion.p>
      </div>
    </section>
  );
}
