import { screen } from '@testing-library/dom';
import { expect, test } from 'vitest';

import { renderWithProviders } from '../TestUtils';

import NotFoundPage from './404';

test('NotFoundPage can be displayed', async () => {
  renderWithProviders(<NotFoundPage />);

  expect(await screen.findByTestId('not_found_page')).toBeDefined();
});
