import { fireEvent, screen } from '@testing-library/react';
import { HttpResponse, delay, http } from 'msw';
import { setupServer } from 'msw/node';
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  expect,
  test,
  vi,
} from 'vitest';

import { testCharactersSearchArr } from '../components/main/TestData';
import { renderWithProviders, store } from '../TestUtils';

import Page, { Params, SearchParams } from './page';

export const handlers = [
  http.get('https://swapi.dev/api/people/?page=*&search=*', async () => {
    await delay(150);

    return HttpResponse.json(testCharactersSearchArr);
  }),
];

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});

beforeEach(async () => {
  const params: Params = { slug: '' };
  const searchParams: SearchParams = { page: '1', query: '' };

  renderWithProviders(await Page({ params, searchParams }));
});

afterAll(() => server.close());

afterEach(() => {
  server.resetHandlers();
});

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');

  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: vi.fn(),
      replace: vi.fn(),
    })),
    useSearchParams: vi.fn(() => ({
      get: (param: string) => {
        if (param === 'search') {
          return '';
        }
        if (param === 'page') {
          return '1';
        }

        return '';
      },
    })),
    usePathname: vi.fn(),
  };
});

vi.mock('next/headers', async () => {
  const actual = await vi.importActual('next/headers');

  return {
    ...actual,
    headers: vi.fn(() => ({
      get: (key: string) => {
        if (key === 'x-current-query') {
          return '';
        }
        if (key === 'x-current-page') {
          return '1';
        }

        return '';
      },
    })),
  };
});

test('Cards should be rendered', async () => {
  const cards = await screen.findAllByTestId('results_card');

  expect(cards).lengthOf(2);
});

test('Favorites', async () => {
  global.URL.createObjectURL = vi.fn();
  const favButtons = await screen.findAllByTestId('fav_button');

  fireEvent.click(favButtons[0]);

  expect(store.getState().favoriteCharacters.favCharacters).lengthOf(1);
});
