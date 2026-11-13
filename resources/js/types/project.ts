export type ProjectListing = {
    id: number;
    name: string;
    slug: string;
    location: string;
    category: string;
    status: 'ongoing' | 'completed' | 'planned';
    completedAt: string | null;
    isFeatured: boolean;
    imageUrl: string | null;
    brochureUrl: string | null;
    priceFrom: number | null;
    priceTo: number | null;
    currency: string;
};

export type Project = ProjectListing & {
    developmentName: string | null;
    developmentSummary: string | null;
    description: string | null;
    galleryImages: string[];
    progressImages: string[];
    highlights: string[];
    amenities: string[];
    areaDetails: Record<string, string>;
    roomAmenities: Record<string, string>;
    specifications: Record<string, string>;
    nearby: { name: string; type: string | null; distance: string | null }[];
    faqs: { q: string; a: string }[];
};

export type ProjectPortfolioStats = {
    total: number;
    ongoing: number;
    completed: number;
    planned: number;
};
