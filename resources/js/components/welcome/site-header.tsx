import React, { useState, useEffect } from 'react';
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

export function SiteHeader({
    authenticated,
    mobileOpen,
    onContact,
    onMobileToggle,
}: SiteHeaderProps) {
    const [scrolled, setScrolled] = useState(false);
    const [activeTab, setActiveTab] = useState('#home');
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 15);
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const links = [
        ['Home', '#home'],
        ['About', '#about'],
        ['Properties', '#properties'],
        ['Services', '#services'],
        ['Contact', '#contact'],
    ];

    return (
        <header
            className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ease-out ${
                scrolled
                    ? 'bg-neutral-950/90 py-1 shadow-lg shadow-black/20 backdrop-blur-xl'
                    : 'bg-gradient-to-b from-black/90 via-black/40 to-transparent py-2.5'
            }`}
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
                            src="/AssociatedeveloperFullLogoLight.png"
                            alt="Associate Logo"
                            className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105 sm:h-14"
                        />
                    </div>

                    {/* Desktop View (>= lg) -> Prominent, clear full logo */}
                    <div className="hidden items-center lg:flex">
                        <img
                            src="/AssociatedeveloperFullLogoLight.png"
                            alt="Associate Developer"
                            className="h-10 max-h-15 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02] lg:h-12 xl:h-14"
                        />
                    </div>
                </a>

                {/* Desktop Navigation Links */}
                <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-black/40 p-1.5 shadow-inner backdrop-blur-md lg:flex">
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
                                className="relative rounded-full px-5 py-2 text-sm font-medium text-stone-200 transition-colors select-none hover:text-white"
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
                                    className={`relative z-10 ${isActive ? 'font-semibold text-white' : ''}`}
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
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white shadow-sm backdrop-blur-md transition-all hover:scale-105 hover:bg-black/60 active:scale-95"
                    >
                        {theme === 'dark' ? (
                            <Sun className="h-4.5 w-4.5 text-amber-400" />
                        ) : (
                            <Moon className="h-4.5 w-4.5 text-stone-200" />
                        )}
                    </button>

                    {/* Search Button (Hidden on Mobile) */}
                    <a
                        href="#search-section"
                        aria-label="Search properties"
                        className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white shadow-sm backdrop-blur-md transition-all hover:scale-105 hover:bg-black/60 active:scale-95 sm:flex"
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
                            {/* <Link
                                href={login()}
                                className="rounded-full px-5 py-2.5 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md transition-all"
                            >
                                Log In
                            </Link> */}

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
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white backdrop-blur-md transition-all active:scale-95 lg:hidden"
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
                        className="mx-4 mb-4 overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/95 p-5 shadow-2xl backdrop-blur-xl lg:hidden"
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
                                                ? 'border border-[#A37B4C]/30 bg-[#A37B4C]/20 font-semibold text-amber-300'
                                                : 'text-stone-200 hover:bg-white/10'
                                        }`}
                                    >
                                        {label}
                                    </a>
                                );
                            })}
                        </nav>

                        <div className="mt-5 flex flex-col gap-2.5 border-t border-white/10 pt-4">
                            {/* {!authenticated && (
                                <Link
                                    href={login()}
                                    onClick={onMobileToggle}
                                    className="w-full text-center rounded-xl py-3 text-sm font-semibold text-stone-200 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
                                >
                                    Log In
                                </Link>
                            )} */}
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
