import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/node';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  useLocation,
  useRouteError,
} from '@remix-run/react';
import { Provider } from 'react-redux';

import FallbackUIPage from '../src/components/errorBoundary/FallbackUIPage';
import MainPage from '../src/components/main/Main';
import { ThemeProvider } from '../src/context/ThemeContext';
import { getDefaultData } from '../src/services/StarWarsApi';
import { store } from '../src/store/Store';

import appStylesHref from './index.css?url';
import notFoundStylesHref from './pagesStyles/404Page.css?url';
import errorStylesHref from './pagesStyles/FallbackUIPage.css?url';
import mainStylesHref from './pagesStyles/Main.css?url';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: appStylesHref },
  { rel: 'stylesheet', href: notFoundStylesHref },
  { rel: 'stylesheet', href: mainStylesHref },
  { rel: 'stylesheet', href: errorStylesHref },
  {
    rel: 'icon',
    href: './favicon.png',
    type: 'image/png',
  },
];

export function ErrorBoundary() {
  const error = useRouteError();

  console.error(error);

  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <FallbackUIPage />
        <Scripts />
      </body>
    </html>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);

  const pageNumber = url.searchParams.get('page') || 1;
  const query = url.searchParams.get('search') || '';

  const result = await getDefaultData(Number(pageNumber), String(query));

  return result;
}

const RootPage = () => {
  const isDetailed = useLocation().pathname.includes('detailes');

  return (
    <>
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com"></link>
          <link rel="preconnect" href="https://fonts.gstatic.com"></link>
          <link
            href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap"
            rel="stylesheet"
          ></link>
          <Meta />
          <Links />
        </head>
        <body>
          <ThemeProvider>
            <Provider store={store}>
              <div className={isDetailed ? 'global_wrapper' : ''}>
                <MainPage />
                <Outlet />
              </div>
            </Provider>
          </ThemeProvider>
          <Scripts />
        </body>
      </html>
    </>
  );
};

export default RootPage;
