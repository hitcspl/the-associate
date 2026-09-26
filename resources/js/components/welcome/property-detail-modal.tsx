import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X,
    MapPin,
    Bed,
    Bath,
    Maximize2,
    Mail,
    Sparkles,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
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
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const gallery =
        property.images && property.images.length > 0
            ? property.images
            : [property.image];

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight' && gallery.length > 1) {
                setSelectedImageIndex((prev) => (prev + 1) % gallery.length);
            }
            if (e.key === 'ArrowLeft' && gallery.length > 1) {
                setSelectedImageIndex(
                    (prev) => (prev - 1 + gallery.length) % gallery.length,
                );
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [gallery.length, onClose]);

    const currentImage = gallery[selectedImageIndex] || property.image;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
                    aria-hidden="true"
                />

                {/* Main Dialog Window - Strictly bounded height */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 12 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 26 }}
                    className="relative z-10 my-auto flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="property-modal-title"
                >
                    {/* Floating Close Button */}
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close property details"
                        className="absolute top-3 right-3 z-30 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-slate-950/60 text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-slate-950/80 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none active:scale-95"
                    >
                        <X className="h-4 w-4" />
                    </button>

                    {/* Compact Hero Image Frame */}
                    <div className="relative h-44 w-full shrink-0 overflow-hidden bg-slate-100 sm:h-56 dark:bg-slate-800">
                        <motion.img
                            key={currentImage}
                            src={currentImage}
                            alt={property.title}
                            initial={{ opacity: 0.85 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                            className="h-full w-full object-cover"
                        />

                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5">
                            <span className="rounded-full border border-white/20 bg-slate-950/60 px-2.5 py-0.5 text-[11px] font-semibold text-white shadow-sm backdrop-blur-md">
                                {property.tag || 'For Sale'}
                            </span>
                            <span className="inline-flex items-center gap-1 rounded-full border border-amber-300/30 bg-amber-500/80 px-2 py-0.5 text-[11px] font-semibold text-white shadow-sm backdrop-blur-md">
                                <Sparkles className="h-3 w-3 text-amber-200" />
                                Featured
                            </span>
                        </div>

                        {/* Image Arrows (if multiple images exist) */}
                        {gallery.length > 1 && (
                            <>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setSelectedImageIndex(
                                            (prev) =>
                                                (prev - 1 + gallery.length) %
                                                gallery.length,
                                        )
                                    }
                                    className="absolute top-1/2 left-2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-slate-950/50 text-white backdrop-blur-md transition-all hover:bg-slate-950/80"
                                    aria-label="Previous image"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setSelectedImageIndex(
                                            (prev) =>
                                                (prev + 1) % gallery.length,
                                        )
                                    }
                                    className="absolute top-1/2 right-2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-slate-950/50 text-white backdrop-blur-md transition-all hover:bg-slate-950/80"
                                    aria-label="Next image"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            </>
                        )}
                    </div>

                    {/* Compact Image Thumbnails (if multiple images exist) */}
                    {gallery.length > 1 && (
                        <div className="flex shrink-0 items-center gap-1.5 overflow-x-auto border-b border-slate-100 bg-slate-50 p-2 px-4 dark:border-slate-800 dark:bg-slate-900/50">
                            {gallery.map((img, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => setSelectedImageIndex(idx)}
                                    className={`relative h-10 w-14 shrink-0 overflow-hidden rounded-md border-2 transition-all ${
                                        selectedImageIndex === idx
                                            ? 'scale-105 border-amber-500'
                                            : 'border-transparent opacity-60 hover:opacity-100'
                                    }`}
                                >
                                    <img
                                        src={img}
                                        alt=""
                                        className="h-full w-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Content Section (Scrollable only if screen is very short or content overflows) */}
                    <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-5 sm:p-6">
                        {/* Title & Price Row */}
                        <div className="flex items-start justify-between gap-4">
                            <div className="space-y-0.5">
                                <h2
                                    id="property-modal-title"
                                    className="text-xl leading-tight font-bold text-slate-900 sm:text-2xl dark:text-slate-100"
                                >
                                    {property.title}
                                </h2>
                                <p className="flex items-center gap-1 text-xs text-slate-500 sm:text-sm dark:text-slate-400">
                                    <MapPin className="h-3.5 w-3.5 shrink-0 text-amber-500 dark:text-amber-400" />
                                    <span>{property.location}</span>
                                </p>
                            </div>
                            <div className="shrink-0 text-right">
                                <div className="text-xl font-extrabold text-amber-600 sm:text-2xl dark:text-amber-400">
                                    {formatPrice(property.price)}
                                </div>
                            </div>
                        </div>

                        {/* Specs Grid */}
                        <div className="grid grid-cols-3 gap-2 rounded-2xl border border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/50">
                            <div className="flex items-center justify-center gap-2">
                                <Bed className="h-4 w-4 shrink-0 text-amber-500 dark:text-amber-400" />
                                <div className="text-left">
                                    <span className="block text-[10px] leading-none font-medium text-slate-400 dark:text-slate-500">
                                        Beds
                                    </span>
                                    <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                                        {property.beds ?? '--'}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center justify-center gap-2 border-x border-slate-200/60 dark:border-slate-700/60">
                                <Bath className="h-4 w-4 shrink-0 text-amber-500 dark:text-amber-400" />
                                <div className="text-left">
                                    <span className="block text-[10px] leading-none font-medium text-slate-400 dark:text-slate-500">
                                        Baths
                                    </span>
                                    <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                                        {property.baths ?? '--'}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center justify-center gap-2">
                                <Maximize2 className="h-4 w-4 shrink-0 text-amber-500 dark:text-amber-400" />
                                <div className="text-left">
                                    <span className="block text-[10px] leading-none font-medium text-slate-400 dark:text-slate-500">
                                        SqFt
                                    </span>
                                    <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                                        {property.sqft
                                            ? property.sqft.toLocaleString()
                                            : '--'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <h3 className="mb-1 text-[11px] font-bold tracking-wider text-slate-400 uppercase dark:text-slate-500">
                                Overview
                            </h3>
                            <p className="line-clamp-3 text-xs leading-relaxed text-slate-600 transition-all hover:line-clamp-none sm:text-sm dark:text-slate-300">
                                {property.description ||
                                    'Experience luxurious contemporary living with open spaces, premium finishes, abundant natural sunlight, and complete modern amenities.'}
                            </p>
                        </div>
                    </div>

                    {/* Fixed Modal Action Bar */}
                    <div className="flex shrink-0 items-center justify-between border-t border-slate-100 bg-white p-3.5 px-5 dark:border-slate-800 dark:bg-slate-900">
                        <span className="hidden font-mono text-[11px] text-slate-400 sm:inline-block">
                            ID: #{property.id}
                        </span>
                        <div className="flex w-full items-center justify-end gap-2 sm:w-auto">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={onClose}
                                className="rounded-xl border-slate-200 text-xs hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-800"
                            >
                                Close
                            </Button>
                            <Button
                                size="sm"
                                onClick={onInquire}
                                className="flex items-center gap-1.5 rounded-xl bg-amber-500 text-xs font-semibold text-slate-950 shadow-md transition-all hover:bg-amber-600 active:scale-95 dark:bg-amber-400 dark:hover:bg-amber-500"
                            >
                                <Mail className="h-3.5 w-3.5" />
                                Inquire Now
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
