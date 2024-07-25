import './Header.css';

import SearchForm from '../searchForm/SearchForm.tsx';

interface HeaderProps {
  changeThemeCallback: () => void;
  updateCartsCallback: (searchQuery: string) => Promise<void>;
}

const Header = (props: HeaderProps) => {
  return (
    <>
      <header className="header">
        <h1 className="header_title">The Star Wars Сharacters</h1>
        <SearchForm
          updateCartsCallback={props.updateCartsCallback}
        ></SearchForm>
        <button className="theme_button" onClick={props.changeThemeCallback} />
      </header>
    </>
  );
};

export default Header;
