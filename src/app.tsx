import { Component, ReactNode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';

import { ErrorBoundary } from '@/components';
import { NotFoundPage } from '@/pages/404-page/404-page';
import { MainPage } from '@/pages/main-page/main-page';
import { apiService } from '@/services/api-service';

import './app.css';

class App extends Component {
  render(): ReactNode {
    return (
      <>
        <ErrorBoundary>
          <BrowserRouter>
            <Routes>
              <Route element={<MainPage service={apiService} />} path="/" />
              <Route element={<NotFoundPage />} path="*" />
            </Routes>
          </BrowserRouter>
        </ErrorBoundary>
      </>
    );
  }
}

export default App;
