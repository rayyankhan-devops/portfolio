'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EASE_OUT_EXPO } from '@/lib/animations';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window !== 'undefined') {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isFirstLoad = !sessionStorage.getItem('preloader-played');
      return !(prefersReducedMotion || !isFirstLoad);
    }
    return true;
  });

  useEffect(() => {
    if (!isVisible) {
      onComplete();
      return;
    }

    // Count up from 0 to 100
    let start = 0;
    const end = 100;
    const duration = 2000; // ms total loading duration
    const incrementTime = Math.floor(duration / end);

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) {
        clearInterval(timer);
        setTimeout(() => {
          setIsVisible(false);
          sessionStorage.setItem('preloader-played', 'true');
          // Wait for the exit animation to finish before notifying parent
          setTimeout(() => {
            onComplete();
          }, 800); // matches the exit animation duration
        }, 400); // pause at 100 for premium rhythmic pacing
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [onComplete, isVisible]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[99999] flex flex-col justify-between bg-[#080808] p-8 md:p-16 select-none"
        initial={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
        exit={{ 
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
          transition: { duration: 0.8, ease: EASE_OUT_EXPO }
        }}
      >
        {/* Top Info */}
        <div className="flex justify-between items-start">
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.2 }}
              className="text-xs uppercase tracking-[0.25em] text-muted font-mono"
            >
              System Initialization
            </motion.p>
          </div>
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.3 }}
              className="text-xs uppercase tracking-[0.25em] text-muted font-mono"
            >
              Creative Portfolio
            </motion.p>
          </div>
        </div>

        {/* Center Name + Title */}
        <div className="my-auto flex flex-col gap-4">
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 0.4 }}
              className="font-heading text-[clamp(2.2rem,6vw,5.5rem)] font-bold uppercase tracking-tight text-white leading-none"
            >
              Muhammad Rayyan
            </motion.h2>
          </div>
          <div className="overflow-hidden h-6 md:h-8">
            <motion.p
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 0.6 }}
              className="text-xs md:text-sm uppercase tracking-[0.4em] text-accent font-medium leading-none"
            >
              DevOps & Cloud Engineer
            </motion.p>
          </div>
        </div>

        {/* Bottom Progress Counter */}
        <div className="flex justify-between items-end">
          <div className="w-1/3 md:w-1/4 h-[1px] bg-border relative overflow-hidden mb-2">
            <motion.div
              className="absolute left-0 top-0 h-full bg-accent"
              initial={{ width: 0 }}
              animate={{ width: `${count}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>
          
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-dark font-mono mb-1">
              Loading Pipelines
            </span>
            <span className="text-5xl md:text-7xl font-mono font-bold text-white tabular-nums">
              {count.toString().padStart(3, '0')}%
            </span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
