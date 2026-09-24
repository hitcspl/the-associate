import { Building, Home, Mail } from 'lucide-react';

export function MobileBottomNav({ onContact }: { onContact: () => void }) {
    return (
        <div className="bg-card/90 border-border fixed right-0 bottom-0 left-0 z-40 flex items-center justify-around border-t px-6 py-2.5 backdrop-blur-md md:hidden">
            <a
                href="#home"
                className="text-gold flex flex-col items-center gap-1"
            >
                <Home className="h-5 w-5" />
                <span className="text-xs font-medium">Home</span>
            </a>
            <a
                href="#properties"
                className="text-muted-foreground flex flex-col items-center gap-1"
            >
                <Building className="h-5 w-5" />
                <span className="text-xs font-medium">Properties</span>
            </a>
            <a
                href="#contact"
                onClick={(event) => {
                    event.preventDefault();
                    onContact();
                }}
                className="text-muted-foreground flex flex-col items-center gap-1"
            >
                <Mail className="h-5 w-5" />
                <span className="text-xs font-medium">Contact</span>
            </a>
        </div>
    );
}
