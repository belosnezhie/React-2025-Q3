import { Component, ReactNode } from 'react';

import './app.css';
import { ErrorBoundary } from '@/components';
import MainPage from '@/pages/main-page';
import { apiService } from '@/services/api-service';

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
