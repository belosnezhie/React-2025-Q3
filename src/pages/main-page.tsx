import React from 'react';
import {
  Outlet,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';

import {
  CardsWrapper,
  Flyout,
  Header,
  Pagination,
  Spinner,
} from '@/components';
import { useAppDispatch, useLocalStorage } from '@/hooks';
import { starWarsApi, useFetchCharactersQuery } from '@/services/api-service';

const MAX_PER_PAGE = 10;

const countPages = (resultsLength: number): number => {
  return Math.ceil(resultsLength / MAX_PER_PAGE);
};

export const MainPage = (): React.ReactElement => {
  const [query] = useLocalStorage('');
  const [searchParameters] = useSearchParams();
  const navigate = useNavigate();
  const { characterID } = useParams();
  const dispatch = useAppDispatch();
  const { data, error, isError, isFetching } = useFetchCharactersQuery({
    pageNumber:
      searchParameters.get('page') === null
        ? 1
        : Number(searchParameters.get('page')),
    searchQuery: query,
  });

  const handleMainClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    const target = event.target instanceof HTMLElement ? event.target : null;
    const isCard = target?.closest('.card') !== null;

    const page =
      searchParameters.get('page') === null
        ? '1'
        : searchParameters.get('page');

    if (characterID && !isCard) {
      navigate(`/?page=${page}`);
    }
  };

  const handleRefetch = (): void => {
    dispatch(starWarsApi.util.invalidateTags(['Characters']));
  };

  if (isError) {
    return (
      <p data-testid="error-main-page">{`Something went wrong: ${JSON.stringify(error)}.`}</p>
    );
  }

  return (
    <>
      <Header pageType="main" />
      <div className="flex">
        <main
          className="min-h-[85vh] w-full p-[2%] flex justify-center gap-[1em] flex-wrap bg-main-background"
          onClick={handleMainClick}
        >
          <section className="flex flex-col justify-evenly items-center">
            {isFetching ? (
              <Spinner />
            ) : (
              <>
                <CardsWrapper cardCharacterData={data?.results ?? []} />
                <button
                  className="group text-border cursor-pointer transition-transform duration-300 hover:scale-[0.90]"
                  onClick={handleRefetch}
                >
                  Refetch{' '}
                  <span className="inline-block text-2xl transition-transform duration-500 delay-150 group-hover:rotate-360">
                    &#10226;
                  </span>
                </button>
                <Pagination pagesCount={countPages(data?.count ?? 0)} />
              </>
            )}
            <div className="w-[300px] h-[300px] fixed bottom-0 right-0 bg-[url('/src/assets/yoda.png')] bg-contain bg-no-repeat" />
          </section>
        </main>
        <Outlet />
      </div>
      <Flyout />
    </>
  );
};
