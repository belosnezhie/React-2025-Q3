import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import NotFoundPage from './not-found';

test('Not found page could be rendered', () => {
  render(<NotFoundPage />);

  expect(screen.findByTestId('not_found_page')).toBeDefined();
});
