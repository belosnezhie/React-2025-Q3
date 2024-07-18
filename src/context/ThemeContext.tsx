import React, { useContext, useState } from 'react';

const ThemeContext = React.createContext('light');
const ThemeSwitcher = React.createContext(() => {});

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const useThemeSwitcher = () => {
  return useContext(ThemeSwitcher);
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
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
