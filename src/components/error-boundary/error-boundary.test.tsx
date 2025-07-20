import { render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';

import { setup } from '../../test-utils/user-event-setup';
import ErrorButton from '../header/error-button.tsx';

import ErrorBoundary from './error-boundary.tsx';

describe('Error Catching Tests', () => {
  const ErrorChild = () => {
    throw new Error('test error');
  };

  test('should catche and handle JavaScript errors in child components', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

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
    vi.spyOn(console, 'error').mockImplementation(() => {});

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
      .mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ErrorChild />
      </ErrorBoundary>,
    );

    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(consoleErrorSpy.mock.calls[0][0]).toContain('Error: test error');
  });
});

describe('Error Button Tests', () => {
  test('should throw error when clicked and triggers error boundary fallback UI', async () => {
    const Child = () => {
      return <ErrorButton />;
    };

    vi.spyOn(console, 'error').mockImplementation(() => {});

    const { user, getByTestId } = setup(
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
