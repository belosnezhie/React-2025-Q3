import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { expect } from 'vitest';

import { renderWithProviders } from '@/__tests__/test-utils/provider';
import { Card } from '@/components';

import { testDataJane } from './test-utils/test-data';

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
});
