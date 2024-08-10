import type { LinksFunction } from '@remix-run/node';
import { Links, Meta, Outlet, Scripts } from '@remix-run/react';
import { Provider } from 'react-redux';

import { ThemeProvider } from '../src/context/ThemeContext';
import { store } from '../src/store/Store';

import appStylesHref from './index.css?url';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: appStylesHref },
];

const RootPage = () => {
  return (
    <>
      <html lang="en">
        <head>
          <link rel="icon" href="data:image/x-icon;base64,AA" />
          <Meta />
          <Links />
        </head>
        <body>
          <ThemeProvider>
            <Provider store={store}>
              <Outlet />
            </Provider>
          </ThemeProvider>
          <Scripts />
        </body>
      </html>
    </>
  );
};

export default RootPage;
