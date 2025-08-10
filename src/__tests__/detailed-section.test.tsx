import { screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { expect } from 'vitest';

import { renderWithProviders } from '@/__tests__/test-utils/provider';
import { DetailedSection } from '@/components';

import { setup } from './test-utils/user-event-setup';

describe('Detailed Section Tests', () => {
  it('checks that a loading indicator is displayed while fetching data', () => {
    renderWithProviders(
      <BrowserRouter>
        <DetailedSection />
      </BrowserRouter>,
    );

    const spinner = screen.getByTestId('spinner');

    expect(spinner).toBeDefined();
  });

  it('closes component after click on button', async () => {
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

  it('correctly displays detailed card data', async () => {
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
