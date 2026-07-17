'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { EASE_OUT_EXPO, VIEWPORT_ONCE } from '@/lib/animations';

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  delay?: number;
  fill?: boolean;
  width?: number;
  height?: number;
}

export default function ImageReveal({
  src,
  alt,
  className = '',
  priority = false,
  delay = 0,
  fill = true,
  width,
  height,
}: ImageRevealProps) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
        viewport={VIEWPORT_ONCE}
        transition={{
          duration: 1.2,
          ease: EASE_OUT_EXPO,
          delay,
        }}
        className="relative h-full w-full"
      >
        <motion.div
          initial={{ scale: 1.3 }}
          whileInView={{ scale: 1 }}
          viewport={VIEWPORT_ONCE}
          transition={{
            duration: 1.4,
            ease: EASE_OUT_EXPO,
            delay,
          }}
          className="relative h-full w-full"
        >
          {fill ? (
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover"
              priority={priority}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <Image
              src={src}
              alt={alt}
              width={width || 600}
              height={height || 400}
              className="object-cover w-full h-full"
              priority={priority}
            />
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
