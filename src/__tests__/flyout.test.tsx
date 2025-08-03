import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { expect, test, vi } from 'vitest';

import { Flyout } from '@/components';
import { addToFavorites, store } from '@/state';

import { renderWithProviders } from './test-utils/provider';
import { testDataJane } from './test-utils/test-data';

test('showuld display flyout with correct amount of items', () => {
  global.URL.createObjectURL = vi.fn();

  store.dispatch(addToFavorites(testDataJane));

  renderWithProviders(
    <BrowserRouter>
      <Flyout />
    </BrowserRouter>,
    { testStore: store },
  );

  expect(screen.findByText('1 items are selected')).toBeDefined();
});
