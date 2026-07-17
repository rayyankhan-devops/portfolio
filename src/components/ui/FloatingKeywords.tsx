'use client';

import { motion } from 'framer-motion';

interface FloatingKeywordsProps {
  keywords: string[];
  className?: string;
}

// Predefined positions for keywords scattered around the hero
const positions = [
  { top: '8%', left: '5%' },
  { top: '15%', right: '8%' },
  { top: '35%', left: '2%' },
  { top: '55%', right: '3%' },
  { top: '70%', left: '8%' },
  { top: '20%', left: '35%' },
  { top: '80%', right: '12%' },
  { top: '45%', left: '12%' },
  { top: '65%', right: '25%' },
  { top: '10%', left: '55%' },
];

export default function FloatingKeywords({
  keywords,
  className = '',
}: FloatingKeywordsProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {keywords.map((keyword, i) => {
        const pos = positions[i % positions.length];
        const duration = 4 + (i % 3) * 1.5; // 4-7s
        const yRange = 10 + (i % 4) * 5; // 10-25px

        return (
          <motion.span
            key={keyword}
            className="absolute text-[10px] sm:text-xs uppercase tracking-[0.2em] text-muted-dark/60 border border-border/30 px-3 py-1.5 rounded-full hidden md:inline-block select-none"
            style={pos}
            animate={{
              y: [-yRange / 2, yRange / 2, -yRange / 2],
              rotate: [-1.5, 1.5, -1.5],
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.4,
            }}
          >
            {keyword}
          </motion.span>
        );
      })}
    </div>
  );
}
