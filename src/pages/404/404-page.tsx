import { JSX } from 'react';
import { Link } from 'react-router-dom';

import './404-page.css';

export const NotFoundPage = (): JSX.Element => {
  return (
    <div className="not_found_page" data-testid="not_found_page">
      <h2>404 - Not Found</h2>
      <h3>Sorry, the page you are looking for does not exist.</h3>
      <Link className="nav_link" to="/">
        &larr; Go to Main Page
      </Link>
    </div>
  );
};
