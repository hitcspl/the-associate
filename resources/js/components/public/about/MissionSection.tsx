import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { RevealText } from '@/components/public/reveal';
import { Lightbulb, Award, Heart } from 'lucide-react';
import { fadeUp, EASE } from '@/lib/motion';
import Section from './AboutSection';

const missionQuote = `Innovation and excellence across a broad spectrum of services and products.`;

const cards = [
    { title: 'Innovation', desc: 'Forward-thinking designs and modern infrastructure.', icon: Lightbulb },
    { title: 'Excellence', desc: 'Uncompromising quality in every brick we lay.', icon: Award },
    { title: 'Lifelong Support', desc: 'A relationship that continues well beyond handover.', icon: Heart },
];

export default function MissionSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollY } = useScroll({ target: sectionRef });
    const parallaxY = useTransform(scrollY, [0, 600], [0, 60]);
    const bgY = useTransform(scrollY, [0, 600], [0, 40]);

    return (
        <Section className="relative w-full overflow-hidden">
            <motion.div className="absolute inset-0 will-change-transform" style={{ y: bgY }}>
                <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85" alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" />
            </motion.div>
            <div className="absolute inset-0 bg-black/80" />
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#A37B4C]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
                <motion.span className="text-[18vw] font-display font-bold text-[#A37B4C]/5" style={{ y: parallaxY }}>MISSION</motion.span>
            </div>
            <div className="relative z-10 py-20 sm:py-28">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    <div>
                        <RevealText text={missionQuote} as="blockquote" className="font-display text-2xl sm:text-4xl lg:text-5xl text-white leading-snug" />
                    </div>
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {cards.map((card) => (
                            <motion.div key={card.title} variants={fadeUp} whileHover={{ y: -4 }} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-center">
                                <div className="mx-auto w-10 h-10 rounded-full bg-[#A37B4C]/20 text-[#B88C57] flex items-center justify-center mb-3">
                                    <card.icon className="w-5 h-5" />
                                </div>
                                <h4 className="font-display text-sm font-semibold text-white mb-1">{card.title}</h4>
                                <p className="text-xs text-stone-300 leading-relaxed">{card.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
                <div className="mt-10 text-center">
                    <span className="inline-block px-6 py-2 rounded-full bg-[#A37B4C]/20 border border-[#A37B4C]/30 text-[#B88C57] font-display italic text-sm sm:text-base">
                        Hence, one customer is always a customer.
                    </span>
                </div>
            </div>
        </Section>
    );
}
