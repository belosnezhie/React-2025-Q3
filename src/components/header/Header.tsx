import SearchForm from '../searchForm/SearchForm';

import styles from './Header.module.css';
import ThemeButton from './ThemeButton';

const Header = () => {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>The Star Wars Сharacters</h1>
        <SearchForm />
        <ThemeButton />
      </header>
    </>
  );
};

export default Header;
