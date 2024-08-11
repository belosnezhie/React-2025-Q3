import Link from 'next/link';

import styles from './404Page.module.css';

const NotFoundPage = () => {
  return (
    <div className={styles.notFoundPage} data-testid="not_found_page">
      <h2>404 - Not Found</h2>
      <h3>Sorry, the page you are looking for does not exist.</h3>
      <Link href="/" className={styles.navLink}>
        &larr; Go to Main Page
      </Link>
    </div>
  );
};

export default NotFoundPage;
