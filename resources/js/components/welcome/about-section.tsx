import { ArrowRight, Building } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '../ui/button';

type AboutSectionProps = {
    image: string;
    onContact: () => void;
};

export function AboutSection({ image, onContact }: AboutSectionProps) {
    const imageRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: imageRef,
        offset: ['start end', 'end start'],
    });
    const imageScale = useTransform(scrollYProgress, [0, 1], [1.04, 1]);

    return (
        <section
            id="about"
            className="from-background via-card/40 to-background bg-gradient-to-b py-20 lg:py-28"
        >
            <div className="container-site">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
                    {/* Left Column: Text & CTA */}
                    <motion.div
                        className="space-y-6 lg:col-span-5"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={{
                            hidden: { opacity: 0, y: 24 },
                            visible: {
                                opacity: 1,
                                y: 0,
                                transition: {
                                    duration: 0.6,
                                    staggerChildren: 0.1,
                                },
                            },
                        }}
                    >
                        <motion.div
                            className="flex items-center gap-3"
                            variants={{
                                hidden: { opacity: 0, y: 12 },
                                visible: { opacity: 1, y: 0 },
                            }}
                        >
                            <span className="text-muted-foreground text-xs font-semibold tracking-[0.25em] uppercase">
                                About Us
                            </span>
                            <div className="bg-gold/60 h-px w-8" />
                        </motion.div>
                        <motion.h2
                            className="font-display text-foreground text-3xl leading-tight font-light sm:text-4xl lg:text-5xl"
                            variants={{
                                hidden: { opacity: 0, y: 12 },
                                visible: { opacity: 1, y: 0 },
                            }}
                        >
                            More than properties.
                            <br />
                            We build futures.
                        </motion.h2>
                        <motion.p
                            className="text-muted-foreground text-sm leading-relaxed sm:text-base"
                            variants={{
                                hidden: { opacity: 0, y: 12 },
                                visible: { opacity: 1, y: 0 },
                            }}
                        >
                            At Associate, we believe real estate is not just
                            about property; it's about people, dreams and
                            long-term value. With years of experience and a
                            commitment to excellence, we help you find the
                            perfect space to call home or the right investment
                            for tomorrow.
                        </motion.p>
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 12 },
                                visible: { opacity: 1, y: 0 },
                            }}
                        >
                            <Button
                                onClick={onContact}
                                className="bg-gold hover:bg-gold/90 flex items-center gap-2 rounded-full px-6 py-5 text-sm font-medium text-white shadow-md transition-all"
                            >
                                Explore Our Story
                                <ArrowRight className="h-3.5 w-3.5" />
                            </Button>
                        </motion.div>
                    </motion.div>

                    {/* Right Column: About Section Image Card */}
                    <motion.div
                        ref={imageRef}
                        className="relative lg:col-span-7"
                        initial={{ opacity: 0, x: 24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="border-border/60 relative aspect-[16/10] overflow-hidden rounded-2xl border shadow-xl">
                            <motion.img
                                src={image}
                                alt="Associate luxury architecture"
                                style={{ scale: imageScale }}
                                className="h-full w-full object-cover"
                            />
                        </div>

                        {/* Happy Clients Floating Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: -12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ delay: 0.35, duration: 0.5 }}
                            className="bg-card/95 border-border/80 absolute top-4 right-4 flex items-center gap-4 rounded-xl border p-4 shadow-xl backdrop-blur-md sm:top-6 sm:right-6 sm:p-5"
                        >
                            <div className="bg-gold/15 text-gold flex h-10 w-10 items-center justify-center rounded-full">
                                <Building className="h-5 w-5" />
                            </div>
                            <div>
                                <div className="font-display text-foreground text-xl font-bold sm:text-2xl">
                                    5,000+
                                </div>
                                <div className="text-muted-foreground text-sm">
                                    Happy Clients
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
