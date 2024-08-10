'use client';
import { useTheme, useThemeSwitcher } from '../../hooks/ContextHooks';

import styles from './Header.module.css';

const ThemeButton = () => {
  const theme = useTheme();

  return (
    <>
      <button
        className={`${theme} ${styles.themeButton}`}
        onClick={useThemeSwitcher()}
      ></button>
    </>
  );
};

export default ThemeButton;
