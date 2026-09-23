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
        <section className="py-16">
            <div className="container-site">
                <div className="border-gold/30 relative overflow-hidden rounded-2xl border bg-gradient-to-r from-[#211b14] to-[#120f0c] p-8 text-white shadow-2xl sm:p-14">
                    <div className="absolute top-0 right-0 bottom-0 w-1/2 opacity-30">
                        <img
                            src={image}
                            alt="Luxury home"
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="relative z-10 max-w-xl space-y-4">
                        <span className="section-kicker text-gold">
                            Ready For
                        </span>
                        <h2 className="font-display text-3xl leading-tight sm:text-4xl lg:text-5xl">
                            What's Next?
                        </h2>
                        <p className="text-xs text-white/80 sm:text-sm">
                            Let's find a property that feels like yours.
                        </p>
                        <Button
                            onClick={onContact}
                            className="bg-gold hover:bg-gold-hover flex items-center gap-2 rounded-full px-7 py-5 text-xs text-white"
                        >
                            Get Started <ArrowRight className="h-3.5 w-3.5" />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
