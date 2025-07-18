import { Component, ReactNode } from 'react';

import './app.css';
import ErrorBoundary from './components/error-boundary/error-boundary.tsx';
import MainPage from './pages/main-page.tsx';

class App extends Component {
  render(): ReactNode {
    return (
      <>
        <ErrorBoundary>
          <MainPage />
        </ErrorBoundary>
      </>
    );
  }
}

export default App;
