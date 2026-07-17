'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { EASE_OUT_EXPO } from '@/lib/animations';
import FloatingKeywords from '@/components/ui/FloatingKeywords';
import ScrollIndicator from '@/components/ui/ScrollIndicator';
import MagneticButton from '@/components/ui/MagneticButton';

const heroKeywords = ['Cloud', 'Docker', 'Linux', 'AWS', 'Terraform', 'Kubernetes', 'CI/CD'];

// Staggered character reveal for the main heading
function AnimatedHeading({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span className="inline-block overflow-hidden" aria-label={text}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: '110%' }}
          animate={{ y: '0%' }}
          transition={{
            duration: 0.9,
            ease: EASE_OUT_EXPO,
            delay: delay + i * 0.03,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax transforms
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center section-padding overflow-hidden"
      aria-label="Hero section"
    >
      {/* Floating Keywords */}
      <FloatingKeywords keywords={heroKeywords} />

      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <motion.div style={{ y: textY, opacity }} className="relative z-10 pt-32 md:pt-20">
        {/* Status line */}
        <motion.div
          className="flex items-center gap-3 mb-8 md:mb-12"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: EASE_OUT_EXPO }}
        >
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse-glow" />
          <span className="text-xs uppercase tracking-[0.25em] text-muted">
            Available for opportunities
          </span>
        </motion.div>

        {/* Main Heading */}
        <div className="mb-6 md:mb-8">
          <h1 className="font-heading font-bold uppercase leading-[0.9] tracking-tight">
            <span className="block text-[clamp(3rem,12vw,10rem)]">
              <AnimatedHeading text="Muhammad" delay={0.2} />
            </span>
            <span className="block text-[clamp(3rem,12vw,10rem)] ml-[5vw]">
              <AnimatedHeading text="Rayyan" delay={0.5} />
            </span>
          </h1>
        </div>

        {/* Role + Tagline */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-12">
          <div className="max-w-xl">
            <motion.p
              className="text-lg md:text-xl text-accent font-medium mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0, ease: EASE_OUT_EXPO }}
            >
              DevOps Engineer • DevSecOps • Cloud
            </motion.p>
            <motion.p
              className="text-sm md:text-base text-muted leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2, ease: EASE_OUT_EXPO }}
            >
              Building Scalable Infrastructure • Automating Everything • Cloud Native
            </motion.p>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4, ease: EASE_OUT_EXPO }}
          >
            <MagneticButton href="#projects" strength={0.3}>
              <span className="group inline-flex items-center gap-3 px-6 py-3 border border-border rounded-full text-sm uppercase tracking-widest hover:border-accent hover:text-accent transition-colors duration-500">
                View My Work
                <motion.svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </motion.svg>
              </span>
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>

      {/* Profile Image — positioned absolutely on larger screens */}
      <motion.div
        className="absolute right-[8%] top-1/2 -translate-y-1/2 w-[250px] h-[320px] md:w-[300px] md:h-[400px] lg:w-[350px] lg:h-[460px] hidden lg:block"
        style={{ y: imageY }}
        initial={{ clipPath: 'inset(100% 0 0 0)', opacity: 0 }}
        animate={{ clipPath: 'inset(0% 0 0 0)', opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.6, ease: EASE_OUT_EXPO }}
      >
        <div className="relative w-full h-full overflow-hidden rounded-sm">
          <Image
            src="/images/profile.jpg"
            alt="Muhammad Rayyan - DevOps Engineer"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 0px, 350px"
          />
          {/* Subtle overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
        </div>
        {/* Decorative accent line */}
        <motion.div
          className="absolute -bottom-4 -left-4 w-full h-full border border-accent/20 rounded-sm"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        />
      </motion.div>

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </section>
  );
}
