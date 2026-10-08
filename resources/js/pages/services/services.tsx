import { useState, useEffect, useRef, useMemo } from 'react';
import { Head } from '@inertiajs/react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
    Building2,
    MapPin,
    Home,
    Compass,
    Landmark,
    ArrowRight,
    ShieldCheck,
    Award,
    Clock,
    Coins,
    CheckCircle2,
    Sparkles,
    ChevronRight,
    PhoneCall,
    Plus,
    Minus,
} from 'lucide-react';
import { fadeUp, stagger, EASE } from '@/lib/motion';
import PageHero from '@/components/public/page-hero';
import SectionHeading from '@/components/public/section-heading';
import { RevealText } from '@/components/public/reveal';
import { servicesHeroImage } from '@/components/public/images';
import { contact } from '@/routes';

interface Service {
    id: string;
    title: string;
    tag: string;
    description: string;
    bullets: string[];
    icon: React.ElementType;
    image?: string;
}

const services: Service[] = [
    {
        id: '01',
        title: 'Sales & Purchase of Property',
        tag: 'Residential & Commercial',
        description: "Honest, reliable guidance whether you're buying or selling residential apartments, luxury bungalows, or commercial assets in Ranchi.",
        bullets: [
            'Curated shortlist matched to your budget and lifestyle',
            'End-to-end title verification before any agreement',
            'Negotiation support to protect your offer and timeline',
        ],
        icon: Building2,
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
    },
    {
        id: '02',
        title: 'Sales & Purchase of Lands / Plots',
        tag: 'Clear Title Guaranteed',
        description: 'Clear titles, verified legal documentation, and complete transparency on every land transaction.',
        bullets: [
            'Land-record verification through local revenue records',
            'Clear-title guarantee on every plot we list',
            'Site visits with boundary marking and access checks',
        ],
        icon: MapPin,
    },
    {
        id: '03',
        title: 'Flat, Duplex & Simplex',
        tag: 'Sales & Purchase',
        description: 'A comprehensive range of curated residential formats tailored to your lifestyle and budget.',
        bullets: [
            'Hand-picked apartments across prime Ranchi addresses',
            'Floor-plan and Vaastu alignment guidance',
            'Move-in-ready paperwork and registry coordination',
        ],
        icon: Home,
    },
    {
        id: '04',
        title: 'Township Development',
        tag: 'Master-Planned',
        description: 'Master-planned communities engineered with modern infrastructure and sustainable living standards.',
        bullets: [
            'Gated layouts with 24/7 water and power backup',
            'Parks, clubhouse, and commercial podium planning',
            'Phased delivery so you invest with certainty',
        ],
        icon: Compass,
    },
    {
        id: '05',
        title: 'Housing Loans Support',
        tag: 'Govt. & Private Banks',
        description: 'Hassle-free financing assistance with leading government and top private banking partners.',
        bullets: [
            'Pre-sanction eligibility check in 24 hours',
            'Documentation handled end-to-end by our team',
            'Best-rate negotiation across partner banks',
        ],
        icon: Landmark,
    },
];

const values = [
    { title: 'Experience', desc: '14+ Years in Ranchi Market', icon: Award },
    { title: 'Transparency', desc: '100% Clear Titles & Dealing', icon: ShieldCheck },
    { title: 'Commitment', desc: 'Guaranteed Timely Delivery', icon: Clock },
    { title: 'Peace of Mind', desc: 'Legally Sound Transactions', icon: CheckCircle2 },
    { title: 'Value Your Money', desc: 'Cost-Effective Solutions', icon: Coins },
];

const processSteps = [
    { label: 'Consultation', desc: 'We listen, define goals, and shortlist the right opportunities.', icon: Sparkles },
    { label: 'Verification', desc: 'Legal, title, and site checks completed before you commit.', icon: ShieldCheck },
    { label: 'Documentation', desc: 'Paperwork, agreements, and registry handled end-to-end.', icon: CheckCircle2 },
    { label: 'Handover', desc: 'Keys, possession, and after-sales support delivered on time.', icon: Award },
];

const faqs = [
    {
        q: 'How do I start the buying process?',
        a: 'Book a free consultation through the contact form or call our Ranchi HQ. We assign a dedicated consultant within 2 hours.',
    },
    {
        q: 'Are all titles legally verified?',
        a: 'Yes. Every listing undergoes title, survey, and encumbrance checks by our in-house legal team before it reaches you.',
    },
    {
        q: 'Do you assist with home loans?',
        a: 'Absolutely. We partner with leading banks and NBFCs to pre-sanction, negotiate rates, and process disbursement faster.',
    },
    {
        q: 'Can I visit ongoing project sites?',
        a: 'Yes. Site visits are arranged daily with a transport guide, safety kit, and a project supervisor walkthrough.',
    },
];

function ServicePanel({ service, active }: { service: Service; active: boolean }) {
    const Icon = service.icon;
    return (
        <motion.div
            id={`service-${service.id}`}
            variants={fadeUp}
            whileHover={{ y: -4 }}
            className={`relative rounded-2xl border p-6 sm:p-8 transition-colors ${
                active ? 'border-[#A37B4C] shadow-lg shadow-[#A37B4C]/5' : 'border-border'
            } bg-card`}
        >
            {service.image && (
                <div className="relative h-40 sm:h-48 rounded-xl overflow-hidden mb-6">
                    <img
                        src={service.image}
                        alt={service.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
            )}
            <div className="flex items-start gap-4 mb-4">
                <span className="font-display text-4xl sm:text-5xl font-light text-[#A37B4C] dark:text-[#B88C57] leading-none">
                    {service.id}
                </span>
                <div className="p-3 rounded-xl bg-[#A37B4C]/10 text-[#A37B4C] dark:text-[#B88C57]">
                    <Icon className="w-6 h-6" />
                    <h1>Lets Talk</h1>
                </div>
            </div>
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#A37B4C] dark:text-[#B88C57] block mb-2">
                {service.tag}
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-medium text-foreground mb-3">
                {service.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{service.description}</p>
            <ul className="space-y-2 mb-6">
                {service.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#A37B4C] dark:bg-[#B88C57]" />
                        <span className="text-muted-foreground">{b}</span>
                    </li>
                ))}
            </ul>
            <a
                href={contact.url()}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A37B4C] dark:text-[#B88C57] hover:underline"
            >
                Discuss this service
                <ArrowRight className="w-3.5 h-3.5" />
            </a>
        </motion.div>
    );
}

function AccordionItem({ item, open, onClick }: { item: typeof faqs[0]; open: boolean; onClick: () => void }) {
    return (
        <div className="border border-border rounded-xl overflow-hidden bg-card">
            <button
                onClick={onClick}
                aria-expanded={open}
                className="w-full flex items-center justify-between px-4 py-3.5 text-left min-h-[44px]"
            >
                <span className="text-sm font-medium text-foreground">{item.q}</span>
                <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    {open ? <Minus className="w-4 h-4 text-muted-foreground" /> : <Plus className="w-4 h-4 text-muted-foreground" />}
                </motion.div>
            </button>
            <motion.div
                layout
                initial={false}
                animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
            >
                <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">{item.a}</div>
            </motion.div>
        </div>
    );
}

export default function Services() {
    const [activeService, setActiveService] = useState('01');
    const [activeFaq, setActiveFaq] = useState<number | null>(0);
    const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const { scrollY } = useScroll();
    const lineScale = useTransform(scrollY, [0, 800], [0, 1]);

    useEffect(() => {
        const observers: IntersectionObserver[] = [];
        services.forEach((srv) => {
            const id = `service-${srv.id}`;
            const node = sectionRefs.current[id];
            if (!node) return;
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setActiveService(srv.id);
                        }
                    });
                },
                { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
            );
            observer.observe(node);
            observers.push(observer);
        });
        return () => observers.forEach((o) => o.disconnect());
    }, []);

    const statRow = useMemo(
        () => [
            { value: '05+', label: 'Service Lines' },
            { value: '14+', label: 'Years Experience' },
            { value: '18', label: 'Verified Sites' },
        ],
        [],
    );

    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-[#A37B4C] selection:text-white">
            <Head title="Services" />

            <main>
                <PageHero
                    image={servicesHeroImage}
                    imageAlt="Luxury Villa Architecture"
                    title="Our Services"
                    subtitle="Comprehensive, trusted real estate solutions for every stage of your investment journey in Ranchi."
                />

                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Intro */}
                    <section className="py-10 sm:py-14">
                        <div className="max-w-2xl mx-auto text-center">
                            <SectionHeading
                                eyebrow="WHAT WE DO"
                                title="Everything you need, under one roof."
                                description="From first consultation to handover, our services cover every mile of your real estate journey in Ranchi."
                                align="center"
                            />
                            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
                                {statRow.map((stat) => (
                                    <div key={stat.label} className="text-center">
                                        <div className="font-display text-3xl sm:text-4xl font-medium text-foreground">{stat.value}</div>
                                        <div className="text-[11px] uppercase tracking-widest text-muted-foreground mt-1">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Services Two-Column */}
                    <section className="py-10 sm:py-16">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                            {/* Sticky Nav */}
                            <div className="hidden lg:block lg:col-span-4">
                                <div className="sticky top-28 space-y-6">
                                    <div>
                                        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#A37B4C] dark:text-[#B88C57]">Our Services</span>
                                        <h2 className="font-display text-3xl sm:text-4xl font-medium text-foreground mt-2 leading-tight">
                                            Built around your goals
                                        </h2>
                                        <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                                            Each service is a dedicated workflow with its own timeline, documentation checklist, and point-of-contact.
                                        </p>
                                    </div>
                                    <nav className="space-y-1">
                                        {services.map((srv) => (
                                            <a
                                                key={srv.id}
                                                href={`#service-${srv.id}`}
                                                className={`relative flex items-center gap-3 px-3 py-3 rounded-xl text-sm transition-colors min-h-[44px] ${
                                                    activeService === srv.id ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                                                }`}
                                            >
                                                {activeService === srv.id && (
                                                    <motion.div
                                                        layoutId="service-nav-pill"
                                                        className="absolute inset-0 rounded-xl bg-[#A37B4C]/10 border border-[#A37B4C]/20"
                                                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                                    />
                                                )}
                                                <span className="relative z-10 font-display text-lg">{srv.id}</span>
                                                <span className="relative z-10 font-medium">{srv.title}</span>
                                            </a>
                                        ))}
                                    </nav>
                                </div>
                            </div>

                            {/* Mobile sticky chip bar */}
                            <div className="lg:hidden sticky top-20 z-30 bg-background/80 backdrop-blur border-b border-border -mx-4 px-4 py-2 mb-4">
                                <div className="flex gap-2 overflow-x-auto scroll-thin snap-x [-webkit-overflow-scrolling:touch]">
                                    {services.map((srv) => (
                                        <a
                                            key={srv.id}
                                            href={`#service-${srv.id}`}
                                            className={`snap-start shrink-0 px-4 py-2 rounded-full text-xs font-medium border transition-colors min-h-[44px] ${
                                                activeService === srv.id
                                                    ? 'bg-[#A37B4C] text-white border-[#A37B4C]'
                                                    : 'border-border text-muted-foreground'
                                            }`}
                                        >
                                            {srv.id} {srv.title}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Panels */}
                            <div className="lg:col-span-8 space-y-6">
                                <AnimatePresence mode="popLayout">
                                    <motion.div
                                        key={activeService}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, amount: 0.15 }}
                                        variants={stagger(0.1)}
                                        className="grid grid-cols-1 gap-6"
                                    >
                                        {services.map((srv) => (
                                            <div
                                                key={srv.id}
                                                ref={(el) => { sectionRefs.current[`service-${srv.id}`] = el; }}
                                            >
                                                <ServicePanel service={srv} active={activeService === srv.id} />
                                            </div>
                                        ))}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </section>

                    {/* Process Timeline */}
                    <section className="py-16 border-t border-border">
                        <SectionHeading
                            eyebrow="HOW IT WORKS"
                            title="A four-step journey, every time."
                            description="Consistent, transparent, and designed to keep you informed at every milestone."
                            align="center"
                        />
                        <div className="mt-12 relative">
                            {/* Desktop line */}
                            <div className="absolute top-8 left-8 right-8 h-px bg-border hidden md:block" />
                            <motion.div
                                className="absolute top-8 left-8 right-8 h-px bg-[#A37B4C] hidden md:block origin-left"
                                style={{ scaleX: lineScale }}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
                                {processSteps.map((step, idx) => {
                                    const StepIcon = step.icon;
                                    return (
                                        <motion.div
                                            key={step.label}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, amount: 0.15 }}
                                            transition={{ delay: idx * 0.1, duration: 0.6, ease: EASE }}
                                            className="relative"
                                        >
                                            {/* Mobile line */}
                                            <div className="absolute left-4 top-10 bottom-0 w-px bg-border md:hidden" />
                                            <div className="flex items-start gap-4">
                                                <div className="relative z-10 flex flex-col items-center">
                                                    <div className="w-8 h-8 rounded-full bg-[#A37B4C] text-white flex items-center justify-center">
                                                        <StepIcon className="w-4 h-4" />
                                                    </div>
                                                </div>
                                                <div className="pb-8">
                                                    <h4 className="font-display text-base font-medium text-foreground">{step.label}</h4>
                                                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{step.desc}</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>

                    {/* Philosophy Band */}
                    <section className="relative w-full overflow-hidden">
                        <motion.div
                            className="absolute inset-0 will-change-transform"
                            style={{ y: useParallax() }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85"
                                alt=""
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                        <div className="absolute inset-0 bg-black/80" />
                        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#A37B4C]/20 rounded-full blur-3xl pointer-events-none" />
                        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
                            <div className="max-w-4xl mx-auto text-center">
                                <RevealText
                                    text="Innovation and excellence across a broad spectrum of services and products."
                                    as="blockquote"
                                    className="font-display text-2xl sm:text-4xl lg:text-5xl text-white leading-snug"
                                />
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.15 }}
                                    transition={{ duration: 0.7, ease: EASE }}
                                    className="mt-6 text-sm sm:text-base text-stone-300 font-light max-w-2xl mx-auto leading-relaxed"
                                >
                                    Professional and accessible support, along with a simple philosophy of providing exemplary service based on optimum use of available resources, defines how we work.
                                </motion.p>
                                <div className="mt-8">
                                    <span className="inline-block px-6 py-2 rounded-full bg-[#A37B4C]/20 border border-[#A37B4C]/30 text-[#B88C57] font-display italic text-sm sm:text-base">
                                        Hence, one customer is always a customer.
                                    </span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Core Principles */}
                    <section className="py-16 sm:py-24">
                        <SectionHeading
                            eyebrow="OUR PRINCIPLES"
                            title="What separates good from great."
                            description="These five principles shape every client relationship, every site visit, and every handover."
                            align="center"
                        />
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.15 }}
                            variants={stagger(0.1)}
                            className="mt-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4"
                        >
                            {values.map((v, i) => {
                                const Icon = v.icon;
                                const isLast = i === values.length - 1;
                                return (
                                    <motion.div
                                        key={v.title}
                                        variants={fadeUp}
                                        whileHover={{ y: -4 }}
                                        className={`p-6 rounded-2xl border border-border bg-card text-center hover:border-[#A37B4C]/40 transition-colors ${isLast ? 'sm:col-span-2 xl:col-span-1' : ''}`}
                                    >
                                        <div className="mx-auto w-12 h-12 rounded-full bg-[#A37B4C]/10 text-[#A37B4C] dark:text-[#B88C57] flex items-center justify-center mb-4">
                                            <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ duration: 0.3 }}>
                                                <Icon className="w-6 h-6" />
                                            </motion.div>
                                        </div>
                                        <h4 className="font-display text-base font-semibold text-foreground mb-1">{v.title}</h4>
                                        <div className="w-8 h-px bg-[#A37B4C]/40 mx-auto my-3" />
                                        <p className="text-xs text-muted-foreground leading-relaxed">{v.desc}</p>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </section>

                    {/* FAQ */}
                    <section className="py-16 border-t border-border">
                        <SectionHeading
                            eyebrow="FAQ"
                            title="Questions, answered."
                            description="Quick clarifications before you reach out."
                            align="center"
                        />
                        <div className="mt-10 max-w-2xl mx-auto space-y-3">
                            {faqs.map((item, idx) => (
                                <AccordionItem
                                    key={item.q}
                                    item={item}
                                    open={activeFaq === idx}
                                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                                />
                            ))}
                        </div>
                    </section>

                    {/* CTA Band */}
                    <section className="mb-16">
                        <div className="relative rounded-none sm:rounded-2xl overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85"
                                alt=""
                                loading="lazy"
                                decoding="async"
                                className="w-full h-64 sm:h-80 object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
                            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
                                <div className="max-w-xl w-full">
                                    <span className="text-xs font-bold uppercase tracking-widest text-[#B88C57] block mb-3">
                                        LET&apos;S TALK REAL ESTATE
                                    </span>
                                    <h3 className="font-display text-3xl sm:text-5xl font-normal text-white leading-tight">
                                        Your Dream Property is Just a Step Away.
                                    </h3>
                                    <motion.a
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.98 }}
                                        href={contact.url()}
                                        className="mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full bg-[#A37B4C] hover:bg-[#B88C57] text-white font-medium text-sm transition-all shadow-xl shadow-[#A37B4C]/25"
                                    >
                                        <span>Get In Touch</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </motion.a>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}

function useParallax() {
    const { scrollY } = useScroll();
    return useTransform(scrollY, [0, 600], [0, 60]);
}

function useScrollLine() {
    const { scrollY } = useScroll();
    return useTransform(scrollY, [0, 800], [0, 1]);
}
