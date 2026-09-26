import { motion } from 'framer-motion';
import { ArrowRight, Bath, Bed, Heart, MapPin, Maximize2 } from 'lucide-react';
import type { Property } from '@/types/property';
import { formatPrice } from '@/lib/format-price';

type PropertyCardProps = {
    property: Property;
    favorite: boolean;
    onFavorite: (id: number) => void;
    onSelect: (property: Property) => void;
};

export function PropertyCard({
    property,
    favorite,
    onFavorite,
    onSelect,
}: PropertyCardProps) {
    return (
        <article
            onClick={() => onSelect(property)}
            className="group bg-card hover:border-gold/60 flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-neutral-200/80 shadow-sm transition-all duration-300 hover:shadow-[0_18px_45px_rgba(37,34,30,0.14)] dark:border-white/10 dark:hover:shadow-[0_18px_45px_rgba(0,0,0,0.3)]"
        >
            <div className="bg-muted relative aspect-[4/3] overflow-hidden">
                <img
                    src={property.image}
                    alt={property.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="rounded-full border border-white/20 bg-black/40 px-2.5 py-1 text-xs font-medium text-white shadow-lg backdrop-blur-md">
                        {property.tag || 'For Sale'}
                    </span>
                    <span className="rounded-full border border-white/20 bg-white/15 px-2.5 py-1 text-xs font-medium text-white shadow-lg backdrop-blur-md">
                        Featured
                    </span>
                </div>
                <motion.button
                    onClick={(event) => {
                        event.stopPropagation();
                        onFavorite(property.id);
                    }}
                    aria-label="Save to favorites"
                    whileTap={{ scale: 0.88 }}
                    animate={{ scale: favorite ? [1, 1.18, 1] : 1 }}
                    transition={{ type: 'spring', stiffness: 420, damping: 16 }}
                    className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white shadow-lg backdrop-blur-md"
                >
                    <Heart
                        className={`h-4 w-4 ${favorite ? 'fill-red-500 text-red-500' : ''}`}
                    />
                </motion.button>
                <div className="absolute right-3 bottom-3 rounded-full border border-white/20 bg-black/45 px-3 py-1.5 text-sm font-semibold text-white shadow-lg backdrop-blur-md">
                    {formatPrice(property.price)}
                </div>
            </div>
            <div className="flex flex-1 flex-col justify-between space-y-4 p-5">
                <div>
                    <h3 className="font-display group-hover:text-gold text-lg">
                        {property.title}
                    </h3>
                    <p className="text-muted-foreground mt-1 flex items-center gap-1 text-sm">
                        <MapPin className="text-gold h-3 w-3" />
                        {property.location}
                    </p>
                </div>
                <div className="text-muted-foreground border-border/60 flex items-center justify-between border-t pt-3 text-xs">
                    <span className="flex items-center gap-1">
                        <Bed className="h-3.5 w-3.5" />
                        {property.beds} Beds
                    </span>
                    <span className="flex items-center gap-1">
                        <Bath className="h-3.5 w-3.5" />
                        {property.baths} Baths
                    </span>
                    <span className="flex items-center gap-1">
                        <Maximize2 className="h-3.5 w-3.5" />
                        {property.sqft.toLocaleString()} sqft
                    </span>
                </div>
                <div className="flex items-center justify-between pt-2">
                    <span className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                        View details
                    </span>
                    <div className="bg-gold/15 text-gold group-hover:bg-gold flex h-8 w-8 items-center justify-center rounded-full group-hover:text-white">
                        <ArrowRight className="h-4 w-4" />
                    </div>
                </div>
            </div>
        </article>
    );
}
