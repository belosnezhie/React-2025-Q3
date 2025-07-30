import { JSX } from 'react';
import { NavLink } from 'react-router-dom';

import { SearchForm } from '@/components';

export const Header = ({
  pageType,
}: {
  pageType: 'about' | 'main';
}): JSX.Element => {
  return (
    <>
      <header
        className="
      w-full
      h-[15vh]
      p-[1%]
      flex
      items-center
      justify-between
      border-b-4
    border-border
      bg-header-background"
      >
        <h1 className="m-0 text-title">The Star Wars Сharacters</h1>
        {pageType === 'main' ? (
          <>
            <SearchForm />
            <NavLink
              className="transition-transform duration-300 hover:scale-[0.90]"
              to={'/about'}
            >
              About
            </NavLink>
          </>
        ) : (
          <NavLink
            className="transition-transform duration-300 hover:scale-[0.90]"
            to={'/'}
          >
            Main page
          </NavLink>
        )}
      </header>
    </>
  );
};
