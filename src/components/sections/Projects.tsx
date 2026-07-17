'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/lib/data';
import SectionReveal from '@/components/ui/SectionReveal';
import TextReveal from '@/components/ui/TextReveal';
import MagneticButton from '@/components/ui/MagneticButton';
import { EASE_OUT_EXPO } from '@/lib/animations';
import { FiArrowUpRight, FiGithub, FiPlay, FiAward } from 'react-icons/fi';
import { FaGooglePlay } from 'react-icons/fa';
import Image from 'next/image';

const projectCategories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];

const getLinkDetails = (url: string, type: 'github' | 'link') => {
  if (url.includes('github.com')) {
    return { label: 'GitHub', icon: <FiGithub className="w-3.5 h-3.5" />, primary: false };
  }
  if (url.includes('devpost.com')) {
    return { label: 'Devpost', icon: <FiAward className="w-3.5 h-3.5" />, primary: false };
  }
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return { label: 'Watch Video', icon: <FiPlay className="w-3.5 h-3.5" />, primary: true };
  }
  if (url.includes('play.google.com')) {
    return { label: 'Play Store', icon: <FaGooglePlay className="w-3.5 h-3.5" />, primary: true };
  }
  return {
    label: type === 'github' ? 'Source' : 'Live Site',
    icon: type === 'github' ? <FiGithub className="w-3.5 h-3.5" /> : <FiArrowUpRight className="w-3.5 h-3.5" />,
    primary: type === 'link',
  };
};

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section
      id="projects"
      className="relative section-padding py-10 md:py-14"
      aria-label="Projects section"
    >
      {/* Section Header */}
      <div className="mb-10 md:mb-14">
        <SectionReveal>
          <span className="text-xs uppercase tracking-[0.3em] text-accent mb-4 block">03 / Projects</span>
        </SectionReveal>
        <TextReveal
          text="Selected Work"
          as="h2"
          className="font-heading text-[clamp(2rem,5vw,4rem)] font-bold uppercase leading-[1.1]"
          delay={0.1}
        />
      </div>

      {/* Category Filter */}
      <SectionReveal delay={0.15} className="mb-10 md:mb-12">
        <div className="flex flex-wrap gap-2 md:gap-3">
          {projectCategories.map((cat) => (
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

      {/* Projects Grid */}
      <motion.div layout className="space-y-12 md:space-y-16">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, i) => {
            const isReversed = i % 2 !== 0;

            return (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.1,
                  ease: EASE_OUT_EXPO,
                  layout: { duration: 0.5 },
                }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                  isReversed ? 'lg:[direction:rtl]' : ''
                }`}
              >
                {/* Project Image */}
                <motion.div
                  className="relative aspect-[16/10] overflow-hidden rounded-lg bg-surface group cursor-pointer lg:[direction:ltr]"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                >
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-surface via-surface-light to-surface flex items-center justify-center">
                      <div className="text-center">
                        <span className="text-6xl md:text-7xl font-heading font-bold text-border-light/40 uppercase">
                          {project.category}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>

                {/* Project Info */}
                <div className="lg:[direction:ltr]">
                  <div className="mb-4">
                    <span className="text-xs uppercase tracking-[0.2em] text-accent mb-3 block">
                      {project.category}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-heading font-bold uppercase leading-tight mb-4">
                      {project.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-[10px] uppercase tracking-[0.15em] text-muted border border-border px-3 py-1.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4">
                    {project.github && (() => {
                      const btn = getLinkDetails(project.github, 'github');
                      return (
                        <MagneticButton href={project.github} strength={0.25}>
                          <span className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.15em] transition-colors duration-400 ${
                            btn.primary 
                              ? 'bg-accent text-background hover:bg-accent-light' 
                              : 'border border-border hover:border-accent hover:text-accent'
                          }`}>
                            {btn.icon}
                            {btn.label}
                          </span>
                        </MagneticButton>
                      );
                    })()}
                    {project.link && (() => {
                      const btn = getLinkDetails(project.link, 'link');
                      return (
                        <MagneticButton href={project.link} strength={0.25}>
                          <span className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.15em] transition-colors duration-400 ${
                            btn.primary 
                              ? 'bg-accent text-background hover:bg-accent-light' 
                              : 'border border-border hover:border-accent hover:text-accent'
                          }`}>
                            {btn.icon}
                            {btn.label}
                          </span>
                        </MagneticButton>
                      );
                    })()}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
