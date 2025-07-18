import React, { ReactNode } from 'react';

import SearchForm from '../search-form/search-form.tsx';

import ErrorButton from './error-button.tsx';
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
            updateCartsCallback={async (searchQuery: string): Promise<void> => {
              await this.props.updateCartsCallback(searchQuery);
            }}
          ></SearchForm>
          <ErrorButton />
        </header>
      </>
    );
  }
}

export default Header;
