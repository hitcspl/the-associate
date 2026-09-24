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
            className="group bg-card border-border/80 hover:border-gold/60 flex cursor-pointer flex-col overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 hover:shadow-xl"
        >
            <div className="bg-muted relative aspect-[4/3] overflow-hidden">
                <img
                    src={property.image}
                    alt={property.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <button
                    onClick={(event) => {
                        event.stopPropagation();
                        onFavorite(property.id);
                    }}
                    aria-label="Save to favorites"
                    className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white"
                >
                    <Heart
                        className={`h-4 w-4 ${favorite ? 'fill-red-500 text-red-500' : ''}`}
                    />
                </button>
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
                    <div className="text-base font-semibold">
                        {formatPrice(property.price)}
                    </div>
                    <div className="bg-gold/15 text-gold group-hover:bg-gold flex h-8 w-8 items-center justify-center rounded-full group-hover:text-white">
                        <ArrowRight className="h-4 w-4" />
                    </div>
                </div>
            </div>
        </article>
    );
}
