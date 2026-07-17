'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { EASE_OUT_EXPO } from '@/lib/animations';

interface TextRevealProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  delay?: number;
  splitBy?: 'word' | 'char';
  once?: boolean;
}

export default function TextReveal({
  text,
  className = '',
  as: Tag = 'p',
  delay = 0,
  splitBy = 'word',
  once = true,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.5 });

  const elements = splitBy === 'word' ? text.split(' ') : text.split('');
  const staggerDelay = splitBy === 'word' ? 0.05 : 0.02;

  return (
    <Tag ref={ref as React.RefObject<HTMLHeadingElement & HTMLParagraphElement & HTMLSpanElement>} className={className} aria-label={text}>
      {elements.map((el, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: '110%' }}
            animate={isInView ? { y: '0%' } : { y: '110%' }}
            transition={{
              duration: 0.8,
              ease: EASE_OUT_EXPO,
              delay: delay + i * staggerDelay,
            }}
          >
            {el}
            {splitBy === 'word' && i < elements.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
