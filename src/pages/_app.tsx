import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import './index.css';

import { ThemeProvider } from '../context/ThemeContext';
import { wrapper } from '../store/Store';

export default function MyApp({ Component, pageProps }: AppProps) {
  const { store } = wrapper.useWrappedStore(pageProps);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}
