import Link from 'next/link';

import { useTheme } from '../hooks/ContextHooks';

import styles from './pagesStyles/404Page.module.css';

const NotFoundPage = () => {
  const theme = useTheme();

  return (
    <div
      className={theme + ' ' + styles.notFoundPage}
      data-testid="not_found_page"
    >
      <h2>404 - Not Found</h2>
      <h3>Sorry, the page you are looking for does not exist.</h3>
      <Link href="/" className={styles.navLink}>
        &larr; Go to Main Page
      </Link>
    </div>
  );
};

export default NotFoundPage;
