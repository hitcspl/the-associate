import { Instagram, Linkedin, Facebook, ArrowUpRight, Sparkles, Send } from 'lucide-react';
import { type FormEvent, useState } from 'react';

export function SiteFooter({ onContact }: { onContact: () => void }) {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e: FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setSubscribed(true);
        setEmail('');
    };

    return (
        <footer className="relative overflow-hidden border-t border-border/80 bg-background text-foreground transition-colors duration-300">
            {/* Ambient Backlight Glow & Subtle Mesh Grid */}
            <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-16 pb-10">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
                    
                    {/* Brand & Newsletter Section (5 Cols) */}
                    <div className="space-y-6 lg:col-span-5">
                        <a href="#home" className="group inline-flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary transition-all duration-300 group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground shadow-sm">
                                <span className="text-lg font-bold leading-none">△</span>
                            </div>
                            <span className="font-display text-2xl font-medium tracking-tight text-foreground">
                                associate<span className="text-primary">.</span>
                            </span>
                        </a>

                        <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm max-w-md">
                            Curating extraordinary architecture and private estates for high-net-worth individuals and visionary institutional investors globally.
                        </p>

                        {/* High-End Private Briefing / Newsletter Capture */}
                        {/* <div className="max-w-md rounded-2xl border border-border/70 bg-card/40 p-4 backdrop-blur-md dark:bg-card/20 space-y-3">
                            <div className="flex items-center gap-2">
                                <Sparkles className="h-3.5 w-3.5 text-primary" />
                                <span className="text-xs font-semibold tracking-wider uppercase text-foreground">
                                    Private Portfolio Insights
                                </span>
                            </div>
                            
                            {subscribed ? (
                                <p className="text-xs font-medium text-primary">
                                    ✓ You are now subscribed to off-market briefings.
                                </p>
                            ) : (
                                <form onSubmit={handleSubscribe} className="flex gap-2">
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter confidential email..."
                                        className="w-full rounded-lg border border-input bg-background/80 px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                    />
                                    <button
                                        type="submit"
                                        className="shrink-0 inline-flex items-center justify-center rounded-lg bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-all active:scale-95"
                                    >
                                        <Send className="h-3.5 w-3.5" />
                                    </button>
                                </form>
                            )}
                        </div> */}

                        {/* Social Badges */}
                        <div className="flex items-center gap-2 pt-1">
                            {[
                                { icon: Instagram, label: 'Instagram', href: '#' },
                                { icon: Facebook, label: 'Facebook', href: '#' },
                                { icon: Linkedin, label: 'LinkedIn', href: '#' },
                            ].map(({ icon: Icon, label, href }) => (
                                <a
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    className="group flex h-9 w-9 items-center justify-center rounded-xl border border-border/80 bg-card/60 text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:bg-primary/10 hover:text-primary active:scale-95 shadow-sm"
                                >
                                    <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Columns (7 Cols) */}
                    <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
                        {/* Properties */}
                        <div className="space-y-4">
                            <h4 className="text-[11px] font-bold tracking-widest uppercase text-primary">
                                Portfolio
                            </h4>
                            <ul className="space-y-2.5 text-xs sm:text-sm">
                                {['Private Residences', 'Penthouses & Villas', 'Commercial Assets', 'Investment Funds'].map((item) => (
                                    <li key={item}>
                                        <a
                                            href="#properties"
                                            className="group inline-flex items-center gap-1.5 text-muted-foreground transition-all duration-200 hover:text-foreground"
                                        >
                                            <span className="transition-transform duration-200 group-hover:translate-x-1">{item}</span>
                                            <ArrowUpRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 text-primary" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Company */}
                        <div className="space-y-4">
                            <h4 className="text-[11px] font-bold tracking-widest uppercase text-primary">
                                Firm
                            </h4>
                            <ul className="space-y-2.5 text-xs sm:text-sm">
                                <li>
                                    <a href="#about" className="inline-block text-muted-foreground transition-all duration-200 hover:text-foreground hover:translate-x-1">
                                        About Us
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="inline-block text-muted-foreground transition-all duration-200 hover:text-foreground hover:translate-x-1">
                                        Global Advisory
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="inline-block text-muted-foreground transition-all duration-200 hover:text-foreground hover:translate-x-1">
                                        Careers
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#contact"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            onContact();
                                        }}
                                        className="inline-block text-muted-foreground transition-all duration-200 hover:text-primary font-medium hover:translate-x-1"
                                    >
                                        Private Consultation
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Governance */}
                        <div className="space-y-4 col-span-2 sm:col-span-1">
                            <h4 className="text-[11px] font-bold tracking-widest uppercase text-primary">
                                Governance
                            </h4>
                            <ul className="space-y-2.5 text-xs sm:text-sm">
                                <li>
                                    <a href="#" className="inline-block text-muted-foreground transition-all duration-200 hover:text-foreground hover:translate-x-1">
                                        Privacy Policy
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="inline-block text-muted-foreground transition-all duration-200 hover:text-foreground hover:translate-x-1">
                                        Terms of Service
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="inline-block text-muted-foreground transition-all duration-200 hover:text-foreground hover:translate-x-1">
                                        Compliance & Ethics
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar / Credit Strip */}
                <div className="mt-14 border-t border-border/60 pt-8 flex flex-col gap-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                    <p className="tracking-wide">
                        © {new Date().getFullYear()} Associate Real Estate. All rights reserved.
                    </p>
                    
                    {/* Developer Credit */}
                    <p className="flex items-center gap-1.5 text-xs">
                        <span>Designed & Developed by</span>
                        <a
                            href="http://hitcs.in/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative inline-flex items-center gap-1 font-semibold text-foreground transition-colors hover:text-primary"
                        >
                            <span>HITCS</span>
                            <ArrowUpRight className="h-3 w-3 opacity-70 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                            <span className="absolute -bottom-0.5 left-0 h-px w-full bg-primary/40 transition-all group-hover:bg-primary" />
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}