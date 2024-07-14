import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import DetailedSection from './components/detailesSection/DetailedSection.tsx';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary.tsx';
import NotFoundPage from './pages/404Page/404Page.tsx';
import MainPage from './pages/mainPage/MainPage.tsx';
import { apiService } from './services/ApiService';

const App = () => {
  return (
    <>
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage service={apiService} />}>
              <Route
                path="/detailed"
                element={<DetailedSection service={apiService} />}
              />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </>
  );
};

export default App;
