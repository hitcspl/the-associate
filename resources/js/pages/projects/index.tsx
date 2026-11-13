import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import BottomSheet from '@/components/public/bottom-sheet';
import PageHero from '@/components/public/page-hero';
import { propertiesHeroImage } from '@/components/public/images';
import FilterSection from '@/components/properties/filter-section';
import { ProjectCard } from '@/components/projects/project-card';
import { fadeUp, stagger } from '@/lib/motion';
import type { ProjectListing, ProjectPortfolioStats } from '@/types/project';

type ProjectsPageProps = {
    projects: ProjectListing[];
    portfolioStats: ProjectPortfolioStats;
};

type StatusFilter = 'All' | 'ongoing' | 'completed';

export default function ProjectsIndex({
    projects,
    portfolioStats,
}: ProjectsPageProps) {
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState<StatusFilter>('All');
    const [category, setCategory] = useState('All');
    const [location, setLocation] = useState('All');
    const [featuredOnly, setFeaturedOnly] = useState(false);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [visibleCount, setVisibleCount] = useState(9);

    const categories = useMemo(
        () => [...new Set(projects.map((project) => project.category))].sort(),
        [projects],
    );
    const locations = useMemo(
        () =>
            [
                ...new Set(
                    projects.map((project) => project.location.split(',')[0].trim()),
                ),
            ].sort(),
        [projects],
    );
    const statusCounts = useMemo(
        () => ({
            All: projects.filter((project) => project.status !== 'planned').length,
            ongoing: projects.filter((project) => project.status === 'ongoing').length,
            completed: projects.filter((project) => project.status === 'completed').length,
        }),
        [projects],
    );

    const filteredListings = useMemo(() => {
        const searchTerm = search.trim().toLowerCase();

        return projects.filter((project) => {
            const matchesSearch =
                searchTerm.length === 0 ||
                project.name.toLowerCase().includes(searchTerm) ||
                project.location.toLowerCase().includes(searchTerm) ||
                project.category.toLowerCase().includes(searchTerm);
            const matchesStatus =
                status === 'All' ? project.status !== 'planned' : project.status === status;
            const matchesCategory =
                category === 'All' || project.category === category;
            const matchesLocation =
                location === 'All' ||
                project.location.toLowerCase().includes(location.toLowerCase());

            return (
                matchesSearch &&
                matchesStatus &&
                matchesCategory &&
                matchesLocation &&
                (!featuredOnly || project.isFeatured)
            );
        });
    }, [projects, search, status, category, location, featuredOnly]);

    const ongoingListings = filteredListings.filter(
        (project) => project.status === 'ongoing',
    );
    const completedListings = filteredListings.filter(
        (project) => project.status === 'completed',
    );
    const isFilterActive =
        search.trim() !== '' ||
        status !== 'All' ||
        category !== 'All' ||
        location !== 'All' ||
        featuredOnly;
    const activeFilterCount =
        Number(search.trim() !== '') +
        Number(status !== 'All') +
        Number(category !== 'All') +
        Number(location !== 'All') +
        Number(featuredOnly);
    const hasMore =
        ongoingListings.length > visibleCount ||
        completedListings.length > visibleCount;

    useEffect(() => {
        setVisibleCount(9);
    }, [search, status, category, location, featuredOnly]);

    function resetFilters() {
        setSearch('');
        setStatus('All');
        setCategory('All');
        setLocation('All');
        setFeaturedOnly(false);
    }

    function getCategoryCount(value: string) {
        return projects.filter((project) => project.category === value).length;
    }

    function getLocationCount(value: string) {
        return projects.filter((project) =>
            project.location.toLowerCase().includes(value.toLowerCase()),
        ).length;
    }

    const statusOptions: { label: string; value: StatusFilter }[] = [
        { label: 'All properties', value: 'All' },
        { label: 'Ongoing', value: 'ongoing' },
        { label: 'Completed', value: 'completed' },
    ];

    const renderFilterSections = () => (
        <div className="space-y-3">
            <FilterSection title="Status">
                <div className="space-y-1">
                    {statusOptions.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => setStatus(option.value)}
                            aria-pressed={status === option.value}
                            className={`flex min-h-11 w-full items-center justify-between rounded-lg px-3 text-sm transition ${
                                status === option.value
                                    ? 'bg-[#A37B4C]/10 font-semibold text-[#8A643B]'
                                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                            }`}
                        >
                            <span>{option.label}</span>
                            <span className="text-xs opacity-70">
                                {statusCounts[option.value]}
                            </span>
                        </button>
                    ))}
                </div>
            </FilterSection>

            <FilterSection title="Location">
                <div className="flex flex-wrap gap-2">
                    {locations.map((option) => (
                        <button
                            key={option}
                            type="button"
                            onClick={() =>
                                setLocation(location === option ? 'All' : option)
                            }
                            aria-pressed={location === option}
                            className={`min-h-10 rounded-full border px-3 py-2 text-xs transition ${
                                location === option
                                    ? 'border-[#A37B4C] bg-[#A37B4C] text-white'
                                    : 'border-border text-foreground hover:border-[#A37B4C]'
                            }`}
                        >
                            {option} ({getLocationCount(option)})
                        </button>
                    ))}
                </div>
            </FilterSection>

            <FilterSection title="Property Type">
                <div className="flex flex-wrap gap-2">
                    {categories.map((option) => (
                        <button
                            key={option}
                            type="button"
                            onClick={() =>
                                setCategory(category === option ? 'All' : option)
                            }
                            aria-pressed={category === option}
                            className={`min-h-10 rounded-full border px-3 py-2 text-xs transition ${
                                category === option
                                    ? 'border-[#A37B4C] bg-[#A37B4C] text-white'
                                    : 'border-border text-foreground hover:border-[#A37B4C]'
                            }`}
                        >
                            {option} ({getCategoryCount(option)})
                        </button>
                    ))}
                </div>
            </FilterSection>

            <FilterSection title="Flagship">
                <button
                    type="button"
                    role="switch"
                    aria-checked={featuredOnly}
                    onClick={() => setFeaturedOnly((current) => !current)}
                    className={`flex min-h-11 w-full items-center justify-between rounded-lg px-3 text-sm transition ${
                        featuredOnly
                            ? 'bg-[#A37B4C]/10 font-semibold text-[#8A643B]'
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                >
                    <span>Flagship only</span>
                    <span>{featuredOnly ? 'On' : 'Off'}</span>
                </button>
            </FilterSection>

            {isFilterActive && (
                <button
                    type="button"
                    onClick={resetFilters}
                    className="min-h-11 w-full rounded-xl border border-border text-sm font-medium transition hover:bg-muted"
                >
                    Clear all filters
                </button>
            )}
        </div>
    );

    const sections = [
        { title: 'Ongoing properties', listings: ongoingListings },
        { title: 'Completed properties', listings: completedListings },
    ].filter((section) => section.listings.length > 0);

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Head title="Properties" />
            <main>
                <PageHero
                    image={propertiesHeroImage}
                    imageAlt="A modern property development"
                    title="Places built with purpose."
                    subtitle="Explore residential and commercial properties by The Associate Developers, with verified details for each location."
                >
                    <div className="flex flex-wrap gap-3">
                        {[
                            ['Properties', portfolioStats.total],
                            ['Ongoing', portfolioStats.ongoing],
                            ['Completed', portfolioStats.completed],
                        ].map(([label, value]) => (
                            <div
                                key={label}
                                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-white backdrop-blur-md"
                            >
                                <span className="font-display text-2xl font-bold">
                                    {value}
                                </span>
                                <span className="text-[10px] uppercase tracking-wider">
                                    {label}
                                </span>
                            </div>
                        ))}
                    </div>
                </PageHero>

                <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
                    <div className="grid items-start gap-8 lg:grid-cols-12">
                        <aside className="sticky top-28 hidden self-start lg:col-span-3 lg:block">
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="font-display text-xl font-semibold">
                                    Refine your search
                                </h2>
                                {isFilterActive && (
                                    <button
                                        type="button"
                                        onClick={resetFilters}
                                        className="text-xs font-medium text-[#8A643B] hover:underline"
                                    >
                                        Clear all
                                    </button>
                                )}
                            </div>
                            <label className="relative mb-4 block">
                                <span className="sr-only">Search properties</span>
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <input
                                    value={search}
                                    onChange={(event) => setSearch(event.target.value)}
                                    placeholder="Search properties"
                                    className="h-11 w-full rounded-xl border border-border bg-card pr-4 pl-10 text-sm outline-none transition focus:border-[#A37B4C]"
                                />
                            </label>
                            <div className="max-h-[calc(100svh-12rem)] overflow-y-auto pr-1">
                                {renderFilterSections()}
                            </div>
                        </aside>

                        <div className="min-w-0 lg:col-span-9">
                            <div className="mb-6">
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#A37B4C]">
                                    Our portfolio
                                </p>
                                <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                                    <div>
                                        <h1 className="font-display text-3xl font-semibold sm:text-4xl">
                                            Individual properties
                                        </h1>
                                        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                                            Browse properties grouped by their current status.
                                        </p>
                                    </div>
                                    <p className="shrink-0 text-sm text-muted-foreground">
                                        <span className="font-semibold text-foreground">
                                            {filteredListings.length}
                                        </span>{' '}
                                        {filteredListings.length === 1 ? 'property' : 'properties'}
                                        {' '}found
                                    </p>
                                </div>
                            </div>

                            <div className="mb-6 flex gap-3 lg:hidden">
                                <label className="relative min-w-0 flex-1">
                                    <span className="sr-only">Search properties</span>
                                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <input
                                        value={search}
                                        onChange={(event) => setSearch(event.target.value)}
                                        placeholder="Search properties"
                                        className="h-11 w-full rounded-xl border border-border bg-card pr-4 pl-10 text-sm outline-none transition focus:border-[#A37B4C]"
                                    />
                                </label>
                                <button
                                    type="button"
                                    onClick={() => setIsMobileFilterOpen(true)}
                                    aria-label="Open property filters"
                                    className="relative inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl border border-border bg-card px-4 text-sm font-medium transition hover:border-[#A37B4C]"
                                >
                                    <SlidersHorizontal className="h-4 w-4" />
                                    Filters
                                    {activeFilterCount > 0 && (
                                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#A37B4C] px-1 text-[10px] font-bold text-white">
                                            {activeFilterCount}
                                        </span>
                                    )}
                                </button>
                            </div>

                            {filteredListings.length === 0 ? (
                                <div className="rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">
                                    <p className="font-display text-xl font-semibold">
                                        No properties match these filters
                                    </p>
                                    <p className="mt-2 text-sm text-muted-foreground">
                                        Try another search or clear some filters.
                                    </p>
                                    {isFilterActive && (
                                        <button
                                            type="button"
                                            onClick={resetFilters}
                                            className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#A37B4C] px-5 text-sm font-semibold text-white transition hover:bg-[#8A643B]"
                                        >
                                            <X className="h-4 w-4" />
                                            Clear filters
                                        </button>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-12">
                                        {sections.map(({ title, listings }) => (
                                            <section key={title}>
                                                <div className="mb-5 flex items-center justify-between gap-4">
                                                    <h2 className="font-display text-2xl font-semibold sm:text-3xl">
                                                        {title}
                                                    </h2>
                                                    <span className="rounded-full bg-[#A37B4C]/10 px-3 py-1 text-sm font-semibold text-[#8A643B]">
                                                        {listings.length}
                                                    </span>
                                                </div>
                                                <motion.div
                                                    initial="hidden"
                                                    whileInView="visible"
                                                    viewport={{ once: true, amount: 0.1 }}
                                                    variants={stagger(0.08)}
                                                    className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
                                                >
                                                    {listings
                                                        .slice(0, visibleCount)
                                                        .map((project) => (
                                                            <motion.div
                                                                key={project.id}
                                                                variants={fadeUp}
                                                            >
                                                                <ProjectCard project={project} />
                                                            </motion.div>
                                                        ))}
                                                </motion.div>
                                            </section>
                                        ))}
                                    </div>
                                    {hasMore && (
                                        <div className="mt-10 flex justify-center">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setVisibleCount((count) => count + 9)
                                                }
                                                className="min-h-11 rounded-full bg-[#A37B4C] px-8 text-sm font-semibold text-white shadow-sm transition hover:bg-[#8A643B]"
                                            >
                                                Load more properties
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </section>
            </main>

            <BottomSheet
                open={isMobileFilterOpen}
                onClose={() => setIsMobileFilterOpen(false)}
                title="Filter properties"
                footer={
                    <button
                        type="button"
                        onClick={() => setIsMobileFilterOpen(false)}
                        className="min-h-11 w-full rounded-xl bg-[#A37B4C] text-sm font-semibold text-white transition hover:bg-[#8A643B]"
                    >
                        Show {filteredListings.length}{' '}
                        {filteredListings.length === 1 ? 'property' : 'properties'}
                    </button>
                }
            >
                {renderFilterSections()}
            </BottomSheet>
        </div>
    );
}
