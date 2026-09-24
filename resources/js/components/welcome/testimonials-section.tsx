import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Quote, Star } from 'lucide-react';
import type { Testimonial } from '@/types/property';

export function TestimonialsSection({
    testimonials,
}: {
    testimonials: Testimonial[];
}) {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const [isAutoplay, setIsAutoplay] = useState(true);

    if (!testimonials || testimonials.length === 0) return null;

    const current = testimonials[index];

    const move = (newDirection: number) => {
        setIsAutoplay(false);
        setDirection(newDirection);
        setIndex(
            (prev) =>
                (prev + newDirection + testimonials.length) % testimonials.length
        );
    };

    useEffect(() => {
        if (!isAutoplay) return;
        const timer = setInterval(() => {
            setDirection(1);
            setIndex((prev) => (prev + 1) % testimonials.length);
        }, 7000);
        return () => clearInterval(timer);
    }, [isAutoplay, testimonials.length]);

    return (
        <section className="relative w-full overflow-hidden bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-white py-12 lg:py-20 transition-colors duration-300">
            {/* Subtle Dynamic Ambient Lighting Effect */}
            <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[550px] rounded-full bg-[#A37B4C]/10 dark:bg-[#A37B4C]/15 blur-[140px]" />

            {/* FULL WIDTH CONTAINER (max-w-7xl + responsive padding) */}
            <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8 lg:space-y-10">
                
                {/* Full-Width Section Header & Navigation Controls */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-stone-200/80 dark:border-stone-800/80 pb-5 gap-4">
                    <div className="space-y-1.5 max-w-3xl">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold uppercase tracking-widest text-[#A37B4C]">
                                Testimonials
                            </span>
                            <div className="h-px w-8 bg-[#A37B4C]/50" />
                        </div>
                        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-stone-900 dark:text-stone-100">
                            Real Stories. <span className="italic text-[#A37B4C]">Lasting Relationships.</span>
                        </h2>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-4 shrink-0 self-end sm:self-auto">
                        <span className="text-xs sm:text-sm font-mono text-stone-400 dark:text-stone-500">
                            0{index + 1} / 0{testimonials.length}
                        </span>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => move(-1)}
                                aria-label="Previous story"
                                className="group flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-900/80 text-stone-700 dark:text-stone-200 shadow-sm backdrop-blur-md transition-all hover:scale-105 hover:bg-stone-100 dark:hover:bg-stone-800 active:scale-95"
                            >
                                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                            </button>
                            <button
                                onClick={() => move(1)}
                                aria-label="Next story"
                                className="group flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-900/80 text-stone-700 dark:text-stone-200 shadow-sm backdrop-blur-md transition-all hover:scale-105 hover:bg-stone-100 dark:hover:bg-stone-800 active:scale-95"
                            >
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Full-Width Showcase Card */}
                <div className="relative rounded-3xl border border-stone-200/80 dark:border-stone-800/80 bg-white/70 dark:bg-stone-900/50 p-6 sm:p-8 lg:p-10 shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        
                        {/* Quote Content Column */}
                        <div className="lg:col-span-7 flex flex-col justify-between">
                            <AnimatePresence mode="wait" custom={direction}>
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: direction * 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -direction * 20 }}
                                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                    className="space-y-6"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex text-amber-400 gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="h-4 w-4 fill-amber-400" />
                                            ))}
                                        </div>
                                        <Quote className="h-7 w-7 text-[#A37B4C]/40" />
                                    </div>

                                    <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-light leading-relaxed text-stone-800 dark:text-stone-100 italic">
                                        "{current.quote}"
                                    </h3>

                                    <div className="flex items-center gap-4 pt-4 border-t border-stone-200/60 dark:border-stone-800/60">
                                        <img
                                            src={current.avatar}
                                            alt={current.author}
                                            className="h-12 w-12 rounded-full border border-[#A37B4C]/40 object-cover shadow-sm"
                                        />
                                        <div>
                                            <h4 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                                                {current.author}
                                            </h4>
                                            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
                                                {current.role} <span className="text-[#A37B4C]">•</span> {current.location}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Property Image Column */}
                        <div className="lg:col-span-5 h-[240px] sm:h-[300px] lg:h-[340px] relative">
                            <AnimatePresence mode="wait" custom={direction}>
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.35, ease: 'easeOut' }}
                                    className="relative h-full w-full overflow-hidden rounded-2xl border border-stone-200 dark:border-stone-800 shadow-md"
                                >
                                    <img
                                        src={current.image}
                                        alt="Featured Property"
                                        className="h-full w-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                                    
                                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                                        <span className="font-display text-xs sm:text-sm italic tracking-wide text-stone-200">
                                            Acquired Residence
                                        </span>
                                        <span className="rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-xs font-medium border border-white/20 text-stone-200">
                                            Verified Deal
                                        </span>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                    </div>
                </div>

                {/* Progress Indicators Bar */}
                <div className="flex items-center justify-center gap-2 pt-2">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                setIsAutoplay(false);
                                setDirection(i > index ? 1 : -1);
                                setIndex(i);
                            }}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                                i === index
                                    ? 'w-8 bg-[#A37B4C]'
                                    : 'w-2 bg-stone-300 dark:bg-stone-700 hover:bg-stone-400 dark:hover:bg-stone-600'
                            }`}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}