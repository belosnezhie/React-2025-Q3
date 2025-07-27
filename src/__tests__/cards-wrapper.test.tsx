import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { expect } from 'vitest';

import {
  partialTestSearchResponse,
  testCharactersSearch,
  testCharactersSearchArray as testCharactersSearchArray,
} from '@/__tests__/test-utils/test-data';
import { CardsWrapper } from '@/components';

describe('Rendering Tests', () => {
  it('renders correct number of items when data is provided', () => {
    render(
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
    render(
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
    render(
      <BrowserRouter>
        <CardsWrapper
          cardCharacterData={testCharactersSearch.results}
          error={null}
        />
      </BrowserRouter>,
    );

    const name = screen.getByText('Name: Jane Dow');

    expect(name).toBeInTheDocument();
  });

  it('handles missing or undefined data gracefully', () => {
    render(
      <BrowserRouter>
        <CardsWrapper
          cardCharacterData={partialTestSearchResponse.results}
          error={null}
        />
      </BrowserRouter>,
    );

    const name = screen.getByText('Name: N/A');

    expect(name).toBeInTheDocument();
  });
});

describe('Error Handling Tests', () => {
  it('displays error message when API call fails', () => {
    const apiError = new Error('Request faild with code: 401');

    render(
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
