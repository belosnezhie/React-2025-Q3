import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import {
  testCharactersSearch,
  testCharactersSearchArr,
} from '../../test-utils/test-data';

import CardsWrapper from './cards-wrapper.tsx';

describe('CardsWrapper Component Tests', () => {
  test('should render correct number of items when data is provided', () => {
    render(
      <CardsWrapper cardCharacterData={testCharactersSearchArr.results} />,
    );

    const cards = screen.getAllByTestId('results_card');

    expect(cards).lengthOf(2);
  });

  test('should display placeholder message when data array is empty', () => {
    render(<CardsWrapper cardCharacterData={[]} />);

    const placeholder = screen.getByText('Oops! there is no such character.');

    expect(placeholder).toBeInTheDocument();
  });

  test('should correctly display item names and descriptions', () => {
    render(<CardsWrapper cardCharacterData={testCharactersSearch.results} />);

    const name = screen.getByText('Name: Jane Dow');
    const hairColor = screen.getByText('Hair color: Orange');
    const skinColor = screen.getByText('Skin color: White');
    const eyeColor = screen.getByText('Eye color: Blue');
    const birthYear = screen.getByText('Birth year: 1888');
    const gender = screen.getByText('Gender: woman');

    expect(name).toBeDefined();
    expect(hairColor).toBeDefined();
    expect(skinColor).toBeDefined();
    expect(eyeColor).toBeDefined();
    expect(birthYear).toBeDefined();
    expect(gender).toBeDefined();
  });
});
