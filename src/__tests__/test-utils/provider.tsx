import { EnhancedStore } from '@reduxjs/toolkit';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

import { store } from '@/state';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  testStore?: EnhancedStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  extendedRenderOptions: ExtendedRenderOptions = {},
): RenderResult & { testStore: typeof store } {
  const { testStore = store, ...renderOptions } = extendedRenderOptions;

  const Wrapper = ({ children }: PropsWithChildren): React.ReactElement => (
    <Provider store={testStore}>{children}</Provider>
  );

  const renderResult = render(ui, { wrapper: Wrapper, ...renderOptions });

  return {
    testStore,
    ...renderResult,
  };
}
