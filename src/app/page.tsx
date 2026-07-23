'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SmoothScroll from '@/components/layout/SmoothScroll';
import Preloader from '@/components/ui/Preloader';

// Section components
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import Certifications from '@/components/sections/Certifications';
import LearningJourney from '@/components/sections/LearningJourney';
import Contact from '@/components/sections/Contact';

export default function Home() {
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window !== 'undefined') {
      const played = sessionStorage.getItem('preloader-played');
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      return !(played || prefersReducedMotion);
    }
    return true;
  });


  return (
    <>
      <Preloader onComplete={() => setIsLoading(false)} />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={!isLoading ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ pointerEvents: isLoading ? 'none' : 'auto' }}
      >
        <SmoothScroll>
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Certifications />
            <LearningJourney />
            <Contact />
          </main>
          <Footer />
        </SmoothScroll>
      </motion.div>
    </>
  );
}

