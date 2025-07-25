import { JSX, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Header } from '@/components';
import { CardsWrapper } from '@/components';
import { Pagination } from '@/components';
import { useLocalStorage } from '@/hooks/use-local-storage';

import './main-page.css';
import { SearchResponse } from '@/model/types-star-wars';
import { ApiService } from '@/services/api-service';

const MAX_PER_PAGE = 10;

const fetchDefaultData = async (
  service: ApiService,
  page: null | number | string,
  query?: null | string,
): Promise<SearchResponse> => {
  const currentPage = page ? Number(page) : 1;

  return await service.getDefaultData(currentPage, query);
};

const validateError = (error: unknown): Error => {
  return error instanceof Error ? error : new Error('Unknown error');
};

const countPages = (resultsLength: number): number => {
  return Math.ceil(resultsLength / MAX_PER_PAGE);
};

export const MainPage = ({ service }: { service: ApiService }): JSX.Element => {
  const [query] = useLocalStorage('');
  // const [searchQuery, setSearchQuery] = useState<string>(query);
  const [charactersData, setCharactersData] = useState<SearchResponse>({
    count: 0,
    results: [],
  });
  const [isLoading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<Error | null>(null);
  const [searchParameters, setSearchParameters] = useSearchParams();

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

      const resp = await service.getDefaultData(Number(page), currentQuery);
      setCharactersData(resp);

      setLoading(false);
    },
    [query, searchParameters],
  );

  useEffect(() => {
    // квери не работает
    console.log(query);
    fetchCharacters(query, searchParameters);
  }, [fetchCharacters, query, searchParameters]);

  return (
    <>
      <Header
        updateCartsCallback={async (newSearchQuery: string) => {
          await fetchCharacters(newSearchQuery, searchParameters);
        }}
      />
      <main className="wrapper">
        {isLoading ? (
          <div aria-label="spinner" className="spinner" data-testid="spinner" />
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
      </main>
    </>
  );
};
