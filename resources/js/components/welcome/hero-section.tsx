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

export function HeroSection({ slides, favorites = [], onFavorite }: HeroSectionProps) {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState<number>(0);
    const [isPaused, setIsPaused] = useState(false);

    const current = slides[index];

    const rotateX = useSpring(useMotionValue(0), { stiffness: 180, damping: 20 });
    const rotateY = useSpring(useMotionValue(0), { stiffness: 180, damping: 20 });

    const textContainerVariants: Variants = {
        hidden: {},
        visible: {
            transition: { staggerChildren: 0.15, delayChildren: 0.2 },
        },
    };

    if (!current) return null;
    const eyebrowVariants: Variants = {
        hidden: { opacity: 0, y: -15 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
    };
    const titleVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 90, damping: 18 },
        },
    };
    const contentVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
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

    const prevIndex = (index - 1 + slides.length) % slides.length;
    const nextIndex = (index + 1) % slides.length;

    // Card motion variants with scale & fade
    const cardVariants: Variants = {
        enter: (dir: number) => ({
            x: dir > 0 ? 100 : -100,
            y: 18,
            opacity: 0,
            scale: 0.92,
            filter: 'blur(8px)',
        }),
        center: {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            transition: { duration: 0.55, ease: 'easeOut' as const },
        },
        exit: (dir: number) => ({
            x: dir < 0 ? 100 : -100,
            y: 10,
            opacity: 0,
            scale: 0.92,
            filter: 'blur(6px)',
            transition: { duration: 0.3, ease: 'easeInOut' as const },
        }),
    };

    return (
        <section
            id="home"
            className="relative min-h-[100svh] lg:min-h-screen w-full overflow-hidden bg-neutral-950 text-white dark:bg-neutral-950 dark:text-white pt-30 pb-12 lg:pt-28 lg:pb-16 flex items-center selection:bg-[#A37B4C] selection:text-white"
        >
            {/* Background Image Container */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={current.id}
                        src={current.image}
                        alt="Hero Background"
                        initial={{ opacity: 0, scale: 1.08 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="h-full w-full object-cover object-center filter brightness-[0.92] dark:brightness-[0.82]"
                    />
                </AnimatePresence>

                {/* Subtle left-to-right fade mask: guarantees crisp background right, readability left */}
                <div  className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 via-50% to-transparent" />
                
                {/* Soft radial backdrop glow specifically behind hero typography */}
                <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-black/20 blur-[120px] rounded-full pointer-events-none" />

                {/* Bottom subtle edge transition */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-neutral-950/90 via-neutral-950/30 to-transparent" />
            </div>

            <div className="container mx-auto px-5 sm:px-8 lg:px-12 relative z-20 w-full">
                <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
                    
                    {/* Left Column: Typography & Controls */}
                    {/* =========================================================
    LEFT COLUMN: Typography & Controls
   ========================================================= */}

<motion.div
    className="flex flex-col justify-center lg:col-span-5"
    initial="hidden"
    animate="visible"
    variants={textContainerVariants}
>
    <div className="mx-auto w-full max-w-xl text-center lg:mx-0 lg:text-left">

        {/* Eyebrow */}
        <motion.div variants={eyebrowVariants} className="mb-5 flex transform-gpu items-center justify-center gap-3 sm:mb-6 lg:justify-start">
            <span
                className="
                    text-xs font-semibold uppercase
                    tracking-[0.25em]
                    text-amber-200/90
                    drop-shadow-sm
                    sm:text-sm
                "
            >
                Premium Real Estate
            </span>

            <div className="h-px w-8 bg-amber-200/40 sm:w-10" />
        </motion.div>

        {/* Heading */}
        <motion.h1
            variants={titleVariants}
            className="
                mx-auto
                max-w-[340px]
                text-[3rem]
                font-display
                font-normal
                leading-[0.98]
                tracking-[-0.035em]
                text-stone-50
                drop-shadow-md

                sm:max-w-[520px]
                sm:text-5xl

                md:text-6xl

                lg:mx-0
                lg:max-w-none
                lg:text-6xl

                xl:text-7xl
            "
        >
            Find Your{' '}
            <span
                className="
                    block
                    font-display
                    italic
                    font-light
                    text-amber-100/95
                "
            >
                Dream Home
            </span>
        </motion.h1>

        {/* Description */}
        <motion.p
            variants={contentVariants}
            className="
                mx-auto
                mt-5
                max-w-[330px]
                text-sm
                font-light
                leading-6
                text-stone-200/90
                drop-shadow

                sm:mt-6
                sm:max-w-md
                sm:text-base
                sm:leading-7

                lg:mx-0
                lg:text-base
                xl:text-lg
                xl:leading-relaxed
            "
        >
            Discover thoughtfully selected residences designed
            around the way you live.
        </motion.p>

        {/* CTA */}
        <motion.div
            variants={contentVariants}
            className="
                relative z-30
                mt-7
                flex
                items-center
                justify-center
                lg:justify-start
            "
        >
            <a
                href="#properties"
                className="inline-flex"
            >
                <Button
                    size="lg"
                    className="
                        group
                        relative
                        h-12
                        overflow-hidden
                        rounded-full
                        border
                        border-white/10
                        bg-[#A37B4C]
                        px-6
                        text-sm
                        font-medium
                        text-white

                        shadow-[0_10px_30px_rgba(163,123,76,0.28)]

                        transition-all
                        duration-300
                        ease-out

                        hover:-translate-y-1
                        hover:bg-[#AF8756]
                        hover:shadow-[0_16px_38px_rgba(163,123,76,0.38)]

                        active:translate-y-0
                        active:scale-[0.97]
                        active:shadow-[0_6px_18px_rgba(163,123,76,0.25)]

                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-amber-300/70
                        focus-visible:ring-offset-2
                        focus-visible:ring-offset-neutral-950

                        sm:h-[52px]
                        sm:px-7
                    "
                >
                    {/* Animated shine */}
                    <span
                        className="
                            pointer-events-none
                            absolute
                            inset-y-0
                            -left-[80%]
                            w-[55%]
                            skew-x-[-20deg]
                            bg-gradient-to-r
                            from-transparent
                            via-white/20
                            to-transparent
                            transition-all
                            duration-700
                            ease-out
                            group-hover:left-[125%]
                        "
                    />

                    {/* Button text */}
                    <span className="relative z-10">
                        Explore Properties
                    </span>

                    {/* Arrow */}
                    <span
                        className="
                            relative
                            z-10
                            ml-2.5
                            flex
                            h-6
                            w-6
                            items-center
                            justify-center
                            rounded-full
                            bg-white/10
                            transition-all
                            duration-300
                            group-hover:translate-x-1
                            group-hover:bg-white/15
                        "
                    >
                        <ArrowRight
                            className="
                                h-3.5
                                w-3.5
                                transition-transform
                                duration-300
                                group-hover:translate-x-0.5
                            "
                        />
                    </span>
                </Button>
            </a>
        </motion.div>

        {/* Progress — hidden on small screens */}
        {slides.length > 1 && (
            <motion.div
                variants={contentVariants}
                className="
                    hidden
                    items-center
                    gap-4
                    pt-7
                    font-mono
                    text-sm
                    tracking-widest
                    text-stone-300
                    select-none

                    sm:flex
                    lg:pt-8
                "
            >
                <span className="text-sm font-bold text-white drop-shadow">
                    {String(index + 1).padStart(2, '0')}
                </span>

                <div
                    className="
                        relative
                        h-[2px]
                        w-20
                        overflow-hidden
                        rounded-full
                        bg-white/25
                        backdrop-blur-sm
                    "
                >
                    <motion.div
                        key={current.id}
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 5, ease: 'linear' }}
                        className="
                            h-full
                            rounded-full
                            bg-amber-400/90
                            shadow-[0_0_8px_rgba(251,191,36,0.5)]
                            transition-all
                            duration-500
                            ease-out
                        "
                    />
                </div>

                <span className="text-stone-400">
                    {String(slides.length).padStart(2, '0')}
                </span>
            </motion.div>
        )}
    </div>
</motion.div>

                    {/* Right Column: Layered Fan Cards Carousel */}
                    <div className="relative flex items-center justify-center lg:col-span-7 mt-4 lg:mt-0">
                        <div className="relative w-full max-w-[440px] sm:max-w-[500px] aspect-[4/3] flex items-center justify-center">
                            
                            {/* Left Tilted Card (Previous) */}
                            {slides.length > 1 && (
                                <div 
                                    onClick={() => move(-1)}
                                    className="absolute left-[-4%] sm:left-[-8%] top-0 bottom-0 my-auto w-[76%] h-[86%] rounded-2xl overflow-hidden shadow-2xl border border-white/15 transform -rotate-12 translate-x-[-8px] opacity-60 hover:opacity-85 transition-all duration-300 z-0 cursor-pointer hidden sm:block backdrop-blur-sm select-none"
                                >
                                    <img
                                        src={slides[prevIndex].image}
                                        alt={slides[prevIndex].title}
                                        className="h-full w-full object-cover filter brightness-90"
                                    />
                                    <div className="absolute inset-0 bg-black/20" />
                                </div>
                            )}

                            {/* Right Tilted Card (Next) */}
                            {slides.length > 1 && (
                                <div 
                                    onClick={() => move(1)}
                                    className="absolute right-[-4%] sm:right-[-8%] top-0 bottom-0 my-auto w-[76%] h-[86%] rounded-2xl overflow-hidden shadow-2xl border border-white/15 transform rotate-12 translate-x-[8px] opacity-60 hover:opacity-85 transition-all duration-300 z-0 cursor-pointer hidden sm:block backdrop-blur-sm select-none"
                                >
                                    <img
                                        src={slides[nextIndex].image}
                                        alt={slides[nextIndex].title}
                                        className="h-full w-full object-cover filter brightness-90"
                                    />
                                    <div className="absolute inset-0 bg-black/20" />
                                </div>
                            )}

                            {/* Center Active Main Card */}
                            <motion.div
                                className="relative z-10 w-full h-full overflow-hidden rounded-2xl border border-white/20 bg-neutral-900 shadow-[0_20px_50px_rgba(0,0,0,0.5)] dark:border-white/15 group"
                                style={{ rotateX, rotateY, transformPerspective: 1000 }}
                                onMouseEnter={() => setIsPaused(true)}
                                onMouseLeave={() => {
                                    setIsPaused(false);
                                    resetCardTilt();
                                }}
                                onMouseMove={handleCardMouseMove}
                            >
                                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                                    <motion.div
                                        key={current.id}
                                        custom={direction}
                                        variants={cardVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        className="relative w-full h-full"
                                    >
                                        <img
                                            src={current.image}
                                            alt={current.title}
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />

                                        {/* Bottom 15% Soft Shadow Gradient Overlay */}
                                        <div className="absolute inset-x-0 bottom-0 h-[35%] bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
                                    </motion.div>
                                </AnimatePresence>

                                {/* Favorite Action Button */}
                                

                                {/* Navigation Arrows */}
                                <button
                                    onClick={() => move(-1)}
                                    aria-label="Previous property"
                                    className="absolute left-3 top-1/2 -translate-y-1/2 z-30 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/35 hover:bg-black/60 text-white border border-white/20 backdrop-blur-md transition-all hover:scale-110 active:scale-95 shadow-lg"
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={() => move(1)}
                                    aria-label="Next property"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 z-30 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/35 hover:bg-black/60 text-white border border-white/20 backdrop-blur-md transition-all hover:scale-110 active:scale-95 shadow-lg"
                                >
                                    <ChevronRight className="h-5 w-5" />
                                </button>

                                {/* Card Details Overlay (Bottom 15%) */}
                                <AnimatePresence mode="wait" initial={false}>
                                    <motion.div
                                        key={current.id}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.3 }}
                                        className="absolute right-4 bottom-3 left-4 z-20 flex min-h-[58px] items-end justify-between p-1 text-white"
                                    >
                                        <div className="space-y-0.5">
                                            <h3 className="font-display text-lg font-medium tracking-tight drop-shadow-sm sm:text-xl lg:text-2xl">
                                                {current.title}
                                            </h3>
                                            <p className="flex items-center gap-1.5 text-sm text-stone-300 drop-shadow">
                                                <MapPin className="h-3.5 w-3.5 shrink-0 text-amber-400" />
                                                <span className="max-w-[180px] truncate sm:max-w-[220px]">
                                                    {current.location}
                                                </span>
                                            </p>
                                        </div>
                                        <div className="shrink-0 text-right">
                                            <span className="text-base font-bold tracking-tight text-white drop-shadow sm:text-lg lg:text-xl">
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