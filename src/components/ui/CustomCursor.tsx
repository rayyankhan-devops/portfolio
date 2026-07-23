'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window !== 'undefined') {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      return !isTouchDevice;
    }
    return false;
  });
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState('');

  // Motion values for absolute positioning
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth springs for lag/inertia effect on outer ring
  const springConfig = { damping: 40, stiffness: 350, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Disable custom cursor on mobile/touch screens
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Setup hover listeners for interactive elements
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], input, select, textarea, .cursor-pointer, [data-cursor]'
      );

      const onMouseEnter = (e: Event) => {
        setIsHovered(true);
        const target = e.currentTarget as HTMLElement;
        const text = target.getAttribute('data-cursor');
        if (text) {
          setCursorText(text);
        }
      };

      const onMouseLeave = () => {
        setIsHovered(false);
        setCursorText('');
      };

      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnter);
        el.addEventListener('mouseleave', onMouseLeave);
      });

      return () => {
        interactiveElements.forEach((el) => {
          el.removeEventListener('mouseenter', onMouseEnter);
          el.removeEventListener('mouseleave', onMouseLeave);
        });
      };
    };

    // Run hover listener setup and watch for DOM updates
    const cleanHover = addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    // Hide real cursor globally
    document.documentElement.classList.add('custom-cursor-active');

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cleanHover();
      observer.disconnect();
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-accent pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center text-center overflow-hidden"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicking ? 0.8 : cursorText ? 2.5 : isHovered ? 1.8 : 1,
          backgroundColor: (isHovered || cursorText) ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0)',
          borderColor: (isHovered || cursorText) ? 'rgba(255, 255, 255, 0)' : 'var(--color-accent)',
        }}
        transition={{ type: 'spring', stiffness: 220, damping: 22, mass: 0.5 }}
      >
        <AnimatePresence>
          {cursorText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.2 }}
              className="text-[7px] font-heading font-extrabold tracking-widest text-[#080808] uppercase pointer-events-none"
            >
              {cursorText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-accent pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicking ? 1.5 : (isHovered || cursorText) ? 0 : 1,
          backgroundColor: (isHovered || cursorText) ? 'rgba(255, 255, 255, 0)' : 'var(--color-accent)',
        }}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.2 }}
      />
    </>
  );
}
