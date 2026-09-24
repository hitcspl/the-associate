import React from 'react';
import { Instagram, Facebook, Linkedin, ArrowUpRight } from 'lucide-react';

interface SiteFooterProps {
    dark?: boolean;
    onContact?: () => void;
}

export function SiteFooter({ dark, onContact }: SiteFooterProps) {
    const currentYear = new Date().getFullYear();

    const footerNavigation = {
        portfolio: [
            { name: 'Private Residences', href: '#properties' },
            { name: 'Penthouses & Villas', href: '#properties' },
            { name: 'Commercial Assets', href: '#services' },
            { name: 'Investment Funds', href: '#services' },
        ],
        firm: [
            { name: 'About Us', href: '#about' },
            { name: 'Global Advisory', href: '#services' },
            { name: 'Careers', href: '#' },
            { name: 'Private Consultation', href: '#contact' },
        ],
        governance: [
            { name: 'Privacy Policy', href: '#' },
            { name: 'Terms of Service', href: '#' },
            { name: 'Compliance & Ethics', href: '#' },
        ],
    };

    return (
        <footer className="w-full border-t border-stone-200/80 dark:border-stone-800/80 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors duration-300">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
                    
                    {/* Brand Column */}
                    <div className="space-y-5 lg:col-span-4">
                        <a
                            href="#home"
                            className="group inline-flex items-center"
                            aria-label="Associate — Back to home"
                        >
                            {typeof dark === 'boolean' ? (
                                /* Explicit JS Prop-based Rendering */
                                <img
                                    src={dark ? '/AssociatedeveloperFullLogoLight.png' : '/AssociatedeveloperFullLogo.png'}
                                    alt="Associate Realcon"
                                    className="h-auto w-auto max-w-[200px] sm:max-w-[220px] object-contain transition-transform duration-300 group-hover:scale-[1.01]"
                                />
                            ) : (
                                /* Automatic CSS Class-based Switcher (Tailwind dark: mode) */
                                <>
                                    <img
                                        src="/AssociatedeveloperFullLogo.png"
                                        alt="Associate Realcon"
                                        className="block dark:hidden h-auto w-auto max-w-[200px] sm:max-w-[220px] object-contain transition-transform duration-300 group-hover:scale-[1.01]"
                                    />
                                    <img
                                        src="/AssociatedeveloperFullLogoLight.png"
                                        alt="Associate Realcon"
                                        className="hidden dark:block h-auto w-auto max-w-[200px] sm:max-w-[220px] object-contain transition-transform duration-300 group-hover:scale-[1.01]"
                                    />
                                </>
                            )}
                        </a>

                        <p className="max-w-sm text-xs sm:text-sm leading-relaxed text-stone-600 dark:text-stone-400 font-normal">
                            Delivering bespoke real estate solutions and premier architectural estates across strategic global markets.
                        </p>

                        {/* Social Media Badges */}
                        <div className="flex items-center gap-2 pt-1">
                            {[
                                { icon: Instagram, label: 'Instagram', href: '#' },
                                { icon: Facebook, label: 'Facebook', href: '#' },
                                { icon: Linkedin, label: 'LinkedIn', href: '#' },
                            ].map(({ icon: Icon, label, href }) => (
                                <a
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    className="group flex h-9 w-9 items-center justify-center rounded-xl border border-stone-200 dark:border-stone-800 bg-white/60 dark:bg-stone-900/60 text-stone-600 dark:text-stone-400 shadow-sm transition-all duration-300 hover:border-[#A37B4C] hover:text-[#A37B4C] active:scale-95"
                                >
                                    <Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Columns Grid */}
                    <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-widest text-[#A37B4C]">
                                Portfolio
                            </h3>
                            <ul className="mt-4 space-y-2.5 text-xs sm:text-sm">
                                {footerNavigation.portfolio.map((item) => (
                                    <li key={item.name}>
                                        <a
                                            href={item.href}
                                            className="text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                                        >
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-widest text-[#A37B4C]">
                                Firm
                            </h3>
                            <ul className="mt-4 space-y-2.5 text-xs sm:text-sm">
                                {footerNavigation.firm.map((item) => (
                                    <li key={item.name}>
                                        <a
                                            href={item.href}
                                            onClick={(e) => {
                                                if (item.href === '#contact' && onContact) {
                                                    e.preventDefault();
                                                    onContact();
                                                }
                                            }}
                                            className="text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                                        >
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-widest text-[#A37B4C]">
                                Governance
                            </h3>
                            <ul className="mt-4 space-y-2.5 text-xs sm:text-sm">
                                {footerNavigation.governance.map((item) => (
                                    <li key={item.name}>
                                        <a
                                            href={item.href}
                                            className="text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                                        >
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="mt-14 border-t border-border/60 pt-8 flex flex-col gap-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                    <p className="tracking-wide">
                        © {currentYear} Associate Real Estate. All rights reserved.
                    </p>
                    
                    {/* Developer Credit */}
                    <p className="flex items-center gap-1.5 text-sm">
                        <span>Designed & Developed by</span>
                        <a
                            href="http://hitcs.in/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative inline-flex items-center gap-1 font-semibold text-foreground transition-colors hover:text-primary"
                        >
                            <span>HITCS</span>
                            <ArrowUpRight className="h-3 w-3 opacity-70 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                            <span className="absolute -bottom-0.5 left-0 h-px w-full bg-primary/40 transition-all group-hover:bg-primary" />
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}