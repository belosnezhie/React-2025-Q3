import { screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { expect } from 'vitest';

import { DetailedSection } from '@/components';

import { renderWithProviders } from './test-utils/provider';
import { setup } from './test-utils/user-event-setup';

describe('Detailed Section Tests', () => {
  it.skip('checks that a loading indicator is displayed while fetching data', () => {
    renderWithProviders(
      <BrowserRouter>
        <DetailedSection />
      </BrowserRouter>,
    );

    const spinner = screen.getByTestId('spinner');

    expect(spinner).toBeDefined();
  });

  it.skip('closes component after click on button', async () => {
    const { getByTestId, queryAllByTestId, user } = setup(
      <BrowserRouter>
        <DetailedSection />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(getByTestId('close')).toBeDefined();
    });

    const button = getByTestId('close');

    user.click(button);

    await waitFor(() => {
      expect(queryAllByTestId('character_data')).toHaveLength(0);
    });
  });

  it.skip('correctly displays detailed card data', async () => {
    const { queryAllByTestId } = setup(
      <BrowserRouter>
        <DetailedSection />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(queryAllByTestId('character_data')).toHaveLength(1);
    });
  });
});
