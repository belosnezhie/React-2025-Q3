import { render, screen } from '@testing-library/react';
import { JSX } from 'react';
import { expect, vi } from 'vitest';

import { ErrorBoundary } from '@/components';

const ErrorChild = (): never => {
  throw new Error('test error');
};

const NormalChild = (): JSX.Element => {
  return <div>I am a normal component.</div>;
};
describe('Error Catching Tests', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('catches and handle JavaScript errors in child components and displays fallback UI when error occurs', () => {
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

  it('logs error to console', () => {
    using consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => void 0);

    render(
      <ErrorBoundary>
        <ErrorChild />
      </ErrorBoundary>,
    );

    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it('renders normal UI if there is no error in children', () => {
    vi.spyOn(console, 'error').mockImplementation(() => void 0);

    render(
      <ErrorBoundary>
        <NormalChild />
      </ErrorBoundary>,
    );

    const page = screen.getByText('I am a normal component.');

    expect(page).toBeInTheDocument();
  });
});
