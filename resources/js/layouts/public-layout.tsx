import { useState, type ReactNode } from 'react';
import { usePage } from '@inertiajs/react';
import { SiteFooter } from '@/components/welcome/site-footer';
import { SiteHeader } from '@/components/welcome/site-header';

type PublicLayoutProps = {
    children: ReactNode;
};

export default function PublicLayout({ children }: PublicLayoutProps) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { auth } = usePage<{ auth?: { user?: unknown } }>().props;

    return (
        <div className="bg-background text-foreground min-h-screen pb-14 transition-colors duration-300 md:pb-0">
            <SiteHeader
                authenticated={Boolean(auth?.user)}
                mobileOpen={mobileOpen}
                onMobileToggle={() => setMobileOpen((open) => !open)}
            />
            {children}
            <SiteFooter />
        </div>
    );
}
