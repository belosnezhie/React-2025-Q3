import { screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { expect } from 'vitest';

import { Card, FavButton } from '@/components';
import { addToFavorites, store } from '@/state';

import { renderWithProviders } from './test-utils/provider';
import { testDataJane } from './test-utils/test-data';
import { setupWithTestStore } from './test-utils/user-event-setup';

describe('Card Component Tests', () => {
  it('displays item name and description correctly', () => {
    renderWithProviders(
      <BrowserRouter>
        <Card characterData={testDataJane} />
      </BrowserRouter>,
    );

    const name = screen.getByText('Jane Dow');

    expect(name).toBeInTheDocument();
  });

  it('displays flyout with correct amount of items after item was checked', async () => {
    global.URL.createObjectURL = vi.fn();

    const { getByRole, user } = setupWithTestStore(
      <BrowserRouter>
        <FavButton characterData={testDataJane} />
      </BrowserRouter>,
      store,
    );

    const checkbox = getByRole('checkbox');
    user.click(checkbox);

    await waitFor(() => {
      expect(checkbox).toBeChecked();
      expect(screen.findByText('1 items are selected')).toBeDefined();
    });

    const actions = store.getState();

    expect(actions).toHaveProperty('favorites', {
      favorites: [testDataJane],
    });
  });

  it('removes flyout after selected item was unchecked', async () => {
    store.dispatch(addToFavorites(testDataJane));
    global.URL.createObjectURL = vi.fn();

    const { getByRole, user } = setupWithTestStore(
      <BrowserRouter>
        <FavButton characterData={testDataJane} />
      </BrowserRouter>,
      store,
    );

    const checkbox = getByRole('checkbox');
    await user.click(checkbox);

    await waitFor(() => {
      expect(screen.queryByText('1 items are selected')).toBeNull();
    });

    const actions = store.getState();

    expect(actions).toHaveProperty('favorites', {
      favorites: [],
    });
  });
});
