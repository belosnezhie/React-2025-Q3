import type { LinksFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';

import appStylesHref from '../pagesStyles/404Page.css?url';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: appStylesHref },
];

const NotFoundPage = () => {
  return (
    <div className={'not_found_page'} data-testid="not_found_page">
      <h2>404 - Not Found</h2>
      <h3>Sorry, the page you are looking for does not exist.</h3>
      <Link to="/" className="nav_link">
        Go to Main Page
      </Link>
    </div>
  );
};

export default NotFoundPage;
