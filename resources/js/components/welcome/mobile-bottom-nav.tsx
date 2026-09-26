import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Building, Home, Mail } from 'lucide-react';

type MobileBottomNavProps = {
    onContact: () => void;
};

export function MobileBottomNav({ onContact }: MobileBottomNavProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return createPortal(
        <nav
            aria-label="Mobile Navigation"
            className="bg-card/90 border-border text-card-foreground fixed inset-x-0 bottom-0 z-[100] border-t backdrop-blur-lg md:hidden pb-[max(0.625rem,env(safe-area-inset-bottom))] pt-2.5 transition-colors duration-300"
        >
            <div className="mx-auto flex max-w-md items-center justify-around px-4">
                <a
                    href="#home"
                    className="text-primary hover:text-primary/80 focus-visible:ring-ring flex min-w-[64px] flex-col items-center gap-1 rounded-lg py-1 transition-all duration-200 active:scale-95 focus-visible:ring-2 focus-visible:outline-none"
                >
                    <Home className="h-5 w-5 shrink-0" />
                    <span className="text-[11px] font-medium tracking-tight">
                        Home
                    </span>
                </a>

                <a
                    href="#properties"
                    className="text-muted-foreground hover:text-foreground focus-visible:ring-ring flex min-w-[64px] flex-col items-center gap-1 rounded-lg py-1 transition-all duration-200 active:scale-95 focus-visible:ring-2 focus-visible:outline-none"
                >
                    <Building className="h-5 w-5 shrink-0" />
                    <span className="text-[11px] font-medium tracking-tight">
                        Properties
                    </span>
                </a>

                <a
                    href="#contact"
                    onClick={(event) => {
                        event.preventDefault();
                        onContact();
                    }}
                    className="text-muted-foreground hover:text-foreground focus-visible:ring-ring flex min-w-[64px] flex-col items-center gap-1 rounded-lg py-1 transition-all duration-200 active:scale-95 focus-visible:ring-2 focus-visible:outline-none"
                >
                    <Mail className="h-5 w-5 shrink-0" />
                    <span className="text-[11px] font-medium tracking-tight">
                        Contact
                    </span>
                </a>
            </div>
        </nav>,
        document.body
    );
}