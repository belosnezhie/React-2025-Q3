import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import FallbackUIPage from '../src/components/errorBoundary/FallbackUIPage';

test('FallbackUIPage could be rendered', async () => {
  render(<FallbackUIPage />);

  expect(await screen.findByTestId('fallbackUI_page')).toBeDefined();
});
