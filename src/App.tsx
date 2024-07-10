import { Component, ReactNode } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ErrorBoundary from './components/errorBoundary/ErrorBoundary.tsx';
import NotFoundPage from './pages/404Page/fallbackUIPage/404Page.tsx';
import MainPage from './pages/mainPage/MainPage.tsx';

class App extends Component {
  render(): ReactNode {
    return (
      <>
        <ErrorBoundary>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/main" element={<MainPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </ErrorBoundary>
      </>
    );
  }
}

export default App;
