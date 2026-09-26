import React, { useEffect, useState } from 'react';
import {
    AnimatePresence,
    motion,
    useMotionValue,
    useSpring,
    type Variants,
} from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Property } from '@/types/property';
import { formatPrice } from '@/lib/format-price';

type HeroSectionProps = {
    slides: Property[];
    favorites?: number[];
    onFavorite?: (id: number) => void;
};

export function HeroSection({ slides }: HeroSectionProps) {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState<number>(0);
    const [isPaused, setIsPaused] = useState(false);

    const current = slides[index];

    const rotateX = useSpring(useMotionValue(0), {
        stiffness: 180,
        damping: 20,
    });
    const rotateY = useSpring(useMotionValue(0), {
        stiffness: 180,
        damping: 20,
    });

    const textContainerVariants: Variants = {
        hidden: {},
        visible: {
            transition: { staggerChildren: 0.12, delayChildren: 0.1 },
        },
    };

    const eyebrowVariants: Variants = {
        hidden: { opacity: 0, y: -12 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.45, ease: 'easeOut' },
        },
    };
    
    const titleVariants: Variants = {
        hidden: { opacity: 0, y: 24 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 90, damping: 18 },
        },
    };
    
    const contentVariants: Variants = {
        hidden: { opacity: 0, y: 16 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.45, ease: 'easeOut' },
        },
    };

    const move = (dir: number, pause = true) => {
        if (pause) setIsPaused(true);
        setDirection(dir);
        setIndex((value) => (value + dir + slides.length) % slides.length);
    };

    useEffect(() => {
        if (slides.length < 2 || isPaused) return;

        const timer = window.setTimeout(() => {
            setDirection(1);
            setIndex((value) => (value + 1) % slides.length);
        }, 5000);

        return () => window.clearTimeout(timer);
    }, [index, isPaused, slides.length]);

    const handleCardMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        rotateY.set(x * 8);
        rotateX.set(y * -8);
    };

    const resetCardTilt = () => {
        rotateX.set(0);
        rotateY.set(0);
    };

    if (!current) return null;

    const prevIndex = (index - 1 + slides.length) % slides.length;
    const nextIndex = (index + 1) % slides.length;

    const cardVariants: Variants = {
        enter: (dir: number) => ({
            x: dir > 0 ? '60%' : '-60%',
            opacity: 0,
            scale: 0.9,
            filter: 'blur(6px)',
        }),
        center: {
            x: '0%',
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] },
        },
        exit: (dir: number) => ({
            x: dir < 0 ? '60%' : '-60%',
            opacity: 0,
            scale: 0.9,
            filter: 'blur(6px)',
            transition: { duration: 0.35, ease: 'easeInOut' },
        }),
    };

    return (
        <section
            id="home"
            className="relative flex min-h-[100dvh] w-full max-w-full items-center justify-center overflow-x-hidden bg-neutral-950 pt-28 pb-12 text-white selection:bg-[#A37B4C] selection:text-white lg:min-h-screen lg:pt-30 lg:pb-16"
        >
            {/* Background Image Container */}
            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={current.id}
                        src={current.image}
                        alt="Hero Background"
                        initial={{ opacity: 0, scale: 1.06 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        className="h-full w-full object-cover object-center brightness-[0.88] filter will-change-transform dark:brightness-[0.78]"
                    />
                </AnimatePresence>

                {/* Subtle left-to-right fade mask */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-neutral-950 lg:bg-gradient-to-r lg:from-black/80 lg:via-black/40 lg:to-transparent" />

                {/* Soft backdrop glow */}
                <div className="pointer-events-none absolute top-1/4 left-0 h-[400px] w-[400px] rounded-full bg-black/30 blur-[100px] sm:h-[600px] sm:w-[600px] sm:blur-[120px]" />

                {/* Bottom subtle edge transition */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
            </div>

            <div className="relative z-20 container mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
                    {/* Left Column: Typography & Controls */}
                    <motion.div
                        className="flex flex-col justify-center lg:col-span-5"
                        initial="hidden"
                        animate="visible"
                        variants={textContainerVariants}
                    >
                        <div className="mx-auto w-full max-w-xl text-center lg:mx-0 lg:text-left">
                            {/* Eyebrow */}
                            <motion.div
                                variants={eyebrowVariants}
                                className="mb-4 flex items-center justify-center gap-3 sm:mb-6 lg:justify-start"
                            >
                                <span className="text-xs font-semibold tracking-[0.2em] text-amber-200/90 uppercase drop-shadow-sm sm:text-sm">
                                    Premium Real Estate
                                </span>
                                <div className="h-px w-8 bg-amber-200/40 sm:w-10" />
                            </motion.div>

                            {/* Heading */}
                            <motion.h1
                                variants={titleVariants}
                                className="font-display mx-auto max-w-[320px] text-5xl leading-[1.05] font-normal tracking-tight text-stone-50 drop-shadow-md sm:max-w-md sm:text-5xl sm:leading-[1.02] md:text-6xl lg:mx-0 lg:max-w-none xl:text-7xl"
                            >
                                Find Your{' '}
                                <span className="font-display block font-light text-amber-100/95 italic">
                                    Dream Home
                                </span>
                            </motion.h1>

                            {/* Description */}
                            <motion.p
                                variants={contentVariants}
                                className="mx-auto mt-4 max-w-sm text-md font-semibold leading-relaxed text-stone-200/90 drop-shadow sm:mt-6 sm:max-w-md sm:text-base lg:mx-0 xl:text-lg"
                            >
                                Discover thoughtfully selected residences
                                designed around the way you live.
                            </motion.p>

                            {/* CTA */}
                            <motion.div
                                variants={contentVariants}
                                className="relative z-30 mt-6 flex items-center justify-center sm:mt-8 lg:justify-start"
                            >
                                <a href="#properties" className="inline-flex">
                                    <Button
                                        size="lg"
                                        className="group relative h-11 overflow-hidden rounded-full border border-white/10 bg-[#A37B4C] px-6 text-sm font-medium text-white shadow-[0_10px_30px_rgba(163,123,76,0.28)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#AF8756] hover:shadow-[0_16px_38px_rgba(163,123,76,0.38)] focus-visible:ring-2 focus-visible:ring-amber-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 focus-visible:outline-none active:translate-y-0 active:scale-[0.98] sm:h-13 sm:px-7"
                                    >
                                        <span className="pointer-events-none absolute inset-y-0 -left-[80%] w-[55%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-700 ease-out group-hover:left-[125%]" />
                                        <span className="relative z-10">Explore Properties</span>
                                        <span className="relative z-10 ml-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-white/10 transition-all duration-300 group-hover:translate-x-0.5 group-hover:bg-white/20">
                                            <ArrowRight className="h-3.5 w-3.5" />
                                        </span>
                                    </Button>
                                </a>
                            </motion.div>

                            {/* Progress Indicators */}
                            {slides.length > 1 && (
                                <motion.div
                                    variants={contentVariants}
                                    className="hidden items-center gap-4 pt-6 font-mono text-xs tracking-widest text-stone-300 select-none sm:flex sm:text-sm lg:pt-8"
                                >
                                    <span className="font-bold text-white drop-shadow">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                    <div className="relative h-[2px] w-16 overflow-hidden rounded-full bg-white/20 backdrop-blur-sm sm:w-20">
                                        <motion.div
                                            key={current.id}
                                            initial={{ width: '0%' }}
                                            animate={{ width: '100%' }}
                                            transition={{
                                                duration: 5,
                                                ease: 'linear',
                                            }}
                                            className="h-full rounded-full bg-amber-400/90 shadow-[0_0_8px_rgba(251,191,36,0.5)]"
                                        />
                                    </div>
                                    <span className="text-stone-400">
                                        {String(slides.length).padStart(2, '0')}
                                    </span>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>

                    {/* Right Column: Layered Cards Carousel */}
                    <div className="relative flex w-full items-center justify-center lg:col-span-7">
                        <div className="relative flex aspect-[4/3] w-full max-w-[340px] items-center justify-center xs:max-w-[380px] sm:max-w-[460px] lg:max-w-[500px]">
                            {/* Left Tilted Card (Previous) */}
                            {slides.length > 1 && (
                                <div
                                    onClick={() => move(-1)}
                                    className="absolute inset-y-0 left-0 my-auto hidden h-[84%] w-[70%] -translate-x-3 -rotate-6 transform cursor-pointer overflow-hidden rounded-2xl border border-white/15 opacity-40 shadow-xl backdrop-blur-sm transition-all duration-300 hover:opacity-75 sm:block md:-translate-x-6 md:-rotate-12"
                                >
                                    <img
                                        src={slides[prevIndex].image}
                                        alt={slides[prevIndex].title}
                                        className="h-full w-full object-cover brightness-90 filter"
                                    />
                                    <div className="absolute inset-0 bg-black/30" />
                                </div>
                            )}

                            {/* Right Tilted Card (Next) */}
                            {slides.length > 1 && (
                                <div
                                    onClick={() => move(1)}
                                    className="absolute inset-y-0 right-0 my-auto hidden h-[84%] w-[70%] translate-x-3 rotate-6 transform cursor-pointer overflow-hidden rounded-2xl border border-white/15 opacity-40 shadow-xl backdrop-blur-sm transition-all duration-300 hover:opacity-75 sm:block md:translate-x-6 md:rotate-12"
                                >
                                    <img
                                        src={slides[nextIndex].image}
                                        alt={slides[nextIndex].title}
                                        className="h-full w-full object-cover brightness-90 filter"
                                    />
                                    <div className="absolute inset-0 bg-black/30" />
                                </div>
                            )}

                            {/* Main Active Center Card */}
                            <motion.div
                                className="group relative z-10 h-full w-full overflow-hidden rounded-2xl border border-white/20 bg-neutral-900 shadow-[0_20px_40px_rgba(0,0,0,0.6)] dark:border-white/15"
                                style={{
                                    rotateX,
                                    rotateY,
                                    transformPerspective: 1000,
                                }}
                                onMouseEnter={() => setIsPaused(true)}
                                onMouseLeave={() => {
                                    setIsPaused(false);
                                    resetCardTilt();
                                }}
                                onMouseMove={handleCardMouseMove}
                            >
                                <AnimatePresence
                                    initial={false}
                                    custom={direction}
                                    mode="popLayout"
                                >
                                    <motion.div
                                        key={current.id}
                                        custom={direction}
                                        variants={cardVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        className="relative h-full w-full will-change-transform"
                                    >
                                        <img
                                            src={current.image}
                                            alt={current.title}
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                                    </motion.div>
                                </AnimatePresence>

                                {/* Navigation Arrows */}
                                <button
                                    onClick={() => move(-1)}
                                    aria-label="Previous property"
                                    className="absolute top-1/2 left-2 z-30 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white shadow-lg backdrop-blur-md transition-all hover:scale-105 hover:bg-black/60 active:scale-95 sm:left-3 sm:h-10 sm:w-10"
                                >
                                    <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                                </button>
                                <button
                                    onClick={() => move(1)}
                                    aria-label="Next property"
                                    className="absolute top-1/2 right-2 z-30 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white shadow-lg backdrop-blur-md transition-all hover:scale-105 hover:bg-black/60 active:scale-95 sm:right-3 sm:h-10 sm:w-10"
                                >
                                    <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                                </button>

                                {/* Card Overlay Info */}
                                <AnimatePresence mode="wait" initial={false}>
                                    <motion.div
                                        key={current.id}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -8 }}
                                        transition={{ duration: 0.25 }}
                                        className="absolute right-3 bottom-3 left-3 z-20 flex items-end justify-between gap-2 p-1 text-white sm:right-4 sm:bottom-4 sm:left-4"
                                    >
                                        <div className="min-w-0 flex-1 space-y-0.5">
                                            <h3 className="font-display truncate text-base font-medium tracking-tight drop-shadow-sm sm:text-lg lg:text-xl">
                                                {current.title}
                                            </h3>
                                            <p className="flex items-center gap-1 text-xs text-stone-300 drop-shadow sm:text-sm">
                                                <MapPin className="h-3 w-3 shrink-0 text-amber-400 sm:h-3.5 sm:w-3.5" />
                                                <span className="truncate">
                                                    {current.location}
                                                </span>
                                            </p>
                                        </div>
                                        <div className="shrink-0 text-right">
                                            <span className="text-sm font-bold tracking-tight text-white drop-shadow sm:text-base lg:text-lg">
                                                {formatPrice(current.price)}
                                            </span>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}