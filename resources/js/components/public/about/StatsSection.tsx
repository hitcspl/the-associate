import { useEffect, useRef, useState } from 'react';
import { motion,  useInView, } from 'framer-motion';
import { fadeUp, EASE } from '@/lib/motion';
import Section from '@/components/public/about/AboutSection';

export default function StatsSection() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.3 });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const stats = [
        { value: '14+', label: 'Years of Experience' },
        { value: '8', label: 'Completed Projects' },
        { value: '10', label: 'Ongoing Projects' },
        { value: '1', label: 'Commercial Project' },
    ];

    return (
        <Section className="border-y border-border bg-card" as="section">
            <div ref={ref} className="py-10 sm:py-14">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    variants={fadeUp}
                    className="grid grid-cols-2 lg:grid-cols-4"
                >
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={stat.label}
                            variants={fadeUp}
                            className={`relative flex flex-col items-center text-center px-4 py-4 ${idx !== stats.length - 1 ? 'lg:border-r lg:border-border' : ''}`}
                        >
                            <div className="font-display text-3xl sm:text-5xl font-bold text-foreground tabular-nums">
                                {mounted && inView ? <CountUp target={stat.value} /> : stat.value}
                            </div>
                            <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-foreground mt-1">
                                {stat.label}
                            </div>
                            <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true, margin: '-80px' }}
                                transition={{ duration: 0.6, ease: EASE }}
                                className="h-1 bg-[#A37B4C] rounded-full mt-3 w-8 origin-left"
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </Section>
    );
}

function CountUp({ target }: { target: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    // For static values like "14+", "8", "10", "1", we just render them directly.
    // A numeric-only animation could be added here if needed.
    return <span ref={ref}>{target}</span>;
}