'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { certifications } from '@/lib/data';
import SectionReveal from '@/components/ui/SectionReveal';
import TextReveal from '@/components/ui/TextReveal';
import { EASE_OUT_EXPO } from '@/lib/animations';
import { FiAward, FiEye } from 'react-icons/fi';

// Map certifications to badge colors
const badgeColors: Record<string, string> = {
  'Amazon Web Services': 'from-[#FF9900]/20 to-[#FF9900]/5',
  'Train With Shubham': 'from-[#7C3AED]/20 to-[#7C3AED]/5',
  'YoungDev Interns': 'from-[#E11D48]/20 to-[#E11D48]/5',
  'DevelopersHub Corporation': 'from-[#2563EB]/20 to-[#2563EB]/5',
};

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState<string | null>(null);

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
            key={cert.name}
            onClick={() => cert.image && setSelectedCert(cert.image)}
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
              y: -4,
              transition: { duration: 0.3 },
            }}
          >
            {/* Background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${badgeColors[cert.issuer] || 'from-accent/10 to-transparent'} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

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
              <h3 className="text-sm font-semibold mb-2 leading-snug">{cert.name}</h3>
              <p className="text-xs text-muted mb-3">{cert.issuer}</p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.15em] text-muted-dark">{cert.date}</span>
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
                className="absolute -top-12 right-0 text-muted hover:text-foreground text-sm uppercase tracking-widest flex items-center gap-2 cursor-pointer"
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
