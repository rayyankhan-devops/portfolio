'use client';

import { motion } from 'framer-motion';
import MagneticButton from '@/components/ui/MagneticButton';
import { socialLinks } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="section-padding py-8 border-t border-border">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <motion.p
          className="text-xs text-muted tracking-wide"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          © {new Date().getFullYear()} Muhammad Rayyan — Built with precision
        </motion.p>
        <div className="flex gap-6">
          {socialLinks.map((link) => (
            <MagneticButton key={link.name} href={link.url} strength={0.2}>
              <span className="text-xs text-muted hover:text-foreground transition-colors duration-300 tracking-wide uppercase">
                {link.name}
              </span>
            </MagneticButton>
          ))}
        </div>
      </div>
    </footer>
  );
}
