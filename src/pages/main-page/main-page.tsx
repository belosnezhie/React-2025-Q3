import { JSX, useCallback, useEffect, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';

import { Header } from '@/components';
import { CardsWrapper } from '@/components';
import { Pagination } from '@/components';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { SearchResponse } from '@/model/types-star-wars';
import { ApiService } from '@/services/api-service';

import './main-page.css';

const MAX_PER_PAGE = 10;

const validateError = (error: unknown): Error => {
  return error instanceof Error ? error : new Error('Unknown error');
};

const countPages = (resultsLength: number): number => {
  return Math.ceil(resultsLength / MAX_PER_PAGE);
};

export const MainPage = ({ service }: { service: ApiService }): JSX.Element => {
  const [query] = useLocalStorage('');
  const [charactersData, setCharactersData] = useState<SearchResponse>({
    count: 0,
    results: [],
  });
  const [isLoading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<Error | null>(null);
  const [searchParameters] = useSearchParams();

  const fetchCharacters = useCallback(
    async (
      currentQuery: string,
      searchParameters: URLSearchParams,
    ): Promise<void> => {
      setLoading(true);

      const page =
        searchParameters.get('page') === null
          ? '1'
          : searchParameters.get('page');

      try {
        const resp = await service.getDefaultData(Number(page), currentQuery);
        setCharactersData(resp);
      } catch (error_) {
        setErrorMessage(validateError(error_));
      }

      setLoading(false);
    },
    [query, searchParameters],
  );

  useEffect(() => {
    fetchCharacters(query, searchParameters);
  }, [fetchCharacters, query, searchParameters]);

  return (
    <>
      <Header />
      <main className="wrapper">
        <section>
          {isLoading ? (
            <div
              aria-label="spinner"
              className="spinner"
              data-testid="spinner"
            />
          ) : (
            <>
              <CardsWrapper
                cardCharacterData={charactersData.results}
                error={errorMessage}
              />
              <Pagination pagesCount={countPages(charactersData.count)} />
            </>
          )}
          <div className="yoda" />
        </section>
      </main>
      <Outlet />
    </>
  );
};
