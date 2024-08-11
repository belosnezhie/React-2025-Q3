import { Orbitron } from '@next/font/google';
import type { AppProps } from 'next/app';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import './index.css';

import ErrorBoundary from '../components/errorBoundary/ErrorBoundary';
import { ThemeProvider } from '../context/ThemeContext';
import { wrapper } from '../store/Store';

const orbitron = Orbitron({
  subsets: ['latin'],
});

export default function MyApp({ Component, pageProps }: AppProps) {
  const { store } = wrapper.useWrappedStore(pageProps);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => {
      console.log('start');
      setLoading(true);
    };
    const end = () => {
      console.log('finished');
      setLoading(false);
    };

    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);

    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <div className={orbitron.className}>
          {loading ? (
            <div className="globalSpinnerWrapper">
              <div className="spinner" />
            </div>
          ) : (
            <ErrorBoundary>
              <Component {...pageProps} />
            </ErrorBoundary>
          )}
        </div>
      </ThemeProvider>
    </Provider>
  );
}
