import { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Linkedin, Mail, ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { fadeUp, EASE } from '@/lib/motion';
import Section from './AboutSection';

const teamMembers = [
    { name: 'Rajesh Sharma', role: 'Founder & Managing Director', experience: '14+ Years in Ranchi Real Estate', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80', linkedin: '#', email: 'contact@theassociate.in' },
    { name: 'Ankit Kumar', role: 'Senior Property Consultant', experience: '10+ Years Market Experience', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80', linkedin: '#', email: 'consult@theassociate.in' },
    { name: 'Priya Verma', role: 'Legal & Title Specialist', experience: 'Property Legal Verification', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80', linkedin: '#', email: 'legal@theassociate.in' },
];

export default function TeamSection() {
    const [active, setActive] = useState(0);
    const x = useMotionValue(0);
    const [direction, setDirection] = useState(0);

    const next = () => {
        setDirection(1);
        setActive((prev) => (prev + 1) % teamMembers.length);
        animate(x, 0, { duration: 0 });
    };
    const prev = () => {
        setDirection(-1);
        setActive((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
        animate(x, 0, { duration: 0 });
    };

    const member = teamMembers[active];

    return (
        <Section className="py-16 sm:py-24 border-t border-border">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border pb-6 mb-10">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#A37B4C]">OUR TEAM</span>
                        <div className="w-8 h-[1px] bg-[#A37B4C]" />
                    </div>
                    <h2 className="font-display text-3xl sm:text-4xl font-medium text-foreground">Meet the Experts</h2>
                </div>
                <a href="/contact" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A37B4C] hover:underline">
                    <span>Connect With Team</span>
                    <ArrowUpRight className="w-4 h-4" />
                </a>
            </div>

            {/* Desktop */}
            <div className="hidden lg:grid grid-cols-3 gap-6">
                {teamMembers.map((m, i) => (
                    <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="group aspect-[4/5] max-h-[400px] rounded-2xl overflow-hidden relative bg-card border border-border">
                        <img src={m.image} alt={m.name} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                            <div>
                                <h3 className="font-display text-xl font-semibold text-white">{m.name}</h3>
                                <p className="text-xs font-semibold uppercase tracking-wider text-[#B88C57]">{m.role}</p>
                                <p className="text-xs text-stone-300 mt-1">{m.experience}</p>
                            </div>
                            <div className="flex gap-2 mt-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                <a href={m.linkedin} className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-[#A37B4C] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"><Linkedin className="w-4 h-4" /></a>
                                <a href={`mailto:${m.email}`} className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-[#A37B4C] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"><Mail className="w-4 h-4" /></a>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Mobile fan/deck carousel */}
            <div className="lg:hidden relative">
                <div className="relative flex justify-center items-end" style={{ minHeight: 380 }}>
                    {teamMembers.map((m, i) => {
                        const offset = i - active;
                        const scale = offset === 0 ? 1 : offset === 1 ? 0.94 : 0.88;
                        const y = offset === 0 ? 0 : offset === 1 ? 12 : 24;
                        const zIndex = teamMembers.length - Math.abs(offset);
                        return (
                            <motion.div
                                key={i}
                                animate={{ scale, y, zIndex }}
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                className="absolute w-[85vw] max-w-[360px] aspect-[4/5] max-h-[360px] rounded-2xl overflow-hidden relative bg-card border border-border"
                                style={{ zIndex }}
                            >
                                <img src={m.image} alt={m.name} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <h3 className="font-display text-lg font-semibold text-white">{m.name}</h3>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-[#B88C57]">{m.role}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
                <div className="flex justify-center gap-4 mt-6">
                    <button onClick={prev} className="p-3 rounded-full border border-border bg-card hover:border-[#A37B4C]/40 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Previous">
                        <ArrowLeft className="w-4 h-4" />
                    </button>
                    <button onClick={next} className="p-3 rounded-full border border-border bg-card hover:border-[#A37B4C]/40 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Next">
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </Section>
    );
}
