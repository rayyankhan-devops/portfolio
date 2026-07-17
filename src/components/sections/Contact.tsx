'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { socialLinks } from '@/lib/data';
import SectionReveal from '@/components/ui/SectionReveal';
import TextReveal from '@/components/ui/TextReveal';
import MagneticButton from '@/components/ui/MagneticButton';
import { EASE_OUT_EXPO } from '@/lib/animations';
import { FiArrowUpRight, FiMail, FiCopy, FiCheck } from 'react-icons/fi';
import { FaLinkedinIn, FaGithub, FaWhatsapp } from 'react-icons/fa';

const socialIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  HiOutlineMail: FiMail,
  FaLinkedinIn,
  FaGithub,
  FaWhatsapp,
};

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const email = 'rkkhan0750@gmail.com';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <section
      id="contact"
      className="relative section-padding py-10 md:py-14"
      aria-label="Contact section"
    >
      {/* Section Header */}
      <div className="mb-10 md:mb-12">
        <SectionReveal>
          <span className="text-xs uppercase tracking-[0.3em] text-accent mb-4 block">05 / Contact</span>
        </SectionReveal>
      </div>

      {/* Large CTA Heading */}
      <div className="mb-12 md:mb-20">
        <TextReveal
          text="Let's build"
          as="h2"
          className="font-heading text-[clamp(3rem,10vw,8rem)] font-bold uppercase leading-[0.95]"
          delay={0.1}
        />
        <TextReveal
          text="something"
          as="h2"
          className="font-heading text-[clamp(3rem,10vw,8rem)] font-bold uppercase leading-[0.95] text-gradient"
          delay={0.3}
        />
      </div>

      {/* Description */}
      <SectionReveal delay={0.3}>
        <p className="text-muted text-base md:text-lg leading-relaxed max-w-xl mb-12">
          Got a project that needs robust infrastructure, automated pipelines, or cloud architecture? 
          I&apos;d love to hear about it. Let&apos;s connect and build something production-ready.
        </p>
      </SectionReveal>

      {/* Email with Copy */}
      <SectionReveal delay={0.4} className="mb-16">
        <div className="flex items-center gap-4 flex-wrap">
          <MagneticButton href={`mailto:${email}`} strength={0.2}>
            <span className="text-xl md:text-2xl font-medium hover:text-accent transition-colors duration-300 flex items-center gap-3">
              {email}
              <FiArrowUpRight className="w-5 h-5" />
            </span>
          </MagneticButton>
          <button
            onClick={handleCopy}
            className="p-2 rounded-full border border-border hover:border-accent transition-colors duration-300"
            aria-label="Copy email address"
          >
            <motion.div
              initial={false}
              animate={{ rotate: copied ? 0 : 0 }}
            >
              {copied ? (
                <FiCheck className="w-4 h-4 text-secondary" />
              ) : (
                <FiCopy className="w-4 h-4 text-muted" />
              )}
            </motion.div>
          </button>
          {copied && (
            <motion.span
              className="text-xs text-secondary"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
            >
              Copied!
            </motion.span>
          )}
        </div>
      </SectionReveal>

      {/* Social Links */}
      <SectionReveal delay={0.5}>
        <div className="flex gap-4">
          {socialLinks.map((link, i) => {
            const IconComponent = socialIconMap[link.icon] || FiArrowUpRight;

            return (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.5 + i * 0.1,
                  ease: EASE_OUT_EXPO,
                }}
              >
                <MagneticButton href={link.url} strength={0.25}>
                  <span className="group flex items-center justify-center w-12 h-12 rounded-full border border-border hover:border-accent hover:bg-accent/5 transition-all duration-400">
                    <IconComponent className="w-5 h-5 text-muted group-hover:text-accent transition-colors duration-300" />
                  </span>
                </MagneticButton>
              </motion.div>
            );
          })}
        </div>
      </SectionReveal>

      {/* Decorative line */}
      <motion.div
        className="mt-24 w-full h-[1px] bg-gradient-to-r from-transparent via-border to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: EASE_OUT_EXPO }}
      />
    </section>
  );
}
