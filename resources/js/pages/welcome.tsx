import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { AboutSection } from '@/components/welcome/about-section';
import { ContactSection } from '@/components/welcome/contact-section';
import { CtaBanner } from '@/components/welcome/cta-banner';
import { FeaturedProperties } from '@/components/welcome/featured-properties';
import { HeroSection } from '@/components/welcome/hero-section';
import { ImpactBanner } from '@/components/welcome/impact-banner';
import { MobileBottomNav } from '@/components/welcome/mobile-bottom-nav';
import { PropertyDetailModal } from '@/components/welcome/property-detail-modal';
import { SearchFilterBar } from '@/components/welcome/search-filter-bar';
import { ServicesSection } from '@/components/welcome/services-section';
import { SiteFooter } from '@/components/welcome/site-footer';
import { SiteHeader } from '@/components/welcome/site-header';
import { TestimonialsSection } from '@/components/welcome/testimonials-section';
import { useAppearance } from '@/hooks/use-appearance';
import { useFavorites } from '@/hooks/use-favorites';
import { usePropertyFilters } from '@/hooks/use-property-filters';
import type { WelcomeProps } from '@/types/property';

type AuthPageProps = WelcomeProps & { auth?: { user?: unknown } };

export default function Welcome() {
    const {
        auth,
        heroSlides,
        properties,
        services,
        impactStats,
        testimonials,
        siteImages,
    } = usePage<AuthPageProps>().props;
    const { resolvedAppearance, updateAppearance } = useAppearance();
    const { favorites, toggleFavorite } = useFavorites([1]);
    const filters = usePropertyFilters(properties);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState<
        WelcomeProps['properties'][number] | null
    >(null);
    const [contactPropertyId, setContactPropertyId] = useState<number | null>(
        null,
    );

    const scrollToContact = (propertyId: number | null = null) => {
        setContactPropertyId(propertyId);
        const contactSection = document.getElementById('contact');

        if (contactSection) {
            const offset = 88;
            const top =
                contactSection.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
            if (window.history.pushState) {
                window.history.pushState(null, '', '#contact');
            }
        } else {
            window.location.hash = 'contact';
        }
    };

    const openContact = (
        property: WelcomeProps['properties'][number] | null = null,
    ) => {
        setSelectedProperty(null);
        scrollToContact(property?.id ?? null);
    };

    return (
        <div className="bg-background text-foreground min-h-screen transition-colors duration-300">
            <Head title="Associate - Premium Real Estate" />
            <SiteHeader
                authenticated={Boolean(auth?.user)}
                dark={resolvedAppearance === 'dark'}
                mobileOpen={mobileOpen}
                onContact={() => openContact()}
                onMobileToggle={() => setMobileOpen((open) => !open)}
                onThemeToggle={() =>
                    updateAppearance(
                        resolvedAppearance === 'dark' ? 'light' : 'dark',
                    )
                }
            />
            <main>
                <HeroSection
                    slides={heroSlides}
                    favorites={favorites}
                    onFavorite={toggleFavorite}
                />
                <AboutSection
                    image={siteImages.about}
                    onContact={() => openContact()}
                />
                <FeaturedProperties
                    properties={filters.filteredProperties}
                    favorites={favorites}
                    onFavorite={toggleFavorite}
                    onSelect={setSelectedProperty}
                />
                <SearchFilterBar {...filters} />
                <ServicesSection services={services} />
                <ImpactBanner stats={impactStats} image={siteImages.impact} />
                <TestimonialsSection testimonials={testimonials} />
                <CtaBanner
                    image={siteImages.cta}
                    onContact={() => openContact()}
                />
                <ContactSection propertyId={contactPropertyId} />
            </main>
            <SiteFooter onContact={() => openContact()} />
            <MobileBottomNav onContact={() => openContact()} />
            {selectedProperty && (
                <PropertyDetailModal
                    property={selectedProperty}
                    onClose={() => setSelectedProperty(null)}
                    onInquire={() => openContact(selectedProperty)}
                />
            )}
        </div>
    );
}
