import { EnhancedStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

import { store } from './store/Store';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  testStore?: EnhancedStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  extendedRenderOptions: ExtendedRenderOptions = {},
) {
  const { testStore = store, ...renderOptions } = extendedRenderOptions;

  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={testStore}>{children}</Provider>
  );

  return {
    testStore,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
