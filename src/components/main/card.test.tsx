import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import { testDataJane, testDataNA } from '../../test-utils/test-data';

import Card from './card.tsx';

describe('Card Component Tests', () => {
  test('Should display item name and description correctly', () => {
    render(<Card cardData={testDataJane} />);

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

  test('Should handle missing props gracefully', () => {
    render(<Card cardData={testDataNA} />);

    const name = screen.getByText('Name: N/A');
    const hairColor = screen.getByText('Hair color: N/A');
    const skinColor = screen.getByText('Skin color: N/A');
    const eyeColor = screen.getByText('Eye color: N/A');
    const birthYear = screen.getByText('Birth year: N/A');
    const gender = screen.getByText('Gender: N/A');

    expect(name).toBeDefined();
    expect(hairColor).toBeDefined();
    expect(skinColor).toBeDefined();
    expect(eyeColor).toBeDefined();
    expect(birthYear).toBeDefined();
    expect(gender).toBeDefined();
  });
});
