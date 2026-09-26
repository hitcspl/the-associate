import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from 'react';

export type Theme = 'light' | 'dark';

type ThemeContextValue = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    accent: string;
};

type ThemeProviderProps = {
    children: ReactNode;
};

const themePreferenceKey = 'theme-preference';
const mediaQuery = '(prefers-color-scheme: dark)';
const accents: Record<Theme, string> = {
    dark: '#A37B4C',
    light: '#6B4F2A',
};

function getStoredTheme(): Theme | null {
    if (typeof window === 'undefined') return null;

    try {
        const stored = window.localStorage.getItem(themePreferenceKey);
        return stored === 'light' || stored === 'dark' ? stored : null;
    } catch {
        return null;
    }
}

function getSystemTheme(): Theme {
    return typeof window !== 'undefined' && window.matchMedia(mediaQuery).matches
        ? 'dark'
        : 'light';
}

function applyTheme(theme: Theme): void {
    if (typeof document === 'undefined') return;

    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: ThemeProviderProps) {
    const [theme, setThemeState] = useState<Theme>(
        () => getStoredTheme() ?? getSystemTheme(),
    );

    useEffect(() => applyTheme(theme), [theme]);

    useEffect(() => {
        const query = window.matchMedia(mediaQuery);
        const handleSystemThemeChange = (event: MediaQueryListEvent) => {
            if (!getStoredTheme()) {
                setThemeState(event.matches ? 'dark' : 'light');
            }
        };

        query.addEventListener('change', handleSystemThemeChange);
        return () => query.removeEventListener('change', handleSystemThemeChange);
    }, []);

    const setTheme = (nextTheme: Theme) => {
        try {
            window.localStorage.setItem(themePreferenceKey, nextTheme);
        } catch {
            // Continue with the in-memory theme when storage is unavailable.
        }
        setThemeState(nextTheme);
    };

    const value = useMemo(
        () => ({ theme, setTheme, accent: accents[theme] }),
        [theme],
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }

    return context;
}
