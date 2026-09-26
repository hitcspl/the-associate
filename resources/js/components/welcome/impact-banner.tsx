import { animate, motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import type { ImpactStat } from '@/types/property';

type ImpactBannerProps = { stats: ImpactStat[]; image: string };

function AnimatedMetric({ value }: { value: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const numericValue = Number(value.replace(/[^\d.]/g, ''));
    const suffix = value.replace(/[\d,\.\s]/g, '');
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (!isInView || !Number.isFinite(numericValue)) return;

        const controls = animate(0, numericValue, {
            duration: 1.4,
            ease: 'easeOut',
            onUpdate: (latest) => setDisplayValue(Math.round(latest)),
        });

        return () => controls.stop();
    }, [isInView, numericValue]);

    return (
        <motion.span ref={ref} initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : { opacity: 0 }}>
            {displayValue.toLocaleString()}{suffix}
        </motion.span>
    );
}

export function ImpactBanner({ stats, image }: ImpactBannerProps) {
    return (
        <section className="relative overflow-hidden border-y border-border/40 bg-[#1b1916] py-14 text-white sm:py-16">
            {/* Background Image: Increased opacity to 50% */}
            <div className="absolute inset-0 opacity-50">
                <img
                    src={image}
                    alt=""
                    className="h-full w-full object-cover"
                />
            </div>

            {/* Overlay Gradient: Reduced opacity so the image shows through clearly while maintaining text legibility */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-[#1b1916]/60 to-black/40" />

            <div className="container-site relative z-10">
                <div className="grid grid-cols-1 items-stretch gap-0 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-5">
                    <div className="flex flex-col justify-center space-y-2 border-b border-white/10 pb-7 sm:col-span-2 sm:pb-8 lg:col-span-1 lg:border-r lg:border-b-0 lg:pr-8 lg:pb-0">
                        <span className="section-kicker text-gold">
                            Our Impact
                        </span>
                        <h3 className="font-display text-xl leading-tight">
                            Building trust, creating value.
                        </h3>
                    </div>
                    {stats.map((stat) => (
                        <motion.div
                            key={stat.id}
                            initial={{ opacity: 0, y: 14 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.5, delay: stat.id * 0.08 }}
                            className="flex flex-col justify-center space-y-1 border-b border-white/10 py-7 last:border-b-0 sm:px-6 sm:py-8 lg:border-b-0 lg:border-r lg:px-8 lg:py-0 lg:last:border-r-0"
                        >
                            <div className="font-display text-3xl text-gold sm:text-4xl">
                                <AnimatedMetric value={stat.value} />
                            </div>
                            <div className="text-sm text-white/70">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}