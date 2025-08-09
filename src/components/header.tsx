import React from 'react';
import {
  NavLink,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';

import { SearchForm } from '@/components';
import { useTheme } from '@/hooks';

export const Header = ({
  pageType,
}: {
  pageType: 'about' | 'main';
}): React.ReactElement => {
  const [searchParameters] = useSearchParams();
  const { characterID } = useParams();
  const navigate = useNavigate();
  const { theme, updateTheme } = useTheme();

  const handleMainClick = (): void => {
    const page =
      searchParameters.get('page') === null
        ? '1'
        : searchParameters.get('page');

    if (characterID) {
      navigate(`/?page=${page}`);
    }
  };

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
        onClick={handleMainClick}
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
            Main
          </NavLink>
        )}
        <button
          className={`
            w-[40px] h-[40px]
            rounded-full
            border-2 border-background
            bg-no-repeat bg-center
            bg-contain
            cursor-pointer
            transition-transform duration-300
            hover:scale-[0.95]
            ${
              theme === 'dark'
                ? "bg-[url('/src/assets/sun.png')]"
                : "bg-[url('/src/assets/moon.png')]"
            }`}
          onClick={updateTheme}
        />
      </header>
    </>
  );
};
