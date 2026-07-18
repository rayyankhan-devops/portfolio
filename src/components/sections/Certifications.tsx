'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { certifications } from '@/lib/data';
import SectionReveal from '@/components/ui/SectionReveal';
import TextReveal from '@/components/ui/TextReveal';
import { EASE_OUT_EXPO } from '@/lib/animations';
import { FiAward, FiEye } from 'react-icons/fi';

// Map certifications to badge colors
const badgeColors: Record<string, string> = {
  'Amazon Web Services': 'from-[#FF9900]/15 to-[#FF9900]/5',
  'Train With Shubham': 'from-[#7C3AED]/15 to-[#7C3AED]/5',
  'YoungDev Interns': 'from-[#E11D48]/15 to-[#E11D48]/5',
  'DevelopersHub Corporation': 'from-[#2563EB]/15 to-[#2563EB]/5',
};

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState<string | null>(null);

  // Spotlight glow effect tracker
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  // Keyboard accessibility: Escape to close modal
  useEffect(() => {
    if (!selectedCert) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedCert(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCert]);

  return (
    <section
      id="certifications"
      className="relative section-padding py-10 md:py-14"
      aria-label="Certifications section"
    >
      {/* Section Header */}
      <div className="mb-10 md:mb-14">
        <SectionReveal>
          <span className="text-xs uppercase tracking-[0.3em] text-secondary mb-4 block">Credentials</span>
        </SectionReveal>
        <TextReveal
          text="Certifications"
          as="h2"
          className="font-heading text-[clamp(2rem,5vw,4rem)] font-bold uppercase leading-[1.1]"
          delay={0.1}
        />
      </div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {certifications.map((cert, i) => (
          <motion.div
            key={`${cert.name}-${cert.issuer}`}
            onClick={() => cert.image && setSelectedCert(cert.image)}
            onMouseMove={handleMouseMove}
            data-cursor={cert.image ? 'cert' : undefined}
            className={`group relative p-6 rounded-lg border border-border bg-surface/30 hover:border-secondary/30 transition-all duration-500 overflow-hidden ${
              cert.image ? 'cursor-pointer' : 'cursor-default'
            }`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.6,
              delay: i * 0.1,
              ease: EASE_OUT_EXPO,
            }}
            whileHover={{
              y: -5,
              scale: 1.01,
              boxShadow: '0 10px 30px -10px rgba(0, 212, 170, 0.12)',
              transition: { duration: 0.3 },
            }}
          >
            {/* Spotlight Glow Overlay */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
              style={{
                background: 'radial-gradient(180px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(0, 212, 170, 0.1), transparent 80%)'
              }}
            />

            {/* Background gradient border highlights */}
            <div className={`absolute inset-0 bg-gradient-to-br ${badgeColors[cert.issuer] || 'from-accent/10 to-transparent'} opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0`} />

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-5">
                <div className="w-10 h-10 rounded-lg bg-surface-light flex items-center justify-center group-hover:bg-secondary/10 transition-colors duration-400">
                  <FiAward className="w-5 h-5 text-secondary" />
                </div>
                {cert.image && (
                  <span className="text-[10px] uppercase tracking-[0.1em] text-muted-dark group-hover:text-secondary transition-colors duration-300 flex items-center gap-1.5 opacity-0 group-hover:opacity-100">
                    <FiEye className="w-3.5 h-3.5" />
                    View
                  </span>
                )}
              </div>
              <h3 className="text-sm font-semibold mb-2 leading-snug tracking-tight font-heading">{cert.name}</h3>
              <p className="text-xs text-muted mb-3">{cert.issuer}</p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.15em] text-muted-dark font-mono">{cert.date}</span>
                {cert.credentialId && (
                  <span className="text-[9px] text-muted-dark/50 font-mono">{cert.credentialId}</span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-4 md:p-8 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
              className="relative max-w-4xl max-h-[85vh] w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full max-h-[80vh] overflow-hidden rounded-lg border border-border bg-surface">
                <Image
                  src={selectedCert}
                  alt="Certificate Verification"
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute -top-12 right-0 text-muted hover:text-foreground text-sm uppercase tracking-widest flex items-center gap-2 cursor-pointer focus:outline-none"
              >
                Close
                <span className="text-xl">×</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
