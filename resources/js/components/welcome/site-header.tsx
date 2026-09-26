import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Menu, Moon, Search, Sun, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/providers/theme-provider';
import { dashboard } from '@/routes';

type SiteHeaderProps = {
    authenticated: boolean;
    mobileOpen: boolean;
    onContact: () => void;
    onMobileToggle: () => void;
};

// Pixels of scroll from the top before the header switches to its "scrolled" style.
const SCROLLED_THRESHOLD = 15;
// How long the page must be completely idle before a hidden navbar reappears.
const REVEAL_ON_IDLE_MS = 400;

// --- Hide / reveal motion -------------------------------------------------
// The one and only element that carries the navbar's background, blur, shadow
// and transform is the outermost <header> itself, so sliding it out of the
// viewport takes every painted part of the navbar with it. Nothing can be
// left behind, because there is no second wrapper to hold a surface.
//
// `transform` is the only property a scroll ever animates, with its own timing
// and easing; the surface/theme transitions are listed separately so they keep
// their own 300ms timing. Height and padding are never animated, so the
// -100% translate target is always the element's true, stable height and the
// bar can never drop, settle or snap.
const HIDE_MS = 260;
const REVEAL_MS = 420;
const HIDE_EASE = 'cubic-bezier(0.4, 0, 1, 1)';
const REVEAL_EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';
const SURFACE_TRANSITION = `background-color 300ms ease-out, background-image 300ms ease-out, box-shadow 300ms ease-out, backdrop-filter 300ms ease-out`;

// Logo variants: the light wordmark is for dark surfaces, the dark one for light.
const LOGO_ON_DARK = '/AssociatedeveloperFullLogoLight.png';
const LOGO_ON_LIGHT = '/AssociatedeveloperFullLogo.png';

export function SiteHeader({
    authenticated,
    mobileOpen,
    onContact,
    onMobileToggle,
}: SiteHeaderProps) {
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [activeTab, setActiveTab] = useState('#home');
    const { theme, setTheme } = useTheme();

    // Ref mirrors of the state the scroll handler reads, so the single listener
    // registered below never needs to re-bind and per-frame work never causes
    // a render. State only flips when `hidden`/`scrolled` actually change.
    const menuOpenRef = useRef(mobileOpen);
    const hiddenRef = useRef(false);
    const scrolledRef = useRef(false);

    const reveal = useCallback(() => {
        if (!hiddenRef.current) return;
        hiddenRef.current = false;
        setHidden(false);
    }, []);

    // The mobile sheet is anchored to the navbar, so it must never hide.
    useEffect(() => {
        menuOpenRef.current = mobileOpen;
        if (mobileOpen) reveal();
    }, [mobileOpen, reveal]);

    useEffect(() => {
        // --- The real scrolling element -------------------------------------
        // This page is scrolled by the viewport, so the authoritative position
        // is `document.scrollingElement.scrollTop` (identical to window.scrollY
        // in standards mode). It is deliberately NOT read from document.body
        // or from any wrapper: the preloader's wrapper computes to
        // `overflow-y: auto` and the property carousel is `overflow-x: auto`,
        // and `body` is forced to `overflow: hidden` while a modal is open, so
        // all of those report a permanent scrollTop of 0.
        const scroller = () =>
            document.scrollingElement ?? document.documentElement;

        const readScrollTop = () => scroller().scrollTop;

        let lastTop = readScrollTop();
        let frame = 0;
        let idleTimer: number | undefined;

        const clearIdleTimer = () => {
            if (idleTimer !== undefined) {
                window.clearTimeout(idleTimer);
                idleTimer = undefined;
            }
        };

        // "Scrolling completely stopped" -> bring the navbar back on its own.
        // Re-armed on every scroll event, so it only fires once the page has
        // genuinely been idle (this also covers touch/momentum scrolling,
        // where events arrive in bursts).
        const armIdleReveal = () => {
            clearIdleTimer();
            idleTimer = window.setTimeout(() => {
                idleTimer = undefined;
                if (!menuOpenRef.current) reveal();
            }, REVEAL_ON_IDLE_MS);
        };

        const evaluate = () => {
            frame = 0;

            // Clamp negatives: iOS/Android rubber-banding at the top reports
            // positions above 0 and must never be read as "scrolling up".
            const top = Math.max(0, readScrollTop());
            // Rounded to whole pixels: real movement is always >= 1px, while
            // sub-pixel fractional noise rounds to 0 and is ignored.
            const delta = Math.round(top - lastTop);
            lastTop = top;

            // --- "Scrolled" glass surface, independent of hide/show ---
            const shouldBeScrolled = top > SCROLLED_THRESHOLD;
            if (shouldBeScrolled !== scrolledRef.current) {
                scrolledRef.current = shouldBeScrolled;
                setScrolled(shouldBeScrolled);
            }

            // --- Mobile menu open, or sitting exactly at the top: always show ---
            if (menuOpenRef.current || top === 0) {
                clearIdleTimer();
                reveal();
                return;
            }

            if (delta === 0) return;

            if (delta < 0) {
                // Scrolling up: come back immediately, stop the idle timer.
                clearIdleTimer();
                reveal();
                return;
            }

            // Scrolling down: hide.
            if (!hiddenRef.current) {
                hiddenRef.current = true;
                setHidden(true);
            }
            armIdleReveal();
        };

        // requestAnimationFrame is used purely to coalesce bursts of scroll
        // events into one evaluation per frame; detection itself is driven by
        // the real scroll positions above.
        const handleScroll = (event: Event) => {
            // Only document scrolling drives the header. Scroll events from
            // nested scrollers (the horizontal property carousel) do not bubble
            // to the viewport, and must not be read as page movement.
            if (event.target !== document && event.target !== window) return;

            armIdleReveal();

            if (frame) return;
            frame = window.requestAnimationFrame(evaluate);
        };

        // Mounting already scrolled (anchor link, restored scroll position).
        const initialTop = Math.max(0, readScrollTop());
        lastTop = initialTop;
        scrolledRef.current = initialTop > SCROLLED_THRESHOLD;
        setScrolled(scrolledRef.current);

        // Capture phase so the listener also observes the event if an inner
        // element ever becomes the vertical scroller. Passive: never blocks
        // scrolling, which is what keeps wheel/touchpad/touch momentum smooth.
        window.addEventListener('scroll', handleScroll, {
            capture: true,
            passive: true,
        });
        // Resizes change the layout and the current position without a scroll
        // event (e.g. mobile browser chrome collapsing).
        window.addEventListener('resize', handleScroll, { passive: true });

        return () => {
            clearIdleTimer();
            if (frame) window.cancelAnimationFrame(frame);
            window.removeEventListener('scroll', handleScroll, true);
            window.removeEventListener('resize', handleScroll);
        };
    }, [reveal]);

    const links = [
        ['Home', '#home'],
        ['About', '#about'],
        ['Properties', '#properties'],
        ['Services', '#services'],
        ['Contact', '#contact'],
    ];

    // Over the hero the bar keeps its dark scrim, because the hero artwork is
    // always dark in both themes. Once it becomes a floating glass bar it
    // follows the active theme, and the content tone flips with it so text and
    // icons stay readable in light mode.
    const onGlass = scrolled;

    // Both surfaces are gradients so the top -> glass cross-fade interpolates
    // instead of hard-switching between a gradient and a flat colour.
    //
    // The glass state is deliberately translucent: roughly 60% white in light
    // mode and 55% black in dark mode, with a strong backdrop blur and a mild
    // backdrop saturation so the imagery behind softly reads through instead of
    // the bar reading as a frosted slab. The hairline edge is an inset shadow
    // rather than a real border, so it adds no height and no layout shift, and
    // it fades with the rest of the surface because box-shadow is transitioned.
    const surfaceTone = onGlass
        ? 'bg-gradient-to-b from-white/65 via-white/60 to-white/55 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_8px_24px_rgba(15,15,15,0.06),inset_0_-1px_0_rgba(15,15,15,0.07)] dark:from-black/60 dark:via-black/55 dark:to-black/50 dark:backdrop-blur-2xl dark:backdrop-saturate-150 dark:shadow-[0_8px_24px_rgba(0,0,0,0.28),inset_0_-1px_0_rgba(255,255,255,0.08)]'
        : 'bg-gradient-to-b from-black/90 via-black/40 to-transparent';

    const navLinkTone = onGlass
        ? 'text-stone-600 hover:text-stone-900 dark:text-stone-200 dark:hover:text-white'
        : 'text-stone-200 hover:text-white';

    const navPillTone = onGlass
        ? 'border-black/10 bg-white/60 dark:border-white/10 dark:bg-black/40'
        : 'border-white/10 bg-black/40';

    const iconButtonTone = onGlass
        ? 'border-black/10 bg-white/70 text-stone-700 shadow-sm backdrop-blur-md hover:bg-white dark:border-white/10 dark:bg-black/40 dark:text-white dark:hover:bg-black/60'
        : 'border-white/10 bg-black/40 text-white shadow-sm backdrop-blur-md hover:bg-black/60';

    const searchButtonTone = onGlass
        ? 'border-black/10 bg-white/70 text-stone-700 shadow-sm backdrop-blur-md hover:bg-white dark:border-white/10 dark:bg-black/40 dark:text-white dark:hover:bg-black/60'
        : 'border-white/10 bg-black/40 text-white shadow-sm backdrop-blur-md hover:bg-black/60';

    const sunTone = onGlass
        ? 'h-4.5 w-4.5 text-amber-500 dark:text-amber-400'
        : 'h-4.5 w-4.5 text-amber-400';

    const moonTone = onGlass
        ? 'h-4.5 w-4.5 text-stone-700 dark:text-stone-200'
        : 'h-4.5 w-4.5 text-stone-200';

    const menuToggleTone = onGlass
        ? 'border-black/10 bg-white/70 text-stone-700 backdrop-blur-md dark:border-white/10 dark:bg-black/50 dark:text-white'
        : 'border-white/10 bg-black/50 text-white backdrop-blur-md';

    const sheetTone = onGlass
        ? 'border-black/10 bg-white/95 text-stone-800 dark:border-white/10 dark:bg-neutral-900/95 dark:text-stone-100'
        : 'border-white/10 bg-neutral-900/95';

    const sheetDividerTone = onGlass
        ? 'border-black/10 dark:border-white/10'
        : 'border-white/10';

    const sheetLinkTone = onGlass
        ? 'text-stone-700 hover:bg-black/5 dark:text-stone-200 dark:hover:bg-white/10'
        : 'text-stone-200 hover:bg-white/10';

    const sheetActiveTone = onGlass
        ? 'border border-[#A37B4C]/30 bg-[#A37B4C]/20 font-semibold text-amber-700 dark:text-amber-300'
        : 'border border-[#A37B4C]/30 bg-[#A37B4C]/20 font-semibold text-amber-300';

    const logoSrc = onGlass && theme === 'light' ? LOGO_ON_LIGHT : LOGO_ON_DARK;

    return (
        // The single outermost element owns the background, blur, shadow AND the
        // hide/reveal transform, so nothing is ever left behind at the top.
        <header
            className={`fixed top-0 right-0 left-0 z-50 ${surfaceTone} ${
                onGlass ? 'py-1' : 'py-2.5'
            }`}
            style={{
                transform: hidden
                    ? 'translate3d(0, -100%, 0)'
                    : 'translate3d(0, 0, 0)',
                transition: `transform ${
                    hidden ? HIDE_MS : REVEAL_MS
                }ms ${hidden ? HIDE_EASE : REVEAL_EASE}, ${SURFACE_TRANSITION}`,
                willChange: 'transform',
                backfaceVisibility: 'hidden',
            }}
        >
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-6 lg:px-8">
                {/* Brand Logo Container */}
                <a
                    href="#home"
                    className="group flex min-w-0 shrink-0 items-center transition-transform active:scale-95"
                    aria-label="Associate — Home"
                >
                    {/* Mobile View (< lg) -> Big standalone logo.png */}
                    <div className="flex items-center lg:hidden">
                        <img
                            src={logoSrc}
                            alt="Associate Logo"
                            className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105 sm:h-14"
                        />
                    </div>

                    {/* Desktop View (>= lg) -> Prominent, clear full logo */}
                    <div className="hidden items-center lg:flex">
                        <img
                            src={logoSrc}
                            alt="Associate Developer"
                            className="h-10 max-h-15 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02] lg:h-12 xl:h-14"
                        />
                    </div>
                </a>

                {/* Desktop Navigation Links */}
                <nav
                    className={`hidden items-center gap-1 rounded-full border p-1.5 shadow-inner backdrop-blur-md lg:flex ${navPillTone}`}
                >
                    {links.map(([label, href]) => {
                        const isActive = activeTab === href;
                        return (
                            <a
                                key={href}
                                href={href}
                                onClick={(event) => {
                                    setActiveTab(href);
                                    if (href === '#contact') {
                                        event.preventDefault();
                                        onContact();
                                    }
                                }}
                                className={`relative rounded-full px-5 py-2 text-sm font-medium transition-colors select-none ${navLinkTone}`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="active-pill"
                                        className="absolute inset-0 rounded-full bg-[#A37B4C] shadow-sm shadow-[#A37B4C]/40"
                                        transition={{
                                            type: 'spring',
                                            stiffness: 380,
                                            damping: 30,
                                        }}
                                    />
                                )}
                                <span
                                    className={`relative z-10 ${
                                        isActive
                                            ? 'font-semibold text-white'
                                            : ''
                                    }`}
                                >
                                    {label}
                                </span>
                            </a>
                        );
                    })}
                </nav>

                {/* Action Buttons */}
                <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                    {/* Theme Toggle */}
                    <button
                        onClick={() =>
                            setTheme(theme === 'dark' ? 'light' : 'dark')
                        }
                        aria-label="Toggle theme"
                        className={`flex h-10 w-10 items-center justify-center rounded-full transition-all hover:scale-105 active:scale-95 ${iconButtonTone}`}
                    >
                        {theme === 'dark' ? (
                            <Sun className={sunTone} />
                        ) : (
                            <Moon className={moonTone} />
                        )}
                    </button>

                    {/* Search Button (Hidden on Mobile) */}
                    <a
                        href="#search-section"
                        aria-label="Search properties"
                        className={`hidden h-10 w-10 items-center justify-center rounded-full transition-all hover:scale-105 active:scale-95 sm:flex ${searchButtonTone}`}
                    >
                        <Search className="h-4.5 w-4.5" />
                    </a>

                    {/* Primary CTA (Desktop Only) */}
                    {authenticated ? (
                        <Link href={dashboard()} className="hidden lg:block">
                            <Button
                                size="sm"
                                className="h-11 rounded-full bg-[#A37B4C] px-6 text-sm font-semibold text-white shadow-md transition-all hover:scale-105 hover:bg-[#B88C57]"
                            >
                                Dashboard
                            </Button>
                        </Link>
                    ) : (
                        <div className="hidden items-center gap-2.5 lg:flex">
                            <Button
                                onClick={() => {
                                    setActiveTab('#contact');
                                    onContact();
                                }}
                                className="flex h-9 cursor-pointer items-center justify-center gap-1.5 rounded-full bg-[#A37B4C] px-10 text-xs font-medium text-white shadow-md transition-all hover:scale-102 hover:bg-[#B88C57] active:scale-95 sm:text-sm"
                            >
                                <span>Get In Touch</span>
                                <ArrowRight className="h-3.5 w-3.5" />
                            </Button>
                        </div>
                    )}

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={onMobileToggle}
                        className={`flex h-10 w-10 items-center justify-center rounded-full transition-all active:scale-95 lg:hidden ${menuToggleTone}`}
                        aria-label="Toggle mobile menu"
                    >
                        {mobileOpen ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Sheet */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className={`mx-4 mb-4 overflow-hidden rounded-2xl border p-5 shadow-2xl backdrop-blur-xl lg:hidden ${sheetTone}`}
                    >
                        <nav className="flex flex-col space-y-1.5">
                            {links.map(([label, href]) => {
                                const isActive = activeTab === href;
                                return (
                                    <a
                                        key={href}
                                        href={href}
                                        onClick={(event) => {
                                            setActiveTab(href);
                                            if (href === '#contact') {
                                                event.preventDefault();
                                                onContact();
                                            }
                                            onMobileToggle();
                                        }}
                                        className={`rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                                            isActive
                                                ? sheetActiveTone
                                                : sheetLinkTone
                                        }`}
                                    >
                                        {label}
                                    </a>
                                );
                            })}
                        </nav>

                        <div
                            className={`mt-5 flex flex-col gap-2.5 border-t pt-4 ${sheetDividerTone}`}
                        >
                            <Button
                                onClick={() => {
                                    onMobileToggle();
                                    onContact();
                                }}
                                className="w-full rounded-xl bg-[#A37B4C] py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#B88C57] active:scale-98"
                            >
                                Get In Touch
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
