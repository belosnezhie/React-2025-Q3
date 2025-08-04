import { screen, waitFor } from '@testing-library/react';
import { expect, vi } from 'vitest';

import { Flyout } from '@/components';
import { addToFavorites, clearFavorites, store } from '@/state';

import { renderWithProviders } from './test-utils/provider';
import { testDataJane } from './test-utils/test-data';
import { setupWithTestStore } from './test-utils/user-event-setup';

describe('Flyout tests', () => {
  beforeEach(() => {
    store.dispatch(clearFavorites());
    global.URL.createObjectURL = vi.fn();
  });

  it('does not render if favorites list is empty', () => {
    const { queryByTestId } = renderWithProviders(<Flyout />, {
      testStore: store,
    });

    expect(queryByTestId('flyout')).not.toBeInTheDocument();
  });

  it('displays flyout with correct amount of items', () => {
    store.dispatch(addToFavorites(testDataJane));

    renderWithProviders(<Flyout />, { testStore: store });

    expect(screen.findByText('1 items are selected')).toBeDefined();
  });

  it('dispatches clearFavorites when Unselect all button is clicked', async () => {
    store.dispatch(addToFavorites(testDataJane));
    const { getByText, queryByTestId, user } = setupWithTestStore(
      <Flyout />,
      store,
    );

    const button = getByText('Unselect all');
    user.click(button);

    await waitFor(() => {
      expect(queryByTestId('flyout')).not.toBeInTheDocument();
    });
  });
});
