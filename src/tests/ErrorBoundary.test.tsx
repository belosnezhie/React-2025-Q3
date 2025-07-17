import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import ErrorBoundary from '../components/errorBoundary/ErrorBoundary.tsx';
import ErrorButton from '../components/header/ErrorButton.tsx';

test('should show fallback UI when error', () => {
  const Child = () => {
    return <ErrorButton />;
  };

  render(
    <ErrorBoundary>
      <Child />
    </ErrorBoundary>,
  );

  const errorButton = screen.getByTestId('error_button');

  fireEvent.click(errorButton);

  const fallbackPage = screen.getByText(
    'Oops! Something went wrong. Please try again later.',
  );

  expect(fallbackPage).toBeDefined();
});
