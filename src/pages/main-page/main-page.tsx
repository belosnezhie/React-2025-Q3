import { JSX, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Header } from '@/components';
import { CardsWrapper } from '@/components';
import { Pagination } from '@/components';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { SearchResponse } from '@/model/types-star-wars';
import { ApiService } from '@/services/api-service';

import './main-page.css';

const MAX_PER_PAGE = 10;

const fetchDefaultData = async (
  service: ApiService,
  page: null | string,
  query?: null | string,
): Promise<SearchResponse> => {
  const currentPage = page ? Number(page) : 1;

  return await service.getDefaultData(currentPage, query);
};

const fetchSearchedData = async (
  searchQuery: string,
  service: ApiService,
  // page: null | string,
): Promise<SearchResponse> => {
  // const currentPage = page ? Number(page) : 1;

  return await service.getSeachedData(searchQuery);
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
  const [searchParameters] = useSearchParams();

  const fetchCharacters = useCallback(async (): Promise<void> => {
    setLoading(true);

    try {
      const page = searchParameters.get('page');
      setCharactersData(await fetchDefaultData(service, page));
    } catch (error_) {
      setErrorMessage(validateError(error_));
    }

    setLoading(false);
  }, [service, searchParameters]);

  const searchCharacters = useCallback(
    async (newSearchQuery: string): Promise<void> => {
      setLoading(true);
      // const page = searchParameters.get('page');

      try {
        setCharactersData(await fetchSearchedData(newSearchQuery, service));
      } catch (error_) {
        setErrorMessage(validateError(error_));
      }

      setLoading(false);
    },
    [searchParameters, service],
  );

  useEffect(() => {
    if (query) {
      searchCharacters(query);
    } else {
      fetchCharacters();
    }
  }, [query, searchCharacters, fetchCharacters]);

  return (
    <>
      <Header
        updateCartsCallback={async (newSearchQuery: string) => {
          await searchCharacters(newSearchQuery);
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
