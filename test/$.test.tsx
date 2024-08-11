import { createRemixStub } from '@remix-run/testing';
import { screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import NotFoundPage from '../app/routes/$';
import { renderWithProviders } from '../src/TestUtils';

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
