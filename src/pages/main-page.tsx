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
  const { data, error, isFetching } = useFetchCharactersQuery({
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

  if (error) {
    return <p>Something went wrong.</p>;
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
                <button onClick={handleRefetch}>Refetch</button>
                <CardsWrapper cardCharacterData={data?.results ?? []} />
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
