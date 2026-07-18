'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SiDocker, SiKubernetes, SiTerraform, SiAnsible,
  SiLinux, SiGit, SiGithubactions, SiJenkins,
  SiPython, SiGrafana, SiPrometheus,
  SiGooglecloud, SiGnubash, SiTrivy, SiOwasp,
} from 'react-icons/si';
import { FaAws, FaShieldAlt, FaNetworkWired, FaTerminal, FaDragon } from 'react-icons/fa';
import { VscAzure } from 'react-icons/vsc';
import { skills } from '@/lib/data';
import SectionReveal from '@/components/ui/SectionReveal';
import TextReveal from '@/components/ui/TextReveal';
import { EASE_OUT_EXPO } from '@/lib/animations';

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  SiDocker, SiKubernetes, SiTerraform, SiAnsible,
  SiLinux, SiGit, SiGithubactions, SiJenkins,
  SiPython, SiGrafana, SiPrometheus,
  SiGooglecloud, SiGnubash, SiTrivy, SiOwasp,
  FaAws, VscAzure,
  FaShieldAlt, FaNetworkWired, FaTerminal, FaDragon,
};

const categories = ['All', ...Array.from(new Set(skills.map(s => s.category)))];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredSkills = activeCategory === 'All' 
    ? skills 
    : skills.filter(s => s.category === activeCategory);

  return (
    <section
      id="skills"
      className="relative section-padding py-10 md:py-14"
      aria-label="Skills section"
    >
      {/* Section Header */}
      <div className="mb-10 md:mb-14">
        <SectionReveal>
          <span className="text-xs uppercase tracking-[0.3em] text-accent mb-4 block">02 / Skills</span>
        </SectionReveal>
        <TextReveal
          text="Technologies I work with"
          as="h2"
          className="font-heading text-[clamp(2rem,5vw,4rem)] font-bold uppercase leading-[1.1]"
          delay={0.1}
        />
      </div>

      {/* Category Filter */}
      <SectionReveal delay={0.2} className="mb-12">
        <div className="flex flex-wrap gap-2 md:gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs uppercase tracking-[0.15em] rounded-full border transition-all duration-400 ${
                activeCategory === cat
                  ? 'border-accent text-accent bg-accent/5'
                  : 'border-border text-muted hover:border-muted-dark hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </SectionReveal>

      {/* Skills Grid */}
      <motion.div
        layout
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill, i) => {
            const IconComponent = iconMap[skill.icon];

            return (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.03,
                  ease: EASE_OUT_EXPO,
                  layout: { duration: 0.4 },
                }}
                whileHover={{
                  y: -5,
                  scale: 1.02,
                  boxShadow: '0 10px 30px -10px rgba(0, 102, 255, 0.15)',
                  transition: { duration: 0.3, ease: EASE_OUT_EXPO },
                }}
                data-cursor="tech"
                className="group relative p-5 md:p-6 rounded-lg border border-border bg-surface/50 hover:border-accent/30 hover:bg-surface-light/50 transition-colors duration-500 cursor-default"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ boxShadow: '0 0 30px rgba(0, 102, 255, 0.08) inset' }}
                />

                <div className="relative z-10">
                  {IconComponent && (
                    <IconComponent className="w-6 h-6 mb-4 text-muted group-hover:text-accent group-hover:scale-110 group-hover:rotate-6 transition-all duration-400 ease-out" />
                  )}
                  <h3 className="text-sm font-medium mb-3 tracking-tight font-heading">{skill.name}</h3>
                  
                  {/* Proficiency bar */}
                  <div className="w-full h-[2px] bg-border rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-accent rounded-full shadow-[0_0_8px_rgba(0,102,255,0.8)]"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.2 + i * 0.03, ease: EASE_OUT_EXPO }}
                    />
                  </div>
                  <span className="text-[10px] text-muted-dark mt-1.5 block font-mono">{skill.level}%</span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
