import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { expect } from 'vitest';

import { CardsWrapper } from '@/components';

import { renderWithProviders } from './test-utils/provider';
import {
  partialTestSearchResponse,
  testCharactersSearchArray,
  testDataJohn,
} from './test-utils/test-data';

describe('Rendering Tests', () => {
  it('renders correct number of items when data is provided', () => {
    renderWithProviders(
      <BrowserRouter>
        <CardsWrapper
          cardCharacterData={testCharactersSearchArray.results}
          error={null}
        />
      </BrowserRouter>,
    );

    const cards = screen.getAllByTestId('results_card');

    expect(cards).lengthOf(2);
  });

  it('displays placeholder message when data array is empty', () => {
    renderWithProviders(
      <BrowserRouter>
        <CardsWrapper cardCharacterData={[]} error={null} />
      </BrowserRouter>,
    );

    const placeholder = screen.getByText('Oops! there is no such character.');

    expect(placeholder).toBeInTheDocument();
  });
});

describe('Data Display Tests', () => {
  it('correctly displays item names and descriptions', () => {
    renderWithProviders(
      <BrowserRouter>
        <CardsWrapper cardCharacterData={[testDataJohn]} error={null} />
      </BrowserRouter>,
    );

    const name = screen.getByTestId('results_card');

    expect(name).toBeInTheDocument();
  });

  it('handles missing or undefined data gracefully', () => {
    renderWithProviders(
      <BrowserRouter>
        <CardsWrapper
          cardCharacterData={partialTestSearchResponse.results}
          error={null}
        />
      </BrowserRouter>,
    );

    const name = screen.getByText('N/A');

    expect(name).toBeInTheDocument();
  });
});

describe('Error Handling Tests', () => {
  it('displays error message when API call fails', () => {
    const apiError = new Error('Request faild with code: 401');

    renderWithProviders(
      <BrowserRouter>
        <CardsWrapper cardCharacterData={[]} error={apiError} />
      </BrowserRouter>,
    );

    const placeholder = screen.getByText(
      'Something went wrong: Request faild with code: 401',
    );

    expect(placeholder).toBeInTheDocument();
  });
});
