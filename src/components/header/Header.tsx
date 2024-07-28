import { useThemeSwitcher } from '../../hooks/ContextHooks';
import './Header.css';
import SearchForm from '../searchForm/SearchForm.tsx';

const Header = () => {
  const handleThemeChange = useThemeSwitcher();

  return (
    <>
      <header className="header">
        <h1 className="header_title">The Star Wars Сharacters</h1>
        <SearchForm />
        <button
          className="theme_button"
          onClick={handleThemeChange}
          data-testid="theme_switcher"
        />
      </header>
    </>
  );
};

export default Header;
