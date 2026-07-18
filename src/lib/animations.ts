import { type Variants } from 'framer-motion';

// ─── Custom Easing Constants ────────────────────────────────────────
export const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const EASE_OUT_CUBIC: [number, number, number, number] = [0.33, 1, 0.68, 1];
export const EASE_IN_OUT: [number, number, number, number] = [0.65, 0, 0.35, 1];
export const EASE_OUT_QUART: [number, number, number, number] = [0.25, 1, 0.5, 1];

// ─── Custom Premium Spring Presets ──────────────────────────────────
export const SPRING_SMOOTH = { type: 'spring', stiffness: 100, damping: 15, mass: 0.8 };
export const SPRING_BOUNCY = { type: 'spring', stiffness: 200, damping: 12, mass: 0.5 };
export const SPRING_FAST = { type: 'spring', stiffness: 350, damping: 40, mass: 0.4 };


// ─── Viewport Settings ─────────────────────────────────────────────
export const VIEWPORT_ONCE = { once: true, amount: 0.3 };
export const VIEWPORT_PARTIAL = { once: true, amount: 0.15 };

// ─── Fade Up ────────────────────────────────────────────────────────
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: EASE_OUT_EXPO,
    },
  },
};

// ─── Fade Down ──────────────────────────────────────────────────────
export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: EASE_OUT_EXPO,
    },
  },
};

// ─── Fade In (opacity only) ─────────────────────────────────────────
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: EASE_OUT_CUBIC,
    },
  },
};

// ─── Stagger Containers ─────────────────────────────────────────────
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// ─── Scale In ───────────────────────────────────────────────────────
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: EASE_OUT_EXPO,
    },
  },
};

// ─── Slide In Directions ────────────────────────────────────────────
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: EASE_OUT_EXPO,
    },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: EASE_OUT_EXPO,
    },
  },
};

// ─── Image Reveal (clip-path wipe) ──────────────────────────────────
export const imageReveal: Variants = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  visible: {
    clipPath: 'inset(0 0% 0 0)',
    transition: {
      duration: 1.2,
      ease: EASE_OUT_EXPO,
    },
  },
};

// ─── Character Reveal ───────────────────────────────────────────────
export const charRevealContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.1,
    },
  },
};

export const charReveal: Variants = {
  hidden: { y: '100%' },
  visible: {
    y: '0%',
    transition: {
      duration: 0.8,
      ease: EASE_OUT_EXPO,
    },
  },
};

// ─── Line Reveal (scaleX) ──────────────────────────────────────────
export const lineReveal: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 1,
      ease: EASE_OUT_EXPO,
    },
  },
};

// ─── Hover Animations ──────────────────────────────────────────────
export const hoverScale = {
  scale: 1.03,
  transition: { duration: 0.4, ease: EASE_OUT_EXPO },
};

export const tapScale = {
  scale: 0.97,
  transition: { duration: 0.1 },
};

// ─── Page Transition ────────────────────────────────────────────────
export const pageTransition: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: EASE_OUT_CUBIC,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: EASE_IN_OUT,
    },
  },
};
