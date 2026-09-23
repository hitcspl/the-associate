import { MapPin, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Property } from '@/types/property';
import { formatPrice } from '@/lib/format-price';

type PropertyDetailModalProps = {
    property: Property;
    onClose: () => void;
    onInquire: () => void;
};

export function PropertyDetailModal({
    property,
    onClose,
    onInquire,
}: PropertyDetailModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
            <div className="bg-card border-border w-full max-w-2xl overflow-hidden rounded-2xl border shadow-2xl">
                <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                        src={property.image}
                        alt={property.title}
                        className="h-full w-full object-cover"
                    />
                    <button
                        onClick={onClose}
                        aria-label="Close property details"
                        className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <div className="space-y-4 p-6 sm:p-8">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="font-display text-2xl font-semibold">
                                {property.title}
                            </h3>
                            <p className="text-muted-foreground mt-1 flex items-center gap-1 text-sm">
                                <MapPin className="text-gold h-4 w-4" />
                                {property.location}
                            </p>
                        </div>
                        <div className="font-display text-gold text-2xl font-semibold">
                            {formatPrice(property.price)}
                        </div>
                    </div>
                    <div className="border-border grid grid-cols-3 gap-4 border-y py-4 text-center">
                        <div>
                            <div className="text-muted-foreground text-xs">
                                Bedrooms
                            </div>
                            <div className="text-lg font-semibold">
                                {property.beds}
                            </div>
                        </div>
                        <div>
                            <div className="text-muted-foreground text-xs">
                                Bathrooms
                            </div>
                            <div className="text-lg font-semibold">
                                {property.baths}
                            </div>
                        </div>
                        <div>
                            <div className="text-muted-foreground text-xs">
                                Square Feet
                            </div>
                            <div className="text-lg font-semibold">
                                {property.sqft.toLocaleString()}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-2">
                        <Button variant="outline" onClick={onClose}>
                            Close
                        </Button>
                        <Button
                            onClick={onInquire}
                            className="bg-gold hover:bg-gold-hover text-white"
                        >
                            Inquire Now
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
