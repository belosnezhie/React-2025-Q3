import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { expect, test } from 'vitest';

import ErrorBoundary from '../src/components/errorBoundary/ErrorBoundary';

test('should show fallback UI when error', () => {
  const Child = () => {
    const [wasClicked, setClicked] = useState(false);

    const handleClick = () => {
      setClicked(true);
    };

    if (wasClicked) {
      throw new Error('Test error');
    }

    return (
      <button
        className="throw_error_button"
        type="button"
        onClick={() => {
          handleClick();
        }}
        data-testid="error_button"
      >
        Generate error
      </button>
    );
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
