import { ReactNode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';

import { ErrorBoundary } from '@/components';
import { DetailedSection } from '@/components';
import { AboutPage } from '@/pages';
import { MainPage } from '@/pages';
import { NotFoundPage } from '@/pages';
import { apiService } from '@/services/api-service';

const App = (): ReactNode => {
  return (
    <>
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route element={<MainPage service={apiService} />} path="/">
              <Route
                element={<DetailedSection service={apiService} />}
                path=":characterID"
              />
            </Route>
            <Route element={<AboutPage />} path="/about" />
            <Route element={<NotFoundPage />} path="*" />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </>
  );
};

export default App;
