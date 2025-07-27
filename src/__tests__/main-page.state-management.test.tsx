import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { delay, http, HttpResponse } from 'msw';
import { setupServer, SetupServerApi } from 'msw/node';
import { expect } from 'vitest';

import { testCharactersSearchArray } from '@/__tests__/test-utils/test-data';
import { apiService } from '@/services/api-service';
import { searchQueryStorage } from '@/services/local-storage';

import { MainPage } from '../pages/main/main-page';

let server: SetupServerApi;
const DELAY = 150;

afterEach(() => {
  if (server !== undefined) {
    server.resetHandlers();
    server.close();
  }
});
afterAll(() => {
  server.close();
});

test.skip('should update component state based on API responses', async () => {
  const handlers = [
    http.get('https://swapi.py4e.com/api/people/', async () => {
      await delay(DELAY);

      return HttpResponse.json(testCharactersSearchArray);
    }),
  ];

  server = setupServer(...handlers);
  server.listen();

  render(<MainPage service={apiService} />);

  expect(await screen.findByLabelText('spinner')).toBeInTheDocument();
  await waitForElementToBeRemoved(screen.queryByTestId('spinner'));
  await waitFor(() => {
    const cards = screen.getAllByTestId('results_card');

    expect(cards).toBeDefined();
    expect(cards).lengthOf(2);
  });
});

test.skip('should manage search term state correctly', async () => {
  vi.spyOn(searchQueryStorage, 'getSearchQuery').mockImplementationOnce(
    () => 'test',
  );

  const handlers = [
    http.get('https://swapi.py4e.com/api/people/', async () => {
      await delay(DELAY);

      return HttpResponse.json(testCharactersSearchArray);
    }),
  ];

  server = setupServer(...handlers);
  server.listen();

  render(<MainPage service={apiService} />);

  expect(await screen.findAllByTestId('results_card')).toBeDefined();
});
