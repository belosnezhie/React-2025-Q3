import { JSX } from 'react';

import { SearchForm } from '@/components';
import { searchQueryStorage } from '@/services/local-storage';

import './header.css';

interface HeaderProps {
  updateCartsCallback: (searchQuery: string) => void;
}

export const Header = (props: HeaderProps): JSX.Element => {
  return (
    <>
      <header className="header">
        <h1 className="header_title">The Star Wars Сharacters</h1>
        <SearchForm
          storage={searchQueryStorage}
          updateCartsCallback={(searchQuery: string): void => {
            props.updateCartsCallback(searchQuery);
          }}
        />
      </header>
    </>
  );
};
