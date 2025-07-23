import { render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';

import { ErrorBoundary } from '@/components';

const ErrorChild = (): never => {
  throw new Error('test error');
};
describe('Error Catching Tests', () => {
  test('should catche and handle JavaScript errors in child components', () => {
    vi.spyOn(console, 'error').mockImplementation(() => void 0);

    render(
      <ErrorBoundary>
        <ErrorChild />
      </ErrorBoundary>,
    );

    const fallbackPage = screen.getByText(
      'Oops! Something went wrong. Please try again later.',
    );

    expect(fallbackPage).toBeInTheDocument();
  });

  test('should display fallback UI when error occurs', () => {
    vi.spyOn(console, 'error').mockImplementation(() => void 0);

    render(
      <ErrorBoundary>
        <ErrorChild />
      </ErrorBoundary>,
    );

    const fallbackPage = screen.getByText(
      'Oops! Something went wrong. Please try again later.',
    );

    expect(fallbackPage).toBeInTheDocument();
  });

  test('should log error to console', () => {
    using consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => void 0);

    render(
      <ErrorBoundary>
        <ErrorChild />
      </ErrorBoundary>,
    );

    expect(consoleErrorSpy).toHaveBeenCalled();
    // expect(consoleErrorSpy.mock.calls[0][0]).toContain('Error: test error');
  });
});
