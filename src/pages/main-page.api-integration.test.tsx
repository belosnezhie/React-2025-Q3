import { render, screen, waitFor } from '@testing-library/react';
import { HttpResponse, delay, http } from 'msw';
import { SetupServerApi, setupServer } from 'msw/node';
import { describe, expect, it, vi } from 'vitest';

import { ApiService } from '../services/api-service';
import { testCharactersSearchArr } from '../test-utils/test-data';
import { setup } from '../test-utils/user-event-setup';

import MainPage from './main-page.tsx';

describe('API Integration Tests', () => {
  let server: SetupServerApi;

  afterEach(() => {
    if (server != undefined) {
      server.resetHandlers();
      server.close();
    }
    vi.resetAllMocks();
  });
  afterAll(() => server.close());

  it('calls API with correct parameters', async () => {
    const service = new ApiService();

    using getSeachedDataSpy = vi
      .spyOn(service, 'getSeachedData')
      .mockResolvedValue(testCharactersSearchArr);

    const { user, getByRole } = setup(<MainPage service={service} />);

    const searchInput = getByRole('textbox');
    const submitInput = getByRole('button', { name: /search/i });

    await user.clear(searchInput);
    await user.type(searchInput, 'Jane');
    await user.click(submitInput);

    expect(getSeachedDataSpy).toHaveBeenCalledWith('Jane');
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
      const placeholder = screen.getByText(
        'Something went wrong: Request faild with code: 401',
      );

      expect(placeholder).toBeInTheDocument();
    });
  });
});
