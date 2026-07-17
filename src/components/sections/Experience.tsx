'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { experiences } from '@/lib/data';
import SectionReveal from '@/components/ui/SectionReveal';
import TextReveal from '@/components/ui/TextReveal';
import { EASE_OUT_EXPO } from '@/lib/animations';
import { FiAward } from 'react-icons/fi';

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const lineProgress = useTransform(scrollYProgress, [0.1, 0.85], ['0%', '100%']);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative section-padding py-12 md:py-16"
      aria-label="Experience section"
    >
      {/* Section Header */}
      <div className="mb-8 md:mb-10">
        <SectionReveal>
          <span className="text-xs uppercase tracking-[0.3em] text-accent mb-4 block">04 / Experience</span>
        </SectionReveal>
        <TextReveal
          text="Where I've worked"
          as="h2"
          className="font-heading text-[clamp(2rem,5vw,4rem)] font-bold uppercase leading-[1.1]"
          delay={0.1}
        />
      </div>

      {/* Timeline */}
      <div className="relative max-w-4xl mx-auto">
        {/* Animated vertical line */}
        <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[1px] bg-border">
          <motion.div
            className="absolute top-0 left-0 w-full bg-accent origin-top"
            style={{ height: lineProgress }}
          />
        </div>

        {/* Experience Items */}
        {experiences.map((exp, i) => {
          const isLeft = i % 2 === 0;

          return (
            <motion.div
              key={exp.company}
              className={`relative pl-8 md:pl-0 pb-16 last:pb-0 md:grid md:grid-cols-2 md:gap-12`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.7,
                delay: 0.1,
                ease: EASE_OUT_EXPO,
              }}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-2 z-10">
                <div className={`w-3 h-3 rounded-full border-2 ${
                  exp.current ? 'bg-accent border-accent' : 'bg-background border-accent/50'
                }`} />
                {exp.current && (
                  <div className="absolute inset-0 w-3 h-3 rounded-full bg-accent animate-ping opacity-30" />
                )}
              </div>

              {/* Content - alternating sides on desktop */}
              <div className={`${isLeft ? 'md:text-right md:pr-12' : 'md:col-start-2 md:pl-12'}`}>
                <span className="text-xs uppercase tracking-[0.2em] text-accent mb-2 block">
                  {exp.period}
                  {exp.current && (
                    <span className="ml-2 px-2 py-0.5 bg-accent/10 text-accent rounded-full text-[10px]">
                      Current
                    </span>
                  )}
                </span>
                <h3 className="text-xl md:text-2xl font-heading font-bold uppercase mb-1">
                  {exp.role}
                </h3>
                <p className="text-sm text-muted-dark mb-4">{exp.company}</p>

                <ul className={`space-y-2 ${isLeft ? 'md:ml-auto' : ''}`}>
                  {exp.description.map((desc, j) => (
                    <motion.li
                      key={j}
                      className="text-sm text-muted leading-relaxed flex items-start gap-2"
                      initial={{ opacity: 0, x: isLeft ? 20 : -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: 0.2 + j * 0.08,
                        ease: EASE_OUT_EXPO,
                      }}
                    >
                      <span className={`w-1 h-1 rounded-full bg-accent/50 mt-2 shrink-0 ${isLeft ? 'md:order-last' : ''}`} />
                      <span>{desc}</span>
                    </motion.li>
                  ))}
                </ul>

                {exp.certificate && (
                  <motion.a
                    href={exp.certificate}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 mt-5 text-xs uppercase tracking-wider text-accent hover:text-foreground transition-colors duration-300 border border-accent/20 hover:border-foreground/30 px-3 py-1.5 rounded bg-accent/5 cursor-pointer ${
                      isLeft ? 'md:ml-auto' : ''
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FiAward className="w-3.5 h-3.5" />
                    Verify Certificate
                  </motion.a>
                )}
              </div>

              {/* Empty column for alternating layout */}
              {isLeft && <div className="hidden md:block" />}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
