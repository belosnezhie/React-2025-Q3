import { screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import { setup } from '../../test-utils/user-event-setup';
import ErrorButton from '../header/error-button.tsx';

import ErrorBoundary from './error-boundary.tsx';

test('should show fallback UI when error', async () => {
  const Child = () => {
    return <ErrorButton />;
  };

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
