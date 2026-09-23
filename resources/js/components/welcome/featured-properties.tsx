import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { Property } from '@/types/property';
import { PropertyCard } from './property-card';

type FeaturedPropertiesProps = {
    properties: Property[];
    favorites: number[];
    onFavorite: (id: number) => void;
    onSelect: (property: Property) => void;
};

export function FeaturedProperties({
    properties,
    favorites,
    onFavorite,
    onSelect,
}: FeaturedPropertiesProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    // Track active card in view on mobile using IntersectionObserver (GPU & main-thread friendly)
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        // Skip observer setup if window is desktop size
        if (window.innerWidth >= 640) return;

        const observerOptions: IntersectionObserverInit = {
            root: container,
            threshold: 0.6, // Trigger when 60% of card is centered in viewport
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = Number(entry.target.getAttribute('data-card-index'));
                    if (!isNaN(index)) {
                        setActiveIndex(index);
                    }
                }
            });
        }, observerOptions);

        cardRefs.current.forEach((card) => {
            if (card) observer.observe(card);
        });

        return () => observer.disconnect();
    }, [properties.length]);

    const scrollToCard = (index: number) => {
        const targetCard = cardRefs.current[index];
        if (targetCard) {
            targetCard.scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
                block: 'nearest',
            });
        }
    };

    return (
        <section id="properties" className="py-16 sm:py-20 lg:py-32 bg-background text-foreground transition-colors overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                {/* Header Block */}
                <div className="mb-8 sm:mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                    <div className="space-y-2.5">
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                                Featured Properties
                            </span>
                            <div className="h-px w-8 bg-primary/40" />
                        </div>
                        <h2 className="font-display text-3xl font-medium tracking-tight leading-tight sm:text-4xl lg:text-5xl">
                            Properties selected <br className="hidden sm:inline" />
                            for exceptional living.
                        </h2>
                    </div>

                    {/* Desktop "View All" Link & Mobile Navigation Controls */}
                    <div className="flex items-center justify-between sm:justify-end gap-4">
                        {/* Mobile Slide Controls */}
                        <div className="flex items-center gap-1.2 sm:hidden">
                            <button
                                type="button"
                                onClick={() => scrollToCard(Math.max(0, activeIndex - 1))}
                                disabled={activeIndex === 0}
                                aria-label="Previous Property"
                                className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all hover:border-primary hover:text-primary active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </button>
                            <span className="text-[11px] font-mono font-medium text-muted-foreground px-1">
                                {activeIndex + 1} / {properties.length}
                            </span>
                            <button
                                type="button"
                                onClick={() => scrollToCard(Math.min(properties.length - 1, activeIndex + 1))}
                                disabled={activeIndex === properties.length - 1}
                                aria-label="Next Property"
                                className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all hover:border-primary hover:text-primary active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>

                        <a
                            href="#search-section"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
                        >
                            <span>View All Properties</span>
                            <ArrowRight className="h-3.5 w-3.5 text-primary" />
                        </a>
                    </div>
                </div>

                {/* Mobile Carousel / Desktop Grid Container */}
                <div
                    ref={scrollContainerRef}
                    tabIndex={0}
                    role="region"
                    aria-label="Featured Properties Carousel"
                    className="
                        /* Mobile Carousel Utilities */
                        flex overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 pt-1
                        [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
                        
                        /* Precise edge snap alignment & padding for mobile screens */
                        -mx-4 px-4 sm:mx-0 sm:px-0
                        
                        /* Desktop/Tablet Grid Fallback */
                        sm:grid sm:overflow-visible sm:snap-none sm:pb-0
                        sm:grid-cols-2 lg:grid-cols-4 sm:gap-6
                    "
                >
                    {properties.map((property, index) => {
                        const isActive = index === activeIndex;

                        return (
                            <div
                                key={property.id}
                                ref={(el) => {
                                    cardRefs.current[index] = el;
                                }}
                                data-card-index={index}
                                className="
                                    /* Mobile Stacked Card Layout */
                                    shrink-0 snap-center w-[85vw] max-w-[360px] mr-4 last:mr-0
                                    
                                    /* Desktop Grid Reset */
                                    sm:w-auto sm:max-w-none sm:mr-0
                                    
                                    /* Smooth Depth/Scale Micro-transitions for Active Mobile Card */
                                    transition-all duration-300 ease-out transform-gpu
                                    motion-reduce:transition-none motion-reduce:transform-none
                                "
                                style={{
                                    /* Inline transform scaling applied only below sm breakpoint via responsive CSS hook */
                                    opacity: isActive ? 1 : 0.88,
                                    transform: isActive ? 'scale(1)' : 'scale(0.96)',
                                }}
                            >
                                <PropertyCard
                                    property={property}
                                    favorite={favorites.includes(property.id)}
                                    onFavorite={onFavorite}
                                    onSelect={onSelect}
                                />
                            </div>
                        );
                    })}
                </div>

                {/* Subtle Mobile Progress Bar */}
                <div className="mt-4 flex items-center justify-center gap-1.5 sm:hidden" aria-hidden="true">
                    {properties.map((_, idx) => (
                        <button
                            key={idx}
                            type="button"
                            onClick={() => scrollToCard(idx)}
                            className={`h-1 rounded-full transition-all duration-300 ${
                                idx === activeIndex
                                    ? 'w-6 bg-primary'
                                    : 'w-1.5 bg-border hover:bg-muted-foreground/40'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}