import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { contact } from '@/routes';
import Section from './AboutSection';

export default function CTASection() {
    return (
        <Section className="mb-16">
            <div className="relative rounded-3xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85" alt="" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
                <div className="relative z-10 max-w-xl p-6 sm:p-10 lg:p-14 min-h-[320px] flex flex-col justify-end">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#B88C57] block mb-3">LET'S CONNECT</span>
                    <h3 className="font-display text-3xl sm:text-4xl text-balance text-white leading-tight">Begin your next chapter with confidence.</h3>
                    <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} href={contact.url()} className="mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full bg-[#A37B4C] hover:bg-[#B88C57] text-white font-medium text-sm transition-all shadow-xl shadow-[#A37B4C]/25">
                        <span>Get In Touch</span>
                        <ArrowUpRight className="w-4 h-4" />
                    </motion.a>
                </div>
            </div>
        </Section>
    );
}
