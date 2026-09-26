import { ArrowUpRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import type { ServiceItem } from '@/types/property';

// Custom SVG Illustrations for Architectural Real Estate Context
function EstateVector({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            {/* Main Villa Structure */}
            <path d="M8 48V28L32 12L56 28V48C56 50.2091 54.2091 52 52 52H12C9.79086 52 8 50.2091 8 48Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            {/* Gabled Roofline Highlight */}
            <path d="M4 30L32 11L60 30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            {/* Entrance Door */}
            <path d="M26 52V36C26 34.3431 27.3431 33 29 33H35C36.6569 33 38 34.3431 38 36V52" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            {/* Architectural Windows */}
            <rect x="16" y="32" width="6" height="8" rx="1" stroke="currentColor" strokeWidth="1.8"/>
            <rect x="42" y="32" width="6" height="8" rx="1" stroke="currentColor" strokeWidth="1.8"/>
            <circle cx="32" cy="22" r="3.5" stroke="currentColor" strokeWidth="1.8"/>
        </svg>
    );
}

function HighriseVector({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            {/* Main Skyscraper */}
            <rect x="14" y="12" width="22" height="42" rx="2" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
            <rect x="36" y="24" width="16" height="30" rx="2" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
            {/* Window Grid Lines */}
            <line x1="20" y1="20" x2="24" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="26" y1="20" x2="30" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="20" y1="28" x2="24" y2="28" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="26" y1="28" x2="30" y2="28" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="20" y1="36" x2="24" y2="36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="26" y1="36" x2="30" y2="36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            {/* Secondary Building Windows */}
            <line x1="42" y1="32" x2="46" y2="32" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="42" y1="40" x2="46" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
    );
}

function KeycardVector({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <rect x="10" y="16" width="44" height="32" rx="4" stroke="currentColor" strokeWidth="2.2"/>
            <path d="M10 26H54" stroke="currentColor" strokeWidth="1.8"/>
            <circle cx="20" cy="36" r="3" stroke="currentColor" strokeWidth="1.8"/>
            <line x1="28" y1="36" x2="44" y2="36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
    );
}

function ManagementVector({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M12 48L24 36L34 44L52 22" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M42 22H52V32" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="10" y="50" width="44" height="2" rx="1" fill="currentColor"/>
        </svg>
    );
}

// Vector Mapping based on service index / type
const vectorArtwork = [EstateVector, HighriseVector, KeycardVector, ManagementVector];

function ServiceCard({ service, index }: { service: ServiceItem; index: number }) {
    const [pointer, setPointer] = useState({ x: 0, y: 0 });
    const SVGArt = vectorArtwork[index % vectorArtwork.length];
    const isPrimary = index === 0;

    return (
        <motion.article
            onMouseMove={(event) => {
                const bounds = event.currentTarget.getBoundingClientRect();
                setPointer({ x: event.clientX - bounds.left, y: event.clientY - bounds.top });
            }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={`group relative overflow-hidden rounded-3xl border border-border/70 bg-card/70 backdrop-blur-md p-5 sm:p-7 transition-all duration-300 hover:border-gold/60 hover:shadow-xl hover:shadow-gold/5 ${
                isPrimary
                    ? 'lg:col-span-2 lg:row-span-2 lg:p-9'
                    : 'lg:col-span-1'
            }`}
        >
            {/* Interactive Dynamic Backlight Glow */}
            <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(350px circle at ${pointer.x}px ${pointer.y}px, color-mix(in srgb, var(--gold, #d4af37) 12%, transparent), transparent 75%)`,
                }}
            />

            {/* Subtle Building Silhouette Background Decorative Accent */}
            <div className="pointer-events-none absolute -right-6 -bottom-6 text-foreground/[0.03] transition-all duration-500 group-hover:text-gold/10 group-hover:scale-110">
                <SVGArt className={isPrimary ? 'h-64 w-64' : 'h-36 w-36'} />
            </div>

            <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                    {/* Top Row: SVG Art & Direct Link Indicator */}
                    <div className="flex items-start justify-between mb-5 sm:mb-8">
                        <div
                            className={`relative flex items-center justify-center rounded-2xl bg-gold/10 text-gold transition-all duration-300 group-hover:bg-gold group-hover:text-black group-hover:scale-105 ${
                                isPrimary ? 'p-3.5 sm:p-4' : 'p-3'
                            }`}
                        >
                            <SVGArt className={isPrimary ? 'h-8 w-8 sm:h-10 sm:w-10' : 'h-6 w-6 sm:h-7 sm:w-7'} />
                        </div>

                        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-border/80 text-muted-foreground transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-black group-hover:rotate-45">
                            <ArrowUpRight className="h-4 w-4" />
                        </div>
                    </div>

                    {/* Service Title */}
                    <h3
                        className={`font-display font-medium text-foreground transition-colors group-hover:text-gold ${
                            isPrimary
                                ? 'text-xl sm:text-3xl lg:text-4xl'
                                : 'text-lg sm:text-xl'
                        }`}
                    >
                        {service.title}
                    </h3>

                    {/* Subtle Architectural Divider */}
                    <div className="my-3 h-0.5 w-8 bg-gold/40 transition-all duration-300 group-hover:w-14 group-hover:bg-gold" />

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {service.description}
                    </p>
                </div>

                {/* Primary Card Bottom Feature Badge */}
                {isPrimary && (
                    <div className="mt-8 pt-6 border-t border-border/50 hidden sm:flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gold">
                            <Sparkles className="h-4 w-4" />
                            <span>Bespoke Real Estate Portfolio</span>
                        </div>
                        <span className="text-xs font-mono text-muted-foreground">01 / ESTATES</span>
                    </div>
                )}
            </div>
        </motion.article>
    );
}

export function ServicesSection({ services }: { services: ServiceItem[] }) {
    return (
        <section id="services" className="relative py-14 sm:py-20 lg:py-28 overflow-hidden bg-background">
            {/* Background Ambient Spotlights (No grid lines) */}
            <div className="pointer-events-none absolute -left-40 top-1/3 -z-10 h-96 w-96 rounded-full bg-gold/5 blur-[130px]" />
            <div className="pointer-events-none absolute -right-40 bottom-1/3 -z-10 h-96 w-96 rounded-full bg-primary/5 blur-[130px]" />

            <div className="container-site">
                {/* Header Block */}
                <div className="mb-10 sm:mb-16 max-w-2xl space-y-3">
                    <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold uppercase tracking-widest text-gold">
                            Our Capabilities
                        </span>
                        <div className="h-px w-10 bg-gold/40" />
                    </div>
                    <h2 className="font-display text-3xl font-medium tracking-tight leading-tight sm:text-5xl text-foreground">
                        Everything You Need, <br />
                        <span className="italic text-gold font-serif">Under One Roof.</span>
                    </h2>
                </div>

                {/* Card Layout */}
                <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[minmax(200px,auto)]">
                    {services.map((service, index) => (
                        <ServiceCard key={service.id ?? index} service={service} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}