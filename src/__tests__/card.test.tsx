import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { expect } from 'vitest';

import { testDataJane } from '@/__tests__/test-utils/test-data';
import { Card } from '@/components';

describe('Card Component Tests', () => {
  it.skip('displays item name and description correctly', () => {
    render(
      <BrowserRouter>
        <Card characterData={testDataJane} />
      </BrowserRouter>,
    );

    const name = screen.getByText('Name: Jane Dow');

    expect(name).toBeInTheDocument();
  });
});
