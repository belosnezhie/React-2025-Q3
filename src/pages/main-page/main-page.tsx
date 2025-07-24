import { JSX, Suspense, useCallback, useEffect, useState } from 'react';

import { Header } from '@/components';
import { CardsWrapper } from '@/components';
import { CharacterSearchResponse } from '@/model/types-star-wars';
import { ApiService } from '@/services/api-service';
import { searchQueryStorage } from '@/services/local-storage';

const PAGE = 1;

export const MainPage = ({ service }: { service: ApiService }): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState<string>(
    searchQueryStorage.getSearchQuery(),
  );
  const [characters, setCharacters] = useState<CharacterSearchResponse[]>([]);

  const fetchCharacters = useCallback(async (): Promise<void> => {
    const respornce = searchQuery
      ? await service.getSeachedData(searchQuery)
      : await service.getDefaultData(PAGE);
    setCharacters(respornce.results);
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
        <Suspense
          fallback={
            <div
              aria-label="spinner"
              className="spinner"
              data-testid="spinner"
            />
          }
        >
          <CardsWrapper cardCharacterData={characters} error={null} />
        </Suspense>
        <div className="yoda" />
      </main>
    </>
  );
};
