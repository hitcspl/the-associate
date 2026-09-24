import { Building, Home, Settings, Tag } from 'lucide-react';
import type { ServiceItem } from '@/types/property';

const icons = {
    home: Home,
    tag: Tag,
    building: Building,
    settings: Settings,
} as const;

export function ServicesSection({ services }: { services: ServiceItem[] }) {
    return (
        <section id="services" className="py-20 lg:py-28">
            <div className="container-site">
                <div className="mb-14 max-w-2xl space-y-3">
                    <div className="flex items-center gap-3">
                        <span className="section-kicker">Our Services</span>
                        <div className="bg-gold/60 h-px w-8" />
                    </div>
                    <h2 className="font-display text-3xl leading-tight sm:text-4xl lg:text-5xl">
                        Everything You Need,
                        <br />
                        Under One Roof.
                    </h2>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {services.map((service) => {
                        const Icon =
                            icons[service.icon as keyof typeof icons] ?? Home;
                        return (
                            <article
                                key={service.id}
                                className="bg-card border-border hover:border-gold/60 group rounded-2xl border p-7 transition-all duration-300 hover:shadow-lg"
                            >
                                <div className="bg-gold/15 text-gold mb-6 flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110">
                                    <Icon className="h-6 w-6" />
                                </div>
                                <h3 className="font-display group-hover:text-gold mb-2 text-xl">
                                    {service.title}
                                </h3>
                                <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
                                    {service.description}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
