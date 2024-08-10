'use client';
import { useThemeSwitcher } from '../../hooks/ContextHooks';

import styles from './Header.module.css';

const ThemeButton = () => {
  return (
    <>
      <button
        className={styles.themeButton}
        onClick={useThemeSwitcher()}
      ></button>
    </>
  );
};

export default ThemeButton;
