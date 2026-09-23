import { CheckCircle2, X } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import type { Property } from '@/types/property';

type ContactModalProps = { property: Property | null; onClose: () => void };
type FormState = {
    property_id?: number;
    name: string;
    email: string;
    phone: string;
    message: string;
};

export function ContactModal({ property, onClose }: ContactModalProps) {
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [form, setForm] = useState<FormState>({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    useEffect(
        () => setForm((current) => ({ ...current, property_id: property?.id })),
        [property],
    );
    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        router.post('/inquiries', form, {
            preserveScroll: true,
            onSuccess: () => setSuccess(true),
            onError: setErrors,
        });
    };
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
            <div className="bg-card border-border relative w-full max-w-lg rounded-2xl border p-6 shadow-2xl sm:p-8">
                <button
                    onClick={onClose}
                    aria-label="Close contact form"
                    className="text-muted-foreground absolute top-5 right-5"
                >
                    <X className="h-5 w-5" />
                </button>
                {success ? (
                    <div className="space-y-4 py-8 text-center">
                        <div className="bg-gold/15 text-gold mx-auto flex h-14 w-14 items-center justify-center rounded-full">
                            <CheckCircle2 className="h-8 w-8" />
                        </div>
                        <h3 className="font-display text-2xl font-semibold">
                            Thank You!
                        </h3>
                        <p className="text-muted-foreground text-sm">
                            Our private advisors have received your inquiry and
                            will contact you promptly.
                        </p>
                        <Button
                            onClick={onClose}
                            className="bg-gold hover:bg-gold-hover rounded-full px-6 text-white"
                        >
                            Done
                        </Button>
                    </div>
                ) : (
                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <span className="section-kicker text-gold">
                                Direct Concierge
                            </span>
                            <h3 className="font-display text-2xl font-semibold">
                                Get In Touch
                            </h3>
                            <p className="text-muted-foreground mt-1 text-xs">
                                Let us know your preferences and a specialist
                                will reach out.
                            </p>
                        </div>
                        <div className="space-y-3 pt-2">
                            {(
                                [
                                    [
                                        'name',
                                        'Full Name',
                                        'Sarah Jenkins',
                                        true,
                                    ],
                                    [
                                        'email',
                                        'Email Address',
                                        'sarah@example.com',
                                        true,
                                    ],
                                    [
                                        'phone',
                                        'Phone Number',
                                        '+1 (555) 000-0000',
                                        false,
                                    ],
                                ] as const
                            ).map(([key, label, placeholder, required]) => (
                                <label
                                    key={key}
                                    className="block text-xs font-medium"
                                >
                                    {label}
                                    <input
                                        required={required}
                                        type={
                                            key === 'email'
                                                ? 'email'
                                                : key === 'phone'
                                                  ? 'tel'
                                                  : 'text'
                                        }
                                        value={form[key]}
                                        onChange={(event) =>
                                            setForm({
                                                ...form,
                                                [key]: event.target.value,
                                            })
                                        }
                                        placeholder={placeholder}
                                        className="bg-background border-border text-foreground mt-1 w-full rounded-xl border px-3.5 py-2.5 text-xs"
                                    />
                                    {errors[key] && (
                                        <span className="text-red-500">
                                            {errors[key]}
                                        </span>
                                    )}
                                </label>
                            ))}
                            <label className="block text-xs font-medium">
                                Message / Property Interest
                                <textarea
                                    required
                                    rows={3}
                                    value={form.message}
                                    onChange={(event) =>
                                        setForm({
                                            ...form,
                                            message: event.target.value,
                                        })
                                    }
                                    placeholder="I am interested in exploring modern residences in Beverly Hills..."
                                    className="bg-background border-border text-foreground mt-1 w-full rounded-xl border px-3.5 py-2.5 text-xs"
                                />
                                {errors.message && (
                                    <span className="text-red-500">
                                        {errors.message}
                                    </span>
                                )}
                            </label>
                        </div>
                        <Button
                            type="submit"
                            className="bg-gold hover:bg-gold-hover w-full rounded-xl py-2.5 text-xs text-white"
                        >
                            Submit Inquiry
                        </Button>
                    </form>
                )}
            </div>
        </div>
    );
}
