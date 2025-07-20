import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { HttpResponse, delay, http } from 'msw';
import { SetupServerApi, setupServer } from 'msw/node';
import { describe, expect, it } from 'vitest';

import { ApiService } from '../services/api-service';
import { searchQueryStorage } from '../services/local-storage';
import { testCharactersSearchArr } from '../test-utils/test-data';

import MainPage from './main-page.tsx';

describe('State Management Tests', () => {
  let server: SetupServerApi;

  afterEach(() => {
    if (server != undefined) {
      server.resetHandlers();
      server.close();
    }
  });
  afterAll(() => server.close());

  it('updates component state based on API responses', async () => {
    const handlers = [
      http.get('https://swapi.py4e.com/api/people/?page=1', async () => {
        await delay(150);

        return HttpResponse.json(testCharactersSearchArr);
      }),
    ];

    server = setupServer(...handlers);
    server.listen();

    render(<MainPage service={new ApiService()} />);

    expect(await screen.findByLabelText('spinner')).toBeInTheDocument();
    await waitForElementToBeRemoved(screen.queryByTestId('spinner'));
    await waitFor(() => {
      const cards = screen.getAllByTestId('results_card');

      expect(cards).toBeDefined();
      expect(cards).lengthOf(2);
    });
  });

  describe('manages search term state correctly', () => {
    it('makes a request to /test route if the "test" search query was previously stored in localStorage', async () => {
      vi.spyOn(searchQueryStorage, 'getSearchQuery').mockImplementationOnce(
        () => 'test',
      );

      const handlers = [
        http.get(
          'https://swapi.py4e.com/api/people/?search=test&format=json',
          async () => {
            await delay(150);

            return HttpResponse.json(testCharactersSearchArr);
          },
        ),
      ];

      server = setupServer(...handlers);
      server.listen();

      render(<MainPage service={new ApiService()} />);

      expect(await screen.findAllByTestId('results_card')).toBeDefined();
    });
  });
});
