import { fireEvent, screen } from '@testing-library/dom';
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
import { store } from '../store/Store';
import { renderWithProviders } from '../TestUtils';

import MainPage from '.';

let unmount = () => {};

export const handlers = [
  http.get(
    'https://swapi.dev/api/people/?search=*&format=json&page=1',
    async () => {
      await delay(150);

      return HttpResponse.json(testCharactersSearchArr);
    },
  ),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());

beforeEach(() => {
  global.URL.createObjectURL = vi.fn();
  const component = renderWithProviders(<MainPage />);

  unmount = component.unmount;
});

afterEach(() => {
  server.resetHandlers();
  unmount();
});

afterAll(() => server.close());

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

test('Cards should be rendered', async () => {
  const cards = await screen.findAllByTestId('results_card');

  expect(cards).lengthOf(testCharactersSearchArr.count);
});

test('Card could be added to favorites', async () => {
  const favButtons = await screen.findAllByTestId('fav_button');

  fireEvent.click(favButtons[0]);

  expect(store.getState().favoriteCharacters.favCharacters).lengthOf(1);
});
