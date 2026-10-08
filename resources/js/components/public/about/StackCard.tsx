import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { fadeUp } from '@/lib/motion';

export default function StackCard({
    sectionRef,
    index,
    total,
    top,
    maxScroll = 1200,
    children,
}: {
    sectionRef: React.RefObject<HTMLElement | null>;
    index: number;
    total: number;
    top: string;
    maxScroll?: number;
    children: React.ReactNode;
}) {
    const { scrollY } = useScroll({ target: sectionRef });
    const [vh, setVh] = useState(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setVh(window.innerHeight);
        setMounted(true);
        const onResize = () => setVh(window.innerHeight);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    const maxScrollPx = maxScroll;
    const rawProgress = useTransform(scrollY, [0, maxScrollPx], [0, 1]);
    const progress = useSpring(rawProgress, { stiffness: 120, damping: 28, mass: 0.4 });

    const isActive = useTransform(progress, [0, 0.5], [1, 0]);
    const isCovered = useTransform(progress, [0.5, 1], [0, 1]);

    const scale = useTransform(isCovered, [0, 1], [1, 0.94]);
    const opacity = useTransform(isCovered, [0, 1], [1, 0.7]);

    return (
        <motion.div
            style={{ position: 'sticky', top, scale, opacity }}
            className={`rounded-3xl border border-border bg-card overflow-hidden`}
        >
            {children}
        </motion.div>
    );
}
