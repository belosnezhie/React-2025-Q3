import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import DetailedSection from './components/detailesSection/DetailedSection';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';
import NotFoundPage from './pagesOLD/404Page/404Page';
import MainPage from './pagesOLD/mainPage/MainPage';

const App = () => {
  return (
    <>
      <ErrorBoundary>
        <MainPage />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />}>
              <Route path="/detailed" element={<DetailedSection />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </>
  );
};

export default App;
