import { createInertiaApp } from '@inertiajs/react';
import { SitePreloader } from '@/components/site-preloader';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import PublicLayout from '@/layouts/public-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { ThemeProvider } from '@/providers/theme-provider';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

/**
 * Top-level Inertia page roots that belong to the public website. These all
 * render through PublicLayout (navbar + content + footer). Anything else falls
 * through to the dashboard AppLayout, which is what keeps the admin sidebar on
 * /dashboard and /settings/* without leaking it onto the public pages.
 */
const PUBLIC_PAGE_ROOTS = new Set([
    'welcome',
    'about',
    'properties',
    'services',
    'contact',
]);

const isPublicPage = (name: string) =>
    PUBLIC_PAGE_ROOTS.has(name.split('/')[0]);

void createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    layout: (name) => {
        if (isPublicPage(name)) {
            return PublicLayout;
        }

        switch (true) {
            case name.startsWith('auth/'):
                return AuthLayout;
            case name.startsWith('settings/'):
                return [AppLayout, SettingsLayout];
            default:
                return AppLayout;
        }
    },
    strictMode: true,
    withApp(app, { page }) {
        return (
            <ThemeProvider>
                <TooltipProvider delayDuration={0}>
                    <SitePreloader initialProps={page.props}>
                        {app}
                    </SitePreloader>
                    <Toaster />
                </TooltipProvider>
            </ThemeProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
