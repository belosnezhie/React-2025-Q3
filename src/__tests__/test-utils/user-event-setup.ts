import { RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactElement } from 'react';

import { renderWithProviders } from '@/__tests__/test-utils/provider';

// setup function
export function setup(
  component: ReactElement,
): RenderResult & { user: ReturnType<typeof userEvent.setup> } {
  return {
    user: userEvent.setup(),
    ...renderWithProviders(component),
    // ...render(component),
  };
}

export function setupWithProviders(
  component: ReactElement,
): RenderResult & { user: ReturnType<typeof userEvent.setup> } {
  return {
    user: userEvent.setup(),
    ...renderWithProviders(component),
    // ...render(component),
  };
}
