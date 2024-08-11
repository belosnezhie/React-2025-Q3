'use client';

import { useContext } from 'react';

import { ThemeContext, ThemeSwitcher } from '../context/ThemeContext';

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const useThemeSwitcher = () => {
  return useContext(ThemeSwitcher);
};
