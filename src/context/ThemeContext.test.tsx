import { fireEvent, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { afterEach, expect, test } from 'vitest';

import MainPage from '../pagesOLD/mainPage/MainPage';
import { renderWithProviders } from '../TestUtils';

import { ThemeProvider } from './ThemeContext';

let unmount = () => {};

afterEach(() => {
  unmount();
});

test('Should render light theme', () => {
  const renderObject = renderWithProviders(
    <BrowserRouter>
      <ThemeProvider>
        <MainPage />
      </ThemeProvider>
    </BrowserRouter>,
  );

  unmount = renderObject.unmount;

  const wrapper = screen.getByTestId('wrapper');

  expect(wrapper.classList).toContain('light');
});

test('Should render dark theme after switcher theme click', async () => {
  const renderObject = renderWithProviders(
    <BrowserRouter>
      <ThemeProvider>
        <MainPage />
      </ThemeProvider>
    </BrowserRouter>,
  );

  unmount = renderObject.unmount;

  const switcher = screen.getByTestId('theme_switcher');

  fireEvent.click(switcher);

  await waitFor(() => {
    const wrapper = screen.getByTestId('wrapper');

    expect(wrapper.classList).toContain('dark');
  });
});
