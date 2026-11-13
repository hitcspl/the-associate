import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import {
    ArrowLeft,
    ArrowUpRight,
    Building2,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    CircleHelp,
    Download,
    Images,
    Mail,
    MapPin,
    Phone,
    Send,
    ShieldCheck,
} from 'lucide-react';
import { contact, properties as propertiesRoute } from '@/routes';
import { ProjectCard } from '@/components/projects/project-card';
import { propertiesHeroImage } from '@/components/public/images';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { formatProjectPrice } from '@/lib/format-project-price';
import type { Project, ProjectListing } from '@/types/project';

type ProjectShowProps = {
    project: Project;
    relatedProjects: ProjectListing[];
};

const reveal = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 },
};

export default function ProjectShow({
    project,
    relatedProjects,
}: ProjectShowProps) {
    const price = formatProjectPrice(project);
    const enquiryUrl = contact.url({ query: { property: project.name } });
    const roomAmenities = Object.entries(project.roomAmenities);
    const [activeProgressImageIndex, setActiveProgressImageIndex] = useState<
        number | null
    >(null);
    const activeProgressImage =
        activeProgressImageIndex === null
            ? null
            : (project.progressImages[activeProgressImageIndex] ?? null);
    const galleryImages = [
        ...(project.imageUrl ? [project.imageUrl] : []),
        ...project.galleryImages,
    ];
    const heroImage = galleryImages[0] ?? propertiesHeroImage;
    const statusTone =
        project.status === 'completed'
            ? 'border-white/30 bg-white/15'
            : 'border-[#D5B487]/50 bg-[#A37B4C]/90';

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-[#A37B4C] selection:text-white">
            <Head title={`${project.name} — Property Details`} />
            <main>
                <section className="relative isolate h-[64svh] min-h-[480px] max-h-[760px] overflow-hidden bg-neutral-900">
                    <img
                        src={heroImage}
                        alt={project.name}
                        className="absolute inset-0 h-full w-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/20" />
                    <div className="absolute inset-0 bg-black/10" />

                    <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pt-28 pb-10 sm:px-6 sm:pb-14 lg:px-8">
                        <Link
                            href={propertiesRoute.url()}
                            className="mb-6 inline-flex w-fit items-center gap-2 text-sm font-medium text-white/85 transition hover:text-white"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            All properties
                        </Link>

                        <div className="mb-4 flex flex-wrap gap-2">
                            <span
                                className={`rounded-full border px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md ${statusTone}`}
                            >
                                {project.status.charAt(0).toUpperCase() +
                                    project.status.slice(1)}
                            </span>
                            <span className="rounded-full border border-white/25 bg-black/25 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                                {project.category}
                            </span>
                            {project.isFeatured ? (
                                <span className="rounded-full bg-[#B88C57] px-3 py-1.5 text-xs font-semibold text-stone-950">
                                    Featured property
                                </span>
                            ) : null}
                        </div>

                        <h1 className="max-w-5xl font-display text-4xl leading-tight font-bold text-white sm:text-5xl lg:text-6xl xl:text-7xl">
                            {project.name}
                        </h1>
                        <p className="mt-4 flex items-center gap-2 text-base text-white/90 sm:text-lg">
                            <MapPin className="h-5 w-5 shrink-0 text-[#D5B487]" />
                            {project.location}
                        </p>
                        {project.developmentName ? (
                            <p className="mt-2 text-sm text-white/75">
                                Part of {project.developmentName}
                            </p>
                        ) : null}
                        {price ? (
                            <p className="mt-3 text-lg font-semibold text-white">
                                {price}
                            </p>
                        ) : null}
                    </div>
                </section>

                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(17rem,0.9fr)]">
                        <div className="space-y-8">
                            <motion.section
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.15 }}
                                variants={reveal}
                            >
                                <h2 className="font-display text-xl font-semibold sm:text-2xl">
                                    About this property
                                </h2>
                                {project.developmentSummary ? (
                                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                        {project.developmentSummary}
                                    </p>
                                ) : null}
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                                    {project.description ||
                                        'Contact our team for more information about this property.'}
                                </p>
                            </motion.section>

                            <motion.section
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.15 }}
                                variants={reveal}
                            >
                                <h2 className="mb-4 font-display text-xl font-semibold sm:text-2xl">
                                    Key Features
                                </h2>
                                <div className="grid gap-6 sm:grid-cols-2">
                                    <div>
                                        <h3 className="mb-2 font-display text-base font-semibold">
                                            Highlights
                                        </h3>
                                        {project.highlights.length > 0 ? (
                                            <ul className="space-y-2">
                                                {project.highlights.map(
                                                    (highlight, index) => (
                                                        <li
                                                            key={`${highlight}-${index}`}
                                                            className="flex items-start gap-2 rounded-lg border border-border bg-card p-2.5 text-sm"
                                                        >
                                                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#A37B4C]" />
                                                            <span>{highlight}</span>
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        ) : (
                                            <EmptyDetails message="Property highlights will be added when confirmed." />
                                        )}
                                    </div>

                                    <div>
                                        <h3 className="mb-2 font-display text-base font-semibold">
                                            Area Details
                                        </h3>
                                        {Object.keys(project.areaDetails).length > 0 ? (
                                            <dl className="space-y-2">
                                                {Object.entries(
                                                    project.areaDetails,
                                                ).map(([label, value]) => (
                                                    <div
                                                        key={label}
                                                        className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card p-2.5 text-sm"
                                                    >
                                                        <dt className="text-muted-foreground">
                                                            {label}
                                                        </dt>
                                                        <dd className="text-right font-medium">
                                                            {value}
                                                        </dd>
                                                    </div>
                                                ))}
                                            </dl>
                                        ) : (
                                            <EmptyDetails message="Area information is not available yet." />
                                        )}
                                    </div>
                                </div>
                            </motion.section>

                            <motion.section
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.15 }}
                                variants={reveal}
                            >
                                <h2 className="mb-4 font-display text-xl font-semibold sm:text-2xl">
                                    Specifications
                                </h2>
                                <div className="grid gap-6 sm:grid-cols-2">
                                    <div>
                                        <h3 className="mb-2 font-display text-base font-semibold">
                                            Construction
                                        </h3>
                                        {Object.keys(project.specifications).length > 0 ? (
                                            <dl className="divide-y divide-border">
                                                {Object.entries(
                                                    project.specifications,
                                                ).map(([label, value]) => (
                                                    <div
                                                        key={label}
                                                        className="flex items-center justify-between gap-3 py-2.5 text-sm"
                                                    >
                                                        <dt className="text-muted-foreground">
                                                            {label}
                                                        </dt>
                                                        <dd className="text-right font-medium">
                                                            {value}
                                                        </dd>
                                                    </div>
                                                ))}
                                            </dl>
                                        ) : (
                                            <EmptyDetails message="Construction details will be added when confirmed." />
                                        )}
                                    </div>

                                    <div>
                                        <h3 className="mb-2 font-display text-base font-semibold">
                                            Rooms &amp; Amenities
                                        </h3>
                                        {roomAmenities.length > 0 ||
                                        project.amenities.length > 0 ? (
                                            <div className="space-y-2">
                                                {roomAmenities.map(
                                                    ([label, value]) => (
                                                        <div
                                                            key={label}
                                                            className="flex items-center gap-2 rounded-lg border border-border bg-card p-2.5 text-sm"
                                                        >
                                                            <Building2 className="h-4 w-4 shrink-0 text-[#A37B4C]" />
                                                            <span className="text-muted-foreground">
                                                                {label}
                                                            </span>
                                                            <span className="ml-auto text-right font-medium">
                                                                {value}
                                                            </span>
                                                        </div>
                                                    ),
                                                )}
                                                {project.amenities.map(
                                                    (amenity, index) => (
                                                        <div
                                                            key={`${amenity}-${index}`}
                                                            className="flex items-start gap-2 rounded-lg border border-border bg-card p-2.5 text-sm"
                                                        >
                                                            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#A37B4C]" />
                                                            <span>{amenity}</span>
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        ) : (
                                            <EmptyDetails message="Room and amenity details are not available yet." />
                                        )}
                                    </div>
                                </div>
                            </motion.section>

                            <motion.section
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.15 }}
                                variants={reveal}
                            >
                                <h2 className="mb-3 font-display text-xl font-semibold sm:text-2xl">
                                    Nearby Amenities
                                </h2>
                                {project.nearby.length > 0 ? (
                                    <div className="grid gap-2 sm:grid-cols-2">
                                        {project.nearby.map((place, index) => (
                                            <div
                                                key={`${place.name}-${index}`}
                                                className="flex items-start gap-2 rounded-lg border border-border bg-card p-3"
                                            >
                                                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#A37B4C]" />
                                                <div className="min-w-0">
                                                    <p className="text-sm font-medium">
                                                        {place.name}
                                                    </p>
                                                    {place.type ||
                                                    place.distance ? (
                                                        <p className="mt-1 text-xs text-muted-foreground">
                                                            {[
                                                                place.type,
                                                                place.distance,
                                                            ]
                                                                .filter(Boolean)
                                                                .join(' · ')}
                                                        </p>
                                                    ) : null}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <EmptyDetails message="Nearby amenities will be added when verified." />
                                )}
                            </motion.section>

                            <motion.section
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.15 }}
                                variants={reveal}
                            >
                                <h2 className="mb-3 flex items-center gap-2 font-display text-xl font-semibold sm:text-2xl">
                                    <CircleHelp className="h-5 w-5 text-[#A37B4C]" />
                                    Frequently Asked Questions
                                </h2>
                                {project.faqs.length > 0 ? (
                                    <div className="divide-y divide-border">
                                        {project.faqs.map((faq) => (
                                            <article
                                                key={faq.q}
                                                className="py-3 first:pt-0"
                                            >
                                                <h3 className="text-sm font-semibold">
                                                    {faq.q}
                                                </h3>
                                                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                                                    {faq.a}
                                                </p>
                                            </article>
                                        ))}
                                    </div>
                                ) : (
                                    <EmptyDetails message="Questions and answers will be added when details are confirmed." />
                                )}
                            </motion.section>
                        </div>

                        <aside className="lg:sticky lg:top-28">
                            <div className="space-y-4">
                                <div className="overflow-hidden rounded-xl border border-border bg-card">
                                    <img
                                        src={heroImage}
                                        alt={project.name}
                                        className="h-48 w-full object-cover"
                                    />
                                </div>

                                <div className="overflow-hidden rounded-xl border border-border bg-card">
                                    <div className="flex items-center gap-2 p-4 pb-3">
                                        <MapPin className="h-4 w-4 text-[#A37B4C]" />
                                        <h2 className="font-display text-lg font-semibold">
                                            Location
                                        </h2>
                                    </div>
                                    <iframe
                                        title={`Map showing ${project.name} in ${project.location}`}
                                        src={`https://www.google.com/maps?q=${encodeURIComponent(project.location)}&output=embed`}
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        className="h-48 w-full border-0"
                                    />
                                    <div className="p-4 pt-3">
                                        <p className="text-sm text-muted-foreground">
                                            {project.location}
                                        </p>
                                        <a
                                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(project.location)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-3 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg border border-border px-3 text-sm font-medium transition hover:border-[#A37B4C] hover:text-[#8A643B]"
                                        >
                                            Open in Maps
                                            <ArrowUpRight className="h-4 w-4" />
                                        </a>
                                    </div>
                                </div>

                                <div className="rounded-xl border border-border bg-card p-4">
                                    <h2 className="font-display text-lg font-semibold">
                                        Interested in this property?
                                    </h2>
                                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                                        Contact us for detailed information and
                                        site visits.
                                    </p>
                                    <div className="mt-3 space-y-2 border-t border-border pt-3">
                                        <a
                                            href="tel:+916512281718"
                                            className="flex items-center gap-2 text-sm font-medium transition hover:text-[#8A643B]"
                                        >
                                            <Phone className="h-4 w-4 shrink-0 text-[#A37B4C]" />
                                            +91 651 2281718
                                        </a>
                                        <a
                                            href="mailto:associaterealcon@gmail.com"
                                            className="flex items-start gap-2 break-all text-sm font-medium transition hover:text-[#8A643B]"
                                        >
                                            <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#A37B4C]" />
                                            associaterealcon@gmail.com
                                        </a>
                                    </div>
                                    <Link
                                        href={enquiryUrl}
                                        className="mt-4 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#A37B4C] px-4 text-sm font-semibold text-white transition hover:bg-[#B88C57]"
                                    >
                                        Send Inquiry
                                        <Send className="h-4 w-4" />
                                    </Link>
                                </div>

                                {project.brochureUrl ? (
                                    <a
                                        href={project.brochureUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 text-sm font-semibold transition hover:border-[#A37B4C] hover:text-[#8A643B]"
                                    >
                                        <Download className="h-4 w-4" />
                                        View brochure
                                        <ArrowUpRight className="h-4 w-4" />
                                    </a>
                                ) : null}
                            </div>
                        </aside>
                    </div>

                    <motion.section
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                        variants={reveal}
                        className="mt-12 border-t border-border pt-8"
                    >
                        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                            <div>
                                <h2 className="flex items-center gap-2 font-display text-2xl font-semibold sm:text-3xl">
                                    <Images className="h-5 w-5 text-[#A37B4C]" />
                                    Progress updates
                                </h2>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    Photos showing the progress of this property.
                                </p>
                            </div>
                            {project.progressImages.length > 0 ? (
                                <span className="rounded-full bg-[#A37B4C]/10 px-3 py-1 text-sm font-semibold text-[#8A643B]">
                                    {project.progressImages.length}{' '}
                                    {project.progressImages.length === 1
                                        ? 'photo'
                                        : 'photos'}
                                </span>
                            ) : null}
                        </div>

                        {project.progressImages.length > 0 ? (
                            <>
                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                                    {project.progressImages.map((image, index) => (
                                        <button
                                            key={`${image}-${index}`}
                                            type="button"
                                            aria-label={`View progress photo ${index + 1}`}
                                            onClick={() =>
                                                setActiveProgressImageIndex(index)
                                            }
                                            className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A37B4C]"
                                        >
                                            <img
                                                src={image}
                                                alt={`${project.name} progress update ${index + 1}`}
                                                loading="lazy"
                                                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                            />
                                            <span className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-3 text-left text-xs font-medium text-white opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
                                                View photo
                                            </span>
                                        </button>
                                    ))}
                                </div>

                                <Dialog
                                    open={activeProgressImageIndex !== null}
                                    onOpenChange={(open) => {
                                        if (!open) {
                                            setActiveProgressImageIndex(null);
                                        }
                                    }}
                                >
                                    <DialogContent className="flex h-[85vh] w-full max-w-5xl flex-col gap-3 overflow-hidden border-0 bg-neutral-950 p-3 text-white sm:max-w-5xl sm:p-5">
                                        <DialogTitle className="sr-only">
                                            Progress photos for {project.name}
                                        </DialogTitle>
                                        {activeProgressImage ? (
                                            <div className="relative flex min-h-0 flex-1 items-center justify-center">
                                                <img
                                                    src={activeProgressImage}
                                                    alt={`${project.name} progress update ${activeProgressImageIndex + 1}`}
                                                    className="max-h-full max-w-full object-contain"
                                                />
                                                {project.progressImages.length >
                                                1 ? (
                                                    <>
                                                        <button
                                                            type="button"
                                                            aria-label="Previous progress photo"
                                                            onClick={() =>
                                                                setActiveProgressImageIndex(
                                                                    (index) =>
                                                                        index ===
                                                                        null
                                                                            ? null
                                                                            : (index -
                                                                                  1 +
                                                                              project
                                                                                  .progressImages
                                                                                  .length) %
                                                                              project
                                                                                  .progressImages
                                                                                  .length,
                                                                )
                                                            }
                                                            className="absolute left-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
                                                        >
                                                            <ChevronLeft className="h-5 w-5" />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            aria-label="Next progress photo"
                                                            onClick={() =>
                                                                setActiveProgressImageIndex(
                                                                    (index) =>
                                                                        index ===
                                                                        null
                                                                            ? null
                                                                            : (index +
                                                                                  1) %
                                                                              project
                                                                                  .progressImages
                                                                                  .length,
                                                                )
                                                            }
                                                            className="absolute right-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
                                                        >
                                                            <ChevronRight className="h-5 w-5" />
                                                        </button>
                                                    </>
                                                ) : null}
                                            </div>
                                        ) : null}
                                        {activeProgressImageIndex !== null &&
                                        activeProgressImage ? (
                                            <p className="text-center text-sm text-white/70">
                                                Photo {activeProgressImageIndex + 1} of{' '}
                                                {project.progressImages.length}
                                            </p>
                                        ) : null}
                                    </DialogContent>
                                </Dialog>
                            </>
                        ) : (
                            <p className="rounded-xl border border-dashed border-border bg-card p-5 text-sm text-muted-foreground">
                                Progress photos will appear here when updates are available.
                            </p>
                        )}
                    </motion.section>

                    {relatedProjects.length > 0 ? (
                        <motion.section
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.15 }}
                            variants={reveal}
                            className="mt-12 border-t border-border pt-8"
                        >
                            <h2 className="mb-5 font-display text-2xl font-semibold sm:text-3xl">
                                Related properties
                            </h2>
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {relatedProjects.map((relatedProject) => (
                                    <ProjectCard
                                        key={relatedProject.id}
                                        project={relatedProject}
                                    />
                                ))}
                            </div>
                        </motion.section>
                    ) : null}
                </div>
            </main>
        </div>
    );
}

function EmptyDetails({ message }: { message: string }) {
    return (
        <p className="rounded-lg border border-dashed border-border bg-card p-3 text-sm text-muted-foreground">
            {message}
        </p>
    );
}
