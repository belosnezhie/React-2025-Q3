'use client';

import React, { useState } from 'react';

export const ThemeContext = React.createContext('light');
export const ThemeSwitcher = React.createContext(() => {});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<string>('light');

  const updateTheme = (): void => {
    if (theme == 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <>
      <ThemeContext.Provider value={theme}>
        <ThemeSwitcher.Provider value={updateTheme}>
          {children}
        </ThemeSwitcher.Provider>
      </ThemeContext.Provider>
    </>
  );
};
