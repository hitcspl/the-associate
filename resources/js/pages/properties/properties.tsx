import { useState, useMemo, useEffect, useRef } from 'react';
import { Head, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MapPin,
    Search,
    Heart,
    ArrowUpRight,
    Sparkles,
    Building2,
    CheckCircle2,
    Award,
    X,
    SlidersHorizontal,
    Quote,
    ChevronRight,
} from 'lucide-react';
import { fadeUp, stagger } from '@/lib/motion';
import PageHero from '@/components/public/page-hero';
import SectionHeading from '@/components/public/section-heading';
import { RevealText } from '@/components/public/reveal';
import { propertiesHeroImage } from '@/components/public/images';
import BottomSheet from '@/components/public/bottom-sheet';
import FilterSection from '@/components/properties/filter-section';

interface Project {
    id: string;
    name: string;
    location: string;
    status: 'Ongoing' | 'Completed';
    category: 'Residential' | 'Commercial' | 'Township' | 'Plots / Land' | 'Luxury Complex';
    isFlagship?: boolean;
    image: string;
}

function useCountUp(target: number, ref: React.RefObject<Element | null>, duration = 1200) {
    const [count, setCount] = useState(0);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 },
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, [ref]);

    useEffect(() => {
        if (!inView) return;
        const startTime = performance.now();
        const step = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };
        const raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
    }, [inView, target, duration]);

    return count;
}


interface PropertyProps {
    properties?: Array<{
        id: number;
        title: string;
        location?: string;
        city?: string;
        status?: string;
        category?: string;
        isFlagship?: boolean;
        featured?: boolean;
        image?: string;
        price?: number;
        listing_type?: string;
    }>;
}

export default function Properties({ properties }: PropertyProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState<string>('All');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [selectedLocation, setSelectedLocation] = useState<string>('All');
    const [onlyFlagships, setOnlyFlagships] = useState(false);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [savedFavorites, setSavedFavorites] = useState<string[]>([]);
    const [visibleCount, setVisibleCount] = useState(9);

    const totalRef = useRef<HTMLDivElement>(null);
    const ongoingRef = useRef<HTMLDivElement>(null);
    const completedRef = useRef<HTMLDivElement>(null);

    const totalCount = useCountUp(18, totalRef);
    const ongoingCount = useCountUp(10, ongoingRef);
    const completedCount = useCountUp(8, completedRef);

    const toggleFavorite = (id: string) => {
        setSavedFavorites((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
        );
    };

    const propertiesFromBackend = properties || [];
    const projectsData: Project[] = propertiesFromBackend.map((p) => ({
        id: String(p.id),
        name: p.title,
        location: p.location || p.city || 'Unknown',
        status: (p.status === 'available' || p.status === 'pending' ? 'Ongoing' : p.status === 'sold' ? 'Completed' : (p.status as string)) || 'Ongoing',
        category: (p.category || p.type || 'Residential') as Project['category'],
        isFlagship: p.isFlagship || p.featured || false,
        image: p.image || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop',
    }));

    const locationOptions = [
        'Itki Road',
        'Kanke Road',
        'Kathal More',
        'Bajra',
        'Airport Road',
        'Rukka Road',
        'Pithoria Road',
        'Mesra City',
    ];

    const categoryOptions = ['Township', 'Residential', 'Plots / Land', 'Commercial', 'Luxury Complex'];

    const statusCounts = useMemo(
        () => ({
            All: projectsData.length,
            Ongoing: projectsData.filter((p) => p.status === 'Ongoing').length,
            Completed: projectsData.filter((p) => p.status === 'Completed').length,
        }),
        [projectsData],
    );

    const getLocationCount = (loc: string) =>
        projectsData.filter((p) => p.location.toLowerCase().includes(loc.toLowerCase())).length;

    const getCategoryCount = (cat: string) => projectsData.filter((p) => p.category === cat).length;

    const filteredProjects = useMemo(() => {
        return projectsData.filter((p) => {
            const matchesSearch =
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.location.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = selectedStatus === 'All' || p.status === selectedStatus;
            const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
            const matchesLocation = selectedLocation === 'All' || p.location.toLowerCase().includes(selectedLocation.toLowerCase());
            const matchesFlagship = !onlyFlagships || p.isFlagship;
            return matchesSearch && matchesStatus && matchesCategory && matchesLocation && matchesFlagship;
        });
    }, [searchQuery, selectedStatus, selectedCategory, selectedLocation, onlyFlagships, projectsData]);

    const visibleProjects = filteredProjects.slice(0, visibleCount);
    const hasMore = visibleCount < filteredProjects.length;

    const isFilterActive =
        searchQuery !== '' ||
        selectedStatus !== 'All' ||
        selectedCategory !== 'All' ||
        selectedLocation !== 'All' ||
        onlyFlagships;

    useEffect(() => {
        setVisibleCount(9);
    }, [searchQuery, selectedStatus, selectedCategory, selectedLocation, onlyFlagships]);

    const activeFilterBadgeCount = [
        selectedStatus !== 'All',
        selectedCategory !== 'All',
        selectedLocation !== 'All',
        onlyFlagships,
    ].filter(Boolean).length;

    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-[#A37B4C] selection:text-white">
            <Head title="Properties" />

            <main>
                <PageHero
                    image={propertiesHeroImage}
                    imageAlt="Luxury Architecture"
                    title="Properties selected for exceptional living."
                    subtitle="Discover a curated showcase of ongoing township masterplans and completed flagship developments across Ranchi."
                >
                    <div className="flex flex-wrap gap-3">
                        <div ref={totalRef} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white">
                            <span className="text-2xl font-display font-bold">{totalCount}</span>
                            <span className="text-[10px] uppercase tracking-wider">Projects</span>
                        </div>
                        <div ref={ongoingRef} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white">
                            <span className="text-2xl font-display font-bold">{ongoingCount}</span>
                            <span className="text-[10px] uppercase tracking-wider">Ongoing</span>
                        </div>
                        <div ref={completedRef} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white">
                            <span className="text-2xl font-display font-bold">{completedCount}</span>
                            <span className="text-[10px] uppercase tracking-wider">Completed</span>
                        </div>
                    </div>
                </PageHero>


                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Pull-quote band */}
                    <section className="mb-8">
                        <div className="p-5 sm:p-6 rounded-xl border border-[#A37B4C]/20 bg-[#A37B4C]/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex items-start gap-3">
                                <Quote className="w-6 h-6 text-[#A37B4C] flex-shrink-0 mt-0.5" />
                                <p className="font-display italic text-sm sm:text-base text-[#A37B4C] dark:text-[#B88C57]">
                                    &ldquo;Dream Lifestyle Township in Ranchi at Very Affordable Price&rdquo;
                                </p>
                            </div>
                            <span className="hidden sm:inline text-xs font-mono font-bold uppercase tracking-wider bg-[#A37B4C] text-white px-3 py-1 rounded-full">
                                18 Verified Sites
                            </span>
                        </div>
                    </section>

                    <div className="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] gap-8 items-start">
                        {/* Desktop Sidebar */}
                        <aside className="hidden lg:block self-start sticky top-28">
                            <div className="rounded-2xl border border-border bg-card shadow-sm">
                                <div className="max-h-[calc(100svh-8rem)] overflow-y-auto scroll-thin overscroll-contain relative">
                                    <div className="px-4 py-4 space-y-3">
                                        {/* Search in Sidebar */}
                                        <div className="relative mb-4">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                            <input
                                                type="text"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                placeholder="Search projects..."
                                                className="w-full pl-11 pr-12 py-3.5 rounded-xl text-sm bg-background border border-border focus:border-[#A37B4C] outline-none transition-all duration-200"
                                            />
                                            {searchQuery && (
                                                <button
                                                    onClick={() => setSearchQuery('')}
                                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-muted transition-colors"
                                                >
                                                    <X className="w-4 h-4 text-muted-foreground" />
                                                </button>
                                            )}
                                        </div>
                                        <FilterSection title="Status" defaultOpen>
                                            <div className="space-y-2">
                                                {[
                                                    { label: 'All Statuses', val: 'All' },
                                                    { label: 'Ongoing', val: 'Ongoing' },
                                                    { label: 'Completed', val: 'Completed' },
                                                ].map((item) => (
                                                    <button
                                                        key={item.val}
                                                        onClick={() => setSelectedStatus(item.val)}
                                                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-200 min-h-[44px] ${
                                                            selectedStatus === item.val
                                                                ? 'bg-[#A37B4C] text-white shadow-sm'
                                                                : 'hover:bg-muted text-foreground hover:shadow-sm'
                                                        }`}
                                                    >
                                                        <span>{item.label}</span>
                                                        <span className="text-xs opacity-70">
                                                            {statusCounts[item.val as keyof typeof statusCounts]}
                                                        </span>
                                                    </button>
                                                ))}
                                            </div>
                                        </FilterSection>

                                        <FilterSection title="Location" defaultOpen>
                                            <div className="flex flex-wrap gap-2">
                                                {locationOptions.map((loc) => (
                                                    <button
                                                        key={loc}
                                                        onClick={() =>
                                                            setSelectedLocation(selectedLocation === loc ? 'All' : loc)
                                                        }
                                                        className={`px-3 py-1.5 rounded-full text-xs border transition-all duration-200 min-h-[44px] ${
                                                            selectedLocation === loc
                                                                ? 'bg-[#A37B4C] text-white border-[#A37B4C] shadow-sm'
                                                                : 'border-border hover:border-[#A37B4C] text-foreground hover:shadow-sm'
                                                        }`}
                                                    >
                                                        {loc}
                                                    </button>
                                                ))}
                                            </div>
                                        </FilterSection>

                                        <FilterSection title="Property Type" defaultOpen>
                                            <div className="flex flex-wrap gap-2">
                                                {categoryOptions.map((cat) => (
                                                    <button
                                                        key={cat}
                                                        onClick={() =>
                                                            setSelectedCategory(selectedCategory === cat ? 'All' : cat)
                                                        }
                                                        className={`px-3 py-1.5 rounded-full text-xs border transition-all duration-200 min-h-[44px] ${
                                                            selectedCategory === cat
                                                                ? 'bg-[#A37B4C] text-white border-[#A37B4C] shadow-sm'
                                                                : 'border-border hover:border-[#A37B4C] text-foreground hover:shadow-sm'
                                                        }`}
                                                    >
                                                        {cat}
                                                    </button>
                                                ))}
                                            </div>
                                        </FilterSection>

                                        <FilterSection title="Flagship" defaultOpen>
                                            <button
                                                onClick={() => setOnlyFlagships(!onlyFlagships)}
                                                role="switch"
                                                aria-checked={onlyFlagships}
                                                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-200 min-h-[44px] ${
                                                    onlyFlagships ? 'bg-[#A37B4C] text-white shadow-sm' : 'hover:bg-muted text-foreground hover:shadow-sm'
                                                }`}
                                            >
                                                <span>Flagship Only</span>
                                                <span className="font-medium">{onlyFlagships ? 'On' : 'Off'}</span>
                                            </button>
                                        </FilterSection>
                                    </div>

                                    {/* Bottom fade */}
                                    <div className="h-6 bg-gradient-to-t from-card to-transparent pointer-events-none" />

                                    {/* Sticky footer */}
                                    <div className="sticky bottom-0 bg-card/90 backdrop-blur border-t border-border p-3 flex items-center justify-between">
                                        <button
                                            onClick={() => {
                                                setSearchQuery('');
                                                setSelectedStatus('All');
                                                setSelectedCategory('All');
                                                setSelectedLocation('All');
                                                setOnlyFlagships(false);
                                            }}
                                            className="text-xs font-semibold text-[#A37B4C] hover:underline"
                                        >
                                            Clear all
                                        </button>
                                        <span className="text-xs text-muted-foreground">
                                            {filteredProjects.length} results
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* Main grid area */}
                        <div className="min-w-0">
                            {filteredProjects.length === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex flex-col items-center justify-center py-20 text-center"
                                >
                                    <motion.div
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                                    >
                                        <Building2 className="w-16 h-16 text-[#A37B4C] mb-4" />
                                    </motion.div>
                                    <h3 className="font-display text-xl mb-2 text-foreground">
                                        No properties match your filters
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-6">
                                        Try adjusting your search or filter criteria.
                                    </p>
                                    <button
                                        onClick={() => {
                                            setSearchQuery('');
                                            setSelectedStatus('All');
                                            setSelectedCategory('All');
                                            setSelectedLocation('All');
                                            setOnlyFlagships(false);
                                        }}
                                        className="px-6 py-3 rounded-full bg-[#A37B4C] text-white text-sm font-semibold min-h-[44px]"
                                    >
                                        Clear all filters
                                    </button>
                                </motion.div>
                            ) : (
                                <>
                                    <div className="mb-6">
                                        <RevealText
                                            text="Explore the portfolio"
                                            as="h2"
                                            className="font-display text-3xl sm:text-4xl font-medium text-foreground leading-[1.18]"
                                        />
                                    </div>
                                    <AnimatePresence mode="popLayout">
                                        <motion.div
                                            key={`${selectedStatus}-${selectedCategory}-${selectedLocation}-${onlyFlagships}`}
                                            initial="hidden"
                                            whileInView="visible"
                                            viewport={{ once: true, amount: 0.15 }}
                                            variants={stagger(0.08)}
                                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                        >
                                            {visibleProjects.map((project) => {
                                                const isFav = savedFavorites.includes(project.id);
                                                return (
                                                    <motion.div
                                                        key={project.id}
                                                        layout
                                                        variants={fadeUp}
                                                        whileHover={{ y: -6 }}
                                                        className="group rounded-2xl border overflow-hidden bg-card border-border hover:border-[#A37B4C]/40 transition-colors flex flex-col cursor-pointer"
                                                        onClick={() => router.visit(`/property/${project.id}`)}
                                                    >
                                                        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                                                            <img
                                                                src={project.image}
                                                                alt={project.name}
                                                                loading="lazy"
                                                                decoding="async"
                                                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                                            />
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                                            <motion.div
                                                                initial={{ scale: 0 }}
                                                                whileInView={{ scale: 1 }}
                                                                viewport={{ once: true }}
                                                                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                                                                className="absolute top-3 left-3"
                                                            >
                                                                <span
                                                                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-md border ${
                                                                        project.status === 'Ongoing'
                                                                            ? 'bg-[#A37B4C]/90 text-white border-[#B88C57]/30'
                                                                            : 'bg-emerald-700/90 text-white border-emerald-400/30'
                                                                    }`}
                                                                >
                                                                    {project.status}
                                                                </span>
                                                            </motion.div>

                                                            {project.isFlagship && (
                                                                <span className="absolute top-3 left-[5.5rem] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#B88C57] text-stone-950 flex items-center gap-1 shadow-md">
                                                                    <Award className="w-3 h-3" /> Flagship
                                                                </span>
                                                            )}

                                                            <button
                                                                onClick={() => toggleFavorite(project.id)}
                                                                className="absolute top-3 right-3 p-2.5 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/20 min-w-[44px] min-h-[44px] flex items-center justify-center"
                                                            >
                                                                <motion.div
                                                                    animate={
                                                                        isFav
                                                                            ? { scale: [1, 1.25, 1] }
                                                                            : { scale: 1 }
                                                                    }
                                                                    transition={{ duration: 0.3 }}
                                                                >
                                                                    <Heart
                                                                        className={`w-4 h-4 ${
                                                                            isFav
                                                                                ? 'fill-[#A37B4C] text-[#A37B4C]'
                                                                                : 'text-white'
                                                                        }`}
                                                                    />
                                                                </motion.div>
                                                            </button>

                                                            <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center gap-1.5 text-xs text-stone-200 font-medium">
                                                                <MapPin className="w-3.5 h-3.5 text-[#A37B4C] flex-shrink-0" />
                                                                <span className="truncate">{project.location}</span>
                                                            </div>
                                                        </div>

                                                        <div className="p-5 space-y-2 flex-1 flex flex-col">
                                                            <span className="text-[11px] font-bold tracking-widest uppercase text-[#A37B4C] dark:text-[#B88C57]">
                                                                {project.category}
                                                            </span>
                                                            <h3 className="text-lg font-display font-medium leading-snug line-clamp-2 text-foreground">
                                                                {project.name}
                                                            </h3>
                                                            <p className="text-xs text-muted-foreground line-clamp-2 flex-1">
                                                                Verified development site in {project.location}. Managed
                                                                directly under The Associate guarantees.
                                                            </p>

                                                            <div className="pt-4 border-t border-border flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#A37B4C] dark:text-[#B88C57]">
                                                                <span>Inquire Details</span>
                                                                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#A37B4C]/10 group-hover:bg-[#A37B4C] group-hover:text-white transition-colors">
                                                                    <ArrowUpRight className="w-4 h-4" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                );
                                            })}
                                        </motion.div>
                                    </AnimatePresence>

                                    <div className="flex flex-col items-center gap-4 mt-8">
                                        {hasMore && (
                                            <motion.button
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.97 }}
                                                onClick={() => setVisibleCount((prev) => prev + 9)}
                                                className="px-8 py-3 rounded-full bg-[#A37B4C] text-white font-medium text-sm shadow-lg min-h-[44px]"
                                            >
                                                Load More
                                            </motion.button>
                                        )}
                                        {hasMore && (
                                            <motion.button
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.97 }}
                                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                                className="px-4 py-2 rounded-full border border-border text-xs font-medium text-muted-foreground hover:text-foreground hover:border-[#A37B4C]/40 transition-colors min-h-[44px]"
                                            >
                                                Back to top
                                            </motion.button>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            {/* Mobile Bottom Sheet */}
            <BottomSheet
                open={isMobileFilterOpen}
                onClose={() => setIsMobileFilterOpen(false)}
                title="Filter Projects"
                footer={
                    <button
                        onClick={() => setIsMobileFilterOpen(false)}
                        className="w-full py-3 rounded-xl bg-[#A37B4C] text-white font-medium text-sm min-h-[44px]"
                    >
                        Show {filteredProjects.length} results
                    </button>
                }
            >
                <div className="space-y-4">
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest mb-3 text-foreground">
                            Project Status
                        </h4>
                        <div className="flex rounded-full border border-border bg-muted p-1">
                            {['All', 'Ongoing', 'Completed'].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setSelectedStatus(status)}
                                    className={`relative z-10 flex-1 px-3 py-2 text-sm font-medium rounded-full transition-colors min-h-[44px] ${
                                        selectedStatus === status ? 'text-white' : 'text-muted-foreground'
                                    }`}
                                >
                                    {selectedStatus === status && (
                                        <motion.div
                                            layoutId="status-pill-mobile"
                                            className="absolute inset-0 rounded-full bg-[#A37B4C]"
                                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                    <span className="relative z-20">
                                        {status} ({statusCounts[status as keyof typeof statusCounts]})
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest mb-3 text-foreground">
                            Property Type
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {categoryOptions.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(selectedCategory === cat ? 'All' : cat)}
                                    className={`px-3 py-2 rounded-full text-xs border transition-colors min-h-[44px] ${
                                        selectedCategory === cat
                                            ? 'bg-[#A37B4C] text-white border-[#A37B4C]'
                                            : 'border-border hover:border-[#A37B4C] text-foreground'
                                    }`}
                                >
                                    {cat} ({getCategoryCount(cat)})
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest mb-3 text-foreground">
                            Location
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {locationOptions.map((loc) => (
                                <button
                                    key={loc}
                                    onClick={() => setSelectedLocation(selectedLocation === loc ? 'All' : loc)}
                                    className={`px-3 py-2 rounded-full text-xs border transition-colors min-h-[44px] ${
                                        selectedLocation === loc
                                            ? 'bg-[#A37B4C] text-white border-[#A37B4C]'
                                            : 'border-border hover:border-[#A37B4C] text-foreground'
                                    }`}
                                >
                                    {loc}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest mb-3 text-foreground">
                            Flagship
                        </h4>
                        <button
                            onClick={() => setOnlyFlagships(!onlyFlagships)}
                            role="switch"
                            aria-checked={onlyFlagships}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors min-h-[44px] ${
                                onlyFlagships ? 'bg-[#A37B4C] text-white' : 'hover:bg-muted text-foreground'
                            }`}
                        >
                            <span>Flagship Only</span>
                            <span>{onlyFlagships ? 'On' : 'Off'}</span>
                        </button>
                    </div>

                    {isFilterActive && (
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setSelectedStatus('All');
                                setSelectedCategory('All');
                                setSelectedLocation('All');
                                setOnlyFlagships(false);
                            }}
                            className="w-full py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors min-h-[44px]"
                        >
                            Reset all filters
                        </button>
                    )}
                </div>
            </BottomSheet>
        </div>
    );
}
