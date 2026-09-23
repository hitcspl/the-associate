import { ArrowRight, DollarSign, Home, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { BudgetFilter } from '@/hooks/use-property-filters';

type SearchFilterBarProps = {
    location: string;
    setLocation: (value: string) => void;
    type: string;
    setType: (value: string) => void;
    budget: BudgetFilter;
    setBudget: (value: BudgetFilter) => void;
};

export function SearchFilterBar({
    location,
    setLocation,
    type,
    setType,
    budget,
    setBudget,
}: SearchFilterBarProps) {
    return (
        <section
            id="search-section"
            className="bg-card/60 border-border/50 border-y py-16"
        >
            <div className="container-site">
                <div className="bg-card border-border rounded-2xl border p-6 shadow-xl sm:p-8">
                    <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                        <div className="space-y-2 lg:col-span-4">
                            <span className="section-kicker">
                                Find Your Property
                            </span>
                            <h2 className="font-display text-2xl sm:text-3xl">
                                Search. Explore. Find.
                            </h2>
                            <p className="text-muted-foreground text-xs leading-relaxed sm:text-sm">
                                Use our advanced search to find the perfect
                                property that matches your lifestyle and budget.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:col-span-8">
                            <label className="space-y-1.5 text-xs font-medium">
                                <span className="flex items-center gap-1.5">
                                    <MapPin className="text-gold h-3.5 w-3.5" />
                                    Location
                                </span>
                                <select
                                    value={location}
                                    onChange={(event) =>
                                        setLocation(event.target.value)
                                    }
                                    className="bg-background border-border w-full rounded-xl border px-3.5 py-2.5 text-xs sm:text-sm"
                                >
                                    <option value="All">All Locations</option>
                                    <option value="Beverly Hills">
                                        Beverly Hills, CA
                                    </option>
                                    <option value="Malibu">Malibu, CA</option>
                                    <option value="New York">
                                        New York, NY
                                    </option>
                                    <option value="Miami">Miami, FL</option>
                                </select>
                            </label>
                            <label className="space-y-1.5 text-xs font-medium">
                                <span className="flex items-center gap-1.5">
                                    <Home className="text-gold h-3.5 w-3.5" />
                                    Property Type
                                </span>
                                <select
                                    value={type}
                                    onChange={(event) =>
                                        setType(event.target.value)
                                    }
                                    className="bg-background border-border w-full rounded-xl border px-3.5 py-2.5 text-xs sm:text-sm"
                                >
                                    <option value="All">Any type</option>
                                    <option value="Villa">Luxury Villa</option>
                                    <option value="Residence">Residence</option>
                                    <option value="Loft">Urban Loft</option>
                                    <option value="Penthouse">Penthouse</option>
                                </select>
                            </label>
                            <label className="space-y-1.5 text-xs font-medium">
                                <span className="flex items-center gap-1.5">
                                    <DollarSign className="text-gold h-3.5 w-3.5" />
                                    Budget
                                </span>
                                <select
                                    value={budget}
                                    onChange={(event) =>
                                        setBudget(
                                            event.target.value as BudgetFilter,
                                        )
                                    }
                                    className="bg-background border-border w-full rounded-xl border px-3.5 py-2.5 text-xs sm:text-sm"
                                >
                                    <option value="All">Min - Max (Any)</option>
                                    <option value="under2m">
                                        Under $2,000,000
                                    </option>
                                    <option value="2m-3m">
                                        $2,000,000 - $3,000,000
                                    </option>
                                    <option value="above3m">$3,000,000+</option>
                                </select>
                            </label>
                            <div className="flex justify-end pt-2 sm:col-span-3">
                                <Button
                                    onClick={() =>
                                        document
                                            .getElementById('properties')
                                            ?.scrollIntoView({
                                                behavior: 'smooth',
                                            })
                                    }
                                    className="bg-gold hover:bg-gold-hover flex w-full items-center justify-center gap-2 rounded-xl px-8 py-2.5 text-xs text-white sm:w-auto"
                                >
                                    Search Properties{' '}
                                    <ArrowRight className="h-3.5 w-3.5" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
