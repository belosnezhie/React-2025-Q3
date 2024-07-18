import './Header.css';

import SearchForm from '../searchForm/SearchForm.tsx';

interface HeaderProps {
  updateCartsCallback: (searchQuery: string) => Promise<void>;
  changeThemeCallback: () => void;
}

const Header = (props: HeaderProps) => {
  return (
    <>
      <header className="header">
        <h1 className="header_title">The Star Wars Сharacters</h1>
        <SearchForm
          updateCartsCallback={async (searchQuery: string): Promise<void> => {
            await props.updateCartsCallback(searchQuery);
          }}
        ></SearchForm>
        <button className="theme_button" onClick={props.changeThemeCallback}>
          Theme change
        </button>
      </header>
    </>
  );
};

export default Header;
