import { screen } from '@testing-library/dom';
import { HttpResponse, delay, http } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, expect, test, vi } from 'vitest';

import DetailedSection from '../src/components/detailesSection/DetailedSection';
import { testCharactersSearchArr } from '../src/components/main/TestData';
import { renderWithProviders } from '../src/TestUtils';

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

afterEach(() => {
  server.resetHandlers();
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

test('Detailed section should display character details', async () => {
  renderWithProviders(<DetailedSection destroyCallback={() => {}} />);

  expect((await screen.findByTestId('name')).textContent).toEqual(
    'Name: Jane Dow',
  );
  expect((await screen.findByTestId('birth_year')).textContent).toEqual(
    'Birth year: test',
  );
  expect((await screen.findByTestId('hair_color')).textContent).toEqual(
    'Hair color: test',
  );
  expect((await screen.findByTestId('skin_color')).textContent).toEqual(
    'Skin color: test',
  );
  expect((await screen.findByTestId('eye_color')).textContent).toEqual(
    'Eye color: test',
  );
  expect((await screen.findByTestId('gender')).textContent).toEqual(
    'Gender: test',
  );
});
