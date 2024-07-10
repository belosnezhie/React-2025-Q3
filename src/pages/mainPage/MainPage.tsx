import { useCallback, useEffect, useState } from 'react';

import Header from '../../components/header/Header.tsx';
import CardsWrapper from '../../components/main/CardsWrapper.tsx';
import { PeopleSearchResp, SearchResp } from '../../model/TypesStarWars';
import { ApiService, apiService } from '../../services/ApiService';
import { searchQueryStorage } from '../../services/LocalStorage';

const MainPage = () => {
  const service: ApiService = apiService;
  const storage = searchQueryStorage;

  const [charactersData, setCharactersData] = useState<PeopleSearchResp[] | []>(
    [],
  );
  const [isLoading, setLoading] = useState<boolean>(false);

  const searchData = useCallback(
    async (searchQuery: string): Promise<SearchResp> => {
      setLoading(true);

      storage.setSearchQuery(searchQuery);

      const res: SearchResp = await service.getSeachedData(searchQuery);

      setCharactersData(res.results);

      setLoading(false);

      return res;
    },
    [service, storage],
  );

  const getDefaultData = useCallback(async () => {
    const searchQuery = storage.getSearchQuery();

    setLoading(true);

    if (searchQuery) {
      await searchData(searchQuery);

      setLoading(false);
    } else {
      const res: SearchResp = await service.getDefaultData(1);

      setCharactersData(res.results);

      setLoading(false);
    }
  }, [searchData, service, storage]);

  useEffect(() => {
    void getDefaultData();
  }, [getDefaultData]);

  return (
    <>
      <Header
        updateCartsCallback={async (searchQuery: string): Promise<void> => {
          await searchData(searchQuery);
        }}
      />
      <main className="cards_wrapper">
        {isLoading ? (
          <div className="spinner" />
        ) : (
          <CardsWrapper cardCharactersData={charactersData} />
        )}
        <div className="yoda" />
      </main>
    </>
  );
};

export default MainPage;
