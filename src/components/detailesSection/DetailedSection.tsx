// import { PeopleSearchResp } from '../../model/TypesStarWars';

import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PeopleSearchResp, SearchResp } from '../../model/TypesStarWars';
import { ApiService, apiService } from '../../services/ApiService';

const DetailedSection = () => {
  const service: ApiService = apiService;
  const [characterData, setCharacterData] = useState<PeopleSearchResp>();
  const [searchParams] = useSearchParams();

  const getCharacterData = useCallback(async (): Promise<SearchResp> => {
    const searchQuery: string = String(searchParams.get('search'));

    const resp: SearchResp = await service.getSeachedData(searchQuery);

    setCharacterData(resp.results[0]);

    return resp;
  }, [searchParams, service]);

  useEffect(() => {
    void getCharacterData();
  }, [getCharacterData]);

  return (
    <>
      <section className="detailed_results">
        {characterData ? (
          <>
            <p>Name: {characterData.name}</p>
            <p>Birth year: {characterData.birth_year}</p>
            <p>Hair color: {characterData.hair_color}</p>
            <p>Skin color: {characterData.skin_color}</p>
            <p>Eye color: {characterData.eye_color}</p>
            <p>Gender: {characterData.gender}</p>
          </>
        ) : null}
      </section>
    </>
  );
};

export default DetailedSection;
