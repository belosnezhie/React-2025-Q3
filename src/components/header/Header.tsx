import { useThemeSwitcher } from '../../hooks/ContextHooks';
import './Header.css';
import SearchForm from '../searchForm/SearchForm.tsx';

import headerCssUrl from './Header.css?url';

export const links = [{ rel: 'stylesheet', href: headerCssUrl }];

const Header = () => {
  const handleThemeChange = useThemeSwitcher();

  return (
    <>
      <header className="header">
        <h1 className="header_title">The Star Wars Characters</h1>
        <SearchForm />
        <button
          className="theme_button"
          onClick={handleThemeChange}
          data-testid="theme_switcher"
          type="button"
        />
      </header>
    </>
  );
};

export default Header;
