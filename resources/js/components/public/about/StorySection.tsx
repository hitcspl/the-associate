import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { RevealText } from '@/components/public/reveal';
import StackCard from './StackCard';
import { fadeUp, EASE } from '@/lib/motion';
import { Quote, ShieldCheck, CheckCircle2, Coins, Zap, HeartHandshake } from 'lucide-react';

const chapterA = {
    headline: `Honest. Reliable.\nCost-effective. Hassle-free.`,
    text: `We are one of the leading real estate developers & property dealers in Ranchi. Our aim is to provide honest, reliable, cost-effective, hassle-free and quick services to our esteemed customers. From master-planned townships to premium residential plots, every project is executed with painstaking attention to detail, ensuring your investment grows safely for generations.`,
    chips: [
        { label: 'Honest', icon: CheckCircle2 },
        { label: 'Reliable', icon: HeartHandshake },
        { label: 'Cost-effective', icon: Coins },
        { label: 'Quick', icon: Zap },
    ],
};

const chapterB = {
    text: `If somebody is interested to purchase a land, he/she has to invest his hard-earned money or has to borrow it from a bank, financial institution or relatives. Therefore, he/she must be very careful while taking the decision to purchase a land. So, The Associate is here to fulfil their dream and help them purchase clear land through its projects.`,
    quote: `Dream Lifestyle Township in Ranchi at Very Affordable Price`,
};

export default function StorySection() {
    const sectionRef = useRef<HTMLElement>(null);
    const maxScroll = typeof window !== 'undefined' ? window.innerHeight * 1.2 : 1200;

    return (
        <>
            {/* Desktop: scroll-linked split */}
            <section ref={sectionRef} className="hidden lg:block relative h-[220vh]">
                <div className="sticky top-0 h-screen overflow-hidden">
                    <div className="mx-auto max-w-7xl h-full grid grid-cols-2">
                        {/* Left: Image frame */}
                        <div className="relative">
                            <ChapterAImage />
                            <ChapterBImage />
                        </div>
                        {/* Right: Text panel */}
                        <div className="relative">
                            <ChapterAText />
                            <ChapterBText />
                            <ProgressRail sectionRef={sectionRef} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Mobile: stacking cards */}
            <section className="lg:hidden">
                <div className="space-y-6">
                    <StackCard sectionRef={sectionRef} index={0} total={2} top="top-20" maxScroll={maxScroll}>
                        <div className="p-5 sm:p-6 space-y-4">
                            <div>
                                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#A37B4C]">Why The Associate</span>
                                <h2 className="font-display text-3xl sm:text-4xl font-medium text-foreground leading-[1.15] mt-2">
                                    <RevealText text={chapterA.headline} byWord={false} className="overflow-hidden pb-[0.15em]" />
                                </h2>
                            </div>
                            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
                                <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85" alt="Luxury Interior" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">{chapterA.text}</p>
                            <div className="flex flex-wrap gap-2">
                                {chapterA.chips.map((chip) => (
                                    <span key={chip.label} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-card text-xs font-medium text-foreground">
                                        <chip.icon className="w-3.5 h-3.5 text-[#A37B4C]" />
                                        {chip.label}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </StackCard>

                    <StackCard sectionRef={sectionRef} index={1} total={2} top="top-24" maxScroll={maxScroll}>
                        <div className="p-5 sm:p-6 space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#A37B4C]">Who We Are</span>
                            </div>
                            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted relative">
                                <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85" alt="Real Estate Project" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
                                    <span className="text-[8rem] font-display font-bold text-[#A37B4C]/5">"</span>
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">{chapterB.text}</p>
                            <blockquote className="relative pl-4 border-l-2 border-[#A37B4C] py-2">
                                <span className="absolute -top-6 -left-2 text-6xl font-display text-[#A37B4C]/10 select-none" aria-hidden="true">"</span>
                                <p className="font-display italic text-xl text-foreground leading-snug">{chapterB.quote}</p>
                            </blockquote>
                        </div>
                    </StackCard>
                </div>
            </section>
        </>
    );
}

function ChapterAImage() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollY } = useScroll({ target: sectionRef });
    const p = useScrollProgress(scrollY);

    const scale = useTransform(p, [0, 0.5], [1, 1.06]);
    const opacity = useTransform(p, [0.42, 0.55], [1, 0]);

    return (
        <motion.img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85"
            alt="Luxury Interior"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ scale, opacity }}
        />
    );
}

function ChapterBImage() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollY } = useScroll({ target: sectionRef });
    const p = useScrollProgress(scrollY);

    const clip = useTransform(p, [0.45, 0.6], ['inset(0 0 100% 0)', 'inset(0 0 0% 0)']);
    const scale = useTransform(p, [0.45, 0.6], [1.08, 1]);
    const opacity = useTransform(p, [0.45, 0.6], [0, 1]);

    return (
        <motion.img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85"
            alt="Real Estate Project"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ clipPath: clip, scale, opacity }}
        />
    );
}

function ChapterAText() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollY } = useScroll({ target: sectionRef });
    const p = useScrollProgress(scrollY);

    const opacity = useTransform(p, [0.42, 0.55], [1, 0]);
    const y = useTransform(p, [0.42, 0.55], [0, -32]);

    return (
        <motion.div style={{ opacity, y }} className="absolute inset-0 p-8 flex flex-col justify-center">
            <div className="max-w-md">
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#A37B4C]">Why The Associate</span>
                <h2 className="font-display text-4xl sm:text-5xl font-medium text-foreground leading-[1.15] mt-4 text-balance">
                    <RevealText text={chapterA.headline} byWord={false} className="overflow-hidden pb-[0.15em]" />
                </h2>
                <p className="mt-6 text-base text-muted-foreground leading-relaxed">{chapterA.text}</p>
                <div className="flex flex-wrap gap-2 mt-6">
                    {chapterA.chips.map((chip) => (
                        <span key={chip.label} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-card text-xs font-medium text-foreground">
                            <chip.icon className="w-3.5 h-3.5 text-[#A37B4C]" />
                            {chip.label}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

function ChapterBText() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollY } = useScroll({ target: sectionRef });
    const p = useScrollProgress(scrollY);

    const opacity = useTransform(p, [0.45, 0.6], [0, 1]);
    const y = useTransform(p, [0.45, 0.6], [32, 0]);

    return (
        <motion.div style={{ opacity, y }} className="absolute inset-0 p-8 flex flex-col justify-center">
            <div className="max-w-md border-l-4 border-[#A37B4C] pl-6">
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#A37B4C]">Who We Are</span>
                <p className="mt-4 text-base text-muted-foreground leading-relaxed">{chapterB.text}</p>
                <blockquote className="relative mt-6 pl-4 border-l-2 border-[#A37B4C]">
                    <span className="absolute -top-6 -left-2 text-6xl font-display text-[#A37B4C]/10 select-none" aria-hidden="true">"</span>
                    <p className="font-display italic text-xl sm:text-2xl text-foreground leading-snug">{chapterB.quote}</p>
                </blockquote>
            </div>
        </motion.div>
    );
}

function ProgressRail({ sectionRef }: { sectionRef: React.RefObject<HTMLElement | null> }) {
    const { scrollY } = useScroll({ target: sectionRef });
    const p = useScrollProgress(scrollY);

    const lineHeight = useTransform(p, [0, 1], ['0%', '100%']);
    const chapter = useTransform(p, [0, 0.5, 1], [0, 0, 1]);
    const chapterIndex = useTransform(chapter, [0, 1], [1, 2]);

    return (
        <div className="absolute left-0 top-8 bottom-8 w-16 flex flex-col items-center">
            <div className="relative w-px flex-1 bg-border">
                <motion.div className="absolute top-0 left-0 w-full bg-[#A37B4C] origin-top" style={{ scaleY: lineHeight }} />
            </div>
            <div className="mt-4 space-y-3">
                <div className="flex flex-col items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-[#A37B4C]" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#A37B4C]">01</span>
                    <span className="text-[10px] text-muted-foreground">Why</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-border" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">02</span>
                    <span className="text-[10px] text-muted-foreground">Who</span>
                </div>
            </div>
            <AnimatePresence mode="wait">
                <motion.div
                    key={chapterIndex.get()}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 text-[10px] font-mono font-bold text-[#A37B4C]"
                >
                    0{chapterIndex.get()} / 02
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

function useScrollProgress(scrollY: any) {
    // Approximate 220vh section with 100vh sticky = 120vh scroll range
    const maxScroll = typeof window !== 'undefined' ? window.innerHeight * 1.2 : 1200;
    return useTransform(scrollY, [0, maxScroll], [0, 1]);
}
