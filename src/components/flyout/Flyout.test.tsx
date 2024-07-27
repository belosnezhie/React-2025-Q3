import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { afterEach, expect, test, vi } from 'vitest';

import { testPeopleSearchResp } from '../../components/main/TestData';
import { addToFavorites } from '../../store/favoriteCharacter/FavoriteCharacterSlice';
import { store } from '../../store/Store';
import { renderWithProviders } from '../../TestUtils.tsx';

import { Flyout } from './Flyout.tsx';

let unmount = () => {};

afterEach(() => {
  unmount();
});

test('Showuld show flyout', () => {
  global.URL.createObjectURL = vi.fn();

  store.dispatch(addToFavorites(testPeopleSearchResp));

  const renderObject = renderWithProviders(
    <BrowserRouter>
      <Flyout />
    </BrowserRouter>,
    { testStore: store },
  );

  unmount = renderObject.unmount;

  expect(screen.findByText('1 items are selected')).toBeDefined();
});
