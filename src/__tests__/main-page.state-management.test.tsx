import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { delay, http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { BrowserRouter } from 'react-router-dom';
import { expect } from 'vitest';

import { MainPage } from '@/pages';
import { apiService } from '@/services/api-service';
import { ThemeProvider } from '@/state';

import { renderWithProviders } from './test-utils/provider';
import { testCharactersSearchArray } from './test-utils/test-data';

const DELAY = 150;

it('updates component state based on API responses', async () => {
  const handlers = [
    http.get('https://swapi.py4e.com/api/people/', async () => {
      await delay(DELAY);

      return HttpResponse.json(testCharactersSearchArray);
    }),
  ];

  const server = setupServer(...handlers);
  server.listen();

  renderWithProviders(
    <BrowserRouter>
      <ThemeProvider>
        <MainPage service={apiService} />
      </ThemeProvider>
    </BrowserRouter>,
  );

  expect(await screen.findByLabelText('spinner')).toBeInTheDocument();
  await waitForElementToBeRemoved(screen.queryByTestId('spinner'));
  await waitFor(() => {
    const cards = screen.getAllByTestId('results_card');

    expect(cards).toBeDefined();
    expect(cards).lengthOf(2);
  });
});
