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
  const isInView = useInView(ref, { once, amount: 0.3 });

  if (splitBy === 'word') {
    const words = text.split(' ');
    return (
      <Tag ref={ref as React.RefObject<HTMLParagraphElement>} className={`${className} relative`} aria-label={text}>
        {/* Accessible screen reader text */}
        <span className="sr-only">{text}</span>
        
        {/* Animated layout hidden from screen readers */}
        <span aria-hidden="true">
          {words.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden">
              <motion.span
                className="inline-block"
                initial={{ y: '110%' }}
                animate={isInView ? { y: '0%' } : { y: '110%' }}
                transition={{
                  duration: 0.8,
                  ease: EASE_OUT_EXPO,
                  delay: delay + i * 0.05,
                }}
              >
                {word}
                {i < words.length - 1 ? '\u00A0' : ''}
              </motion.span>
            </span>
          ))}
        </span>
      </Tag>
    );
  } else {
    // Character-by-character reveal, grouped inside word blocks to prevent mid-word layout wrapping
    const words = text.split(' ');

    return (
      <Tag ref={ref as React.RefObject<HTMLParagraphElement>} className={`${className} relative`} aria-label={text}>
        {/* Accessible screen reader text */}
        <span className="sr-only">{text}</span>
        
        {/* Animated layout hidden from screen readers */}
        <span aria-hidden="true" className="inline-block">
          {words.map((word, wordIdx) => {
            const chars = word.split('');
            // Pre-calculate starting index for this word to avoid re-assigning variables during mapping
            const startIdx = words.slice(0, wordIdx).reduce((acc, w) => acc + w.length, 0);

            return (
              <span key={wordIdx} className="inline-block whitespace-nowrap">
                {chars.map((char, charIdx) => {
                  const globalIdx = startIdx + charIdx;
                  return (
                    <span key={charIdx} className="inline-block overflow-hidden">
                      <motion.span
                        className="inline-block"
                        initial={{ y: '110%' }}
                        animate={isInView ? { y: '0%' } : { y: '110%' }}
                        transition={{
                          duration: 0.8,
                          ease: EASE_OUT_EXPO,
                          delay: delay + globalIdx * 0.02,
                        }}
                      >
                        {char}
                      </motion.span>
                    </span>
                  );
                })}
                {wordIdx < words.length - 1 && (
                  <span className="inline-block">&nbsp;</span>
                )}
              </span>
            );
          })}
        </span>
      </Tag>
    );
  }
}
