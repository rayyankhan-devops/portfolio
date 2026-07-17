'use client';

import { motion, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function ScrollIndicator() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (y) => {
      setVisible(y < 100);
    });
    return () => unsubscribe();
  }, [scrollY]);

  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.4 }}
    >
      <span className="text-[10px] uppercase tracking-[0.3em] text-muted">
        Scroll
      </span>
      <div className="relative w-[1px] h-10 bg-border overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full bg-accent"
          animate={{ height: ['0%', '100%'], y: ['0%', '0%'] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </motion.div>
  );
}
