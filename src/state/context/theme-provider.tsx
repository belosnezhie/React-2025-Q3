import { JSX, useCallback, useEffect, useState } from 'react';

import { Theme, ThemeContext } from './theme-context';

export const ThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [theme, setTheme] = useState<Theme>('light');

  const updateTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [theme]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.className = theme;
  }, [theme]);

  const value = {
    theme,
    updateTheme,
  };

  return (
    <>
      <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    </>
  );
};
