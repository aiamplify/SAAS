import React from 'react';
import { usePreferencesStore } from '../lib/store';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { preferences } = usePreferencesStore();

  React.useEffect(() => {
    const root = window.document.documentElement;
    
    const setTheme = (theme: string) => {
      if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    setTheme(preferences.theme);

    if (preferences.theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => setTheme('system');
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [preferences.theme]);

  return <>{children}</>;
}