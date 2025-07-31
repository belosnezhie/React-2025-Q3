import { JSX } from 'react';
import {
  NavLink,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';

import { SearchForm } from '@/components';

export const Header = ({
  pageType,
}: {
  pageType: 'about' | 'main';
}): JSX.Element => {
  const [searchParameters] = useSearchParams();
  const { characterID } = useParams();
  const navigate = useNavigate();

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
            Main page
          </NavLink>
        )}
      </header>
    </>
  );
};
