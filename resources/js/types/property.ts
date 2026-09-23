export type Property = {
    id: number;
    title: string;
    location: string;
    city: string;
    type: string;
    price: number;
    beds: number;
    baths: number;
    sqft: number;
    image: string;
    tag: string | null;
    description: string | null;
    images: string[];
};

export type Testimonial = {
    id: number;
    quote: string;
    author: string;
    role: string;
    avatar: string;
    location: string;
    image: string;
};

export type ServiceItem = {
    id: number;
    title: string;
    description: string;
    icon: string;
};

export type ImpactStat = {
    id: number;
    label: string;
    value: string;
};

export type SiteImages = {
    about: string;
    impact: string;
    cta: string;
};

export type WelcomeProps = {
    heroSlides: Property[];
    properties: Property[];
    services: ServiceItem[];
    impactStats: ImpactStat[];
    testimonials: Testimonial[];
    siteImages: SiteImages;
};
