import { JSX, useCallback, useEffect, useState } from 'react';
import {
  Outlet,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';

import { Header } from '@/components';
import { CardsWrapper } from '@/components';
import { Pagination } from '@/components';
import { Spinner } from '@/components';
import { Flyout } from '@/components';
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
  const navigate = useNavigate();
  const { characterID } = useParams();

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
    [service],
  );

  useEffect(() => {
    fetchCharacters(query, searchParameters);
  }, [fetchCharacters, query, searchParameters]);

  return (
    <>
      <div onClick={handleMainClick}>
        <Header pageType="main" />
        <main className="min-h-[85vh] p-[2%] flex justify-center gap-[1em] flex-wrap bg-main-background">
          <section className="flex flex-col justify-evenly items-center">
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                <CardsWrapper
                  cardCharacterData={charactersData.results}
                  error={errorMessage}
                />
                <Pagination pagesCount={countPages(charactersData.count)} />
              </>
            )}
            <div className="w-[300px] h-[300px] fixed bottom-0 right-0 bg-[url('/src/assets/yoda.png')] bg-contain bg-no-repeat" />
          </section>
        </main>
        <Flyout />
      </div>
      <Outlet />
    </>
  );
};
