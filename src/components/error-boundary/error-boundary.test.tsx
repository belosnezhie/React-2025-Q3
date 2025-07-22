import { render, screen } from '@testing-library/react';
import { JSX } from 'react';
import { expect, test, vi } from 'vitest';

import { setup } from '../../test-utils/user-event-setup';
import ErrorButton from '../header/error-button';
import ErrorBoundary from './error-boundary';

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

const Child = (): JSX.Element => <ErrorButton />;

describe('Error Button Tests', () => {
  test('should throw error when clicked and triggers error boundary fallback UI', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => void 0);

    const { getByTestId, user } = setup(
      <ErrorBoundary>
        <Child />
      </ErrorBoundary>,
    );

    const errorButton = getByTestId('error_button');

    await user.click(errorButton);

    const fallbackPage = screen.getByText(
      'Oops! Something went wrong. Please try again later.',
    );

    expect(fallbackPage).toBeInTheDocument();
  });
});
