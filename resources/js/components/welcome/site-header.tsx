import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Menu, Moon, Search, Sun, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { dashboard, login } from '@/routes';

type SiteHeaderProps = {
    authenticated: boolean;
    dark: boolean;
    mobileOpen: boolean;
    onContact: () => void;
    onMobileToggle: () => void;
    onThemeToggle: () => void;
};

export function SiteHeader({
    authenticated,
    dark,
    mobileOpen,
    onContact,
    onMobileToggle,
    onThemeToggle,
}: SiteHeaderProps) {
    const [scrolled, setScrolled] = useState(false);
    const [activeTab, setActiveTab] = useState('#home');

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
        ['Properties', '#properties'],
        ['About', '#about'],
        ['Services', '#services'],
        ['Contact', '#contact'],
    ];

    return (
        <header
            className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ease-out ${
                scrolled
                    ? 'bg-neutral-950/85 shadow-md shadow-black/20 backdrop-blur-xl'
                    : 'bg-gradient-to-b from-black/80 via-black/30 to-transparent'
            }`}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3">
                
                {/* Brand Logo */}
                <a
                    href="#home"
                    className="group flex items-center gap-2.5 sm:gap-3 shrink-0 min-w-0 transition-transform active:scale-95"
                >
                    <div className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-[#A37B4C] text-white shadow-md shadow-[#A37B4C]/20 transition-all group-hover:scale-105 group-hover:bg-[#B88C57]">
                        <span className="text-sm sm:text-base font-bold">△</span>
                    </div>
                    <span className="font-serif text-lg sm:text-xl lg:text-2xl font-semibold tracking-tight text-white truncate">
                        associate
                    </span>
                </a>

                {/* Desktop Navigation Links */}
                <nav className="hidden lg:flex items-center gap-1 rounded-full p-1.5 backdrop-blur-md bg-black/40 border border-white/10 shadow-sm">
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
                                className="relative rounded-full px-4 py-1.5 text-xs font-medium text-stone-200 hover:text-white transition-colors select-none"
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="active-pill"
                                        className="absolute inset-0 rounded-full bg-[#A37B4C] shadow-sm shadow-[#A37B4C]/30"
                                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                    />
                                )}
                                <span className={`relative z-10 ${isActive ? 'text-white font-semibold' : ''}`}>
                                    {label}
                                </span>
                            </a>
                        );
                    })}
                </nav>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                    
                    {/* Theme Toggle */}
                    <button
                        onClick={onThemeToggle}
                        aria-label="Toggle theme"
                        className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white shadow-sm backdrop-blur-md transition-all hover:scale-105 active:scale-95 hover:bg-black/60"
                    >
                        {dark ? (
                            <Sun className="h-4 w-4 text-amber-400" />
                        ) : (
                            <Moon className="h-4 w-4 text-stone-200" />
                        )}
                    </button>

                    {/* Search Button (Hidden on Mobile) */}
                    <a
                        href="#search-section"
                        aria-label="Search properties"
                        className="hidden sm:flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white shadow-sm backdrop-blur-md transition-all hover:scale-105 active:scale-95 hover:bg-black/60"
                    >
                        <Search className="h-4 w-4" />
                    </a>

                    {/* Primary CTA (Desktop Only) */}
                    {authenticated ? (
                        <Link href={dashboard()} className="hidden lg:block">
                            <Button
                                size="sm"
                                className="bg-[#A37B4C] hover:bg-[#B88C57] text-white rounded-full px-5 h-10 text-xs font-semibold transition-all hover:scale-105"
                            >
                                Dashboard
                            </Button>
                        </Link>
                    ) : (
                        <div className="hidden lg:flex items-center gap-2">
                            <Link
                                href={login()}
                                className="rounded-full px-4 py-2 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md transition-all"
                            >
                                Log In
                            </Link>

                            <Button
                                onClick={() => {
                                    setActiveTab('#contact');
                                    onContact();
                                }}
                                size="sm"
                                className="bg-[#A37B4C] hover:bg-[#B88C57] text-white flex items-center justify-center gap-1.5 rounded-full h-10 px-5 text-xs font-semibold shadow-md transition-all active:scale-95"
                            >
                                <span>Get In Touch</span>
                                <ArrowRight className="h-3.5 w-3.5" />
                            </Button>
                        </div>
                    )}

                    {/* Mobile Menu Toggle Toggle */}
                    <button
                        onClick={onMobileToggle}
                        className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white backdrop-blur-md transition-all active:scale-95 lg:hidden"
                        aria-label="Toggle mobile menu"
                    >
                        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
                        className="mx-4 mb-4 rounded-2xl border border-white/10 bg-neutral-900/95 p-4 shadow-2xl backdrop-blur-xl lg:hidden overflow-hidden"
                    >
                        <nav className="flex flex-col space-y-1">
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
                                        className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                                            isActive
                                                ? 'bg-[#A37B4C]/20 text-amber-300 font-semibold border border-[#A37B4C]/30'
                                                : 'text-stone-200 hover:bg-white/10'
                                        }`}
                                    >
                                        {label}
                                    </a>
                                );
                            })}
                        </nav>

                        <div className="mt-4 border-t border-white/10 pt-3 flex flex-col gap-2">
                            {!authenticated && (
                                <Link
                                    href={login()}
                                    onClick={onMobileToggle}
                                    className="w-full text-center rounded-xl py-2.5 text-sm font-semibold text-stone-200 border border-white/10 bg-white/5 hover:bg-white/10"
                                >
                                    Log In
                                </Link>
                            )}
                            <Button
                                onClick={() => {
                                    onMobileToggle();
                                    onContact();
                                }}
                                className="bg-[#A37B4C] hover:bg-[#B88C57] text-white w-full rounded-xl py-3 text-xs font-semibold shadow-md active:scale-98"
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