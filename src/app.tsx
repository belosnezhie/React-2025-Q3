import { Component, ReactNode } from 'react';

import './app.css';
import ErrorBoundary from './components/error-boundary/error-boundary.tsx';
import MainPage from './pages/main-page.tsx';
import { apiService } from './services/api-service';

class App extends Component {
  render(): ReactNode {
    return (
      <>
        <ErrorBoundary>
          <MainPage service={apiService} />
        </ErrorBoundary>
      </>
    );
  }
}

export default App;
