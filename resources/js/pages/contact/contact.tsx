import { useState, useEffect, useMemo, type FormEvent, type ChangeEvent } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MapPin,
    Phone,
    Mail,
    Globe,
    Clock,
    ExternalLink,
    CheckCircle2,
    ShieldCheck,
    Award,
    Sparkles,
    ChevronRight,
    Copy,
    Check,
    Loader2,
    Headphones,
    Send,
    ArrowUpRight,
} from 'lucide-react';
import { fadeUp, stagger } from '@/lib/motion';
import PageHero from '@/components/public/page-hero';
import SectionHeading from '@/components/public/section-heading';
import { contactHeroImage } from '@/components/public/images';

interface ContactPageProps {
    property?: string;
}

const channels = [
    {
        label: 'Head Office',
        value: '+91 651 2281718',
        href: 'tel:+916512281718',
        icon: Phone,
        copy: true,
    },
    {
        label: 'Toll Free',
        value: '1800 889 2918',
        href: 'tel:18008892918',
        icon: Headphones,
        copy: true,
    },
    {
        label: 'Email',
        value: 'associaterealcon@gmail.com',
        href: 'mailto:associaterealcon@gmail.com',
        icon: Mail,
        copy: true,
    },
    {
        label: 'Website',
        value: 'www.theassociatedevelopers.com',
        href: 'https://www.theassociatedevelopers.com',
        icon: Globe,
        copy: false,
    },
];

const propertyOptions = [
    'Residential Property',
    'Land/Plot',
    'Flat/Duplex/Simplex',
    'Township Development',
    'Housing Loan Assistance',
    'Not Sure Yet',
];

function useOfficeStatus() {
    const [open, setOpen] = useState(false);
    useEffect(() => {
        const check = () => {
            const now = new Date();
            const formatter = new Intl.DateTimeFormat('en-US', {
                timeZone: 'Asia/Kolkata',
                hour12: false,
                weekday: 'short',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            });
            const parts = formatter.formatToParts(now);
            const get = (t: string) => parts.find((p) => p.type === t)?.value;
            const day = get('weekday') as string;
            const hour = Number(get('hour') as string);
            const minute = Number(get('minute') as string);
            const isWeekday = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].includes(day);
            const minutes = hour * 60 + minute;
            const inRange = isWeekday && minutes >= 570 && minutes < 1110;
            setOpen(inRange);
        };
        check();
        const id = setInterval(check, 30_000);
        return () => clearInterval(id);
    }, []);
    return open;
}

function useQueryProperty(): string | undefined {
    const { url } = usePage<{ url?: string }>();
    return useMemo(() => {
        try {
            const u = new URL(url || '', window.location.origin);
            return u.searchParams.get('property') || undefined;
        } catch {
            return undefined;
        }
    }, [url]);
}

function InputField({
    label,
    name,
    type = 'text',
    value,
    onChange,
    onBlur,
    error,
    required,
    maxLength,
    inputMode,
    pattern,
    placeholder,
    children,
    rows,
}: {
    label: string;
    name: string;
    type?: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    onBlur?: () => void;
    error?: string;
    required?: boolean;
    maxLength?: number;
    inputMode?: 'text' | 'tel' | 'email';
    pattern?: string;
    placeholder?: string;
    children?: React.ReactNode;
    rows?: number;
}) {
    const [focused, setFocused] = useState(false);
    const active = focused || value.length > 0;
    return (
        <div className="relative">
            <label
                htmlFor={`contact-${name}`}
                className={`block text-xs font-bold uppercase tracking-wider mb-1.5 transition-colors ${
                    active ? 'text-[#A37B4C] dark:text-[#B88C57]' : 'text-muted-foreground'
                }`}
            >
                {label}
                {required && <span className="ml-1 text-[#A37B4C]">*</span>}
            </label>
            {children ? (
                <select
                    id={`contact-${name}`}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={`w-full px-4 py-3 rounded-xl text-sm transition-all focus:outline-none border bg-background text-foreground focus:border-[#A37B4C] dark:focus:border-[#B88C57] ${
                        error ? 'border-destructive focus:border-destructive' : 'border-border'
                    }`}
                >
                    {children}
                </select>
            ) : rows ? (
                <textarea
                    id={`contact-${name}`}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setFocused(true)}
                    onBlur={() => {
                        setFocused(false);
                        onBlur?.();
                    }}
                    maxLength={maxLength}
                    placeholder={placeholder}
                    aria-describedby={error ? `contact-${name}-error` : undefined}
                    rows={rows}
                    className={`w-full px-4 py-3 rounded-xl text-sm transition-all focus:outline-none border bg-background text-foreground focus:border-[#A37B4C] dark:focus:border-[#B88C57] ${
                        error ? 'border-destructive focus:border-destructive' : 'border-border'
                    }`}
                />
            ) : (
                <input
                    id={`contact-${name}`}
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setFocused(true)}
                    onBlur={() => {
                        setFocused(false);
                        onBlur?.();
                    }}
                    maxLength={maxLength}
                    inputMode={inputMode}
                    pattern={pattern}
                    placeholder={placeholder}
                    aria-describedby={error ? `contact-${name}-error` : undefined}
                    className={`w-full px-4 py-3 rounded-xl text-sm transition-all focus:outline-none border bg-background text-foreground focus:border-[#A37B4C] dark:focus:border-[#B88C57] ${
                        error ? 'border-destructive focus:border-destructive' : 'border-border'
                    }`}
                />
            )}
            {error && (
                <p id={`contact-${name}-error`} className="mt-1 text-xs text-destructive">
                    {error}
                </p>
            )}
        </div>
    );
}

export default function Contact() {
    const isOpen = useOfficeStatus();
    const propertyPrefill = useQueryProperty();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitting, setSubmitting] = useState(false);
    const [copiedField, setCopiedField] = useState<string | null>(null);
    const [mapLoaded, setMapLoaded] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        propertyInterest: 'Residential Property',
        message: '',
        _honey: '',
    });

    useEffect(() => {
        if (propertyPrefill) {
            setFormData((p) => ({ ...p, propertyInterest: 'Residential Property' }));
        }
    }, [propertyPrefill]);

    const messageCount = formData.message.length;
    const messageValid = messageCount <= 500;

    const validate = () => {
        const e: Record<string, string> = {};
        if (!formData.name.trim()) e.name = 'Name is required';
        const raw = formData.phone.replace(/[\s-]/g, '');
        if (!/^\+?91\d{10}$/.test(raw) && !/^\d{10}$/.test(raw)) e.phone = 'Enter a valid 10-digit Indian mobile';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Enter a valid email';
        if (!messageValid) e.message = 'Message must be 500 characters or fewer';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (submitting) return;
        if (!validate()) return;
        if (formData._honey) return;
        setSubmitting(true);
        // TODO: connect to backend. Using client-side simulation for now.
        await new Promise((r) => setTimeout(r, 1200));
        setSubmitting(false);
        setFormSubmitted(true);
    };

    const copyToClipboard = async (text: string, field: string) => {
        await navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    };

    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-[#A37B4C] selection:text-white">
            <Head title="Contact" />

            <main>
                <PageHero
                    image={contactHeroImage}
                    imageAlt="Sunset Architecture"
                    title="Begin your next chapter with confidence."
                    subtitle="Whether you're buying a permanent residence, securing a refined investment, or looking to purchase clear land, The Associate brings honest advice, legal transparency, and a hassle-free approach to every decision."
                >
                    <div className="flex flex-wrap gap-3">
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md text-[#B88C57] border border-white/10">
                            <Award className="w-3.5 h-3.5 text-[#A37B4C]" />
                            14 Years of Trust
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md text-emerald-200 border border-white/10">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                            Legal Transparency
                        </span>
                    </div>
                </PageHero>

                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
                    {/* Quick Actions */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                        variants={fadeUp}
                        className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 lg:mb-12"
                    >
                        <a href="tel:+916512281718" className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-border bg-card hover:border-[#A37B4C]/40 transition-colors min-h-[44px]">
                            <Phone className="w-4 h-4 text-[#A37B4C]" />
                            <span className="text-xs font-semibold">Call</span>
                        </a>
                        <a href="tel:18008892918" className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-border bg-card hover:border-[#A37B4C]/40 transition-colors min-h-[44px]">
                            <Phone className="w-4 h-4 text-[#A37B4C]" />
                            <span className="text-xs font-semibold">Toll Free</span>
                        </a>
                        <a href="mailto:associaterealcon@gmail.com" className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-border bg-card hover:border-[#A37B4C]/40 transition-colors min-h-[44px]">
                            <Mail className="w-4 h-4 text-[#A37B4C]" />
                            <span className="text-xs font-semibold">Email</span>
                        </a>
                        <a href="https://maps.google.com/?q=Girdhar+Plaza,Harmu+Road,Ranchi" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-border bg-card hover:border-[#A37B4C]/40 transition-colors min-h-[44px]">
                            <MapPin className="w-4 h-4 text-[#A37B4C]" />
                            <span className="text-xs font-semibold">Directions</span>
                        </a>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                        {/* Left: Contact Channels */}
                        <div className="lg:col-span-5 space-y-6">
                            <SectionHeading eyebrow="OFFICE & CHANNELS" title="Get in touch" description="Choose the channel that suits you best." align="left" />

                            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={stagger(0.08)} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                                {channels.map((ch) => {
                                    const Icon = ch.icon;
                                    return (
                                        <motion.div key={ch.label} variants={fadeUp} className="p-4 rounded-2xl border border-border bg-card hover:border-[#A37B4C]/40 transition-colors group">
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="flex items-start gap-3">
                                                    <div className="p-2.5 rounded-xl bg-[#A37B4C]/10 text-[#A37B4C] dark:text-[#B88C57]">
                                                        <Icon className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xs font-bold uppercase tracking-wider text-[#A37B4C] dark:text-[#B88C57]">{ch.label}</h3>
                                                        <a href={ch.href} target="_blank" rel="noopener noreferrer" className="text-sm sm:text-base font-semibold text-foreground hover:text-[#A37B4C] transition-colors break-all">
                                                            {ch.value}
                                                        </a>
                                                        {ch.copy && (
                                                            <button onClick={() => copyToClipboard(ch.value, ch.label)} className="mt-1 text-[11px] text-muted-foreground hover:text-[#A37B4C] inline-flex items-center gap-1 min-h-[44px]">
                                                                {copiedField === ch.label ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                                                                {copiedField === ch.label ? 'Copied' : 'Copy'}
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>

                            {/* Office Hours */}
                            <div className="p-4 rounded-2xl border border-border bg-card flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Clock className="w-5 h-5 text-[#A37B4C]" />
                                    <div>
                                        <h3 className="text-xs font-bold uppercase tracking-wider text-[#A37B4C] dark:text-[#B88C57]">Office Hours</h3>
                                        <p className="text-xs text-muted-foreground">Mon – Sat: 9:30 AM – 6:30 PM IST</p>
                                    </div>
                                </div>
                                <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${isOpen ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20'}`}>
                                    {isOpen ? 'Open now' : 'Closed'}
                                </span>
                            </div>

                            {/* Map */}
                            <div className="p-3 rounded-2xl sm:rounded-3xl border border-border bg-card overflow-hidden">
                                <div className="relative w-full aspect-video sm:aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-muted">
                                    {!mapLoaded && (
                                        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-muted via-background to-muted" />
                                    )}
                                    <iframe
                                        title="The Associate Location Map"
                                        src="https://maps.google.com/maps?q=Girdhar%20Plaza,%20Harmu%20Road,%20Ranchi&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                        className={`w-full h-full border-0 filter grayscale contrast-125 dark:invert dark:hue-rotate-180 dark:contrast-90 transition-opacity duration-500 ${mapLoaded ? 'opacity-100' : 'opacity-0'}`}
                                        allowFullScreen
                                        loading="lazy"
                                        onLoad={() => setMapLoaded(true)}
                                    />
                                    <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-1.5">
                                        <MapPin className="w-3.5 h-3.5 text-[#A37B4C]" />
                                        <span>506, Girdhar Plaza, Ranchi</span>
                                    </div>
                                </div>
                                <div className="mt-3 flex justify-end">
                                    <a href="https://maps.google.com/?q=Girdhar+Plaza,Harmu+Road,Ranchi" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#A37B4C] dark:text-[#B88C57] hover:underline">
                                        <ExternalLink className="w-3.5 h-3.5" />
                                        Open in Google Maps
                                    </a>
                                </div>
                            </div>

                            {/* Guarantee Band */}
                            <div className="relative overflow-hidden rounded-2xl border border-[#A37B4C]/30 bg-[#A37B4C]/10 p-6">
                                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#A37B4C]/60 to-transparent" />
                                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                    <div className="flex-1">
                                        <span className="text-[#B88C57] font-mono text-[11px] font-bold uppercase tracking-widest block mb-1">OUR GUARANTEE</span>
                                        <h3 className="font-display text-xl sm:text-2xl italic text-[#A37B4C] dark:text-[#B88C57] leading-snug">
                                            &ldquo;It&apos;s honor to be different.&rdquo;
                                        </h3>
                                    </div>
                                    <div className="px-4 py-2 rounded-xl bg-[#A37B4C]/20 border border-[#A37B4C]/30 flex-shrink-0">
                                        <span className="text-sm font-bold text-[#A37B4C] dark:text-[#B88C57] font-mono">14 Years of Trust.</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Sticky Form */}
                        <div className="lg:col-span-7">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-border bg-card lg:sticky lg:top-28"
                            >
                                <div className="mb-6 pb-4 border-b border-border">
                                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#A37B4C] dark:text-[#B88C57] uppercase tracking-widest mb-1">
                                        <Sparkles className="w-3.5 h-3.5" />
                                        <span>DIRECT ADVISORY</span>
                                    </div>
                                    <h3 className="font-display text-2xl font-medium text-foreground">Request a Consultation</h3>
                                    <p className="text-xs mt-1 text-muted-foreground">
                                        Fill in your requirements for personalized project brochures and legal guidance.
                                    </p>
                                    {propertyPrefill && (
                                        <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#A37B4C]/10 border border-[#A37B4C]/20 text-xs font-semibold text-[#A37B4C] dark:text-[#B88C57]">
                                            <span>Enquiring about:</span>
                                            <span className="truncate max-w-[200px]">{propertyPrefill}</span>
                                        </div>
                                    )}
                                </div>

                                <AnimatePresence mode="wait">
                                    {formSubmitted ? (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center"
                                        >
                                            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                                            <h4 className="font-display text-lg font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
                                                Inquiry Received!
                                            </h4>
                                            <p className="text-xs text-muted-foreground">
                                                Our real estate consultants will reach out to you within 24 business hours.
                                            </p>
                                        </motion.div>
                                    ) : (
                                        <form key="form" onSubmit={handleSubmit} className="space-y-4">
                                            <input type="text" name="_honey" value={formData._honey} onChange={(e) => setFormData((p) => ({ ...p, _honey: e.target.value }))} className="hidden" tabIndex={-1} autoComplete="off" />

                                            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={stagger(0.05)} className="space-y-4">
                                                <motion.div variants={fadeUp}>
                                                    <InputField label="Name" name="name" value={formData.name} onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))} onBlur={() => validate()} required error={errors.name} placeholder="e.g. Rahul Sharma" />
                                                </motion.div>
                                                <motion.div variants={fadeUp}>
                                                    <InputField label="Phone" name="phone" type="tel" value={formData.phone} onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))} onBlur={() => validate()} required error={errors.phone} inputMode="tel" placeholder="+91 98765 43210" />
                                                </motion.div>
                                                <motion.div variants={fadeUp}>
                                                    <InputField label="Email" name="email" type="email" value={formData.email} onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))} onBlur={() => validate()} required error={errors.email} inputMode="email" placeholder="rahul@example.com" />
                                                </motion.div>
                                                <motion.div variants={fadeUp}>
                                                    <InputField label="Property Interest" name="propertyInterest" value={formData.propertyInterest} onChange={(e) => setFormData((p) => ({ ...p, propertyInterest: e.target.value }))}>
                                                        {propertyOptions.map((opt) => (
                                                            <option key={opt} value={opt}>{opt}</option>
                                                        ))}
                                                    </InputField>
                                                </motion.div>
                                                <motion.div variants={fadeUp}>
                                                    <InputField label="Message" name="message" value={formData.message} onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))} required error={errors.message} maxLength={500} rows={4} placeholder="Tell us about your budget or preferred Ranchi location..." />
                                                    <div className="text-right mt-1">
                                                        <span className={`text-[11px] ${messageValid ? 'text-muted-foreground' : 'text-destructive'}`}>{messageCount}/500</span>
                                                    </div>
                                                </motion.div>
                                            </motion.div>

                                            <motion.button
                                                whileHover={{ scale: 1.01 }}
                                                whileTap={{ scale: 0.98 }}
                                                type="submit"
                                                disabled={submitting}
                                                className="w-full py-3.5 px-6 rounded-xl bg-[#A37B4C] hover:bg-[#B88C57] text-white font-semibold text-sm transition-all shadow-lg shadow-[#A37B4C]/25 flex items-center justify-center gap-2 min-h-[44px] disabled:opacity-70"
                                            >
                                                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                                <span>{submitting ? 'Submitting...' : 'Submit Inquiry'}</span>
                                            </motion.button>

                                            <p className="text-[11px] flex items-center justify-center gap-1.5 text-muted-foreground">
                                                <ShieldCheck className="w-3.5 h-3.5 text-[#A37B4C]" />
                                                Secure and confidential communication.
                                            </p>
                                        </form>
                                    )}
                                </AnimatePresence>

                                {/* What happens next */}
                                <div className="mt-8 pt-6 border-t border-border">
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">What happens next</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-[#A37B4C]/10 text-[#A37B4C] dark:text-[#B88C57] flex items-center justify-center text-[10px] font-bold">1</div>
                                            <div>
                                                <p className="text-sm font-medium text-foreground">We call you</p>
                                                <p className="text-xs text-muted-foreground">Within 2 business hours</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-[#A37B4C]/10 text-[#A37B4C] dark:text-[#B88C57] flex items-center justify-center text-[10px] font-bold">2</div>
                                            <div>
                                                <p className="text-sm font-medium text-foreground">Site visit</p>
                                                <p className="text-xs text-muted-foreground">Guided tour of shortlisted properties</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-[#A37B4C]/10 text-[#A37B4C] dark:text-[#B88C57] flex items-center justify-center text-[10px] font-bold">3</div>
                                            <div>
                                                <p className="text-sm font-medium text-foreground">Documentation</p>
                                                <p className="text-xs text-muted-foreground">Paperwork, registry, and handover</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
