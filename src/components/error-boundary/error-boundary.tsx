import React, { ErrorInfo, ReactNode } from 'react';

import { FallbackUIPage } from '@/pages/fallback-ui-page/fallback-ui-page';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface State {
  errorMessage: null | string;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  state = {
    errorMessage: '',
  };

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { errorMessage: error.toString() };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error(error.toString(), info.componentStack);
  }

  render(): ReactNode {
    if (this.state.errorMessage) {
      return <FallbackUIPage />;
    }

    return this.props.children;
  }
}
