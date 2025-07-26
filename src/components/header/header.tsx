import { JSX } from 'react';
import { NavLink } from 'react-router-dom';

import './header.css';
import { SearchForm } from '@/components';

export const Header = ({
  pageType,
}: {
  pageType: 'about' | 'main';
}): JSX.Element => {
  return (
    <>
      <header className="header">
        <h1 className="header_title">The Star Wars Сharacters</h1>
        {pageType === 'main' ? (
          <>
            <SearchForm />
            <NavLink className={'link'} to={'/about'}>
              About
            </NavLink>
          </>
        ) : (
          <NavLink className={'link'} to={'/'}>
            Main page
          </NavLink>
        )}
      </header>
    </>
  );
};
