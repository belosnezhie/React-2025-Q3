import { useState } from 'react';
import {
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

import { Flyout } from '../../components/flyout/Flyout.tsx';
import Header from '../../components/header/Header.tsx';
import ResultsList from '../../components/main/ResultsList.tsx';
import Pagination from '../../components/pagination/Pagination.tsx';
import { useTheme, useThemeSwitcher } from '../../hooks/ContextHooks';
import { useAppSelector } from '../../hooks/StateHooks';
import useLocalStorage from '../../hooks/UseLocalStorage';
import { useFetchCharactersQuery } from '../../services/StarWarsApi';
import type { RootState } from '../../store/Store';

const MainPage = () => {
  const { query } = useLocalStorage();
  const theme = useTheme();
  const handleThemeChange = useThemeSwitcher();
  const MAX_PER_PAGE: number = 10;
  const [activePage, setActivePage] = useState<number>(1);
  const [, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { data, isFetching, refetch } = useFetchCharactersQuery({
    searchQuery: query,
    pageNumber: activePage,
  });

  const favCharactersCount = useAppSelector(
    (state: RootState) => state.favoriteCharacters.favCharacters.length,
  );

  const searchData = async (searchQuery: string): Promise<void> => {
    setActivePage(1);
    await refetch();
    setSearchParams({ search: searchQuery, page: String(1) });
  };

  const handlePageChange = (pageNumber: number) => {
    setActivePage(pageNumber);

    setSearchParams({ search: query, page: String(pageNumber) });
  };

  const handleMainClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;

    let isCard = false;

    if (
      (target.parentElement &&
        target.parentElement.classList.contains('card')) ||
      target.classList.contains('card')
    ) {
      isCard = true;
    }

    if (location.pathname.includes('detailed') && !isCard) {
      // возможно, здесь тоже нужно поправить на setSearchParams({ search: query, page: activePage });
      navigate(`/?page=${activePage}`);
    }
  };

  return (
    <>
      <div className="page_wrapper">
        <div
          className={theme + ' wrapper'}
          onClick={(event: React.MouseEvent<HTMLDivElement>) => {
            handleMainClick(event);
          }}
        >
          <Header
            callback={searchData}
            changeThemeCallback={handleThemeChange}
          />
          <main className="page">
            {isFetching ? (
              <div className="spinner" data-testid="spinner_test" />
            ) : data?.results ? (
              <>
                <section className="results_section">
                  <ResultsList
                    cardCharactersData={data.results}
                    pageSearchParam={activePage}
                  />
                </section>
                <Pagination
                  updatePageCallback={handlePageChange}
                  currentPage={activePage}
                  pagesCount={Math.ceil(data.count / MAX_PER_PAGE)}
                />
              </>
            ) : null}
            <div className="yoda" />
          </main>
        </div>
        <Outlet />
      </div>
      {favCharactersCount ? <Flyout /> : null}
    </>
  );
};

export default MainPage;
