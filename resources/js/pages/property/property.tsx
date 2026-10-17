import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    MapPin,
    ArrowLeft,
    Calendar,
    MapPinned,
    CheckCircle2,
    Phone,
    Mail,
    Award,
    Sparkles,
    Home,
    TreePine,
    CircleParking,
    ShieldCheck,
    DollarSign,
    Play,
    Maximize2,
    Bed,
    Bath,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PropertyImage {
    url: string;
    alt_text?: string;
    type?: string;
}

interface PropertyData {
    id: string;
    title: string;
    name?: string;
    location: string;
    city: string;
    status: string;
    category?: string;
    isFlagship?: boolean;
    featured?: boolean;
    listing_type?: string;
    price?: number;
    price_max?: number;
    price_unit?: string;
    price_label?: string;
    currency?: string;
    description?: string;
    sqft?: number;
    area_unit?: string;
    lot_size?: number;
    image?: string;
    video_url?: string;
    virtual_tour_url?: string;
    contact_name?: string;
    contact_phone?: string;
    contact_email?: string;
    meta_title?: string;
    meta_description?: string;
    highlights?: string[];
    specifications?: Record<string, string>;
    nearby?: { name: string; type: string; distance: string }[];
    faqs?: { q: string; a: string }[];
    attributes?: {
        Parking?: boolean;
        Elevator?: boolean;
        Security?: boolean;
        Gym?: boolean;
    };
    beds?: number;
    baths?: number;
    furnishing?: string;
    rooms?: { beds: number; baths: number };
    images?: PropertyImage[];
}

interface PropertyProps {
    property: PropertyData;
}

export default function Property({ property }: PropertyProps) {
    // Derive display fields from the backend property model
    const propertyName = property.name || property.title;
    const propertyId = property.id;
    const propertyStatus = property.status || 'Available';
    const propertyLocation = property.location;
    const propertyCategory = property.category || 'Residential';
    const propertyImage = property.image || property.images?.[0]?.url || '/placeholder-property.jpg';

    // Format price for display
    const formatPrice = (price: number | null | undefined): string => {
        if (!price) return '—';
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: property.currency || 'USD',
        }).format(price);
    };

    // Helper to render highlights
    const highlightsList = property.highlights || [
        'Premium residential development',
        'Excellent connectivity',
        'Modern amenities',
    ];

    // Helper to render nearby amenities
    const nearbyList = property.nearby || [
        { name: 'Nearby School', type: 'school', distance: '1.5 km' },
    ];

    // Helper to render FAQs
    const faqList = property.faqs || [
        { q: 'What is the price range?', a: 'Please contact our sales team for details.' },
    ];

    // Helper to render specifications
    const specsData = property.specifications || {
        'Structure': 'RCC',
        'Flooring': 'Vitrified',
        'Bathrooms': 'Luxury',
        'Bedrooms': '4+',
    };

    const galleryImages = property.images
        ? property.images.filter((img) => img.type === 'gallery' || !img.type)
        : [
              { url: propertyImage, alt_text: propertyName },
              { url: propertyImage, alt_text: propertyName + ' - Interior' },
          ];

    const beds = property.beds || property.rooms?.beds || 4;
    const baths = property.baths || property.rooms?.baths || 3;

    const metaTitle = property.meta_title || `${propertyName} — Property Details`;
    const metaDesc = property.meta_description || property.description || '';

    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-[#A37B4C] selection:text-white">
            <Head title={metaTitle} />
            <meta name="description" content={metaDesc} />

            <main>
                {/* Hero Section */}
                <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
                    {property.video_url && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    alert('Playing video tour...');
                                }}
                                className="p-4 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                                aria-label="Play video tour"
                            >
                                <Play className="w-6 h-6 text-white" />
                            </button>
                        </div>
                    )}
                    <img
                        src={propertyImage}
                        alt={propertyName}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-[1]" />

                    <div className="relative z-10 h-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-12">
                        <Link
                            href="/properties"
                            className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6 text-sm font-medium transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Properties
                        </Link>

                        <div className="flex flex-wrap gap-2 mb-4">
                            <span
                                className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full backdrop-blur-md border ${
                                    propertyStatus === 'Ongoing' || propertyStatus === 'Available'
                                        ? 'bg-[#A37B4C]/90 text-white border-[#B88C57]/30'
                                        : propertyStatus === 'Completed' || propertyStatus === 'Sold'
                                            ? 'bg-emerald-700/90 text-white border-emerald-400/30'
                                            : 'bg-gray-500/90 text-white border-gray-400/30'
                                }`}
                            >
                                {propertyStatus}
                            </span>
                            {property.featured || property.isFlagship ? (
                                <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-[#B88C57] text-stone-950 flex items-center gap-1">
                                    <Award className="w-3 h-3" /> Flagship
                                </span>
                            ) : null}
                            {propertyCategory ? (
                                <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20">
                                    {propertyCategory}
                                </span>
                            ) : null}
                            {property.listing_type ? (
                                <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20">
                                    {property.listing_type.charAt(0).toUpperCase() + property.listing_type.slice(1)}
                                </span>
                            ) : null}
                        </div>

                        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                            {propertyName}
                        </h1>

                        <div className="flex items-center gap-2 text-white/90">
                            <MapPin className="w-5 h-5 text-[#A37B4C]" />
                            <span className="text-lg">{propertyLocation}</span>
                        </div>

                        {/* Price */}
                        {property.price ? (
                            <div className="mt-2 flex items-center gap-2 text-white/90">
                                <DollarSign className="w-5 h-5" />
                                <span className="text-xl font-bold">
                                    {formatPrice(property.price)}
                                    {property.price_max ? (
                                        <>
                                            {' '}- {formatPrice(property.price_max)}
                                        </>
                                    ) : null}
                                    {property.price_label ? (
                                        <span className="text-sm font-medium ml-2">{property.price_label}</span>
                                    ) : null}
                                </span>
                                {property.price_unit && property.price_unit !== 'total' ? (
                                    <span className="text-sm font-medium ml-3">
                                        / {property.price_unit.replace('_', ' ')}
                                    </span>
                                ) : null}
                            </div>
                        ) : null}
                    </div>
                </section>

                {/* Content */}
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Description */}
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="prose prose-lg max-w-none">
                                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">About this property</h2>
                                <p className="text-muted-foreground leading-relaxed">{property.description || 'No description available for this property.'}</p>
                            </motion.div>

                            {/* Key Features */}
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Key Features</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <h3 className="font-display text-lg font-semibold text-foreground mb-2">Highlights</h3>
                                        <div className="space-y-1">
                                            {highlightsList.map((highlight: string, index: number) => (
                                                <div key={index} className="flex items-start gap-2 p-2 rounded-xl border border-border bg-card">
                                                    <CheckCircle2 className="w-4 h-4 text-[#A37B4C] flex-shrink-0" />
                                                    <span className="text-sm text-foreground">{highlight}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="font-display text-lg font-semibold text-foreground mb-2">Area Details</h3>
                                        <div className="space-y-1">
                                            {property.sqft ? (
                                                <div className="flex items-start gap-2 p-2 rounded-xl border border-border bg-card">
                                                    <Maximize2 className="w-4 h-4 text-[#A37B4C] flex-shrink-0" />
                                                    <div className="space-y-0">
                                                        <span className="text-xs font-medium text-muted-foreground">Built-up Area</span>
                                                        <span className="text-sm font-medium text-foreground">{property.sqft.toLocaleString()} {property.area_unit || 'sqft'}</span>
                                                    </div>
                                                </div>
                                            ) : null}
                                            {property.lot_size ? (
                                                <div className="flex items-start gap-2 p-2 rounded-xl border border-border bg-card mt-2">
                                                    <CircleParking className="w-4 h-4 text-[#A37B4C] flex-shrink-0" />
                                                    <div className="space-y-0">
                                                        <span className="text-xs font-medium text-muted-foreground">Lot Size</span>
                                                        <span className="text-sm font-medium text-foreground">{property.lot_size} {property.area_unit || 'sqft'}</span>
                                                    </div>
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Specifications */}
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Specifications</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <h3 className="font-display text-lg font-semibold text-foreground mb-2">Construction</h3>
                                        <div className="space-y-1">
                                            {Object.entries(specsData).map(([key, value]) => (
                                                <div key={key} className="flex items-start justify-between pb-2 border-b border-border last:border-0 last:pb-0">
                                                    <span className="text-sm text-muted-foreground">{key}</span>
                                                    <span className="text-sm font-medium text-foreground">{value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="font-display text-lg font-semibold text-foreground mb-2">Rooms & Amenities</h3>
                                        <div className="space-y-1">
                                            <div className="flex items-start gap-2 p-2 rounded-xl border border-border bg-card">
                                                <Bed className="w-4 h-4 text-[#A37B4C] flex-shrink-0" />
                                                <div className="space-y-0">
                                                    <span className="text-xs font-medium text-muted-foreground">Bedrooms</span>
                                                    <span className="text-sm font-medium text-foreground">{beds}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-2 p-2 rounded-xl border border-border bg-card mt-2">
                                                <Bath className="w-4 h-4 text-[#A37B4C] flex-shrink-0" />
                                                <div className="space-y-0">
                                                    <span className="text-xs font-medium text-muted-foreground">Bathrooms</span>
                                                    <span className="text-sm font-medium text-foreground">{baths}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-2 p-2 rounded-xl border border-border bg-card mt-2">
                                                <Home className="w-4 h-4 text-[#A37B4C] flex-shrink-0" />
                                                <div className="space-y-0">
                                                    <span className="text-xs font-medium text-muted-foreground">Furnishing</span>
                                                    <span className="text-sm font-medium text-foreground">{property.furnishing ? property.furnishing.charAt(0).toUpperCase() + property.furnishing.slice(1) : 'N/A'}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-2 p-2 rounded-xl border border-border bg-card mt-2">
                                                <ShieldCheck className="w-4 h-4 text-[#A37B4C] flex-shrink-0" />
                                                <div className="space-y-0">
                                                    <span className="text-xs font-medium text-muted-foreground">Security</span>
                                                    <span className="text-sm font-medium text-foreground">{property.attributes?.Security ? 'Yes' : 'No'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Nearby Amenities */}
                            {nearbyList.length > 0 ? (
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                                    <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Nearby Amenities</h2>
                                    <div className="space-y-2">
                                        {nearbyList.map((amenity, index) => (
                                            <div key={index} className="flex items-start gap-3 p-3 rounded-xl border border-border bg-card">
                                                <MapPin className="w-4 h-4 text-[#A37B4C] flex-shrink-0 mt-0.5" />
                                                <div className="space-y-0">
                                                    <span className="text-sm font-medium text-foreground">{amenity.name}</span>
                                                    <span className="text-xs font-medium text-muted-foreground block">{amenity.type} • {amenity.distance}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            ) : null}

                            {/* FAQ */}
                            {faqList.length > 0 ? (
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                                    <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Frequently Asked Questions</h2>
                                    <div className="space-y-2">
                                        {faqList.map((faq: { q: string; a: string }, index: number) => (
                                            <div key={index} className="border-t border-border pt-4 first:border-t-0 first:pt-0">
                                                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{faq.q}</h3>
                                                <p className="text-sm text-muted-foreground">{faq.a}</p>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            ) : null}
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-28 space-y-6">
                                {/* Gallery preview */}
                                {galleryImages.length > 0 ? (
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-2xl overflow-hidden border border-border">
                                        <img
                                            src={galleryImages[0].url}
                                            alt={galleryImages[0].alt_text || propertyName}
                                            className="w-full h-48 object-cover"
                                        />
                                    </motion.div>
                                ) : null}

                                {/* Virtual Tour */}
                                {property.virtual_tour_url ? (
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-2xl border border-[#A37B4C]/20 bg-gradient-to-br from-[#A37B4C]/5 to-transparent p-4">
                                        <h3 className="font-display text-lg font-semibold text-foreground mb-2">Virtual Tour</h3>
                                        <p className="text-sm text-muted-foreground mb-3">Explore the property in 3D from your device</p>
                                        <Button
                                            onClick={() => {
                                                window.open(property.virtual_tour_url, '_blank');
                                            }}
                                            variant="outline"
                                            size="sm"
                                            className="w-full"
                                        >
                                            <Sparkles className="w-4 h-4 mr-2" />
                                            Start Tour
                                        </Button>
                                    </motion.div>
                                ) : null}

                                {/* Contact CTA */}
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-2xl border border-[#A37B4C]/20 bg-gradient-to-br from-[#A37B4C]/5 to-transparent p-4 mt-4">
                                    <h3 className="font-display text-lg font-semibold text-foreground mb-2">Interested in this property?</h3>
                                    <p className="text-sm text-muted-foreground mb-3">Get in touch with our team for detailed information and site visit.</p>
                                    {property.contact_phone ? (
                                        <div className="flex items-start gap-2 mb-2">
                                            <Phone className="w-4 h-4 text-[#A37B4C] flex-shrink-0" />
                                            <span className="text-sm font-medium text-foreground">{property.contact_phone}</span>
                                        </div>
                                    ) : null}
                                    {property.contact_email ? (
                                        <div className="flex items-start gap-2 mb-2">
                                            <Mail className="w-4 h-4 text-[#A37B4C] flex-shrink-0" />
                                            <span className="text-sm font-medium text-foreground">{property.contact_email}</span>
                                        </div>
                                    ) : null}
                                    <Button
                                        onClick={() => {
                                            alert('Opening inquiry form...');
                                        }}
                                        size="sm"
                                        className="w-full flex items-center justify-center gap-2"
                                    >
                                        <Mail className="w-4 h-4 mr-2" />
                                        Send Inquiry
                                    </Button>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
