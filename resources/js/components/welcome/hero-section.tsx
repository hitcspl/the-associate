import React, { type FormEvent, useEffect, useState } from 'react';
import {
    AnimatePresence,
    motion,
    useMotionValue,
    useSpring,
    type Variants,
} from 'framer-motion';
import {
    ArrowRight,
    ChevronLeft,
    ChevronRight,
    MapPin,
    MessageCircle,
} from 'lucide-react';
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
    const [name, setName] = useState('');
    const [selectedPropertyId, setSelectedPropertyId] = useState(() =>
        slides[0] ? String(slides[0].id) : '',
    );
    const [message, setMessage] = useState('');

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

    const handleInquirySubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const selectedProperty = slides.find(
            (slide) => String(slide.id) === selectedPropertyId,
        );

        if (!name.trim() || !message.trim() || !selectedProperty) {
            return;
        }

        const inquiry = [
            'Hello, I am interested in a property.',
            `Name: ${name.trim()}`,
            `Property: ${selectedProperty.title}`,
            `Message: ${message.trim()}`,
        ].join('\n');

        const whatsappUrl = `https://wa.me/916512281718?text=${encodeURIComponent(inquiry)}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
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
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="w-full max-w-lg rounded-3xl border border-white/15 bg-neutral-900/80 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-6"
                        >
                            <div className="mb-4">
                                <span className="text-[11px] font-semibold tracking-[0.18em] text-amber-300 uppercase">
                                    Start a conversation
                                </span>
                                <h2 className="font-display mt-1 text-2xl text-white sm:text-3xl">
                                    Find your place.
                                </h2>
                                <p className="mt-1 text-xs leading-relaxed text-stone-300">
                                    Choose a property and message our team on
                                    WhatsApp.
                                </p>
                            </div>

                            <form
                                onSubmit={handleInquirySubmit}
                                className="grid gap-3 sm:grid-cols-2"
                            >
                                <label className="grid gap-1.5 text-sm font-medium text-stone-200">
                                    Your name
                                    <input
                                        required
                                        autoComplete="name"
                                        value={name}
                                        onChange={(event) =>
                                            setName(event.target.value)
                                        }
                                        maxLength={120}
                                        placeholder="Enter your name"
                                        className="h-10 w-full rounded-lg border border-white/15 bg-white/10 px-3 text-sm text-white outline-none transition placeholder:text-stone-400 focus:border-amber-300 focus:ring-2 focus:ring-amber-300/30"
                                    />
                                </label>

                                <label className="grid gap-1.5 text-sm font-medium text-stone-200">
                                    Select a property
                                    <select
                                        required
                                        value={selectedPropertyId}
                                        onChange={(event) =>
                                            setSelectedPropertyId(
                                                event.target.value,
                                            )
                                        }
                                        className="h-10 w-full rounded-lg border border-white/15 bg-neutral-800 px-3 text-sm text-white outline-none transition focus:border-amber-300 focus:ring-2 focus:ring-amber-300/30"
                                    >
                                        {slides.map((slide) => (
                                            <option
                                                key={slide.id}
                                                value={String(slide.id)}
                                            >
                                                {slide.title}
                                            </option>
                                        ))}
                                    </select>
                                </label>

                                <label className="grid gap-1.5 text-sm font-medium text-stone-200 sm:col-span-2">
                                    Message
                                    <textarea
                                        required
                                        value={message}
                                        onChange={(event) =>
                                            setMessage(event.target.value)
                                        }
                                        maxLength={1000}
                                        rows={2}
                                        placeholder="Tell us what you’re looking for"
                                        className="w-full resize-y rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-sm text-white outline-none transition placeholder:text-stone-400 focus:border-amber-300 focus:ring-2 focus:ring-amber-300/30"
                                    />
                                </label>

                                <Button
                                    type="submit"
                                    size="lg"
                                    className="h-10 w-full rounded-lg border border-white/10 bg-[#A37B4C] text-sm font-semibold text-white shadow-[0_8px_24px_rgba(163,123,76,0.2)] transition-colors hover:bg-[#AF8756] focus-visible:ring-2 focus-visible:ring-amber-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 sm:col-span-2"
                                >
                                    <MessageCircle className="h-4 w-4" />
                                    Continue on WhatsApp
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}