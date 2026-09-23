import { useEffect, useState } from 'react';

const STORAGE_KEY = 'associate-favorites';

export function useFavorites(initialFavorites: number[] = []) {
    const [favorites, setFavorites] = useState<number[]>(() => {
        if (typeof window === 'undefined') {
            return initialFavorites;
        }

        const stored = window.localStorage.getItem(STORAGE_KEY);
        return stored ? (JSON.parse(stored) as number[]) : initialFavorites;
    });

    useEffect(() => {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (id: number): void => {
        setFavorites((current) =>
            current.includes(id)
                ? current.filter((favorite) => favorite !== id)
                : [...current, id],
        );
    };

    return { favorites, toggleFavorite };
}
