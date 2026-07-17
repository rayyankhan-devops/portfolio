'use client';

import { useEffect, useRef } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    let animationFrame: number;

    const initLenis = async () => {
      const LenisModule = await import('@studio-freight/lenis');
      const Lenis = LenisModule.default;

      // Respect reduced motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const lenis = new Lenis({
        lerp: 0.12,
        wheelMultiplier: 1.2,
        touchMultiplier: 1.5,
        smoothWheel: true,
      });

      lenisRef.current = lenis;

      function raf(time: number) {
        lenis.raf(time);
        animationFrame = requestAnimationFrame(raf);
      }

      animationFrame = requestAnimationFrame(raf);
    };

    initLenis();

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      lenisRef.current?.destroy();
    };
  }, []);

  return <>{children}</>;
}
