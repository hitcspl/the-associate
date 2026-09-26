import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CtaBanner({
    image,
    onContact,
}: {
    image: string;
    onContact: () => void;
}) {
    return (
        <section className="py-16 sm:py-24">
            <div className="container-site">
                <div className="relative overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-br from-neutral-950 via-[#18130e] to-neutral-950 p-8 text-white shadow-2xl sm:p-14 lg:p-16">
                    
                    {/* Background Image Container with Gradient Mask */}
                    <div 
                        className="absolute inset-0 pointer-events-none select-none overflow-hidden"
                        style={{
                            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 10%, rgba(0,0,0,1) 100%)',
                            maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,1) 100%)',
                        }}
                    >
                        <img
                            src={image}
                            alt="Luxury home showcase"
                            className="h-full w-full object-cover object-center filter brightness-[0.85] contrast-[1.05] transition-transform duration-1000 ease-out hover:scale-105"
                        />
                    </div>

                    {/* Mobile-First Gradient Overlay: ensures legibility on small screens */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/60 to-transparent sm:bg-gradient-to-r sm:from-neutral-950 sm:via-neutral-950/70 sm:to-transparent pointer-events-none z-10" />

                    {/* Content Column */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="relative z-20 max-w-lg space-y-5"
                    >
                        <div className="inline-flex items-center gap-2">
                            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-200/90 drop-shadow-sm sm:text-sm">
                                Ready For
                            </span>
                            <div className="h-px w-8 bg-amber-200/40" />
                        </div>

                        <h2 className="font-display text-3xl font-normal leading-[1.05] tracking-tight text-stone-50 sm:text-4xl lg:text-5xl">
                            What&apos;s Next?
                        </h2>

                        <p className="text-sm font-light leading-relaxed text-stone-300 sm:text-base">
                            Let&apos;s find a property that feels like yours. Exceptional residences curated for your lifestyle.
                        </p>

                        <div className="pt-2">
                            <Button
                                onClick={onContact}
                                size="lg"
                                className="group relative h-12 overflow-hidden rounded-full border border-white/10 bg-[#A37B4C] px-7 text-sm font-medium text-white shadow-[0_10px_30px_rgba(163,123,76,0.28)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#AF8756] hover:shadow-[0_16px_38px_rgba(163,123,76,0.38)] active:translate-y-0 active:scale-[0.98] sm:h-[52px]"
                            >
                                <span className="relative z-10 flex items-center gap-2.5">
                                    Get Started
                                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                </span>
                            </Button>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}