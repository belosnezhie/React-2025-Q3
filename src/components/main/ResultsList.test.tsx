import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { expect, test } from 'vitest';

import ResultsList from './ResultsList.tsx';
import { testPeopleSearchArr } from './TestData';

test('should Verify that the component renders the specified number of cards', () => {
  render(
    <BrowserRouter>
      <ResultsList
        cardCharactersData={testPeopleSearchArr}
        pageSearchParam={1}
      />
    </BrowserRouter>,
  );

  const cards = screen.getAllByTestId('results_card');

  expect(cards).lengthOf(2);
});

test('should check that an appropriate message is displayed if no cards are present', () => {
  render(
    <BrowserRouter>
      <ResultsList cardCharactersData={[]} pageSearchParam={1} />
    </BrowserRouter>,
  );

  const placeholder = screen.getByText('Oops! there is no such character.');

  expect(placeholder).toBeDefined();
});
