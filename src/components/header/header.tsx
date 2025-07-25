import { JSX } from 'react';

import { SearchForm } from '@/components';
import { searchQueryStorage } from '@/services/local-storage';

import './header.css';

interface HeaderProps {
  updateCartsCallback: (newSearchQuery: string) => Promise<void>;
}

export const Header = (props: HeaderProps): JSX.Element => {
  return (
    <>
      <header className="header">
        <h1 className="header_title">The Star Wars Сharacters</h1>
        <SearchForm
          storage={searchQueryStorage}
          updateCartsCallback={async (newSearchQuery: string) => {
            await props.updateCartsCallback(newSearchQuery);
          }}
        />
      </header>
    </>
  );
};
