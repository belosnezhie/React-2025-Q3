// import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useRouter } from 'next/router';
import { useState } from 'react';

import appStyles from '../App.module.css';
import DetailedSection from '../components/detailesSection/DetailedSection';
import { Flyout } from '../components/flyout/Flyout';
import Header from '../components/header/Header';
import pageStyles from '../components/main/Main.module.css';
import ResultsList from '../components/main/ResultsList';
import Pagination from '../components/pagination/Pagination';
import { useTheme } from '../hooks/ContextHooks';
import { useAppSelector } from '../hooks/StateHooks';
import useLocalStorage from '../hooks/UseLocalStorage';
import { useFetchCharactersQuery } from '../services/StarWarsApi';
import { selectPage } from '../store/pageSlice/PageSlice';
import { type RootState } from '../store/Store';

const MainPage = () => {
  const { query } = useLocalStorage();
  const theme = useTheme();
  const MAX_PER_PAGE: number = 10;
  const currentPage = useAppSelector(selectPage);
  const location = useRouter();
  // const navigate = useNavigate();
  const [isDetailedShown, setDetailed] = useState<boolean>(false);

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
      setDetailed(false);
    }
  };

  return (
    <>
      <div className={appStyles.pageWrapper}>
        <div
          className={theme + ' ' + appStyles.wrapper}
          onClick={(event: React.MouseEvent<HTMLDivElement>) => {
            handleMainClick(event);
          }}
          data-testid="wrapper"
        >
          <Header />
          <main className={pageStyles.page}>
            {isFetching ? (
              <div className={pageStyles.spinner} data-testid="spinner_test" />
            ) : data?.results ? (
              <>
                <section className={pageStyles.resultsSection}>
                  <ResultsList />
                </section>
                <Pagination pagesCount={Math.ceil(data.count / MAX_PER_PAGE)} />
              </>
            ) : null}
            <div className={pageStyles.yoda} />
          </main>
        </div>
        {isDetailedShown ? <DetailedSection /> : null}
      </div>
      {favCharactersCount ? <Flyout /> : null}
    </>
  );
};

export default MainPage;
