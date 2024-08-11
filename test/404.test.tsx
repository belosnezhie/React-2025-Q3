import { screen } from '@testing-library/dom';
import { expect, test } from 'vitest';

import NotFoundPage from '../src/pages/404';
import { renderWithProviders } from '../src/TestUtils';

test('NotFoundPage can be displayed', async () => {
  renderWithProviders(<NotFoundPage />);

  expect(await screen.findByTestId('not_found_page')).toBeDefined();
});
