import styles from './pagesStyles/FallbackUIPage.module.css';

const FallbackUIPage = () => {
  return (
    <div className={styles.fallbackUIPage}>
      <h2>Oops! Something went wrong. Please try again later.</h2>
    </div>
  );
};

export default FallbackUIPage;
