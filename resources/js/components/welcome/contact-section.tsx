import {
    ArrowRight,
    CheckCircle2,
    Clock3,
    Mail,
    MapPin,
    Phone,
    Send,
    Sparkles,
} from 'lucide-react';
import { type FormEvent, useEffect, useMemo, useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

type ContactFormState = {
    property_id?: number | null;
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
};

type ContactSectionProps = {
    propertyId: number | null;
};

type ContactPageProps = {
    errors?: Record<string, string>;
    contactSuccess?: boolean;
    flash?: {
        contactSuccess?: boolean;
    };
};

const initialForm = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
};

export function ContactSection({ propertyId }: ContactSectionProps) {
    const { props } = usePage<ContactPageProps>();
    const [form, setForm] = useState<ContactFormState>(initialForm);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(
        Boolean(props.flash?.contactSuccess || props.contactSuccess),
    );

    useEffect(() => {
        setForm((current) => ({
            ...current,
            property_id: propertyId ?? undefined,
        }));
    }, [propertyId]);

    useEffect(() => {
        if (props.errors) {
            setErrors(props.errors);
        }
    }, [props.errors]);

    useEffect(() => {
        if (props.flash?.contactSuccess || props.contactSuccess) {
            setSubmitted(true);
        }
    }, [props.contactSuccess, props.flash]);

    const subjectOptions = useMemo(
        () => [
            'Property Purchase',
            'Property Sale',
            'Private Viewing',
            'Investment Consultation',
            'General Enquiry',
        ],
        [],
    );

    const handleChange = (field: keyof typeof initialForm, value: string) => {
        setForm((current) => ({ ...current, [field]: value }));
        setErrors((current) => ({ ...current, [field]: '' }));
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        router.post('/inquiries', form, {
            preserveScroll: true,
            replace: false,
            onSuccess: () => {
                setSubmitted(true);
                setForm({
                    ...initialForm,
                    property_id: propertyId ?? undefined,
                });
                setIsSubmitting(false);
            },
            onError: (responseErrors) => {
                setErrors(responseErrors as Record<string, string>);
                setSubmitted(false);
                setIsSubmitting(false);
            },
        });
    };

    return (
        <section
            id="contact"
            className="border-border/80 bg-background relative py-20 sm:py-24 lg:py-28"
        >
            <div className="container-site">
                <div className="grid gap-8 lg:grid-cols-[1.02fr_1.28fr] lg:gap-12 xl:gap-16">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <span className="section-kicker text-gold">
                                Let's Connect
                            </span>
                            <h2 className="text-foreground max-w-md text-4xl leading-none sm:text-5xl lg:text-[3.5rem]">
                                Begin your next chapter with confidence.
                            </h2>
                            <p className="text-muted-foreground max-w-lg text-sm leading-7 sm:text-base">
                                Whether you are buying a permanent residence,
                                securing a refined investment, or selling a
                                legacy home, our advisors bring discretion,
                                market knowledge, and a deeply personal approach
                                to every decision.
                            </p>
                        </div>

                        <div className="border-border bg-card/70 space-y-4 rounded-2xl border p-5 shadow-sm sm:p-6">
                            <div className="flex items-start gap-3">
                                <div className="text-gold flex h-10 w-10 items-center justify-center rounded-full bg-[#A37B4C]/10">
                                    <MapPin className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-xs font-semibold tracking-[0.2em] uppercase">
                                        Visit
                                    </p>
                                    <p className="text-foreground mt-1 text-sm leading-6">
                                        215 Park Avenue, Suite 1500
                                        <br />
                                        New York, NY 10017
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="text-gold flex h-10 w-10 items-center justify-center rounded-full bg-[#A37B4C]/10">
                                    <Phone className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-xs font-semibold tracking-[0.2em] uppercase">
                                        Call
                                    </p>
                                    <a
                                        href="tel:+12125550181"
                                        className="text-foreground hover:text-gold mt-1 block text-sm transition-colors"
                                    >
                                        +1 (212) 555-0181
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="text-gold flex h-10 w-10 items-center justify-center rounded-full bg-[#A37B4C]/10">
                                    <Mail className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-xs font-semibold tracking-[0.2em] uppercase">
                                        Email
                                    </p>
                                    <a
                                        href="mailto:concierge@associate-estate.com"
                                        className="text-foreground hover:text-gold mt-1 block text-sm transition-colors"
                                    >
                                        concierge@associate-estate.com
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="border-border bg-card/50 flex flex-col gap-4 rounded-2xl border p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                            <div className="flex items-start gap-3">
                                <div className="text-gold mt-0.5 flex h-10 w-10 items-center justify-center rounded-full bg-[#A37B4C]/10">
                                    <Clock3 className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-xs font-semibold tracking-[0.2em] uppercase">
                                        Appointments
                                    </p>
                                    <p className="text-foreground mt-1 text-sm">
                                        Mon–Sat · 9:00 AM – 6:00 PM
                                    </p>
                                </div>
                            </div>
                            <div className="text-gold inline-flex items-center gap-2 text-sm font-medium">
                                <Sparkles className="h-3.5 w-3.5" />
                                Private advisory service
                            </div>
                        </div>
                    </div>

                    <div className="border-border bg-card rounded-[28px] border p-5 shadow-[0_14px_40px_rgba(15,15,15,0.04)] sm:p-7 lg:p-8">
                        {submitted ? (
                            <div className="flex min-h-[500px] flex-col items-center justify-center text-center">
                                <div className="text-gold mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#A37B4C]/12">
                                    <CheckCircle2 className="h-8 w-8" />
                                </div>
                                <p className="section-kicker text-gold mb-3">
                                    Message received
                                </p>
                                <h3 className="font-display text-foreground text-3xl">
                                    Thank you for reaching out.
                                </h3>
                                <p className="text-muted-foreground mt-3 max-w-md text-sm leading-7">
                                    Our advisory team will review your inquiry
                                    and respond within one business day with the
                                    next steps.
                                </p>
                                <Button
                                    type="button"
                                    onClick={() => setSubmitted(false)}
                                    className="mt-6 rounded-full bg-[#A37B4C] px-6 text-white hover:bg-[#B88C57]"
                                >
                                    Send another inquiry
                                </Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="space-y-2">
                                    <span className="section-kicker text-gold">
                                        Inquiry Form
                                    </span>
                                    <h3 className="font-display text-foreground text-3xl">
                                        Request a consultation
                                    </h3>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <label className="text-foreground block text-sm font-medium">
                                        Name
                                        <input
                                            type="text"
                                            value={form.name}
                                            onChange={(event) =>
                                                handleChange(
                                                    'name',
                                                    event.target.value,
                                                )
                                            }
                                            placeholder="Your full name"
                                            className="border-border bg-background text-foreground placeholder:text-muted-foreground mt-2 w-full rounded-xl border px-3.5 py-2.5 text-sm focus:border-[#A37B4C] focus:ring-2 focus:ring-[#A37B4C]/20 focus:outline-none"
                                            aria-invalid={Boolean(errors.name)}
                                        />
                                        {errors.name && (
                                            <span className="mt-1.5 block text-sm text-red-500">
                                                {errors.name}
                                            </span>
                                        )}
                                    </label>

                                    <label className="text-foreground block text-sm font-medium">
                                        Email
                                        <input
                                            type="email"
                                            value={form.email}
                                            onChange={(event) =>
                                                handleChange(
                                                    'email',
                                                    event.target.value,
                                                )
                                            }
                                            placeholder="you@example.com"
                                            className="border-border bg-background text-foreground placeholder:text-muted-foreground mt-2 w-full rounded-xl border px-3.5 py-2.5 text-sm focus:border-[#A37B4C] focus:ring-2 focus:ring-[#A37B4C]/20 focus:outline-none"
                                            aria-invalid={Boolean(errors.email)}
                                        />
                                        {errors.email && (
                                            <span className="mt-1.5 block text-sm text-red-500">
                                                {errors.email}
                                            </span>
                                        )}
                                    </label>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <label className="text-foreground block text-sm font-medium">
                                        Phone
                                        <input
                                            type="tel"
                                            value={form.phone}
                                            onChange={(event) =>
                                                handleChange(
                                                    'phone',
                                                    event.target.value,
                                                )
                                            }
                                            placeholder="(555) 456-7890"
                                            className="border-border bg-background text-foreground placeholder:text-muted-foreground mt-2 w-full rounded-xl border px-3.5 py-2.5 text-sm focus:border-[#A37B4C] focus:ring-2 focus:ring-[#A37B4C]/20 focus:outline-none"
                                            aria-invalid={Boolean(errors.phone)}
                                        />
                                        {errors.phone && (
                                            <span className="mt-1.5 block text-sm text-red-500">
                                                {errors.phone}
                                            </span>
                                        )}
                                    </label>

                                    <label className="text-foreground block text-sm font-medium">
                                        Subject
                                        <select
                                            value={form.subject}
                                            onChange={(event) =>
                                                handleChange(
                                                    'subject',
                                                    event.target.value,
                                                )
                                            }
                                            className="border-border bg-background text-foreground mt-2 w-full rounded-xl border px-3.5 py-2.5 text-sm focus:border-[#A37B4C] focus:ring-2 focus:ring-[#A37B4C]/20 focus:outline-none"
                                            aria-invalid={Boolean(
                                                errors.subject,
                                            )}
                                        >
                                            <option value="">
                                                Select an enquiry type
                                            </option>
                                            {subjectOptions.map((option) => (
                                                <option
                                                    key={option}
                                                    value={option}
                                                >
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.subject && (
                                            <span className="mt-1.5 block text-sm text-red-500">
                                                {errors.subject}
                                            </span>
                                        )}
                                    </label>
                                </div>

                                <label className="text-foreground block text-sm font-medium">
                                    Message
                                    <textarea
                                        rows={5}
                                        value={form.message}
                                        onChange={(event) =>
                                            handleChange(
                                                'message',
                                                event.target.value,
                                            )
                                        }
                                        placeholder="Tell us about the property, timeframe, location, or any specific requirements."
                                        className="border-border bg-background text-foreground placeholder:text-muted-foreground mt-2 w-full rounded-xl border px-3.5 py-2.5 text-sm focus:border-[#A37B4C] focus:ring-2 focus:ring-[#A37B4C]/20 focus:outline-none"
                                        aria-invalid={Boolean(errors.message)}
                                    />
                                    {errors.message && (
                                        <span className="mt-1.5 block text-sm text-red-500">
                                            {errors.message}
                                        </span>
                                    )}
                                </label>

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full rounded-full bg-[#A37B4C] px-6 py-5 text-sm font-semibold text-white transition-all hover:bg-[#B88C57] disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    {isSubmitting
                                        ? 'Sending request...'
                                        : 'Submit inquiry'}
                                    {!isSubmitting && (
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    )}
                                </Button>
                                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                                    <Send className="text-gold h-3.5 w-3.5" />
                                    Secure and confidential communication
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
