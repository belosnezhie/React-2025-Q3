import { JSX, useCallback, useEffect, useState } from 'react';

import { Header } from '@/components';
import { CardsWrapper } from '@/components';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { CharacterSearchResponse } from '@/model/types-star-wars';
import { ApiService } from '@/services/api-service';

const PAGE = 1;

const fetchData = async (
  searchQuery: null | string,
  service: ApiService,
): Promise<CharacterSearchResponse[]> => {
  const responce = searchQuery
    ? await service.getSeachedData(searchQuery)
    : await service.getDefaultData(PAGE);
  return responce.results;
};

const validateError = (error: unknown): Error => {
  return error instanceof Error ? error : new Error('Unknown error');
};

export const MainPage = ({ service }: { service: ApiService }): JSX.Element => {
  const [query] = useLocalStorage('');
  const [searchQuery, setSearchQuery] = useState<string>(query);
  const [characters, setCharacters] = useState<CharacterSearchResponse[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<Error | null>(null);

  const fetchCharacters = useCallback(async (): Promise<void> => {
    setLoading(true);

    try {
      setCharacters(await fetchData(searchQuery, service));
    } catch (error_) {
      setErrorMessage(validateError(error_));
    }

    setLoading(false);
  }, [searchQuery, service]);

  useEffect(() => {
    fetchCharacters();
  }, [fetchCharacters]);

  return (
    <>
      <Header
        updateCartsCallback={(newSearchQuery: string) => {
          setSearchQuery(newSearchQuery);
        }}
      />
      <main className="cards_wrapper">
        {isLoading ? (
          <div aria-label="spinner" className="spinner" data-testid="spinner" />
        ) : (
          <CardsWrapper cardCharacterData={characters} error={errorMessage} />
        )}
        <div className="yoda" />
      </main>
    </>
  );
};
