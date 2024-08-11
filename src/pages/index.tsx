import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import appStyles from '../App.module.css';
import DetailedSection from '../components/detailesSection/DetailedSection';
import { Flyout } from '../components/flyout/Flyout';
import Header from '../components/header/Header';
import pageStyles from '../components/main/Main.module.css';
import ResultsList from '../components/main/ResultsList';
import Pagination from '../components/pagination/Pagination';
import { useTheme } from '../hooks/ContextHooks';
import { useAppSelector } from '../hooks/StateHooks';
import { starWarsApi, useFetchCharactersQuery } from '../services/StarWarsApi';
import { type RootState, wrapper } from '../store/Store';

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    const page = context.query.page ? Number(context.query.page) : 1;
    const query = context.query.search ? String(context.query.search) : '';

    await store.dispatch(
      starWarsApi.endpoints.fetchCharacters.initiate({
        searchQuery: query,
        pageNumber: page,
      }),
    );

    if (context.query.detailed) {
      const detailed = String(context.query.detailed);

      await store.dispatch(
        starWarsApi.endpoints.fetchSearchedCharacters.initiate(detailed),
      );
    }

    return { props: {} };
  });

const MainPage = () => {
  const router = useRouter();
  const queryParams = useRouter().query;
  const query = queryParams.search ? String(queryParams.search) : '';
  const currentPage = queryParams.page ? Number(queryParams.page) : 1;
  const theme = useTheme();
  const MAX_PER_PAGE: number = 10;
  const [isDetailedShown, setDetailed] = useState<boolean>(false);

  useEffect(() => {
    if (queryParams.detailed) {
      setDetailed(true);
    }
  }, [queryParams.detailed]);

  const { data, isFetching } = useFetchCharactersQuery({
    searchQuery: query,
    pageNumber: currentPage,
  });

  const favCharactersCount = useAppSelector(
    (state: RootState) => state.favoriteCharacters.favCharacters.length,
  );

  const handleMainClick = async (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (queryParams.detailed) {
      event.nativeEvent.stopImmediatePropagation();
      await router.push(`/?page=${currentPage}&search=${query}`);
      // setDetailed(false);
    }
  };

  return (
    <>
      <div className={isDetailedShown ? appStyles.pageWrapper : ''}>
        <div
          className={`${theme} ${isDetailedShown ? appStyles.wrapper : ''}`}
          onClick={async (event: React.MouseEvent<HTMLDivElement>) => {
            await handleMainClick(event);
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
        {isDetailedShown ? (
          <DetailedSection destroyCallback={setDetailed} />
        ) : null}
      </div>
      {favCharactersCount ? <Flyout /> : null}
    </>
  );
};

export default MainPage;
