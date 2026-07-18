'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { learningMilestones } from '@/lib/data';
import SectionReveal from '@/components/ui/SectionReveal';
import TextReveal from '@/components/ui/TextReveal';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { EASE_OUT_EXPO } from '@/lib/animations';

export default function LearningJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const progressWidth = useTransform(scrollYProgress, [0.2, 0.7], ['0%', '100%']);
  const currentDay = useTransform(scrollYProgress, [0.2, 0.7], [0, 90]);

  return (
    <section
      ref={sectionRef}
      id="learning"
      className="relative section-padding py-10 md:py-14 overflow-hidden"
      aria-label="Learning journey section"
    >
      {/* Section Header */}
      <div className="mb-10 md:mb-14">
        <SectionReveal>
          <span className="text-xs uppercase tracking-[0.3em] text-secondary mb-4 block">Continuous Growth</span>
        </SectionReveal>
        <TextReveal
          text="90 Days of DevOps"
          as="h2"
          className="font-heading text-[clamp(2rem,5vw,4rem)] font-bold uppercase leading-[1.1]"
          delay={0.1}
        />
        <SectionReveal delay={0.2}>
          <p className="text-muted text-base md:text-lg leading-relaxed mt-4 max-w-xl">
            A structured learning journey through the entire DevOps ecosystem — from Linux fundamentals to Kubernetes orchestration.
          </p>
        </SectionReveal>
      </div>

      {/* Day Counter */}
      <SectionReveal delay={0.2} className="mb-12">
        <div className="flex items-baseline gap-3">
          <span className="text-6xl md:text-8xl font-heading font-bold text-accent">
            <AnimatedCounter target={90} duration={2.5} />
          </span>
          <span className="text-lg text-muted uppercase tracking-[0.15em]">Days Completed</span>
        </div>
      </SectionReveal>

      {/* Progress Bar */}
      <div className="relative mb-16 md:mb-24">
        <div className="w-full h-[2px] bg-border rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-accent to-secondary rounded-full"
            style={{ width: progressWidth }}
          />
        </div>

        {/* Milestone Markers */}
        <div className="relative mt-6 h-12">
          {learningMilestones.map((milestone, i) => {
            const position = (milestone.day / 90) * 100;

            return (
              <motion.div
                key={milestone.day}
                className="flex flex-col items-center"
                style={{ position: 'absolute', left: `${position}%`, transform: 'translateX(-50%)' }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              >
                <div className="w-2 h-2 rounded-full bg-accent mb-2 shadow-[0_0_6px_rgba(0,102,255,0.6)] animate-pulse" />
                <span className="text-[10px] uppercase tracking-[0.15em] text-muted whitespace-nowrap font-mono">
                  Day {milestone.day}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Milestone Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {learningMilestones.map((milestone, i) => (
          <motion.div
            key={milestone.day}
            data-cursor="milestone"
            className="group p-6 rounded-lg border border-border bg-surface/30 hover:border-accent/20 transition-all duration-500 cursor-default"
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
              boxShadow: '0 10px 30px -10px rgba(0, 102, 255, 0.08)',
              transition: { duration: 0.3 }
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl font-heading font-bold text-accent font-mono">
                {milestone.day}
              </span>
              <span className="text-[10px] uppercase tracking-[0.15em] text-muted-dark font-mono">Days</span>
            </div>
            <h3 className="text-sm font-semibold mb-2 font-heading uppercase tracking-tight">{milestone.title}</h3>
            <p className="text-xs text-muted leading-relaxed mb-4">{milestone.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {milestone.topics.slice(0, 4).map(topic => (
                <span key={topic} className="text-[9px] uppercase tracking-[0.1em] text-muted-dark border border-border/50 px-2 py-0.5 rounded font-mono">
                  {topic}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
