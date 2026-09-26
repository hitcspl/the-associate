import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
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
    const [activeFilter, setActiveFilter] = useState('All');

    const filters = [
        { label: 'All', value: 'All' },
        { label: 'Villas', value: 'Villa' },
        { label: 'Apartments', value: 'Residence' },
        { label: 'Penthouse', value: 'Penthouse' },
    ];
    const visibleProperties =
        activeFilter === 'All'
            ? properties
            : properties.filter((property) => property.type === activeFilter);

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
                    const index = Number(
                        entry.target.getAttribute('data-card-index'),
                    );
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
    }, [visibleProperties.length]);

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

    const selectFilter = (filter: string) => {
        setActiveFilter(filter);
        setActiveIndex(0);
        scrollContainerRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
    };

    return (
        <section
            id="properties"
            className="bg-background text-foreground overflow-hidden py-16 transition-colors sm:py-20 lg:py-32"
        >
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header Block */}
                <div className="mb-8 flex flex-col justify-between gap-6 sm:mb-12 sm:flex-row sm:items-end">
                    <div className="space-y-2.5">
                        <div className="flex items-center gap-3">
                            <span className="text-primary text-xs font-semibold tracking-widest uppercase">
                                Featured Properties
                            </span>
                            <div className="bg-primary/40 h-px w-8" />
                        </div>
                        <h2 className="font-display text-3xl leading-tight font-medium tracking-tight sm:text-4xl lg:text-5xl">
                            Properties selected{' '}
                            <br className="hidden sm:inline" />
                            for exceptional living.
                        </h2>
                        <div className="mt-6 flex flex-wrap items-center gap-2">
                            {filters.map((filter) => {
                                const isSelected =
                                    activeFilter === filter.value;
                                return (
                                    <button
                                        key={filter.value}
                                        type="button"
                                        onClick={() =>
                                            selectFilter(filter.value)
                                        }
                                        className={`focus-visible:ring-primary relative rounded-full border px-4 py-2 text-xs font-medium transition-all duration-200 outline-none focus-visible:ring-2 sm:text-sm ${
                                            isSelected
                                                ? 'border-primary/30 text-foreground shadow-sm'
                                                : 'border-border/60 bg-card/50 text-muted-foreground hover:border-border hover:bg-card hover:text-foreground'
                                        }`}
                                    >
                                        {isSelected && (
                                            <motion.span
                                                layoutId="property-filter"
                                                className="bg-primary/12 absolute inset-0 rounded-full"
                                                transition={{
                                                    type: 'spring',
                                                    stiffness: 400,
                                                    damping: 30,
                                                }}
                                            />
                                        )}
                                        <span className="relative z-10 whitespace-nowrap">
                                            {filter.label}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Desktop "View All" Link & Mobile Navigation Controls */}
                    <div className="flex items-center justify-between gap-4 sm:justify-end">
                        {/* Mobile Slide Controls */}
                        <div className="flex items-center gap-1.5 sm:hidden">
                            <button
                                type="button"
                                onClick={() =>
                                    scrollToCard(Math.max(0, activeIndex - 1))
                                }
                                disabled={activeIndex === 0}
                                aria-label="Previous Property"
                                className="border-border bg-card text-muted-foreground hover:border-primary hover:text-primary flex h-8 w-8 items-center justify-center rounded-full border transition-all active:scale-95 disabled:pointer-events-none disabled:opacity-30"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </button>
                            <span className="text-muted-foreground px-1 font-mono text-xs font-medium">
                                {activeIndex + 1} / {visibleProperties.length}
                            </span>
                            <button
                                type="button"
                                onClick={() =>
                                    scrollToCard(
                                        Math.min(
                                            visibleProperties.length - 1,
                                            activeIndex + 1,
                                        ),
                                    )
                                }
                                disabled={
                                    activeIndex === visibleProperties.length - 1
                                }
                                aria-label="Next Property"
                                className="border-border bg-card text-muted-foreground hover:border-primary hover:text-primary flex h-8 w-8 items-center justify-center rounded-full border transition-all active:scale-95 disabled:pointer-events-none disabled:opacity-30"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>

                        <a
                            href="#search-section"
                            className="text-muted-foreground hover:text-primary inline-flex items-center gap-1.5 text-sm font-semibold tracking-wider uppercase transition-colors"
                        >
                            <span>View All Properties</span>
                            <ArrowRight className="text-primary h-3.5 w-3.5" />
                        </a>
                    </div>
                </div>

                {/* Mobile Carousel / Desktop Grid Container */}
                <div
                    ref={scrollContainerRef}
                    tabIndex={0}
                    role="region"
                    aria-label="Featured Properties Carousel"
                    className="/* Mobile Carousel Utilities */ /* Precise edge snap alignment & padding for mobile screens */ /* Desktop/Tablet Grid Fallback */ -mx-4 flex snap-x snap-mandatory [scrollbar-width:none] overflow-x-auto scroll-smooth px-4 pt-1 pb-4 [-ms-overflow-style:none] sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden"
                >
                    {visibleProperties.map((property, index) => {
                        const isActive = index === activeIndex;

                        return (
                            <div
                                key={property.id}
                                ref={(el) => {
                                    cardRefs.current[index] = el;
                                }}
                                data-card-index={index}
                                className="/* Mobile Stacked Card Layout */ /* Desktop Grid Reset */ /* Smooth Depth/Scale Micro-transitions for Active Mobile Card */ mr-4 w-[85vw] max-w-[360px] shrink-0 transform-gpu snap-center transition-all duration-300 ease-out last:mr-0 motion-reduce:transform-none motion-reduce:transition-none sm:mr-0 sm:w-auto sm:max-w-none"
                                style={{
                                    /* Inline transform scaling applied only below sm breakpoint via responsive CSS hook */
                                    opacity: isActive ? 1 : 0.88,
                                    transform: isActive
                                        ? 'scale(1)'
                                        : 'scale(0.96)',
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
                <div
                    className="mt-4 flex items-center justify-center gap-1.5 sm:hidden"
                    aria-hidden="true"
                >
                    {visibleProperties.map((_, idx) => (
                        <button
                            key={idx}
                            type="button"
                            onClick={() => scrollToCard(idx)}
                            className={`h-1 rounded-full transition-all duration-300 ${
                                idx === activeIndex
                                    ? 'bg-primary w-6'
                                    : 'bg-border hover:bg-muted-foreground/40 w-1.5'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
