import { render, screen, waitFor } from '@testing-library/react';
import { HttpResponse, delay, http } from 'msw';
import { SetupServerApi, setupServer } from 'msw/node';
import { describe, expect, it, vi } from 'vitest';

import { DefaultSearchResp } from '../model/types-star-wars';
import { ApiService } from '../services/api-service';
import { testCharactersSearchArr } from '../test-utils/test-data';

import MainPage from './main-page.tsx';

describe('API Integration Tests', () => {
  let server: SetupServerApi;

  afterEach(() => {
    if (server != undefined) {
      server.resetHandlers();
      server.close();
    }
  });
  afterAll(() => server.close());

  it('calls API with correct parameters', () => {
    const mockService = {
      getDefaultData: vi.fn().mockResolvedValue(new DefaultSearchResp()),
      getSearchData: vi.fn().mockResolvedValue(new DefaultSearchResp()),
    } as unknown as ApiService;

    render(<MainPage service={mockService} />);

    expect(mockService.getDefaultData).toHaveBeenCalledWith(1);
  });

  it('handles successful API responses', async () => {
    const handlers = [
      http.get('https://swapi.py4e.com/api/people/', async () => {
        await delay(150);

        return HttpResponse.json(testCharactersSearchArr);
      }),
    ];

    server = setupServer(...handlers);
    server.listen();

    render(<MainPage service={new ApiService()} />);

    await waitFor(() => {
      const cards = screen.getAllByTestId('results_card');

      expect(cards).lengthOf(2);
    });
  });

  it('handles API error responses', async () => {
    const handlers = [
      http.get('https://swapi.py4e.com/api/people/', async () => {
        await delay(150);

        return new HttpResponse(null, { status: 401 });
      }),
    ];

    server = setupServer(...handlers);
    server.listen();

    render(<MainPage service={new ApiService()} />);

    await waitFor(() => {
      expect(screen.getAllByTestId('error')).lengthOf(1);
    });
  });
});
