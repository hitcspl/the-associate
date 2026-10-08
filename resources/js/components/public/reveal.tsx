import React, { type ReactNode } from 'react';
import {
    motion,
    useReducedMotion,
    type Variants,
} from 'framer-motion';

import { stagger, EASE } from '@/lib/motion';

type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'none';

const directionOffset: Record<RevealDirection, number> = {
    up: 28,
    down: -28,
    left: 32,
    right: -32,
    none: 0,
};

export type RevealProps = {
    children: ReactNode;
    delay?: number;
    direction?: RevealDirection;
    as?: 'div' | 'section' | 'article';
    className?: string;
};

const motionVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 28,
        x: 0,
    },
    visible: {
        opacity: 1,
        y: 0,
        x: 0,
        transition: {
            duration: 0.6,
            ease: EASE,
        },
    },
};

export function Reveal({
    children,
    delay = 0,
    direction = 'up',
    as = 'div',
    className,
}: RevealProps) {
    const reduced = useReducedMotion();
    const offset = directionOffset[direction];

    const variants: Variants = {
        hidden: {
            opacity: 0,
            y: direction === 'up' ? offset : direction === 'down' ? -offset : 0,
            x:
                direction === 'left'
                    ? -offset
                    : direction === 'right'
                      ? offset
                      : 0,
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            transition: {
                duration: 0.6,
                ease: EASE,
                delay,
            },
        },
    };

    const MotionTag = motion[as as keyof typeof motion] as React.ElementType;
    const Tag = as as keyof React.JSX.IntrinsicElements;

    return reduced ? (
        <Tag className={className}>{children}</Tag>
    ) : (
        <MotionTag
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={variants}
        >
            {children}
        </MotionTag>
    );
}

export default Reveal;

export type RevealTextProps = {
    text: string;
    as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'blockquote';
    className?: string;
    wordClassName?: string;
    /** When true (default) splits on spaces; when false splits on newlines. */
    byWord?: boolean;
};

const wordVariants: Variants = {
    hidden: { opacity: 0, y: '100%' },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: EASE },
    },
};

export function RevealText({
    text,
    as = 'h2',
    className,
    wordClassName,
    byWord = true,
}: RevealTextProps) {
    const reduced = useReducedMotion();

    const parts = byWord
        ? text.split(' ')
        : text.split('\n');

    const chunks = parts.map((part, index) => (
        <motion.span
            key={index}
            className={`inline-block ${wordClassName ?? ''}`.trim()}
            variants={wordVariants}
        >
            {part}
            <span className="inline-block w-[0.4em]" />
        </motion.span>
    ));

    const MotionTag = (motion as unknown as Record<string, React.ElementType>)[as] ?? motion.div;
    const Tag = as as keyof React.JSX.IntrinsicElements;

    return reduced ? (
        <Tag className={className}>{text}</Tag>
    ) : (
        <MotionTag
            className={`overflow-hidden ${className ?? ''}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger(0.04)}
        >
            <span className="inline-block">{chunks}</span>
        </MotionTag>
    );
}
