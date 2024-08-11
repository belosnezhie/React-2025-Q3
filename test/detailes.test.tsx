import { createRemixStub } from '@remix-run/testing';
import { screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import DetailedSection from '../app/routes/detailes.$name';
import { testCharactersSearch } from '../src/components/main/TestData';
import { renderWithProviders } from '../src/TestUtils';

test('Detailed section should display character details', async () => {
  const MainPageStub = createRemixStub([
    {
      path: '/',
      Component: DetailedSection,
      loader() {
        return testCharactersSearch;
      },
    },
  ]);

  renderWithProviders(<MainPageStub />);

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
