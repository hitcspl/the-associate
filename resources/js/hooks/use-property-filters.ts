import { useMemo, useState } from 'react';
import type { Property } from '@/types/property';

export type BudgetFilter = 'All' | 'under2m' | '2m-3m' | 'above3m';

export function usePropertyFilters(properties: Property[]) {
    const [location, setLocation] = useState('All');
    const [type, setType] = useState('All');
    const [budget, setBudget] = useState<BudgetFilter>('All');

    const filteredProperties = useMemo(
        () =>
            properties.filter((property) => {
                if (
                    location !== 'All' &&
                    !property.location
                        .toLowerCase()
                        .includes(location.toLowerCase())
                ) {
                    return false;
                }
                if (type !== 'All' && property.type !== type) {
                    return false;
                }
                if (budget === 'under2m' && property.price >= 2000000)
                    return false;
                if (
                    budget === '2m-3m' &&
                    (property.price < 2000000 || property.price > 3000000)
                )
                    return false;
                if (budget === 'above3m' && property.price <= 3000000)
                    return false;
                return true;
            }),
        [budget, location, properties, type],
    );

    return {
        location,
        setLocation,
        type,
        setType,
        budget,
        setBudget,
        filteredProperties,
    };
}
