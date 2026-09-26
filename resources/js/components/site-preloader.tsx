import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';

type PreloadProperty = {
    image?: string;
    images?: string[];
};

type PreloadPageProps = {
    heroSlides?: PreloadProperty[];
    properties?: PreloadProperty[];
    siteImages?: Record<string, string>;
    [key: string]: unknown;
};

type PreloaderThemeMode = 'light' | 'dark';

type SitePreloaderProps = {
    children: ReactNode;
    initialProps: PreloadPageProps;
    /** 'dark' (default) shows the light-colored logo on a near-black scene.
     *  'light' shows the standard/dark logo on a warm off-white scene. */
    theme?: PreloaderThemeMode;
    /** Accent color used for the ring, glow and particles. Defaults per-theme below if omitted. */
    accent?: string;
};

// Dark theme: near-black background needs the LIGHT (white) logo mark to stay visible.
const logoDark = '/AssociatedeveloperFullLogoLight.png';
// Light theme: warm off-white background needs the STANDARD (dark) logo mark to stay visible.
const logoLight = '/AssociatedeveloperFullLogo.png';

const THEME_TOKENS: Record<
    PreloaderThemeMode,
    {
        bg: string;
        text: string;
        subtext: string;
        defaultAccent: string;
        secondaryGlow: string;
        gridLine: string;
        ringTrack: string;
        vignette: string;
        dashedRing: string;
        logo: string;
    }
> = {
    dark: {
        bg: '#08080A',
        text: '#FFFFFF',
        subtext: '#E7E1D8',
        defaultAccent: '#A37B4C',
        secondaryGlow: '#5C4223',
        gridLine: 'rgba(255,255,255,0.4)',
        ringTrack: 'rgba(255,255,255,0.08)',
        vignette: '#08080Aaa',
        dashedRing: 'rgba(255,255,255,0.12)',
        logo: logoDark,
    },
    light: {
        bg: '#F7F3EC',
        text: '#1C1917',
        subtext: '#4A433C',
        defaultAccent: '#8A6238',
        secondaryGlow: '#C9A06D',
        gridLine: 'rgba(28,25,23,0.35)',
        ringTrack: 'rgba(28,25,23,0.08)',
        vignette: '#F7F3ECcc',
        dashedRing: 'rgba(28,25,23,0.14)',
        logo: logoLight,
    },
};

function getCriticalAssets(props: PreloadPageProps, logo: string): string[] {
    const properties = [...(props.heroSlides ?? []), ...(props.properties ?? [])];
    const propertyImages = properties.flatMap((property) => [
        property.image,
        ...(property.images ?? []),
    ]);
    const siteImages = Object.values(props.siteImages ?? {});

    return [...new Set([logo, ...propertyImages, ...siteImages])].filter(
        (asset): asset is string => Boolean(asset),
    );
}

function loadImage(asset: string): Promise<void> {
    return new Promise((resolve) => {
        const image = new Image();
        const finish = () => resolve();
        image.onload = finish;
        image.onerror = finish;
        image.src = asset;
    });
}

/** Deterministic pseudo-random so particle layout is stable across renders (no hydration mismatch). */
function seededRandom(seed: number): number {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

export function SitePreloader({ children, initialProps, theme = 'dark', accent }: SitePreloaderProps) {
    const tokens = THEME_TOKENS[theme];
    const resolvedAccent = accent ?? tokens.defaultAccent;
    const logoAsset = tokens.logo;

    const assets = useRef(getCriticalAssets(initialProps, logoAsset));
    const [loadedCount, setLoadedCount] = useState(0);
    const [phase, setPhase] = useState<'loading' | 'zoom' | 'done'>('loading');

    const percentage = assets.current.length
        ? Math.round((loadedCount / assets.current.length) * 100)
        : 100;

    // Particles scattered across the FULL width (including the sides), not just center.
    const particles = useMemo(
        () =>
            Array.from({ length: 22 }).map((_, i) => ({
                left: seededRandom(i * 12.9898) * 100,
                top: seededRandom(i * 78.233 + 3) * 100,
                size: 1.5 + seededRandom(i * 37.1) * 2.5,
                duration: 6 + seededRandom(i * 5.7) * 8,
                delay: seededRandom(i * 9.3) * 5,
            })),
        [],
    );

    useEffect(() => {
        let isActive = true;

        if (assets.current.length === 0) {
            setPhase('zoom');
            return () => {
                isActive = false;
            };
        }

        void Promise.all(
            assets.current.map((asset) =>
                loadImage(asset).finally(() => {
                    if (isActive) setLoadedCount((count) => count + 1);
                }),
            ),
        ).then(() => {
            if (!isActive) return;
            setLoadedCount(assets.current.length);
            // brief settle so the ring visibly reaches 100% before the cinematic push-in begins
            setTimeout(() => setPhase('zoom'), 320);
        });

        return () => {
            isActive = false;
        };
    }, []);

    // After the zoom-in beat plays, reveal the site underneath and unmount the overlay.
    useEffect(() => {
        if (phase !== 'zoom') return;
        const t = setTimeout(() => setPhase('done'), 900);
        return () => clearTimeout(t);
    }, [phase]);

    const isReady = phase === 'done';

    return (
        <>
            {isReady && children}
            <AnimatePresence>
                {!isReady && (
                    <motion.div
                        key="site-preloader"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden select-none"
                        style={{ background: tokens.bg, color: tokens.text }}
                        aria-label={`Loading site assets: ${percentage}%`}
                        role="status"
                    >
                        {/* ============================================================ */}
                        {/* FULL-BLEED ATMOSPHERE — fills sides & corners on every viewport */}
                        {/* ============================================================ */}

                        {/* Base gradient mesh: four corner glows, sized in vw/vh so they scale
                            correctly from small phones up to ultra-wide/4K monitors */}
                        <div className="absolute inset-0 pointer-events-none">
                            <motion.div
                                animate={{ opacity: [0.25, 0.4, 0.25] }}
                                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                                className="absolute -top-1/4 -left-1/4 w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full blur-[90px] sm:blur-[130px] lg:blur-[160px]"
                                style={{ background: `radial-gradient(circle, ${resolvedAccent}33, transparent 70%)` }}
                            />
                            <motion.div
                                animate={{ opacity: [0.2, 0.35, 0.2] }}
                                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                                className="absolute -top-1/4 -right-1/4 w-[65vw] h-[65vw] max-w-[850px] max-h-[850px] rounded-full blur-[90px] sm:blur-[130px] lg:blur-[160px]"
                                style={{ background: `radial-gradient(circle, ${resolvedAccent}26, transparent 70%)` }}
                            />
                            <motion.div
                                animate={{ opacity: [0.3, 0.45, 0.3] }}
                                transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                                className="absolute -bottom-1/4 -left-1/3 w-[75vw] h-[75vw] max-w-[950px] max-h-[950px] rounded-full blur-[90px] sm:blur-[140px] lg:blur-[170px]"
                                style={{ background: `radial-gradient(circle, ${tokens.secondaryGlow}40, transparent 70%)` }}
                            />
                            <motion.div
                                animate={{ opacity: [0.2, 0.32, 0.2] }}
                                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                                className="absolute -bottom-1/4 -right-1/4 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full blur-[90px] sm:blur-[130px] lg:blur-[160px]"
                                style={{ background: `radial-gradient(circle, ${resolvedAccent}22, transparent 70%)` }}
                            />
                        </div>

                        {/* Vertical light rails hugging each edge — kills the "empty sides" look
                            on wide screens, narrows automatically on phones via vw sizing */}
                        <div
                            className="absolute inset-y-0 left-0 w-[12%] sm:w-[16%] lg:w-[18%] pointer-events-none opacity-50"
                            style={{ background: `linear-gradient(to right, ${resolvedAccent}14, transparent)` }}
                        />
                        <div
                            className="absolute inset-y-0 right-0 w-[12%] sm:w-[16%] lg:w-[18%] pointer-events-none opacity-50"
                            style={{ background: `linear-gradient(to left, ${resolvedAccent}14, transparent)` }}
                        />

                        {/* Fine architectural grid, full canvas, tighter spacing on small screens */}
                        <div
                            className="absolute inset-0 pointer-events-none opacity-[0.06] sm:opacity-[0.07]"
                            style={{
                                backgroundImage: `linear-gradient(to right, ${tokens.gridLine} 1px, transparent 1px), linear-gradient(to bottom, ${tokens.gridLine} 1px, transparent 1px)`,
                                backgroundSize: '32px 32px',
                                maskImage: 'radial-gradient(ellipse 90% 90% at center, black 40%, transparent 95%)',
                            }}
                        />

                        {/* Floating dust particles across the full width, including the sides */}
                        <div className="absolute inset-0 pointer-events-none hidden xs:block">
                            {particles.map((p, i) => (
                                <motion.span
                                    key={i}
                                    className="absolute rounded-full"
                                    style={{
                                        left: `${p.left}%`,
                                        top: `${p.top}%`,
                                        width: p.size,
                                        height: p.size,
                                        background: resolvedAccent,
                                        boxShadow: `0 0 6px 1px ${resolvedAccent}`,
                                    }}
                                    animate={{ y: [0, -18, 0], opacity: [0, 0.7, 0] }}
                                    transition={{
                                        duration: p.duration,
                                        delay: p.delay,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                    }}
                                />
                            ))}
                        </div>

                        {/* Diagonal shimmer sweep across the entire screen */}
                        <motion.div
                            animate={{ x: ['-120%', '220%'] }}
                            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                            className="absolute inset-y-0 w-1/3 sm:w-1/4 pointer-events-none skew-x-12"
                            style={{ background: `linear-gradient(to right, transparent, ${resolvedAccent}0D, transparent)` }}
                        />

                        {/* Bottom horizon line — grounds the composition */}
                        <div
                            className="absolute bottom-0 inset-x-0 h-px pointer-events-none"
                            style={{ background: `linear-gradient(to right, transparent, ${resolvedAccent}55, transparent)` }}
                        />

                        {/* Radial vignette — subtle, theme-matched */}
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background: `radial-gradient(circle at center, transparent 35%, ${tokens.vignette} 100%)`,
                            }}
                        />

                        {/* ============================================================ */}
                        {/* CENTERPIECE — ring while loading, cinematic push-in on finish  */}
                        {/* Sizes scale across breakpoints: phones → tablets → desktop      */}
                        {/* ============================================================ */}
                        <div
                            className="relative z-10 flex flex-col items-center gap-6 sm:gap-8 px-6"
                            style={{
                                paddingTop: 'env(safe-area-inset-top, 0px)',
                                paddingBottom: 'env(safe-area-inset-bottom, 0px)',
                            }}
                        >
                            <motion.div
                                className="relative flex items-center justify-center w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40"
                                animate={
                                    phase === 'zoom'
                                        ? { scale: 6.5, opacity: [1, 1, 0] }
                                        : { scale: 1, opacity: 1 }
                                }
                                transition={
                                    phase === 'zoom'
                                        ? { duration: 0.9, times: [0, 0.55, 1], ease: [0.76, 0, 0.24, 1] }
                                        : { duration: 0.3 }
                                }
                            >
                                {/* Ambient glow behind ring */}
                                <motion.div
                                    animate={{ opacity: phase === 'zoom' ? 0 : [0.5, 0.8, 0.5] }}
                                    transition={{ duration: 3, repeat: phase === 'zoom' ? 0 : Infinity, ease: 'easeInOut' }}
                                    className="absolute inset-2 rounded-full blur-2xl"
                                    style={{ background: `radial-gradient(circle, ${resolvedAccent}55, transparent 70%)` }}
                                />

                                {/* Slow counter-rotating dashed ring, fades out on zoom */}
                                <motion.div
                                    animate={{ rotate: -360, opacity: phase === 'zoom' ? 0 : 1 }}
                                    transition={{
                                        rotate: { duration: 25, repeat: Infinity, ease: 'linear' },
                                        opacity: { duration: 0.3 },
                                    }}
                                    className="absolute inset-0 rounded-full border border-dashed"
                                    style={{ borderColor: tokens.dashedRing }}
                                />

                                {/* Progress ring */}
                                <motion.svg
                                    className="absolute inset-0 w-full h-full -rotate-90"
                                    viewBox="0 0 100 100"
                                    animate={{ opacity: phase === 'zoom' ? 0 : 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <circle cx="50" cy="50" r="44" stroke={tokens.ringTrack} strokeWidth="2" fill="none" />
                                    <motion.circle
                                        cx="50"
                                        cy="50"
                                        r="44"
                                        stroke="url(#preloader-gold-gradient)"
                                        strokeWidth="3"
                                        fill="none"
                                        strokeDasharray="276.46"
                                        initial={{ strokeDashoffset: 276.46 }}
                                        animate={{ strokeDashoffset: 276.46 - (276.46 * percentage) / 100 }}
                                        transition={{ duration: 0.3, ease: 'easeOut' }}
                                        strokeLinecap="round"
                                        style={{ filter: `drop-shadow(0 0 10px ${resolvedAccent}99)` }}
                                    />
                                    <defs>
                                        <linearGradient id="preloader-gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#805C33" />
                                            <stop offset="50%" stopColor={resolvedAccent} />
                                            <stop offset="100%" stopColor="#E5C396" />
                                        </linearGradient>
                                    </defs>
                                </motion.svg>

                                {/* Logo — theme-swapped, and what performs the cinematic "gets big" push */}
                                <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center p-2">
                                    <img
                                        src={logoAsset}
                                        alt="Associate Developer"
                                        className="max-h-full max-w-full object-contain"
                                        style={{ filter: `drop-shadow(0 0 16px ${resolvedAccent}80)` }}
                                    />
                                </div>
                            </motion.div>

                            {/* Typography — responsive sizing, theme-correct color, fades on zoom */}
                            <motion.div
                                animate={{ opacity: phase === 'zoom' ? 0 : 1, y: phase === 'zoom' ? 8 : 0 }}
                                transition={{ duration: 0.25 }}
                                className="flex flex-col items-center gap-2 sm:gap-2.5 text-center"
                            >
                                <span
                                    className="font-serif text-[10px] sm:text-sm tracking-[0.3em] sm:tracking-[0.35em] uppercase font-light"
                                    style={{ color: tokens.subtext }}
                                >
                                    Associate Developers
                                </span>
                                <div
                                    className="flex items-center gap-2 sm:gap-3 font-mono text-[10px] sm:text-xs"
                                    style={{ color: resolvedAccent }}
                                >
                                    <span
                                        className="h-px w-6 sm:w-8"
                                        style={{ background: `linear-gradient(to right, transparent, ${resolvedAccent}99)` }}
                                    />
                                    <span className="tracking-widest font-semibold">
                                        {String(percentage).padStart(3, '0')}%
                                    </span>
                                    <span
                                        className="h-px w-6 sm:w-8"
                                        style={{ background: `linear-gradient(to left, transparent, ${resolvedAccent}99)` }}
                                    />
                                </div>
                            </motion.div>
                        </div>

                        {/* Flash bloom timed with the push-in for a true "cinematic" pop */}
                        {phase === 'zoom' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 0.9, 0] }}
                                transition={{ duration: 0.9, times: [0, 0.55, 1], ease: 'easeInOut' }}
                                className="absolute inset-0 pointer-events-none"
                                style={{ background: `radial-gradient(circle, ${resolvedAccent}66, transparent 70%)` }}
                            />
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}