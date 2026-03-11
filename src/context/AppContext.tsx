import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────
export type Theme = 'dark' | 'light';
export type Lang = 'en' | 'es';

interface AppContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
  lang: Lang;
  setLang: (l: Lang) => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────
const AppContext = createContext<AppContextValue>({
  theme: 'dark',
  setTheme: () => {},
  lang: 'en',
  setLang: () => {},
});

// ─── Provider ─────────────────────────────────────────────────────────────────
export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) ?? 'dark';
  });

  const [lang, setLangState] = useState<Lang>(() => {
    return (localStorage.getItem('lang') as Lang) ?? 'en';
  });

  // Apply theme to <html> element + persist
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Persist lang
  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  const setTheme = (t: Theme) => setThemeState(t);
  const setLang = (l: Lang) => setLangState(l);

  return (
    <AppContext.Provider value={{ theme, setTheme, lang, setLang }}>
      {children}
    </AppContext.Provider>
  );
}

// ─── Hooks ────────────────────────────────────────────────────────────────────
export function useTheme() {
  return useContext(AppContext);
}

export function useLanguage() {
  const { lang } = useContext(AppContext);
  return lang;
}

export function useAppContext() {
  return useContext(AppContext);
}
