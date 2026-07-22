import { useState, useEffect } from 'react';

const THEME_CLASS = {
  warm: 'theme-warm',
  garden: 'theme-garden',
  retro: 'theme-retro',
  edgy: 'theme-edgy',
  playful: 'theme-playful',
};

export default function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme-style') || 'warm';
    }
    return 'warm';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-warm', 'theme-garden', 'theme-retro', 'theme-edgy', 'theme-playful');
    const cls = THEME_CLASS[theme];
    if (cls) root.classList.add(cls);
    localStorage.setItem('theme-style', theme);
  }, [theme]);

  return [theme, setTheme];
}
