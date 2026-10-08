import type { Variants, Transition } from 'framer-motion';

/**
 * Shared motion tokens for the public pages.
 *
 * Every variant is typed as `Variants` and every custom easing curve is typed
 * as the framer-motion `Easing` tuple `[x1, y1, x2, y2]` (a cubic-bezier
 * control-point array). This is what keeps the compiler happy instead of the
 * plain `number[]` literals that framer-motion rejects at type-check time.
 */

// Standard "ease in out" curve used for entrance animations.
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Fade upward by 24px.
export const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: EASE },
    },
};

// Fade only, no translation.
export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, ease: EASE } },
};

// Fade + scale from 0.92.
export const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.55, ease: EASE },
    },
};

// Slide in from the left.
export const slideLeft: Variants = {
    hidden: { opacity: 0, x: -32 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.55, ease: EASE },
    },
};

// Slide in from the right.
export const slideRight: Variants = {
    hidden: { opacity: 0, x: 32 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.55, ease: EASE },
    },
};

// Stagger container: children fade up in sequence.
export const stagger = (delay = 0.08): Variants => ({
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: delay, delayChildren: 0.05 },
    },
});

// A single spring transition for interactive elements (tabs, toggles).
export const spring: Transition = {
    type: 'spring',
    stiffness: 380,
    damping: 30,
};