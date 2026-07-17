'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import SectionReveal from '@/components/ui/SectionReveal';
import TextReveal from '@/components/ui/TextReveal';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { EASE_OUT_EXPO } from '@/lib/animations';

const stats = [
  { value: 20, suffix: '+', label: 'Projects Delivered' },
  { value: 4, suffix: '+', label: 'Certifications' },
  { value: 3, suffix: '+', label: 'Years Experience' },
];

const journeySteps = [
  { year: '2021', title: 'Started with Linux & Networking', description: 'Began the journey into system administration and networking fundamentals.' },
  { year: '2022', title: 'Cloud & Containerization', description: 'Deep dive into AWS, Docker, and Kubernetes orchestration.' },
  { year: '2023', title: 'DevSecOps & Automation', description: 'Embraced security-first approach and infrastructure as code.' },
  { year: '2024', title: '1-Year Struggle & Hackathons', description: 'A challenging year of intense self-learning, facing rejections, building open-source projects, and competing in hackathons.' },
  { year: '2025', title: 'Professional Breakthrough', description: 'Secured internships at YoungDev and DevelopersHub, worked at DevSpire, and launched GoDropMe on the Play Store.' },
  { year: '2026', title: 'Production Deployments', description: 'Deployed and maintained live e-commerce and consultancy platforms including Arquistic Store and AbroadAOO.' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative section-padding py-10 md:py-14"
      aria-label="About section"
    >
      {/* Section Header */}
      <div className="mb-12 md:mb-16">
        <SectionReveal>
          <span className="text-xs uppercase tracking-[0.3em] text-accent mb-4 block">01 / About</span>
        </SectionReveal>
        <TextReveal
          text="I build the systems that power modern applications"
          as="h2"
          className="font-heading text-[clamp(2rem,5vw,4rem)] font-bold uppercase leading-[1.1] max-w-4xl"
          delay={0.1}
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-16 md:mb-20">
        {/* Story */}
        <SectionReveal delay={0.2}>
          <p className="text-muted text-base md:text-lg leading-relaxed mb-6">
            I&apos;m a DevOps & Cloud Engineer passionate about building scalable, secure, and 
            automated infrastructure. I believe that great software deserves great deployment 
            pipelines, and every system should be reproducible, observable, and resilient.
          </p>
          <p className="text-muted text-base md:text-lg leading-relaxed">
            From setting up CI/CD pipelines to architecting multi-cloud environments, I focus on 
            turning complex infrastructure challenges into elegant, automated solutions. Security 
            isn&apos;t an afterthought — it&apos;s embedded into every pipeline I build.
          </p>
        </SectionReveal>

        {/* Stats */}
        <SectionReveal delay={0.3}>
          <div className="grid grid-cols-3 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center lg:text-left">
                <div className="text-4xl md:text-5xl font-heading font-bold mb-2">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </SectionReveal>
      </div>

      {/* Developer Journey Timeline */}
      <div className="relative mt-16 md:mt-24">
        <SectionReveal>
          <h3 className="text-xs uppercase tracking-[0.3em] text-accent mb-12">Developer Journey</h3>
        </SectionReveal>

        <div className="relative">
          {/* Animated horizontal line */}
          <div className="absolute left-0 right-0 top-[2.75rem] h-[1px] bg-border z-0">
            <motion.div
              className="absolute left-0 top-0 h-full bg-accent origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: EASE_OUT_EXPO }}
              style={{ width: '100%' }}
            />
          </div>

          {/* Horizontal scroll timeline container */}
          <div className="relative flex gap-8 md:gap-12 overflow-x-auto py-6 pb-12 scrollbar-none snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 z-10">
            {journeySteps.map((step, i) => (
              <motion.div
                key={step.year}
                className="relative flex flex-col min-w-[260px] md:min-w-[300px] snap-start"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.12,
                  ease: EASE_OUT_EXPO,
                }}
              >
                {/* Year above the line */}
                <span className="text-xs text-accent tracking-[0.2em] mb-8 block">
                  {step.year}
                </span>

                {/* Dot exactly on the line */}
                <div className="absolute left-0 top-[2.75rem] w-2.5 h-2.5 rounded-full bg-accent translate-y-[-50%] z-10" />

                {/* Content below the line */}
                <h4 className="text-base md:text-lg font-semibold mb-2 mt-4">
                  {step.title}
                </h4>
                <p className="text-xs md:text-sm text-muted leading-relaxed max-w-[260px] md:max-w-[280px]">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
