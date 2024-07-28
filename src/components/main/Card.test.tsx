import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { afterEach, expect, test } from 'vitest';

import { testDataJane } from '../../components/main/TestData';
import { renderWithProviders } from '../../TestUtils.tsx';

import Card from './Card.tsx';

let unmount = () => {};

afterEach(() => {
  unmount();
});

test('Should render the relevant card data', () => {
  const renderObject = renderWithProviders(
    <BrowserRouter>
      <Card cardData={testDataJane} pageData={1} searchData="" />
    </BrowserRouter>,
  );

  unmount = renderObject.unmount;

  const name = screen.getByText('Name: Jane Dow');

  expect(name).toBeDefined();
});
