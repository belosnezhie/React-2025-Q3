import './Header.css';

import SearchForm from '../searchForm/SearchForm.tsx';

interface HeaderProps {
  updateCartsCallback: (searchQuery: string) => Promise<void>;
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
      </header>
    </>
  );
};

export default Header;
