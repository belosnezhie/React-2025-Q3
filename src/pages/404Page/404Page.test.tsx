import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { expect, test } from 'vitest';

import NotFoundPage from './404Page.tsx';

test('should render 404page', () => {
  render(
    <BrowserRouter>
      <NotFoundPage />
    </BrowserRouter>,
  );

  expect(screen.getByTestId('not_found_page')).toBeDefined();
});
