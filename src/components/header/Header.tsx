import './Header.css';

import SearchForm from '../searchForm/SearchForm.tsx';
import { Counter } from '../TestCounter.tsx';

interface HeaderProps {
  // updateCartsCallback: (searchQuery: string) => Promise<void>;
  changeThemeCallback: () => void;
  callback: (searchQuery: string) => Promise<void>;
}

const Header = (props: HeaderProps) => {
  return (
    <>
      <header className="header">
        <h1 className="header_title">The Star Wars Сharacters</h1>
        <SearchForm
          // updateCartsCallback={async (searchQuery: string): Promise<void> => {
          //   await props.updateCartsCallback(searchQuery);
          // }}
          callback={props.callback}
        ></SearchForm>
        <button className="theme_button" onClick={props.changeThemeCallback} />
        <Counter />
      </header>
    </>
  );
};

export default Header;
