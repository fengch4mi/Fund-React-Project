import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

const THEME_KEY = 'app_theme';

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem(THEME_KEY) || 'light';
    } catch (e) {
      return 'light';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {}
    if (theme === 'dark') document.body.classList.add('dark');
    else document.body.classList.remove('dark');
  }, [theme]);

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
