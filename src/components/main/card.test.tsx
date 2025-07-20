import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import { partialTestData, testDataJane } from '../../test-utils/test-data';

import Card from './card';

describe('Card Component Tests', () => {
  test('Should display item name and description correctly', () => {
    render(<Card cardData={testDataJane} />);

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

  test('Should handle missing props gracefully', () => {
    render(<Card cardData={partialTestData} />);

    const name = screen.getByText('Name: N/A');
    const hairColor = screen.getByText('Hair color: N/A');
    const skinColor = screen.getByText('Skin color: N/A');
    const eyeColor = screen.getByText('Eye color: N/A');
    const birthYear = screen.getByText('Birth year: N/A');
    const gender = screen.getByText('Gender: N/A');

    expect(name).toBeInTheDocument();
    expect(hairColor).toBeInTheDocument();
    expect(skinColor).toBeInTheDocument();
    expect(eyeColor).toBeInTheDocument();
    expect(birthYear).toBeInTheDocument();
    expect(gender).toBeInTheDocument();
  });
});
