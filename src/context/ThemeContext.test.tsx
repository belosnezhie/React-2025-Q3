import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';

import Header from '../components/header/Header';

import { ThemeProvider } from './ThemeContext';

vi.mock('next/router', async () => {
  const actual = await vi.importActual('next/router');

  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: vi.fn(() => {}),
      query: {
        search: '',
        page: 1,
      },
    })),
  };
});

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');

  return {
    ...actual,
    usePathname: vi.fn(() => ''),
  };
});

test('Theme provider should switch theme', async () => {
  render(
    <ThemeProvider>
      <Header />
    </ThemeProvider>,
  );

  const themeSwitcherBefore = await screen.findByTestId('theme_switcher');

  expect(themeSwitcherBefore).toBeDefined();

  fireEvent.click(themeSwitcherBefore);

  const themeSwitcherAfter = await screen.findByTestId('theme_switcher');

  expect(themeSwitcherAfter.getAttribute('class')).contains('dark');
});
