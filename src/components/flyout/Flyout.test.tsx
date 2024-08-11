import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { afterEach, expect, test, vi } from 'vitest';

import { testDataJane } from '../../components/main/TestData';
import { addToFavorites } from '../../store/favoriteCharacterSlice/FavoriteCharacterSlice';
import { store } from '../../store/Store';
import { renderWithProviders } from '../../TestUtils';

import { Flyout } from './Flyout';

let unmount = () => {};

afterEach(() => {
  unmount();
});

test.skip('Showuld show flyout', () => {
  global.URL.createObjectURL = vi.fn();

  store.dispatch(addToFavorites(testDataJane));

  const renderObject = renderWithProviders(
    <BrowserRouter>
      <Flyout />
    </BrowserRouter>,
    { testStore: store },
  );

  unmount = renderObject.unmount;

  expect(screen.findByText('1 items are selected')).toBeDefined();
});
