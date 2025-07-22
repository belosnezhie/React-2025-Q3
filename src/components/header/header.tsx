import React, { ReactNode } from 'react';

import { ErrorButton } from '@/components';
import { SearchForm } from '@/components';
import { searchQueryStorage } from '@/services/local-storage';

import './header.css';

interface HeaderProps {
  updateCartsCallback: (searchQuery: string) => Promise<void>;
}

export class Header extends React.Component<HeaderProps> {
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
