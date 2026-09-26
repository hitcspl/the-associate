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
                (prev + newDirection + testimonials.length) %
                testimonials.length,
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
        <section className="relative w-full overflow-hidden bg-stone-50 py-12 text-stone-900 transition-colors duration-300 lg:py-20 dark:bg-stone-950 dark:text-white">
            {/* Subtle Dynamic Ambient Lighting Effect */}
            <div className="pointer-events-none absolute top-1/2 left-1/2 h-[450px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#A37B4C]/10 blur-[140px] dark:bg-[#A37B4C]/15" />

            {/* FULL WIDTH CONTAINER (max-w-7xl + responsive padding) */}
            <div className="relative mx-auto w-full max-w-7xl space-y-8 px-4 sm:px-6 lg:space-y-10 lg:px-8">
                {/* Full-Width Section Header & Navigation Controls */}
                <div className="flex flex-col justify-between gap-4 border-b border-stone-200/80 pb-5 sm:flex-row sm:items-end dark:border-stone-800/80">
                    <div className="max-w-3xl space-y-1.5">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold tracking-widest text-[#A37B4C] uppercase">
                                Testimonials
                            </span>
                            <div className="h-px w-8 bg-[#A37B4C]/50" />
                        </div>
                        <h2 className="font-display text-2xl font-normal tracking-tight text-stone-900 sm:text-3xl lg:text-4xl dark:text-stone-100">
                            Real Stories.{' '}
                            <span className="text-[#A37B4C] italic">
                                Lasting Relationships.
                            </span>
                        </h2>
                    </div>

                    {/* Controls */}
                    <div className="flex shrink-0 items-center gap-4 self-end sm:self-auto">
                        <span className="font-mono text-xs text-stone-400 sm:text-sm dark:text-stone-500">
                            0{index + 1} / 0{testimonials.length}
                        </span>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => move(-1)}
                                aria-label="Previous story"
                                className="group flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white/80 text-stone-700 shadow-sm backdrop-blur-md transition-all hover:scale-105 hover:bg-stone-100 active:scale-95 dark:border-stone-800 dark:bg-stone-900/80 dark:text-stone-200 dark:hover:bg-stone-800"
                            >
                                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                            </button>
                            <button
                                onClick={() => move(1)}
                                aria-label="Next story"
                                className="group flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white/80 text-stone-700 shadow-sm backdrop-blur-md transition-all hover:scale-105 hover:bg-stone-100 active:scale-95 dark:border-stone-800 dark:bg-stone-900/80 dark:text-stone-200 dark:hover:bg-stone-800"
                            >
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Full-Width Showcase Card */}
                <div className="relative rounded-3xl border border-stone-200/80 bg-white/70 p-6 shadow-xl backdrop-blur-xl sm:p-8 lg:p-10 dark:border-stone-800/80 dark:bg-stone-900/50 dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                    <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
                        {/* Quote Content Column */}
                        <div className="flex flex-col justify-between lg:col-span-7">
                            <AnimatePresence mode="wait" custom={direction}>
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: direction * 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -direction * 20 }}
                                    transition={{
                                        duration: 0.3,
                                        ease: [0.16, 1, 0.3, 1],
                                    }}
                                    className="space-y-6"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex gap-1 text-amber-400">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className="h-4 w-4 fill-amber-400"
                                                />
                                            ))}
                                        </div>
                                        <Quote className="h-7 w-7 text-[#A37B4C]/40" />
                                    </div>

                                    <h3 className="font-display text-xl leading-relaxed font-light text-stone-800 italic sm:text-2xl lg:text-3xl dark:text-stone-100">
                                        "{current.quote}"
                                    </h3>

                                    <div className="flex items-center gap-4 border-t border-stone-200/60 pt-4 dark:border-stone-800/60">
                                        <img
                                            src={current.avatar}
                                            alt={current.author}
                                            className="h-12 w-12 rounded-full border border-[#A37B4C]/40 object-cover shadow-sm"
                                        />
                                        <div>
                                            <h4 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                                                {current.author}
                                            </h4>
                                            <p className="text-xs text-stone-500 sm:text-sm dark:text-stone-400">
                                                {current.role}{' '}
                                                <span className="text-[#A37B4C]">
                                                    •
                                                </span>{' '}
                                                {current.location}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Property Image Column */}
                        <div className="relative h-[240px] sm:h-[300px] lg:col-span-5 lg:h-[340px]">
                            <AnimatePresence mode="wait" custom={direction}>
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{
                                        duration: 0.35,
                                        ease: 'easeOut',
                                    }}
                                    className="relative h-full w-full overflow-hidden rounded-2xl border border-stone-200 shadow-md dark:border-stone-800"
                                >
                                    <img
                                        src={current.image}
                                        alt="Featured Property"
                                        className="h-full w-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                                    <div className="absolute right-3 bottom-3 left-3 flex items-center justify-between text-white">
                                        <span className="font-display text-xs tracking-wide text-stone-200 italic sm:text-sm">
                                            Acquired Residence
                                        </span>
                                        <span className="rounded-full border border-white/20 bg-black/60 px-3 py-1 text-xs font-medium text-stone-200 backdrop-blur-md">
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
                                    : 'w-2 bg-stone-300 hover:bg-stone-400 dark:bg-stone-700 dark:hover:bg-stone-600'
                            }`}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
