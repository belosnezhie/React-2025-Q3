import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { ThemeProvider } from '@/state/context/theme-provider';
import { store } from '@/state/store/store';

import './index.css';
import App from './app';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Root element with id 'root' not found");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
