'use client';

import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { EASE_OUT_EXPO, VIEWPORT_PARTIAL } from '@/lib/animations';

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

const directionMap = {
  up: { y: 60 },
  down: { y: -60 },
  left: { x: -60 },
  right: { x: 60 },
};

export default function SectionReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: SectionRevealProps) {
  const initialOffset = directionMap[direction];

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...initialOffset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={VIEWPORT_PARTIAL}
      transition={{
        duration: 0.8,
        ease: EASE_OUT_EXPO,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
