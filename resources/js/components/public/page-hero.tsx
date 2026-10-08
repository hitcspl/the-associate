import { useScroll, useTransform, motion, type MotionValue } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';
import Reveal, { RevealText } from './reveal';

export type PageHeroProps = {
    image: string;
    imageAlt: string;
    title: string;
    subtitle: string;
    children?: React.ReactNode;
};

export default function PageHero({
    image,
    imageAlt,
    title,
    subtitle,
    children,
}: PageHeroProps) {
    const reduced = useReducedMotion();

    const { scrollY } = useScroll();
    const parallaxY = useTransform(scrollY, [0, 600], [0, reduced ? 0 : 60]);

    return (
        <section className="relative w-full min-h-[78svh] sm:min-h-[88svh] lg:min-h-[100svh] pt-28 sm:pt-32 flex items-end overflow-hidden">
            <motion.div
                className="absolute inset-0 will-change-transform"
                style={{ y: parallaxY as MotionValue<number> }}
            >
                <img
                    src={image}
                    alt={imageAlt}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-full object-cover scale-110"
                />
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 sm:pb-20">
                <div className="max-w-xl space-y-4 sm:space-y-6">
                    <Reveal delay={0.08}>
                        <RevealText
                            text={title}
                            as="h1"
                            className="font-display text-4xl sm:text-5xl lg:text-7xl text-white leading-[1.1] tracking-tight"
                            wordClassName="text-white"
                        />
                    </Reveal>
                    <Reveal delay={0.16}>
                        <p className="text-stone-200 text-base sm:text-xl lg:text-2xl font-light leading-snug">
                            {subtitle}
                        </p>
                    </Reveal>
                    {children && (
                        <Reveal delay={0.24}>
                            <div className="pt-2">{children}</div>
                        </Reveal>
                    )}
                </div>
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2 text-white/60">
                <span className="text-[10px] uppercase tracking-[0.25em]">Scroll</span>
                <motion.svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    animate={{ y: [0, 6, 0] }}
                    transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                >
                    <path d="M12 5v14" />
                    <path d="m19 12-7 7-7-7" />
                </motion.svg>
            </div>
        </section>
    );
}
