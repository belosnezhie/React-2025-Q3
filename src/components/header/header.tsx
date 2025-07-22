import React, { ReactNode } from 'react';

import { searchQueryStorage } from '../../services/local-storage';
import SearchForm from '../search-form/search-form';
import ErrorButton from './error-button';
import './header.css';

interface HeaderProps {
  updateCartsCallback: (searchQuery: string) => Promise<void>;
}

class Header extends React.Component<HeaderProps> {
  render(): ReactNode {
    return (
      <>
        <header className="header">
          <h1 className="header_title">The Star Wars Сharacters</h1>
          <SearchForm
            storage={searchQueryStorage}
            updateCartsCallback={async (searchQuery: string): Promise<void> => {
              await this.props.updateCartsCallback(searchQuery);
            }}
          />
          <ErrorButton />
        </header>
      </>
    );
  }
}

export default Header;
