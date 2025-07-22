import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import {
  partialTestSearchResponse,
  testCharactersSearch,
  testCharactersSearchArray as testCharactersSearchArray,
} from '../../test-utils/test-data';
import CardsWrapper from './cards-wrapper';

describe('Rendering Tests', () => {
  test('should render correct number of items when data is provided', () => {
    render(
      <CardsWrapper
        cardCharacterData={testCharactersSearchArray.results}
        error={null}
      />,
    );

    const cards = screen.getAllByTestId('results_card');

    expect(cards).lengthOf(2);
  });

  test('should display placeholder message when data array is empty', () => {
    render(<CardsWrapper cardCharacterData={[]} error={null} />);

    const placeholder = screen.getByText('Oops! there is no such character.');

    expect(placeholder).toBeInTheDocument();
  });
});

describe('Data Display Tests', () => {
  test('should correctly display item names and descriptions', () => {
    render(
      <CardsWrapper
        cardCharacterData={testCharactersSearch.results}
        error={null}
      />,
    );

    const name = screen.getByText('Name: Jane Dow');
    const hairColor = screen.getByText('Hair color: Orange');
    const skinColor = screen.getByText('Skin color: White');
    const eyeColor = screen.getByText('Eye color: Blue');
    const birthYear = screen.getByText('Birth year: 1888');
    const gender = screen.getByText('Gender: woman');

    expect(name).toBeInTheDocument();
    expect(hairColor).toBeInTheDocument();
    expect(skinColor).toBeInTheDocument();
    expect(eyeColor).toBeInTheDocument();
    expect(birthYear).toBeInTheDocument();
    expect(gender).toBeInTheDocument();
  });

  test('should handle missing or undefined data gracefully gracefully', () => {
    render(
      <CardsWrapper
        cardCharacterData={partialTestSearchResponse.results}
        error={null}
      />,
    );

    const name = screen.getByText('Name: N/A');
    const hairColor = screen.getByText('Hair color: N/A');
    const skinColor = screen.getByText('Skin color: N/A');
    const eyeColor = screen.getByText('Eye color: N/A');
    const birthYear = screen.getByText('Birth year: N/A');

    expect(name).toBeInTheDocument();
    expect(hairColor).toBeInTheDocument();
    expect(skinColor).toBeInTheDocument();
    expect(eyeColor).toBeInTheDocument();
    expect(birthYear).toBeInTheDocument();
  });
});

describe('Error Handling Tests', () => {
  test('should display error message when API call fails', () => {
    const apiError = new Error('Request faild with code: 401');

    render(<CardsWrapper cardCharacterData={[]} error={apiError} />);

    const placeholder = screen.getByText(
      'Something went wrong: Request faild with code: 401',
    );

    expect(placeholder).toBeInTheDocument();
  });
});
