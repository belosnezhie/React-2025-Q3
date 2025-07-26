import { JSX } from 'react';

import { SearchForm } from '@/components';

import './header.css';

export const Header = (): JSX.Element => {
  return (
    <>
      <header className="header">
        <h1 className="header_title">The Star Wars Сharacters</h1>
        <SearchForm />
      </header>
    </>
  );
};
