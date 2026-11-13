import {
    createContext,
    useContext,
    useEffect,
    type ReactNode,
} from 'react';

export type Theme = 'light';

type ThemeContextValue = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    accent: string;
};

type ThemeProviderProps = {
    children: ReactNode;
};

function applyLightTheme(): void {
    if (typeof document === 'undefined') return;

    document.documentElement.classList.remove('dark');
    document.documentElement.dataset.theme = 'light';
    document.documentElement.style.colorScheme = 'light';
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: ThemeProviderProps) {
    useEffect(() => applyLightTheme(), []);

    const value: ThemeContextValue = {
        theme: 'light',
        setTheme: applyLightTheme,
        accent: '#6B4F2A',
    };

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
}

export function useTheme(): ThemeContextValue {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }

    return context;
}
