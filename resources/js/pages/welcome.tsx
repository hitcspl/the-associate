import { Head, Link, usePage } from '@inertiajs/react';
import { login, register, dashboard } from '@/routes';
import { Button } from '@/components/ui/button';
import { useAppearance } from '@/hooks/use-appearance';
import {
    Heart,
    Search,
    ChevronLeft,
    ChevronRight,
    MapPin,
    Home as HomeIcon,
    DollarSign,
    Building,
    Tag,
    Key,
    Settings,
    Sun,
    Moon,
    Menu,
    X,
    Phone,
    Mail,
    ArrowRight,
    Bed,
    Bath,
    Maximize2,
    CheckCircle2,
    SlidersHorizontal,
    Star,
} from 'lucide-react';
import { useState, useMemo } from 'react';

interface Property {
    id: number;
    title: string;
    location: string;
    city: string;
    type: 'Villa' | 'Loft' | 'Penthouse' | 'Residence' | 'Apartment';
    price: number;
    beds: number;
    baths: number;
    sqft: number;
    image: string;
    featured?: boolean;
    tag?: string;
}

const HERO_SLIDES: Property[] = [
    {
        id: 1,
        title: 'Modern Villa',
        location: 'Beverly Hills, CA',
        city: 'Beverly Hills',
        type: 'Villa',
        price: 2450000,
        beds: 4,
        baths: 3,
        sqft: 3500,
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
        tag: 'Featured',
    },
    {
        id: 2,
        title: 'Sunset Horizon Villa',
        location: 'Malibu, CA',
        city: 'Malibu',
        type: 'Villa',
        price: 3200000,
        beds: 5,
        baths: 4,
        sqft: 4200,
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
        tag: 'Exclusive',
    },
    {
        id: 3,
        title: 'The Glass Pavilion',
        location: 'Bel Air, CA',
        city: 'Bel Air',
        type: 'Residence',
        price: 4850000,
        beds: 6,
        baths: 5,
        sqft: 5600,
        image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85',
        tag: 'New Listing',
    },
    {
        id: 4,
        title: 'Coastal Sanctuary',
        location: 'Laguna Beach, CA',
        city: 'Laguna Beach',
        type: 'Villa',
        price: 3750000,
        beds: 4,
        baths: 4,
        sqft: 3900,
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
        tag: 'Luxury',
    },
];

const FEATURED_PROPERTIES: Property[] = [
    {
        id: 101,
        title: 'Modern Residence',
        location: 'Beverly Hills, CA',
        city: 'Beverly Hills',
        type: 'Residence',
        price: 2450000,
        beds: 4,
        baths: 3,
        sqft: 3500,
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    },
    {
        id: 102,
        title: 'Luxury Villa',
        location: 'Malibu, CA',
        city: 'Malibu',
        type: 'Villa',
        price: 3200000,
        beds: 5,
        baths: 4,
        sqft: 4200,
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    },
    {
        id: 103,
        title: 'Urban Loft',
        location: 'New York, NY',
        city: 'New York',
        type: 'Loft',
        price: 1250000,
        beds: 2,
        baths: 2,
        sqft: 1800,
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
    },
    {
        id: 104,
        title: 'Penthouse Suite',
        location: 'Miami, FL',
        city: 'Miami',
        type: 'Penthouse',
        price: 2950000,
        beds: 3,
        baths: 3,
        sqft: 2800,
        image: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=800&q=80',
    },
];

const TESTIMONIALS = [
    {
        quote: 'The team was incredibly professional and made the entire process smooth and stress-free. Highly recommend!',
        author: 'Sarah Johnson',
        role: 'Home Buyer',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        location: 'Beverly Hills, CA',
        image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
    },
    {
        quote: 'Associate helped us find an off-market architectural masterpiece in Malibu within two weeks. Absolutely flawless service.',
        author: 'David & Marcus Miller',
        role: 'Property Investors',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        location: 'Malibu, CA',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    },
    {
        quote: 'Their attention to detail and curated luxury selection made buying our first home an unforgettable experience.',
        author: 'Elena Rostova',
        role: 'Interior Designer',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
        location: 'New York, NY',
        image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
    },
];

export default function Welcome() {
    const { auth } = usePage().props;
    const { resolvedAppearance, updateAppearance } = useAppearance();

    // State
    const [heroIndex, setHeroIndex] = useState(0);
    const [favorites, setFavorites] = useState<number[]>([101]);
    const [testimonialIndex, setTestimonialIndex] = useState(0);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchLocation, setSearchLocation] = useState('All');
    const [searchType, setSearchType] = useState('All');
    const [searchBudget, setSearchBudget] = useState('All');
    const [contactModalOpen, setContactModalOpen] = useState(false);
    const [contactSuccess, setContactSuccess] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

    const toggleFavorite = (id: number, e: React.MouseEvent) => {
        e.stopPropagation();
        setFavorites((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const nextHeroSlide = () => {
        setHeroIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    };

    const prevHeroSlide = () => {
        setHeroIndex((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
    };

    const nextTestimonial = () => {
        setTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    };

    const prevTestimonial = () => {
        setTestimonialIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
    };

    const toggleTheme = () => {
        updateAppearance(resolvedAppearance === 'dark' ? 'light' : 'dark');
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
        }).format(price);
    };

    const currentHero = HERO_SLIDES[heroIndex];
    const currentTestimonial = TESTIMONIALS[testimonialIndex];

    const filteredProperties = useMemo(() => {
        return FEATURED_PROPERTIES.filter((p) => {
            if (searchLocation !== 'All' && !p.location.toLowerCase().includes(searchLocation.toLowerCase())) {
                return false;
            }
            if (searchType !== 'All' && p.type !== searchType) {
                return false;
            }
            if (searchBudget === 'under2m' && p.price >= 2000000) return false;
            if (searchBudget === '2m-3m' && (p.price < 2000000 || p.price > 3000000)) return false;
            if (searchBudget === 'above3m' && p.price <= 3000000) return false;
            return true;
        });
    }, [searchLocation, searchType, searchBudget]);

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <Head title="Associate - Premium Real Estate" />

            {/* Top Navigation */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-md border-b border-border/40 transition-colors duration-300">
                <div className="container-site flex h-20 items-center justify-between">
                    {/* Brand Logo */}
                    <a href="#" className="flex items-center gap-2.5 group">
                        <div className="relative flex items-center justify-center w-8 h-8">
                            {/* Geometric logo from UI */}
                            <svg
                                className="w-8 h-8 text-gold transform transition-transform group-hover:scale-105"
                                viewBox="0 0 32 32"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M16 4L4 26H28L16 4Z"
                                    stroke="currentColor"
                                    strokeWidth="2.2"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M10 20L16 9L22 20H10Z"
                                    fill="currentColor"
                                    fillOpacity="0.85"
                                />
                                <line
                                    x1="7"
                                    y1="22"
                                    x2="25"
                                    y2="22"
                                    stroke="var(--foreground)"
                                    strokeWidth="2"
                                />
                            </svg>
                        </div>
                        <span className="font-display text-2xl font-normal tracking-wide text-foreground">
                            associate
                        </span>
                    </a>

                    {/* Desktop Nav Links */}
                    <nav className="hidden md:flex items-center gap-9">
                        <a
                            href="#home"
                            className="text-sm font-medium text-foreground relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gold"
                        >
                            Home
                        </a>
                        <a
                            href="#properties"
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Properties
                        </a>
                        <a
                            href="#about"
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            About
                        </a>
                        <a
                            href="#services"
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Services
                        </a>
                        <a
                            href="#contact"
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Contact
                        </a>
                    </nav>

                    {/* Header Actions */}
                    <div className="flex items-center gap-3">
                        {/* Theme Switcher */}
                        <button
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/60 text-foreground hover:bg-muted transition-colors"
                        >
                            {resolvedAppearance === 'dark' ? (
                                <Sun className="h-4 w-4 text-gold transition-transform hover:rotate-45" />
                            ) : (
                                <Moon className="h-4 w-4 text-foreground transition-transform hover:-rotate-12" />
                            )}
                        </button>

                        {/* Search Icon */}
                        <a
                            href="#search-section"
                            className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full text-foreground/80 hover:text-foreground hover:bg-muted/80 transition-colors"
                        >
                            <Search className="h-4 w-4" />
                        </a>

                        {/* Auth / Get in Touch */}
                        {auth?.user ? (
                            <Link href={dashboard()}>
                                <Button
                                    size="sm"
                                    className="bg-gold text-white hover:bg-gold-hover rounded-full px-5 font-normal tracking-wide text-xs"
                                >
                                    Dashboard
                                </Button>
                            </Link>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link
                                    href={login()}
                                    className="hidden sm:inline-block text-xs font-medium text-foreground hover:text-gold px-3 py-2 transition-colors"
                                >
                                    Log In
                                </Link>
                                <Button
                                    onClick={() => setContactModalOpen(true)}
                                    size="sm"
                                    className="bg-gold text-white hover:bg-gold-hover rounded-full px-5 font-normal tracking-wide text-xs flex items-center gap-1.5 shadow-sm"
                                >
                                    <span>Get In Touch</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </Button>
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground"
                            aria-label="Toggle mobile menu"
                        >
                            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Dropdown Nav */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-b border-border bg-card/95 backdrop-blur-md px-6 py-6 space-y-4 animate-in slide-in-from-top-2">
                        <a
                            href="#home"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block text-base font-medium text-gold"
                        >
                            Home
                        </a>
                        <a
                            href="#properties"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block text-base font-medium text-foreground hover:text-gold"
                        >
                            Properties
                        </a>
                        <a
                            href="#about"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block text-base font-medium text-foreground hover:text-gold"
                        >
                            About
                        </a>
                        <a
                            href="#services"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block text-base font-medium text-foreground hover:text-gold"
                        >
                            Services
                        </a>
                        <a
                            href="#contact"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block text-base font-medium text-foreground hover:text-gold"
                        >
                            Contact
                        </a>
                        <div className="pt-4 border-t border-border flex flex-col gap-2">
                            {!auth?.user && (
                                <Link
                                    href={login()}
                                    className="w-full text-center py-2 text-sm font-medium border border-border rounded-lg text-foreground"
                                >
                                    Log In
                                </Link>
                            )}
                            <Button
                                onClick={() => {
                                    setMobileMenuOpen(false);
                                    setContactModalOpen(true);
                                }}
                                className="w-full bg-gold text-white hover:bg-gold-hover rounded-lg"
                            >
                                Get In Touch
                            </Button>
                        </div>
                    </div>
                )}
            </header>

            {/* Hero Section */}
            <section id="home" className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
                {/* Subtle luxury background glow */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gold/5 blur-[140px] pointer-events-none rounded-full" />

                <div className="container-site">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center min-h-[580px]">
                        {/* Left Hero Content */}
                        <div className="lg:col-span-5 flex flex-col justify-center space-y-6 z-10">
                            {/* Category Subhead with Line */}
                            <div className="flex items-center gap-3">
                                <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-muted-foreground">
                                    Premium Real Estate
                                </span>
                                <div className="h-px w-10 bg-gold/60" />
                            </div>

                            {/* Headline */}
                            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-normal leading-[1.08] tracking-tight text-foreground">
                                Find Your
                                <br />
                                Dream Home
                            </h1>

                            {/* Subtitle */}
                            <p className="text-muted-foreground text-sm sm:text-base lg:text-lg max-w-md leading-relaxed font-normal">
                                Discover thoughtfully selected residences designed around the way you live.
                            </p>

                            {/* CTA Button */}
                            <div className="pt-2 flex items-center gap-4">
                                <a href="#properties">
                                    <Button
                                        size="lg"
                                        className="bg-gold text-white hover:bg-gold-hover rounded-full px-7 py-6 text-sm font-medium tracking-wide flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
                                    >
                                        <span>Explore Properties</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </Button>
                                </a>
                            </div>

                            {/* Slider Index Indicator */}
                            <div className="pt-6 flex items-center gap-4 text-xs font-mono tracking-widest text-muted-foreground">
                                <span className="text-foreground font-semibold text-sm">
                                    0{heroIndex + 1}
                                </span>
                                <div className="w-14 h-px bg-border relative">
                                    <div
                                        className="absolute left-0 top-0 bottom-0 bg-gold transition-all duration-300"
                                        style={{ width: `${((heroIndex + 1) / HERO_SLIDES.length) * 100}%` }}
                                    />
                                </div>
                                <span>0{HERO_SLIDES.length}</span>
                            </div>
                        </div>

                        {/* Right Hero Showcase Cards & Carousel */}
                        <div className="lg:col-span-7 relative">
                            {/* Main Stage Window */}
                            <div className="relative mx-auto w-full max-w-[620px] aspect-[16/11] sm:aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border border-border/50 group">
                                {/* Hero Property Background */}
                                <img
                                    src={currentHero.image}
                                    alt={currentHero.title}
                                    className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105"
                                />

                                {/* Subtle gradient overlays */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/30" />

                                {/* Carousel Navigation Buttons */}
                                <button
                                    onClick={prevHeroSlide}
                                    aria-label="Previous Slide"
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all hover:scale-110 z-20"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={nextHeroSlide}
                                    aria-label="Next Slide"
                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all hover:scale-110 z-20"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>

                                {/* Floating Stacked Card matching the design mockups */}
                                <div className="absolute right-4 bottom-4 sm:right-6 sm:bottom-6 w-[280px] sm:w-[320px] bg-card/95 dark:bg-[#121517]/95 backdrop-blur-md border border-border/80 rounded-xl p-4 sm:p-5 shadow-2xl z-20 transition-all">
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <div className="inline-block px-2 py-0.5 mb-1.5 text-[10px] font-semibold uppercase tracking-wider bg-gold/15 text-gold rounded-sm">
                                                {currentHero.tag || 'Luxury'}
                                            </div>
                                            <h3 className="font-display text-lg sm:text-xl font-medium text-foreground">
                                                {currentHero.title}
                                            </h3>
                                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                                                <MapPin className="w-3 h-3 text-gold shrink-0" />
                                                {currentHero.location}
                                            </p>
                                        </div>
                                        <button
                                            onClick={(e) => toggleFavorite(currentHero.id, e)}
                                            className="p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-red-500 transition-colors"
                                            aria-label="Favorite"
                                        >
                                            <Heart
                                                className={`w-4 h-4 ${
                                                    favorites.includes(currentHero.id)
                                                        ? 'fill-red-500 text-red-500'
                                                        : ''
                                                }`}
                                            />
                                        </button>
                                    </div>

                                    {/* Specs and Price */}
                                    <div className="mt-3.5 pt-3 border-t border-border flex items-center justify-between">
                                        <div className="text-xs text-muted-foreground flex items-center gap-3">
                                            <span>{currentHero.beds} Beds</span>
                                            <span>•</span>
                                            <span>{currentHero.baths} Baths</span>
                                        </div>
                                        <div className="text-sm sm:text-base font-semibold text-gold">
                                            {formatPrice(currentHero.price)}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Stacked decorative card background peek */}
                            <div className="hidden sm:block absolute -right-3 top-8 bottom-8 w-12 bg-card/30 dark:bg-card/20 rounded-r-2xl -z-10 border-y border-r border-border/40 backdrop-blur-sm" />
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 lg:py-28 bg-card/50 dark:bg-[#0e1113] border-y border-border/50">
                <div className="container-site">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                        {/* About Content */}
                        <div className="lg:col-span-5 space-y-6">
                            <div className="flex items-center gap-3">
                                <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-muted-foreground">
                                    About Us
                                </span>
                                <div className="h-px w-8 bg-gold/60" />
                            </div>

                            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-foreground">
                                More than properties.
                                <br />
                                We build futures.
                            </h2>

                            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                                At Associate, we believe real estate is not just about property; it's about people, dreams and long-term value. With years of experience and a commitment to excellence, we help you find the perfect space to call home or the right investment for tomorrow.
                            </p>

                            <div className="pt-2">
                                <Button
                                    onClick={() => setContactModalOpen(true)}
                                    className="bg-gold text-white hover:bg-gold-hover rounded-full px-6 py-5 text-xs font-medium tracking-wide flex items-center gap-2"
                                >
                                    <span>Explore Our Story</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </Button>
                            </div>
                        </div>

                        {/* About Visual Showcase with Floating Stats badge */}
                        <div className="lg:col-span-7 relative">
                            <div className="relative rounded-2xl overflow-hidden border border-border aspect-[16/10] shadow-xl">
                                <img
                                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                                    alt="Associate Luxury Architecture"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                            </div>

                            {/* Floating Happy Clients Badge */}
                            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-card/95 dark:bg-[#121517]/95 backdrop-blur-md border border-border rounded-xl p-4 sm:p-5 shadow-xl flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-gold/15 flex items-center justify-center text-gold">
                                    <Building className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="font-display text-xl sm:text-2xl font-bold text-foreground">
                                        5,000+
                                    </div>
                                    <div className="text-xs text-muted-foreground font-medium">
                                        Happy Clients
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Properties Grid Section */}
            <section id="properties" className="py-20 lg:py-32">
                <div className="container-site">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-muted-foreground">
                                    Featured Properties
                                </span>
                                <div className="h-px w-8 bg-gold/60" />
                            </div>
                            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground leading-tight">
                                Properties selected
                                <br />
                                for exceptional living.
                            </h2>
                        </div>

                        <a
                            href="#search-section"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-foreground hover:text-gold transition-colors"
                        >
                            <span>View All Properties</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                    </div>

                    {/* Properties 4-Column Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredProperties.map((property) => (
                            <div
                                key={property.id}
                                onClick={() => setSelectedProperty(property)}
                                className="group bg-card dark:bg-[#121517] border border-border/80 hover:border-gold/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
                            >
                                {/* Thumbnail Image */}
                                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                                    <img
                                        src={property.image}
                                        alt={property.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    {/* Favorite button */}
                                    <button
                                        onClick={(e) => toggleFavorite(property.id, e)}
                                        aria-label="Save to favorites"
                                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
                                    >
                                        <Heart
                                            className={`w-4 h-4 ${
                                                favorites.includes(property.id)
                                                    ? 'fill-red-500 text-red-500'
                                                    : ''
                                            }`}
                                        />
                                    </button>
                                </div>

                                {/* Content Details */}
                                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                                    <div>
                                        <h3 className="font-display text-lg font-medium text-foreground group-hover:text-gold transition-colors">
                                            {property.title}
                                        </h3>
                                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                                            <MapPin className="w-3 h-3 text-gold shrink-0" />
                                            {property.location}
                                        </p>
                                    </div>

                                    {/* Key Attributes */}
                                    <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-3 border-t border-border/60">
                                        <div className="flex items-center gap-1">
                                            <Bed className="w-3.5 h-3.5 text-foreground/70" />
                                            <span>{property.beds} Beds</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Bath className="w-3.5 h-3.5 text-foreground/70" />
                                            <span>{property.baths} Baths</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Maximize2 className="w-3.5 h-3.5 text-foreground/70" />
                                            <span>{property.sqft.toLocaleString()} sqft</span>
                                        </div>
                                    </div>

                                    {/* Price and Action Button */}
                                    <div className="pt-2 flex items-center justify-between">
                                        <div className="font-semibold text-base sm:text-lg text-foreground">
                                            {formatPrice(property.price)}
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-gold/15 text-gold group-hover:bg-gold group-hover:text-white flex items-center justify-center transition-all">
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Search Filter Bar Section */}
            <section id="search-section" className="py-16 bg-card/60 dark:bg-[#0e1113] border-y border-border/50">
                <div className="container-site">
                    <div className="bg-card dark:bg-[#121517] border border-border rounded-2xl p-6 sm:p-8 shadow-xl">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                            {/* Left Search Info */}
                            <div className="lg:col-span-4 space-y-2">
                                <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-muted-foreground">
                                    Find Your Property
                                </span>
                                <h2 className="font-display text-2xl sm:text-3xl font-normal text-foreground">
                                    Search. Explore. Find.
                                </h2>
                                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                    Use our advanced search to find the perfect property that matches your lifestyle and budget.
                                </p>
                            </div>

                            {/* Right Interactive Inputs */}
                            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {/* Location Filter */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-foreground flex items-center gap-1.5">
                                        <MapPin className="w-3.5 h-3.5 text-gold" />
                                        <span>Location</span>
                                    </label>
                                    <select
                                        value={searchLocation}
                                        onChange={(e) => setSearchLocation(e.target.value)}
                                        className="w-full bg-background border border-border text-foreground rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-gold"
                                    >
                                        <option value="All">All Locations</option>
                                        <option value="Beverly Hills">Beverly Hills, CA</option>
                                        <option value="Malibu">Malibu, CA</option>
                                        <option value="New York">New York, NY</option>
                                        <option value="Miami">Miami, FL</option>
                                    </select>
                                </div>

                                {/* Property Type Filter */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-foreground flex items-center gap-1.5">
                                        <HomeIcon className="w-3.5 h-3.5 text-gold" />
                                        <span>Property Type</span>
                                    </label>
                                    <select
                                        value={searchType}
                                        onChange={(e) => setSearchType(e.target.value)}
                                        className="w-full bg-background border border-border text-foreground rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-gold"
                                    >
                                        <option value="All">Any type</option>
                                        <option value="Villa">Luxury Villa</option>
                                        <option value="Residence">Residence</option>
                                        <option value="Loft">Urban Loft</option>
                                        <option value="Penthouse">Penthouse</option>
                                    </select>
                                </div>

                                {/* Budget Filter */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-foreground flex items-center gap-1.5">
                                        <DollarSign className="w-3.5 h-3.5 text-gold" />
                                        <span>Budget</span>
                                    </label>
                                    <select
                                        value={searchBudget}
                                        onChange={(e) => setSearchBudget(e.target.value)}
                                        className="w-full bg-background border border-border text-foreground rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-gold"
                                    >
                                        <option value="All">Min - Max (Any)</option>
                                        <option value="under2m">Under $2,000,000</option>
                                        <option value="2m-3m">$2,000,000 - $3,000,000</option>
                                        <option value="above3m">$3,000,000+</option>
                                    </select>
                                </div>

                                {/* Search CTA button across mobile & desktop */}
                                <div className="sm:col-span-3 pt-2 flex justify-end">
                                    <Button
                                        onClick={() => {
                                            const element = document.getElementById('properties');
                                            element?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                        className="w-full sm:w-auto bg-gold text-white hover:bg-gold-hover rounded-xl px-8 py-2.5 text-xs font-medium tracking-wide flex items-center justify-center gap-2"
                                    >
                                        <span>Search Properties</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-20 lg:py-28">
                <div className="container-site">
                    <div className="max-w-2xl mb-14 space-y-3">
                        <div className="flex items-center gap-3">
                            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-muted-foreground">
                                Our Services
                            </span>
                            <div className="h-px w-8 bg-gold/60" />
                        </div>
                        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground leading-tight">
                            Everything You Need,
                            <br />
                            Under One Roof.
                        </h2>
                    </div>

                    {/* 4 Services Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                title: 'Buy Property',
                                description: 'Find your perfect home with expert guidance.',
                                icon: <HomeIcon className="w-6 h-6" />,
                            },
                            {
                                title: 'Sell Property',
                                description: 'Get the best value with our market expertise.',
                                icon: <Tag className="w-6 h-6" />,
                            },
                            {
                                title: 'Rent Property',
                                description: 'Flexible options for short or long term.',
                                icon: <Building className="w-6 h-6" />,
                            },
                            {
                                title: 'Property Management',
                                description: 'Hassle-free management for your investment.',
                                icon: <Settings className="w-6 h-6" />,
                            },
                        ].map((service, idx) => (
                            <div
                                key={idx}
                                className="bg-card dark:bg-[#121517] border border-border hover:border-gold/60 rounded-2xl p-7 transition-all duration-300 hover:shadow-lg group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-gold/15 text-gold flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    {service.icon}
                                </div>
                                <h3 className="font-display text-xl font-medium text-foreground mb-2 group-hover:text-gold transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                    {service.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Impact Banner */}
            <section className="py-14 bg-[#1b1916] text-white relative overflow-hidden border-y border-border/40">
                <div className="absolute inset-0 opacity-25">
                    <img
                        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=70"
                        alt="Background"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

                <div className="container-site relative z-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 items-center text-center sm:text-left">
                        {/* Title block */}
                        <div className="lg:col-span-1 space-y-1">
                            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gold">
                                Our Impact
                            </span>
                            <h3 className="font-display text-xl font-medium leading-tight">
                                Building trust, creating value.
                            </h3>
                        </div>

                        {/* Stat 1 */}
                        <div className="space-y-1">
                            <div className="font-display text-3xl sm:text-4xl font-normal text-gold">
                                8+
                            </div>
                            <div className="text-xs text-white/70">Years of Experience</div>
                        </div>

                        {/* Stat 2 */}
                        <div className="space-y-1">
                            <div className="font-display text-3xl sm:text-4xl font-normal text-gold">
                                1,200+
                            </div>
                            <div className="text-xs text-white/70">Properties Sold</div>
                        </div>

                        {/* Stat 3 */}
                        <div className="space-y-1">
                            <div className="font-display text-3xl sm:text-4xl font-normal text-gold">
                                5,000+
                            </div>
                            <div className="text-xs text-white/70">Happy Clients</div>
                        </div>

                        {/* Stat 4 */}
                        <div className="space-y-1">
                            <div className="font-display text-3xl sm:text-4xl font-normal text-gold">
                                98%
                            </div>
                            <div className="text-xs text-white/70">Client Satisfaction</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 lg:py-32">
                <div className="container-site">
                    <div className="max-w-2xl mb-12 space-y-3">
                        <div className="flex items-center gap-3">
                            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-muted-foreground">
                                Testimonials
                            </span>
                            <div className="h-px w-8 bg-gold/60" />
                        </div>
                        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground leading-tight">
                            Real Stories. Lasting Relationships.
                        </h2>
                    </div>

                    {/* Testimonial Showcase Box */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-card dark:bg-[#121517] border border-border rounded-2xl p-6 sm:p-10 shadow-xl">
                        {/* Quote Card */}
                        <div className="lg:col-span-7 space-y-6">
                            <div className="text-gold font-serif text-4xl">“</div>
                            <p className="text-base sm:text-lg lg:text-xl font-display text-foreground leading-relaxed italic">
                                {currentTestimonial.quote}
                            </p>

                            <div className="flex items-center justify-between pt-4 border-t border-border">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={currentTestimonial.avatar}
                                        alt={currentTestimonial.author}
                                        className="w-11 h-11 rounded-full object-cover border border-gold/40"
                                    />
                                    <div>
                                        <div className="font-medium text-sm text-foreground">
                                            {currentTestimonial.author}
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            {currentTestimonial.role} • {currentTestimonial.location}
                                        </div>
                                    </div>
                                </div>

                                {/* Slider controls */}
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={prevTestimonial}
                                        aria-label="Previous Testimonial"
                                        className="w-9 h-9 rounded-full border border-border hover:bg-muted text-foreground flex items-center justify-center transition-colors"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={nextTestimonial}
                                        aria-label="Next Testimonial"
                                        className="w-9 h-9 rounded-full border border-border hover:bg-muted text-foreground flex items-center justify-center transition-colors"
                                    >
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Image Showcase */}
                        <div className="lg:col-span-5 relative">
                            <div className="aspect-[4/3] rounded-xl overflow-hidden border border-border/80 shadow-md">
                                <img
                                    src={currentTestimonial.image}
                                    alt="Testimonial residence"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* "What's Next" CTA Banner */}
            <section className="py-16">
                <div className="container-site">
                    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#211b14] to-[#120f0c] text-white p-8 sm:p-14 border border-gold/30 shadow-2xl">
                        {/* Background warm lighting */}
                        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-30 pointer-events-none">
                            <img
                                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=70"
                                alt="Luxury home"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="relative z-10 max-w-xl space-y-4">
                            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gold">
                                Ready For
                            </span>
                            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight">
                                What's Next?
                            </h2>
                            <p className="text-white/80 text-xs sm:text-sm">
                                Let's find a property that feels like yours.
                            </p>
                            <div className="pt-2">
                                <Button
                                    onClick={() => setContactModalOpen(true)}
                                    className="bg-gold text-white hover:bg-gold-hover rounded-full px-7 py-5 text-xs font-medium tracking-wide flex items-center gap-2 shadow-lg"
                                >
                                    <span>Get Started</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer id="contact" className="border-t border-border bg-card/60 dark:bg-[#0c0e10] py-14">
                <div className="container-site">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
                        {/* Logo & Info */}
                        <div className="lg:col-span-2 space-y-4">
                            <a href="#" className="flex items-center gap-2.5">
                                <svg
                                    className="w-7 h-7 text-gold"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M16 4L4 26H28L16 4Z"
                                        stroke="currentColor"
                                        strokeWidth="2.2"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M10 20L16 9L22 20H10Z"
                                        fill="currentColor"
                                        fillOpacity="0.85"
                                    />
                                </svg>
                                <span className="font-display text-2xl font-normal text-foreground">
                                    associate
                                </span>
                            </a>
                            <p className="text-xs text-muted-foreground max-w-sm leading-relaxed">
                                Curating the world's most exceptional real estate for discerning individuals and visionary investors.
                            </p>
                            <p className="text-xs text-muted-foreground pt-2">
                                © 2026 Associate Real Estate. All rights reserved.
                            </p>
                        </div>

                        {/* Column: Properties */}
                        <div className="space-y-3">
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                                Properties
                            </h4>
                            <ul className="space-y-2 text-xs text-muted-foreground">
                                <li>
                                    <a href="#properties" className="hover:text-gold transition-colors">
                                        Buy
                                    </a>
                                </li>
                                <li>
                                    <a href="#properties" className="hover:text-gold transition-colors">
                                        Rent
                                    </a>
                                </li>
                                <li>
                                    <a href="#properties" className="hover:text-gold transition-colors">
                                        Invest
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Column: Company */}
                        <div className="space-y-3">
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                                Company
                            </h4>
                            <ul className="space-y-2 text-xs text-muted-foreground">
                                <li>
                                    <a href="#about" className="hover:text-gold transition-colors">
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-gold transition-colors">
                                        Careers
                                    </a>
                                </li>
                                <li>
                                    <button
                                        onClick={() => setContactModalOpen(true)}
                                        className="hover:text-gold transition-colors text-left"
                                    >
                                        Contact
                                    </button>
                                </li>
                            </ul>
                        </div>

                        {/* Column: Stay Connected */}
                        <div className="space-y-3">
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                                Stay Connected
                            </h4>
                            <div className="flex items-center gap-3 text-muted-foreground">
                                <a
                                    href="#"
                                    aria-label="Instagram"
                                    className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:text-gold hover:border-gold transition-colors"
                                >
                                    <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                </a>
                                <a
                                    href="#"
                                    aria-label="Facebook"
                                    className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:text-gold hover:border-gold transition-colors"
                                >
                                    <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </a>
                                <a
                                    href="#"
                                    aria-label="LinkedIn"
                                    className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:text-gold hover:border-gold transition-colors"
                                >
                                    <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-6">
                            <a href="#" className="hover:text-gold transition-colors">
                                Privacy Policy
                            </a>
                            <a href="#" className="hover:text-gold transition-colors">
                                Terms & Conditions
                            </a>
                        </div>
                        <div>Design & Developed for Associate Developers</div>
                    </div>
                </div>
            </footer>

            {/* Mobile Responsive Bottom Navigation Bar (as seen in Image 3!) */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-card/90 backdrop-blur-md border-t border-border py-2 px-6 flex items-center justify-around">
                <a href="#home" className="flex flex-col items-center gap-1 text-gold">
                    <HomeIcon className="w-5 h-5" />
                    <span className="text-[10px] font-medium">Home</span>
                </a>
                <a href="#properties" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
                    <Building className="w-5 h-5" />
                    <span className="text-[10px] font-medium">Properties</span>
                </a>
                <button
                    onClick={() => setContactModalOpen(true)}
                    className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground"
                >
                    <Mail className="w-5 h-5" />
                    <span className="text-[10px] font-medium">Contact</span>
                </button>
            </div>

            {/* Property Detail Modal */}
            {selectedProperty && (
                <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
                    <div className="bg-card dark:bg-[#121517] border border-border max-w-2xl w-full rounded-2xl overflow-hidden shadow-2xl">
                        <div className="relative aspect-[16/10] overflow-hidden">
                            <img
                                src={selectedProperty.image}
                                alt={selectedProperty.title}
                                className="w-full h-full object-cover"
                            />
                            <button
                                onClick={() => setSelectedProperty(null)}
                                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6 sm:p-8 space-y-4">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="font-display text-2xl font-semibold text-foreground">
                                        {selectedProperty.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                        <MapPin className="w-4 h-4 text-gold" />
                                        {selectedProperty.location}
                                    </p>
                                </div>
                                <div className="text-2xl font-display font-semibold text-gold">
                                    {formatPrice(selectedProperty.price)}
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 py-4 border-y border-border text-center">
                                <div>
                                    <div className="text-xs text-muted-foreground">Bedrooms</div>
                                    <div className="text-lg font-semibold text-foreground">{selectedProperty.beds}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-muted-foreground">Bathrooms</div>
                                    <div className="text-lg font-semibold text-foreground">{selectedProperty.baths}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-muted-foreground">Square Feet</div>
                                    <div className="text-lg font-semibold text-foreground">{selectedProperty.sqft.toLocaleString()}</div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <Button
                                    variant="outline"
                                    onClick={() => setSelectedProperty(null)}
                                >
                                    Close
                                </Button>
                                <Button
                                    onClick={() => {
                                        setSelectedProperty(null);
                                        setContactModalOpen(true);
                                    }}
                                    className="bg-gold text-white hover:bg-gold-hover"
                                >
                                    Inquire Now
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Contact Inquiry Modal */}
            {contactModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
                    <div className="bg-card dark:bg-[#121517] border border-border max-w-lg w-full rounded-2xl p-6 sm:p-8 shadow-2xl relative">
                        <button
                            onClick={() => {
                                setContactModalOpen(false);
                                setContactSuccess(false);
                            }}
                            className="absolute top-5 right-5 text-muted-foreground hover:text-foreground"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {contactSuccess ? (
                            <div className="text-center py-8 space-y-4">
                                <div className="w-14 h-14 rounded-full bg-gold/15 text-gold flex items-center justify-center mx-auto">
                                    <CheckCircle2 className="w-8 h-8" />
                                </div>
                                <h3 className="font-display text-2xl font-semibold">Thank You!</h3>
                                <p className="text-sm text-muted-foreground">
                                    Our private advisors have received your inquiry and will contact you promptly.
                                </p>
                                <Button
                                    onClick={() => {
                                        setContactModalOpen(false);
                                        setContactSuccess(false);
                                    }}
                                    className="bg-gold text-white hover:bg-gold-hover rounded-full px-6"
                                >
                                    Done
                                </Button>
                            </div>
                        ) : (
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    setContactSuccess(true);
                                }}
                                className="space-y-4"
                            >
                                <div>
                                    <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gold">
                                        Direct Concierge
                                    </span>
                                    <h3 className="font-display text-2xl font-semibold text-foreground">
                                        Get In Touch
                                    </h3>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Let us know your preferences and a specialist will reach out.
                                    </p>
                                </div>

                                <div className="space-y-3 pt-2">
                                    <div>
                                        <label className="text-xs font-medium text-foreground block mb-1">
                                            Full Name
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="Sarah Jenkins"
                                            className="w-full bg-background border border-border text-foreground rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-gold"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-foreground block mb-1">
                                            Email Address
                                        </label>
                                        <input
                                            required
                                            type="email"
                                            placeholder="sarah@example.com"
                                            className="w-full bg-background border border-border text-foreground rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-gold"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-foreground block mb-1">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            placeholder="+1 (555) 000-0000"
                                            className="w-full bg-background border border-border text-foreground rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-gold"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-foreground block mb-1">
                                            Message / Property Interest
                                        </label>
                                        <textarea
                                            rows={3}
                                            placeholder="I am interested in exploring modern residences in Beverly Hills..."
                                            className="w-full bg-background border border-border text-foreground rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-gold"
                                        />
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <Button
                                        type="submit"
                                        className="w-full bg-gold text-white hover:bg-gold-hover rounded-xl py-2.5 text-xs font-medium"
                                    >
                                        Submit Inquiry
                                    </Button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
