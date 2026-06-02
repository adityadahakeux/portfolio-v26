'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import SmoothScroll from '@/components/SmoothScroll';
import LoadingSequence from '@/components/LoadingSequence';
import Hero from '@/components/Hero';
import LogoStrip from '@/components/LogoStrip';
import { Unwrap } from '@/components/ScrollFX';
import ProjectARC from '@/components/ProjectARC';
import ProjectINDHI from '@/components/ProjectINDHI';
import TruMac from '@/components/ProjectTruMac';
import SystemsBeyond from '@/components/SystemsBeyond';
import About from '@/components/About';
import TrustBand from '@/components/TrustBand';
import Contact from '@/components/Contact';

// V16 — "The Exhibition." A museum of operational systems. Light editorial
// paper, the dark blueprint room for INDHI and the curator's statement, type
// as the identity. Cinematic, breathing pacing.
export default function Home() {
  const [ready, setReady] = useState(false);
  return (
    <>
      <LoadingSequence onDone={() => setReady(true)} />
      <SmoothScroll>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }} transition={{ duration: 0.8, ease: 'easeOut' }}>
          <Navbar />
          <main>
            <Hero start={ready} />
            <LogoStrip />
            <Unwrap><ProjectARC /></Unwrap>
            <Unwrap><ProjectINDHI /></Unwrap>
            <TruMac />
            <Unwrap><SystemsBeyond /></Unwrap>
            <About />
            <TrustBand />
            <Contact />
          </main>
        </motion.div>
      </SmoothScroll>
    </>
  );
}
