import { useTheme, useThemeSwitcher } from '../../hooks/ContextHooks';
import SearchForm from '../searchForm/SearchForm';

import styles from './Header.module.css';

const Header = () => {
  const handleThemeChange = useThemeSwitcher();
  const theme = useTheme();

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>The Star Wars Сharacters</h1>
        <SearchForm />
        <button
          className={theme + ' ' + styles.themeButton}
          onClick={handleThemeChange}
          data-testid="theme_switcher"
        />
      </header>
    </>
  );
};

export default Header;
