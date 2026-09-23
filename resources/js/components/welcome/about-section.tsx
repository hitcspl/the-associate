import { ArrowRight, Building } from "lucide-react";
import { Button } from "../ui/button";

type AboutSectionProps = {
    image: string;
    onContact: () => void;
};

export function AboutSection({ image, onContact }: AboutSectionProps) {
    return (
        <section
            id="about"
            className="bg-card/40 border-border/50 border-y py-20 lg:py-28"
        >
            <div className="container-site">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
                    {/* Left Column: Text & CTA */}
                    <div className="space-y-6 lg:col-span-5">
                        <div className="flex items-center gap-3">
                            <span className="text-muted-foreground text-[11px] font-semibold tracking-[0.25em] uppercase">
                                About Us
                            </span>
                            <div className="bg-gold/60 h-px w-8" />
                        </div>
                        <h2 className="font-display text-foreground text-3xl font-light leading-tight sm:text-4xl lg:text-5xl">
                            More than properties.
                            <br />
                            We build futures.
                        </h2>
                        <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
                            At Associate, we believe real estate is not just
                            about property; it's about people, dreams and
                            long-term value. With years of experience and a
                            commitment to excellence, we help you find the
                            perfect space to call home or the right investment
                            for tomorrow.
                        </p>
                        <Button
                            onClick={onContact}
                            className="bg-gold hover:bg-gold/90 text-white flex items-center gap-2 rounded-full px-6 py-5 text-xs font-medium shadow-md transition-all"
                        >
                            Explore Our Story
                            <ArrowRight className="h-3.5 w-3.5" />
                        </Button>
                    </div>

                    {/* Right Column: About Section Image Card */}
                    <div className="relative lg:col-span-7">
                        <div className="border-border/60 relative aspect-[16/10] overflow-hidden rounded-2xl border shadow-xl">
                            <img
                                src={image}
                                alt="Associate luxury architecture"
                                className="h-full w-full object-cover"
                            />
                        </div>

                        {/* Happy Clients Floating Badge */}
                        <div className="bg-card/95 border-border/80 absolute top-4 right-4 flex items-center gap-4 rounded-xl border p-4 shadow-xl backdrop-blur-md sm:top-6 sm:right-6 sm:p-5">
                            <div className="bg-gold/15 text-gold flex h-10 w-10 items-center justify-center rounded-full">
                                <Building className="h-5 w-5" />
                            </div>
                            <div>
                                <div className="font-display text-foreground text-xl font-bold sm:text-2xl">
                                    5,000+
                                </div>
                                <div className="text-muted-foreground text-xs">
                                    Happy Clients
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}