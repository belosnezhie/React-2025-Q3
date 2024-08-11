import { createRemixStub } from '@remix-run/testing';
import { screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import { renderWithProviders } from '../../src/TestUtils';

import NotFoundPage from './$';

test('NotFoundPage could be rendered', () => {
  const NotFoundPageStub = createRemixStub([
    {
      path: '/',
      Component: NotFoundPage,
    },
  ]);

  renderWithProviders(<NotFoundPageStub />);

  expect(screen.findByTestId('not_found_page')).toBeDefined();
});
