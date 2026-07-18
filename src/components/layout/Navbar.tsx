'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navItems } from '@/lib/data';
import { EASE_OUT_EXPO } from '@/lib/animations';
import MagneticButton from '@/components/ui/MagneticButton';
import Image from 'next/image';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 50);

      // Smart hide/show on scroll direction
      if (currentY > lastScrollY && currentY > 200) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      setLastScrollY(currentY);

      // Active section detection
      const sections = navItems.map(item => item.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 200) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 ${
          isScrolled ? 'glass-effect' : 'bg-transparent'
        }`}
        animate={{ y: hidden && !isMenuOpen ? -100 : 0 }}
        transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
      >
        <div className="section-padding py-5 md:py-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 md:gap-4 group" data-cursor="home">
            <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border border-border group-hover:border-accent transition-colors duration-300">
              <Image
                src="/images/icon.png"
                alt="Muhammad Rayyan"
                fill
                sizes="(max-width: 768px) 40px, 48px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-heading text-lg md:text-xl font-bold uppercase tracking-tight">
                Muhammad
              </span>
              <span className="font-heading text-lg md:text-xl font-bold uppercase tracking-tight ml-3 md:ml-4">
                Rayyan
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" role="navigation" aria-label="Main navigation">
            {navItems.map((item) => (
              <MagneticButton key={item.href} href={item.href} strength={0.15}>
                <span
                  data-cursor={item.label.toLowerCase()}
                  className={`text-sm tracking-wide transition-colors duration-300 hover:text-foreground cursor-pointer ${
                    activeSection === item.href.replace('#', '')
                      ? 'text-foreground'
                      : 'text-muted'
                  }`}
                >
                  {item.label}
                </span>
              </MagneticButton>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 z-50 cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            data-cursor={isMenuOpen ? 'close' : 'menu'}
          >
            <motion.span
              className="block w-6 h-[1.5px] bg-foreground origin-center"
              animate={isMenuOpen ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block w-6 h-[1.5px] bg-foreground"
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-6 h-[1.5px] bg-foreground origin-center"
              animate={isMenuOpen ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-background flex items-center justify-center"
            initial={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2rem)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 2.5rem) 2rem)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2rem)' }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          >
            <nav className="flex flex-col items-center gap-8">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 + i * 0.08,
                    ease: EASE_OUT_EXPO,
                  }}
                >
                  <a
                    href={item.href}
                    className="text-4xl font-heading font-bold uppercase tracking-tight flex items-center gap-4"
                    onClick={() => setIsMenuOpen(false)}
                    data-cursor="go"
                  >
                    <span className="text-sm font-sans text-muted">{item.number}</span>
                    {item.label}
                  </a>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
