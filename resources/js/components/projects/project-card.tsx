import { Link } from '@inertiajs/react';
import { ArrowUpRight, Download, MapPin } from 'lucide-react';
import {
    aboutHeroImage,
    contactHeroImage,
    propertiesHeroImage,
    servicesHeroImage,
} from '@/components/public/images';
import { formatProjectPrice } from '@/lib/format-project-price';
import { show as propertyShow } from '@/actions/App/Http/Controllers/ProjectController';
import type { ProjectListing } from '@/types/project';

const fallbackImages = [
    propertiesHeroImage,
    aboutHeroImage,
    servicesHeroImage,
    contactHeroImage,
];

type ProjectCardProps = {
    project: ProjectListing;
};

export function ProjectCard({ project }: ProjectCardProps) {
    const detailHref = propertyShow.url(project.slug);
    const imageUrl =
        project.imageUrl ??
        fallbackImages[project.id % fallbackImages.length] ??
        propertiesHeroImage;

    return (
        <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:border-[#A37B4C]/50 hover:shadow-lg">
            <Link
                href={detailHref}
                className="relative block aspect-[4/3] overflow-hidden bg-gradient-to-br from-stone-200 via-stone-100 to-[#A37B4C]/20"
            >
                <img
                    src={imageUrl}
                    alt={project.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute inset-x-4 bottom-4 flex items-center gap-2 text-sm font-medium text-white">
                    <MapPin className="h-4 w-4 shrink-0 text-[#D5B487]" />
                    <span className="truncate">{project.location}</span>
                </div>
                <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                    <span className="rounded-full border border-white/30 bg-black/45 px-3 py-1 text-xs font-semibold text-white capitalize backdrop-blur">
                        {project.status}
                    </span>
                    {project.isFeatured ? (
                        <span className="rounded-full bg-[#B88C57] px-3 py-1 text-xs font-semibold text-stone-950">
                            Flagship
                        </span>
                    ) : null}
                </div>
            </Link>

            <div className="flex flex-1 flex-col gap-4 p-5">
                <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#A37B4C]">
                        {project.category}
                    </p>
                    <h2 className="font-display text-xl font-semibold text-foreground">
                        {project.name}
                    </h2>
                </div>

                <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-4">
                    <span className="text-sm font-semibold text-foreground">
                        {formatProjectPrice(project) || 'Pricing on request'}
                    </span>
                    {project.brochureUrl ? (
                        <a
                            href={project.brochureUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(event) => event.stopPropagation()}
                            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-border px-3 text-xs font-semibold text-foreground transition hover:border-[#A37B4C] hover:text-[#A37B4C]"
                        >
                            <Download className="h-4 w-4" />
                            Brochure
                        </a>
                    ) : (
                        <Link
                            href={detailHref}
                            className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[#A37B4C]/10 px-3 text-xs font-semibold text-[#8A643B] transition hover:bg-[#A37B4C] hover:text-white"
                        >
                            Details
                            <ArrowUpRight className="h-4 w-4" />
                        </Link>
                    )}
                </div>
            </div>
        </article>
    );
}
