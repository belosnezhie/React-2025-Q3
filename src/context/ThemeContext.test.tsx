import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';

import Header from '../components/header/Header';

import { ThemeProvider } from './ThemeContext';

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');

  return {
    ...actual,
    useRouter: vi.fn(),
    usePathname: vi.fn(),
    useSearchParams: vi.fn(() => ({
      get: vi.fn(),
    })),
  };
});

vi.mock('next/headers', async () => {
  const actual = await vi.importActual('next/headers');

  return {
    ...actual,
    headers: vi.fn(() => ({
      get: vi.fn(),
    })),
  };
});

test('Theme provider should switch theme', async () => {
  render(
    <ThemeProvider>
      <Header />
    </ThemeProvider>,
  );

  const themeButtonBefore = await screen.findByTestId('theme_button');

  expect(themeButtonBefore).toBeDefined();

  fireEvent.click(themeButtonBefore);

  const themeButtonAfter = await screen.findByTestId('theme_button');

  expect(themeButtonAfter.getAttribute('class')).contains('dark');
});
