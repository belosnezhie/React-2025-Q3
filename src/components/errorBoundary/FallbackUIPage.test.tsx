import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import FallbackUIPage from './FallbackUIPage';

test('FallbackUIPage could be rendered', async () => {
  render(<FallbackUIPage />);

  expect(await screen.findByTestId('fallbackUI_page')).toBeDefined();
});
