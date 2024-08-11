import type { LinksFunction } from '@remix-run/node';
import { Links, Meta, Outlet, Scripts } from '@remix-run/react';
import { Provider } from 'react-redux';
import { LoaderFunctionArgs } from 'react-router-dom';

import { ThemeProvider } from '../src/context/ThemeContext';
import MainPage from '../src/pages/mainPage/MainPage';
import { getDefaultData } from '../src/services/StarWarsApi';
import { store } from '../src/store/Store';

import appStylesHref from './index.css?url';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: appStylesHref },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const page = url.searchParams.get('page') || 1;
  const query = url.searchParams.get('search') || '';

  const result = await getDefaultData(Number(page), String(query));

  return result;
}

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
              <MainPage />
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
