import { Link } from 'react-router-dom';
import './404Page.css';

import { useTheme } from '../../hooks/ContextHooks';

const NotFoundPage = () => {
  const theme = useTheme();

  return (
    <div className={theme + ' not_found_page'} data-testid="not_found_page">
      <h2>404 - Not Found</h2>
      <h3>Sorry, the page you are looking for does not exist.</h3>
      <Link to="/" className="nav_link">
        &larr; Go to Main Page
      </Link>
    </div>
  );
};

export default NotFoundPage;
