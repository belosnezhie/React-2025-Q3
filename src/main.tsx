import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './app';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Root element with id 'root' not found");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    {/* <Suspense
      fallback={
        <div aria-label="spinner" className="spinner" data-testid="spinner" />
      }
    > */}
    <App />
    {/* </Suspense> */}
  </React.StrictMode>,
);
