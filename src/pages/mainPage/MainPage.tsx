import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Flyout } from '../../components/flyout/Flyout.tsx';
import Header from '../../components/header/Header.tsx';
import ResultsList from '../../components/main/ResultsList.tsx';
import Pagination from '../../components/pagination/Pagination.tsx';
import { useTheme } from '../../hooks/ContextHooks';
import { useAppSelector } from '../../hooks/StateHooks';
import useLocalStorage from '../../hooks/UseLocalStorage';
import { selectPage } from '../../store/pageSlice/PageSlice';
import { useFetchCharactersQuery } from '../../store/StarWarsApi.ts';
import type { RootState } from '../../store/Store';

const MainPage = () => {
  const { query } = useLocalStorage();
  const theme = useTheme();
  const MAX_PER_PAGE: number = 10;
  const currentPage = useAppSelector(selectPage);
  const location = useLocation();
  const navigate = useNavigate();

  const { data, isFetching } = useFetchCharactersQuery({
    searchQuery: query,
    pageNumber: currentPage,
  });

  const favCharactersCount = useAppSelector(
    (state: RootState) => state.favoriteCharacters.favCharacters.length,
  );

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
      navigate(`/?search=${query}&page=${currentPage}`);
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
          data-testid="wrapper"
        >
          <Header />
          <main className="page">
            {isFetching ? (
              <div className="spinner" data-testid="spinner_test" />
            ) : data?.results ? (
              <>
                <section className="results_section">
                  <ResultsList />
                </section>
                <Pagination pagesCount={Math.ceil(data.count / MAX_PER_PAGE)} />
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
