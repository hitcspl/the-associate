import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState, type ReactNode } from 'react';

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
    theme?: PreloaderThemeMode;
    accent?: string;
    minDisplayTimeMs?: number;
};

const logoDark = '/AssociatedeveloperFullLogoLight.png';
const logoLight = '/AssociatedeveloperFullLogo.png';

const THEME_TOKENS: Record<
    PreloaderThemeMode,
    {
        bg: string;
        text: string;
        subtext: string;
        defaultAccent: string;
        ringTrack: string;
        logo: string;
    }
> = {
    dark: {
        bg: '#08080A',
        text: '#FAFAFA',
        subtext: '#71717A',
        defaultAccent: '#C5A059',
        ringTrack: 'rgba(255,255,255,0.06)',
        logo: logoDark,
    },
    light: {
        bg: '#F6F6F4',
        text: '#18181B',
        subtext: '#A1A1AA',
        defaultAccent: '#8A6238',
        ringTrack: 'rgba(24,24,27,0.06)',
        logo: logoLight,
    },
};

// Premium Cinematic Cubic Beziers
const LUXURY_EASING = [0.16, 1, 0.3, 1] as const;
const CINEMATIC_EXPAND_EASING = [0.85, 0, 0.15, 1] as const;

function getCriticalAssets(props: PreloadPageProps, logo: string): string[] {
    const properties = [
        ...(props.heroSlides ?? []),
        ...(props.properties ?? []),
    ];
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

export function SitePreloader({
    children,
    initialProps,
    theme = 'dark',
    accent,
    minDisplayTimeMs = 2200,
}: SitePreloaderProps) {
    const tokens = THEME_TOKENS[theme];
    const resolvedAccent = accent ?? tokens.defaultAccent;
    const logoAsset = tokens.logo;

    const prefersReducedMotion = useReducedMotion();

    const assets = useRef(getCriticalAssets(initialProps, logoAsset));
    const [loadedCount, setLoadedCount] = useState(0);
    const [phase, setPhase] = useState<
        'loading' | 'expand' | 'reveal' | 'done'
    >('loading');

    const rawPercentage = assets.current.length
        ? Math.round((loadedCount / assets.current.length) * 100)
        : 100;

    const [displayPercentage, setDisplayPercentage] = useState(0);

    // Parallel Asset Preloading
    useEffect(() => {
        let isActive = true;
        if (assets.current.length === 0) return;

        void Promise.all(
            assets.current.map((asset) =>
                loadImage(asset).finally(() => {
                    if (isActive) setLoadedCount((count) => count + 1);
                }),
            ),
        );

        return () => {
            isActive = false;
        };
    }, []);

    // Smooth Progress Interpolation & State Machine Handshake
    useEffect(() => {
        let animationFrameId: number;
        let transitionTimerId: ReturnType<typeof setTimeout>;
        const startTime = performance.now();
        let currentDisplay = 0;

        const updateProgress = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const timeProgress = Math.min(
                100,
                (elapsed / minDisplayTimeMs) * 100,
            );
            const target = Math.min(timeProgress, rawPercentage);

            if (currentDisplay < target) {
                currentDisplay += Math.max(
                    0.2,
                    (target - currentDisplay) * 0.18,
                );
                if (Math.abs(target - currentDisplay) < 0.15) {
                    currentDisplay = target;
                }
                setDisplayPercentage(Math.floor(currentDisplay));
            }

            if (
                elapsed < minDisplayTimeMs ||
                rawPercentage < 100 ||
                currentDisplay < 100
            ) {
                animationFrameId = requestAnimationFrame(updateProgress);
            } else {
                setDisplayPercentage(100);
                transitionTimerId = setTimeout(() => {
                    setPhase('expand');
                }, 150);
            }
        };

        animationFrameId = requestAnimationFrame(updateProgress);

        return () => {
            cancelAnimationFrame(animationFrameId);
            clearTimeout(transitionTimerId);
        };
    }, [rawPercentage, minDisplayTimeMs]);

    // Handle Orchestrated Transition Sequence (expand -> reveal -> done)
    useEffect(() => {
        if (phase === 'loading') return;

        let revealTimer: ReturnType<typeof setTimeout>;
        let doneTimer: ReturnType<typeof setTimeout>;

        if (phase === 'expand') {
            const expandDuration = prefersReducedMotion ? 400 : 1200;
            revealTimer = setTimeout(() => {
                setPhase('reveal');
            }, expandDuration);
        }

        if (phase === 'reveal') {
            const revealDuration = prefersReducedMotion ? 200 : 600;
            doneTimer = setTimeout(() => {
                setPhase('done');
            }, revealDuration);
        }

        return () => {
            clearTimeout(revealTimer);
            clearTimeout(doneTimer);
        };
    }, [phase, prefersReducedMotion]);

    const isComplete = phase === 'done';

    // Once the curtain is gone, drop the animated wrapper entirely.
    //
    // A lingering `filter`, `transform` or `will-change: transform|filter` on
    // an ancestor turns that ancestor into the containing block for
    // `position: fixed` descendants. Keeping this wrapper mounted after the
    // preloader finishes would therefore silently break `position: fixed`
    // for the site header (it would anchor to this block and scroll away with
    // the page). Rendering the children unwrapped restores viewport-fixed
    // positioning; at this point scale(1) / opacity(1) / blur(0px) are
    // no-ops, so nothing changes visually.
    if (isComplete) {
        return <>{children}</>;
    }

    return (
        <div className="relative w-full max-w-full overflow-x-hidden">
            {/* Direct Hero / Application Mount Layer Container */}
            <div className="relative w-full max-w-full overflow-hidden">
                <motion.div
                    className="relative w-full max-w-full"
                    initial={false}
                    animate={{
                        scale:
                            phase === 'loading'
                                ? 1.25
                                : phase === 'expand'
                                  ? 1.12
                                  : 1,
                        opacity: phase === 'loading' ? 0 : 1,
                        filter:
                            phase === 'loading' || phase === 'expand'
                                ? 'blur(4px)'
                                : 'blur(0px)',
                    }}
                    transition={{
                        scale: {
                            duration: prefersReducedMotion ? 0.3 : 1.8,
                            ease: LUXURY_EASING,
                        },
                        opacity: {
                            duration: prefersReducedMotion ? 0.3 : 1.2,
                            ease: 'linear',
                        },
                        filter: {
                            duration: prefersReducedMotion ? 0.3 : 1.2,
                            ease: LUXURY_EASING,
                        },
                    }}
                    style={{
                        willChange: 'transform, opacity, filter',
                        transformOrigin: 'center center',
                        pointerEvents: isComplete ? 'auto' : 'none',
                    }}
                >
                    {children}
                </motion.div>
            </div>

            {/* Orchestrated Overlay Layer */}
            <AnimatePresence>
                {!isComplete && (
                    <motion.div
                        key="site-preloader-curtain"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{
                            opacity: 0,
                            transition: {
                                duration: prefersReducedMotion ? 0.3 : 0.8,
                                ease: LUXURY_EASING,
                            },
                        }}
                        className="pointer-events-none fixed inset-0 z-[9999] flex w-screen max-w-full items-center justify-center overflow-hidden select-none"
                        style={{
                            background: tokens.bg,
                            color: tokens.text,
                            willChange: 'opacity',
                        }}
                        aria-label={`Loading site assets: ${displayPercentage}%`}
                        role="status"
                    >
                        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center overflow-hidden px-6">
                            {/* Logo and Scaled Stage Container */}
                            <motion.div
                                className="xs:w-36 xs:h-36 relative flex h-32 w-32 items-center justify-center sm:h-48 sm:w-48"
                                animate={
                                    phase === 'expand' || phase === 'reveal'
                                        ? {
                                              scale: prefersReducedMotion
                                                  ? 1.1
                                                  : [1, 2.4, 3.6],
                                              opacity: prefersReducedMotion
                                                  ? [1, 0]
                                                  : [1, 0.9, 0],
                                          }
                                        : { scale: 1, opacity: 1 }
                                }
                                transition={
                                    phase === 'expand' || phase === 'reveal'
                                        ? {
                                              duration: prefersReducedMotion
                                                  ? 0.4
                                                  : 1.6,
                                              times: [0, 0.55, 1],
                                              ease: CINEMATIC_EXPAND_EASING,
                                          }
                                        : undefined
                                }
                                style={{
                                    transformOrigin: 'center center',
                                    willChange: 'transform, opacity',
                                }}
                            >
                                {/* Progress Ring SVG */}
                                <motion.svg
                                    className="pointer-events-none absolute inset-0 h-full w-full -rotate-90"
                                    viewBox="0 0 100 100"
                                    animate={{
                                        opacity: phase !== 'loading' ? 0 : 1,
                                    }}
                                    transition={{
                                        duration: 0.35,
                                        ease: 'easeOut',
                                    }}
                                >
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="44"
                                        stroke={tokens.ringTrack}
                                        strokeWidth="1"
                                        fill="none"
                                    />
                                    <motion.circle
                                        cx="50"
                                        cy="50"
                                        r="44"
                                        stroke={resolvedAccent}
                                        strokeWidth="1.25"
                                        fill="none"
                                        strokeDasharray="276.46"
                                        strokeDashoffset={
                                            276.46 -
                                            (276.46 * displayPercentage) / 100
                                        }
                                        transition={{
                                            duration: 0.1,
                                            ease: 'linear',
                                        }}
                                        strokeLinecap="round"
                                        style={{ opacity: 0.85 }}
                                    />
                                </motion.svg>

                                {/* Center Brand Mark */}
                                <div className="xs:w-24 xs:h-24 relative flex h-20 w-20 items-center justify-center p-2 sm:h-28 sm:w-28">
                                    <img
                                        src={logoAsset}
                                        alt="Associate Developer"
                                        className="max-h-full max-w-full scale-110 transform-gpu object-contain"
                                    />
                                </div>
                            </motion.div>

                            {/* Minimal Status Typography */}
                            <motion.div
                                animate={{
                                    opacity: phase !== 'loading' ? 0 : 1,
                                    y: phase !== 'loading' ? 12 : 0,
                                }}
                                transition={{
                                    duration: phase !== 'loading' ? 0.35 : 0.5,
                                    ease: LUXURY_EASING,
                                }}
                                className="pointer-events-none absolute bottom-12 flex flex-col items-center gap-2 text-center sm:bottom-20"
                            >
                                <span
                                    className="text-[10px] font-medium tracking-[0.28em] uppercase opacity-80 sm:text-[11px]"
                                    style={{ color: tokens.subtext }}
                                >
                                    Associate Developers
                                </span>

                                <div
                                    className="flex items-center gap-0.5 font-mono text-xs font-medium tracking-widest"
                                    style={{ color: resolvedAccent }}
                                >
                                    <span className="w-8 text-right opacity-90">
                                        {String(displayPercentage).padStart(
                                            3,
                                            '0',
                                        )}
                                    </span>
                                    <span className="opacity-70">%</span>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
