'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  strength?: number;
}

export default function MagneticButton({
  children,
  className = '',
  href,
  onClick,
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Outer container springs (faster and larger movement)
  const springX = useSpring(x, { stiffness: 120, damping: 14, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 120, damping: 14, mass: 0.1 });

  // Inner content transforms (slower and smaller movement for 3D parallax)
  const innerX = useTransform(springX, (val) => val * 0.45);
  const innerY = useTransform(springY, (val) => val * 0.45);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Component = href ? 'a' : 'button';
  const linkProps = href ? { href, target: href.startsWith('http') ? '_blank' : undefined, rel: href.startsWith('http') ? 'noopener noreferrer' : undefined } : {};

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <Component
        onClick={onClick}
        className={className}
        {...linkProps}
      >
        <motion.span style={{ x: innerX, y: innerY }} className="block">
          {children}
        </motion.span>
      </Component>
    </motion.div>
  );
}

