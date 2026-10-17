import { useRef, useState } from 'react';
import {
    motion,
    useScroll,
    useTransform,
    useMotionValueEvent,
    type MotionValue,
} from 'framer-motion';
import { RevealText } from '@/components/public/reveal';
import { CheckCircle2, Coins, Zap, HeartHandshake } from 'lucide-react';

type Progress = MotionValue<number>;

const IMAGE_A = 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85';
const IMAGE_B = 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85';

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

/**
 * Timeline (p = 0 → 1 across the sticky scroll distance):
 *   0.00 – 0.25  Chapter A holds
 *   0.25 – 0.50  A fades out / B image wipes in
 *   0.45 – 0.65  B text fades in
 *   0.65 – 1.00  Chapter B holds
 */
export default function StorySection() {
    const sectionRef = useRef<HTMLElement>(null);

    // Progress is measured against the section itself, so it always starts at 0
    // when the sticky frame pins and ends at 1 when it releases.
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start 80px', 'end end'],
    });

    return (
        <>
            {/* Desktop: scroll-linked split */}
            <section ref={sectionRef} className="hidden lg:block relative h-[300vh]">
                {/* top-20 / 5rem = navbar height, so pinned content sits below the fixed header */}
                <div className="sticky top-20 h-[calc(100svh-5rem)] overflow-hidden">
                    <div className="mx-auto max-w-7xl h-full grid grid-cols-2 gap-8 xl:gap-12 px-6 xl:px-8">
                        {/* Left: image frame */}
                        <div className="relative py-6 xl:py-8">
                            <div className="relative h-full w-full overflow-hidden rounded-3xl bg-muted">
                                <ChapterAImage p={scrollYProgress} />
                                <ChapterBImage p={scrollYProgress} />
                            </div>
                        </div>

                        {/* Right: text panel */}
                        <div className="relative">
                            <ProgressRail p={scrollYProgress} />
                            <ChapterAText p={scrollYProgress} />
                            <ChapterBText p={scrollYProgress} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Mobile / tablet: pure-CSS stacking cards */}
            <section className="lg:hidden px-4 sm:px-6 py-12">
                <div className="mx-auto max-w-2xl space-y-6">
                    <article className="sticky top-24 rounded-3xl border border-border bg-card shadow-sm overflow-hidden">
                        <div className="p-5 sm:p-6 space-y-4">
                            <div>
                                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#A37B4C]">
                                    Why The Associate
                                </span>
                                <h2 className="font-display text-3xl sm:text-4xl font-medium text-foreground leading-[1.15] mt-2 text-balance">
                                    <RevealText
                                        text={chapterA.headline}
                                        as="p"
                                        byWord={false}
                                        className="overflow-hidden pb-[0.15em]"
                                    />
                                </h2>
                            </div>
                            <div className="aspect-4/3 rounded-2xl overflow-hidden bg-muted">
                                <img
                                    src={IMAGE_A}
                                    alt="Luxury Interior"
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{chapterA.text}</p>
                            <Chips />
                        </div>
                    </article>

                    <article className="sticky top-28 rounded-3xl border border-border bg-card shadow-sm overflow-hidden">
                        <div className="p-5 sm:p-6 space-y-4">
                            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#A37B4C]">Who We Are</span>
                            <div className="aspect-4/3 rounded-2xl overflow-hidden bg-muted">
                                <img
                                    src={IMAGE_B}
                                    alt="Real Estate Project"
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{chapterB.text}</p>
                            <Quote />
                        </div>
                    </article>
                </div>
            </section>
        </>
    );
}

/* ---------- shared bits ---------- */

function Chips() {
    return (
        <div className="flex flex-wrap gap-2">
            {chapterA.chips.map((chip) => (
                <span
                    key={chip.label}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-card text-xs font-medium text-foreground"
                >
                    <chip.icon className="w-3.5 h-3.5 text-[#A37B4C]" />
                    {chip.label}
                </span>
            ))}
        </div>
    );
}

function Quote() {
    return (
        <blockquote className="relative pl-4 border-l-2 border-[#A37B4C] py-2">
            <span
                className="absolute -top-6 -left-2 text-6xl font-display text-[#A37B4C]/10 select-none"
                aria-hidden="true"
            >
                &ldquo;
            </span>
            <p className="font-display italic text-xl sm:text-2xl text-foreground leading-snug">{chapterB.quote}</p>
        </blockquote>
    );
}

/* ---------- desktop pieces ---------- */

function ChapterAImage({ p }: { p: Progress }) {
    const scale = useTransform(p, [0, 0.5], [1, 1.08]);
    const opacity = useTransform(p, [0.25, 0.5], [1, 0]);

    return (
        <motion.img
            src={IMAGE_A}
            alt="Luxury Interior"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ scale, opacity }}
        />
    );
}

function ChapterBImage({ p }: { p: Progress }) {
    const clipPath = useTransform(p, [0.25, 0.55], ['inset(100% 0% 0% 0%)', 'inset(0% 0% 0% 0%)']);
    const scale = useTransform(p, [0.25, 0.6], [1.12, 1]);

    return (
        <motion.img
            src={IMAGE_B}
            alt="Real Estate Project"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ clipPath, scale }}
        />
    );
}

function ChapterAText({ p }: { p: Progress }) {
    const opacity = useTransform(p, [0, 0.25, 0.45], [1, 1, 0]);
    const y = useTransform(p, [0, 0.25, 0.45], [0, 0, -40]);

    return (
        <motion.div
            style={{ opacity, y }}
            className="absolute inset-0 flex flex-col justify-center pl-20 xl:pl-24 pr-2 will-change-transform"
        >
            <div className="max-w-lg">
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#A37B4C]">Why The Associate</span>
                <h2 className="font-display text-4xl xl:text-5xl font-medium text-foreground leading-[1.15] mt-4 text-balance">
                    <RevealText
                        text={chapterA.headline}
                        as="p"
                        byWord={false}
                        className="overflow-hidden pb-[0.15em]"
                    />
                </h2>
                <p className="mt-6 text-base text-muted-foreground leading-relaxed">{chapterA.text}</p>
                <div className="mt-6">
                    <Chips />
                </div>
            </div>
        </motion.div>
    );
}

function ChapterBText({ p }: { p: Progress }) {
    const opacity = useTransform(p, [0.45, 0.65, 1], [0, 1, 1]);
    const y = useTransform(p, [0.45, 0.65], [40, 0]);

    return (
        <motion.div
            style={{ opacity, y }}
            className="absolute inset-0 flex flex-col justify-center pl-20 xl:pl-24 pr-2 will-change-transform"
        >
            <div className="max-w-lg border-l-4 border-[#A37B4C] pl-6">
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#A37B4C]">Who We Are</span>
                <p className="mt-4 text-base text-muted-foreground leading-relaxed">{chapterB.text}</p>
                <div className="mt-6">
                    <Quote />
                </div>
            </div>
        </motion.div>
    );
}

function ProgressRail({ p }: { p: Progress }) {
    const [active, setActive] = useState(0);
    const scaleY = useTransform(p, [0, 1], [0, 1]);

    useMotionValueEvent(p, 'change', (v) => {
        const next = v >= 0.45 ? 1 : 0;
        setActive((prev) => (prev === next ? prev : next));
    });

    const steps = [
        { n: '01', label: 'Why' },
        { n: '02', label: 'Who' },
    ];

    return (
        <div className="absolute left-0 top-6 bottom-6 xl:top-8 xl:bottom-8 w-12 flex flex-col items-center" aria-hidden="true">
            <div className="relative w-px flex-1 bg-border">
                <motion.div
                    className="absolute inset-x-0 top-0 h-full bg-[#A37B4C] origin-top"
                    style={{ scaleY }}
                />
            </div>
            <div className="mt-4 space-y-4">
                {steps.map((s, i) => (
                    <div key={s.n} className="flex flex-col items-center gap-1">
                        <div
                            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                                i <= active ? 'bg-[#A37B4C]' : 'bg-border'
                            }`}
                        />
                        <span
                            className={`text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 ${
                                i === active ? 'text-[#A37B4C]' : 'text-muted-foreground'
                            }`}
                        >
                            {s.n}
                        </span>
                        <span className="text-[10px] text-muted-foreground">{s.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}