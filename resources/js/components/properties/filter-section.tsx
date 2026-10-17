"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    ChevronRight,
    Building2,
    MapPin,
    Grid3x3,
    Sparkles,
    X,
} from 'lucide-react';

interface FilterSectionProps {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

export default function FilterSection({
    title,
    children,
    defaultOpen = true,
}: FilterSectionProps) {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <div className="border border-border rounded-xl overflow-hidden bg-card shadow-sm">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between px-4 py-3.5 text-sm font-medium text-foreground hover:bg-muted transition-colors min-h-[48px]"
            >
                <span className="flex items-center gap-2">
                    {title === 'Status' && <Building2 className="w-4 h-4" />}
                    {title === 'Location' && <MapPin className="w-4 h-4" />}
                    {title === 'Property Type' && <Grid3x3 className="w-4 h-4" />}
                    {title === 'Flagship' && <Sparkles className="w-4 h-4" />}
                    {title}
                </span>
                <motion.div
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronRight className="w-4 h-4" />
                </motion.div>
            </button>
            <motion.div
                layout
                initial={false}
                animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
            >
                <div className="px-4 pb-4 pt-2">
                    {children}
                </div>
            </motion.div>
        </div>
    );
}