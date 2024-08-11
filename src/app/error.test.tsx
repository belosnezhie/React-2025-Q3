import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import FallbackUIPage from './error';

test('FallbackUIPage could be rendered', () => {
  render(<FallbackUIPage />);

  expect(screen.findByTestId('fallback_ui')).toBeDefined();
});
