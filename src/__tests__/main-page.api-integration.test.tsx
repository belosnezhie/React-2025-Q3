import { screen, waitFor } from '@testing-library/react';
import { delay, http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import {
  BrowserRouter,
  MemoryRouter,
  type NavigateFunction,
} from 'react-router-dom';
import { expect, it } from 'vitest';

import { MainPage } from '@/pages';
import { starWarsApi } from '@/services/api-service';
import { store, ThemeProvider } from '@/state';

import { renderWithProviders } from './test-utils/provider';
import { testCharactersSearchArray } from './test-utils/test-data';
import { setup } from './test-utils/user-event-setup';

const navigateMock = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom',
    );
  return {
    ...actual,
    useNavigate: (): NavigateFunction => navigateMock,
  };
});

describe('Api integration tests for main page', () => {
  const DELAY = 150;
  const server = setupServer();
  server.listen();

  afterEach(() => {
    navigateMock.mockReset();
  });

  it('handles successful API responses', () => {
    server.boundary(async () => {
      server.use(
        http.get('https://swapi.py4e.com/api/people/', async () => {
          await delay(DELAY);

          return HttpResponse.json(testCharactersSearchArray);
        }),
      );

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

      const content = screen.getAllByText('Jane Dow');
      expect(content).toBeDefined();
    });
  });

  it('handles API error responses', () => {
    server.boundary(async () => {
      server.use(
        http.get('https://swapi.py4e.com/api/people/', async () => {
          await delay(DELAY);

          return new HttpResponse(null, { status: 401 });
        }),
      );

      renderWithProviders(
        <BrowserRouter>
          <ThemeProvider>
            <MainPage />
          </ThemeProvider>
        </BrowserRouter>,
      );

      await waitFor(async () => {
        const placeholder = await screen.findByTestId('error-main-page');

        expect(placeholder).toBeInTheDocument();
      });
    });
  });

  it('dispatches invalidateTags when clicking Refetch button', () => {
    server.boundary(async () => {
      server.use(
        http.get('https://swapi.py4e.com/api/people/', async () => {
          await delay(DELAY);

          return HttpResponse.json(testCharactersSearchArray);
        }),
      );

      const dispatchSpy = vi.spyOn(store, 'dispatch');

      const { findByRole, user } = setup(
        <MemoryRouter initialEntries={['/']}>
          <ThemeProvider>
            <MainPage />
          </ThemeProvider>
        </MemoryRouter>,
      );

      const refetchButton = await findByRole('button', {
        name: /refetch/i,
      });
      await user.click(refetchButton);

      expect(dispatchSpy).toHaveBeenCalledWith(
        starWarsApi.util.invalidateTags(['Characters']),
      );
    });
  });

  it('navigates when clicking not on a card element', () => {
    server.boundary(async () => {
      server.use(
        http.get('https://swapi.py4e.com/api/people/', async () => {
          await delay(DELAY);

          return HttpResponse.json(testCharactersSearchArray);
        }),
      );

      const { getByRole, getByTestId, user } = setup(
        <MemoryRouter initialEntries={['/1?page=1']}>
          <ThemeProvider>
            <MainPage />
          </ThemeProvider>
        </MemoryRouter>,
      );

      const main = getByRole('main');

      await user.click(main);

      expect(navigateMock).toHaveBeenCalled();

      const button = getByTestId('test-button');
      button.click();
    });
  });
});
