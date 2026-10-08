import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from 'framer-motion';
import { Award, ShieldCheck, Clock, CheckCircle2, Coins } from 'lucide-react';
import { fadeUp, EASE } from '@/lib/motion';
import Section from './AboutSection';

const values = [
    { id: 1, title: 'Experience', subtitle: 'Hands-on Expertise', desc: 'Deep market expertise navigating Ranchi real estate to ensure sound investment decisions.', meaning: 'You get a consultant who knows every lane, legal nuance, and opportunity in Ranchi.', icon: Award },
    { id: 2, title: 'Transparency', subtitle: 'Clear & Honest Titles', desc: 'Clear titles, honest dealing, and no hidden surprises with full legal clarity.', meaning: 'Every document is shared upfront so there are no surprises at the registration desk.', icon: ShieldCheck },
    { id: 3, title: 'Commitment', subtitle: 'Timely Delivery', desc: 'Timely completion with strict adherence to quality and delivery timelines.', meaning: 'We deliver on the date we promise, not a day later.', icon: Clock },
    { id: 4, title: 'Peace of Mind', subtitle: 'Legally Sound', desc: 'Legally sound, hassle-free transactions from selection to registration.', meaning: 'From the first site visit to the registry, we handle the paperwork and the pressure.', icon: CheckCircle2 },
    { id: 5, title: 'Value Your Money', subtitle: 'Cost-Effective', desc: 'Cost-effective solutions that respect your investment without compromising quality.', meaning: 'Better value without cutting corners—your money works harder.', icon: Coins },
];

const radius = 120;
const angleStep = 360 / values.length;
const startAngle = -90;

export default function PillarsSection() {
    const [active, setActive] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isHovered) return;
        const id = setInterval(() => {
            setActive((prev) => (prev + 1) % values.length);
        }, 5000);
        return () => clearInterval(id);
    }, [isHovered]);

    const nodes = useMemo(() => {
        return values.map((v, i) => {
            const angle = startAngle + i * angleStep;
            const rad = (angle * Math.PI) / 180;
            const x = Math.cos(rad) * radius;
            const y = Math.sin(rad) * radius;
            return { ...v, x, y, angle };
        });
    }, []);

    const circumference = 2 * Math.PI * radius;
    const dashOffset = useMemo(() => {
        const progress = active / values.length;
        return circumference - progress * circumference;
    }, [active, circumference]);

    return (
        <Section className="py-16 sm:py-24">
            <div className="mb-10 text-center">
                <span className="text-xs font-bold uppercase tracking-widest text-[#A37B4C] block mb-2">THE ASSOCIATE COMPASS</span>
                <h2 className="font-display text-3xl sm:text-5xl font-medium text-foreground">5 Promises</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Wheel */}
                <div ref={containerRef} className="relative flex items-center justify-center" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                    <svg width={radius * 2 + 80} height={radius * 2 + 80} className="transform -rotate-0">
                        <circle cx={radius + 40} cy={radius + 40} r={radius} fill="none" stroke="currentColor" className="text-border" strokeWidth="2" />
                        <motion.circle
                            cx={radius + 40}
                            cy={radius + 40}
                            r={radius}
                            fill="none"
                            stroke="#A37B4C"
                            strokeWidth="2"
                            strokeDasharray={circumference}
                            style={{ strokeDashoffset: dashOffset, transition: 'stroke-dashoffset 0.5s ease' }}
                            transform={`rotate(-90 ${radius + 40} ${radius + 40})`}
                        />
                        {nodes.map((node, i) => {
                            const cx = radius + 40 + node.x;
                            const cy = radius + 40 + node.y;
                            const isActiveNode = active === i;
                            return (
                                <g key={node.id} onClick={() => setActive(i)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActive(i); }} tabIndex={0} role="tab" aria-selected={isActiveNode} className="cursor-pointer">
                                    <motion.circle
                                        cx={cx}
                                        cy={cy}
                                        r={24}
                                        fill={isActiveNode ? '#A37B4C' : 'transparent'}
                                        stroke={isActiveNode ? '#A37B4C' : 'currentColor'}
                                        className={isActiveNode ? 'text-[#A37B4C]' : 'text-border'}
                                        strokeWidth="2"
                                        animate={{ scale: isActiveNode ? 1.1 : 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                    <foreignObject x={cx - 12} y={cy - 12} width={24} height={24}>
                                        <node.icon className={`w-5 h-5 ${isActiveNode ? 'text-white' : 'text-[#A37B4C]'}`} />
                                    </foreignObject>
                                </g>
                            );
                        })}
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="text-center">
                            <span className="block font-display text-4xl font-bold text-[#A37B4C]">5</span>
                            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Promises</span>
                        </div>
                    </div>
                </div>

                {/* Feature card */}
                <div className="min-h-[320px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active}
                            initial={{ opacity: 0, x: 16 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -16 }}
                            transition={{ duration: 0.3, ease: EASE }}
                            className="p-6 sm:p-8 rounded-2xl border border-border bg-card"
                        >
                            <span className="text-6xl font-display font-bold text-[#A37B4C]/10 absolute top-4 right-6 select-none">{String(values[active].id).padStart(2, '0')}</span>
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-3 rounded-xl bg-[#A37B4C]/10 text-[#A37B4C]">
                                        {React.createElement(values[active].icon, { className: 'w-6 h-6' })}
                                    </div>
                                    <div>
                                        <h3 className="font-display text-xl font-semibold text-foreground">{values[active].title}</h3>
                                        <p className="text-xs text-[#A37B4C] font-medium">{values[active].subtitle}</p>
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{values[active].desc}</p>
                                <div className="p-3 rounded-xl bg-[#A37B4C]/5 border border-[#A37B4C]/10">
                                    <p className="text-xs font-medium text-[#A37B4C]">
                                        <span className="font-bold">What this means for you:</span> {values[active].meaning}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </Section>
    );
}
