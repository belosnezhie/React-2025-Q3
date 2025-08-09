import { screen, waitFor } from '@testing-library/react';
import { delay, http, HttpResponse } from 'msw';
import { setupServer, SetupServerApi } from 'msw/node';
import { BrowserRouter } from 'react-router-dom';
import { expect, it, vi } from 'vitest';

import { MainPage } from '@/pages';
import { ThemeProvider } from '@/state';

import { renderWithProviders } from './test-utils/provider';
import { testCharactersSearchArray } from './test-utils/test-data';

let server: SetupServerApi;
const DELAY = 150;

afterEach(() => {
  if (server !== undefined) {
    server.resetHandlers();
    server.close();
  }
  vi.resetAllMocks();
});

afterAll(() => {
  server.close();
});

it('handles successful API responses', async () => {
  const handlers = [
    http.get('https://swapi.py4e.com/api/people/', async () => {
      await delay(DELAY);

      return HttpResponse.json(testCharactersSearchArray);
    }),
  ];

  server = setupServer(...handlers);
  server.listen();

  renderWithProviders(
    <BrowserRouter>
      <ThemeProvider>
        <MainPage />
      </ThemeProvider>
    </BrowserRouter>,
  );

  await waitFor(() => {
    const cards = screen.getAllByTestId('results_card');

    expect(cards).lengthOf(2);
  });
});

it('handles API error responses', async () => {
  const handlers = [
    http.get('https://swapi.py4e.com/api/people/', async () => {
      await delay(DELAY);

      return new HttpResponse(null, { status: 401 });
    }),
  ];

  server = setupServer(...handlers);
  server.listen();

  renderWithProviders(
    <BrowserRouter>
      <ThemeProvider>
        <MainPage />
      </ThemeProvider>
    </BrowserRouter>,
  );

  await waitFor(() => {
    const placeholder = screen.getByText('Something went wrong.');

    expect(placeholder).toBeInTheDocument();
  });
});
