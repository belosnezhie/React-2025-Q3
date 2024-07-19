import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useTheme } from '../../context/ThemeContext.tsx';
import { PeopleSearchResp, SearchResp } from '../../model/TypesStarWars';
import { ApiService } from '../../services/ApiService';

import './DetailedSection.css';

interface DetailedSectionProps {
  service: ApiService;
}

const DetailedSection = ({ service }: DetailedSectionProps) => {
  const [characterData, setCharacterData] = useState<PeopleSearchResp>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageParams] = useState(Number(searchParams.get('page')));
  const [isDestroyed, setDestroyed] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const theme = useTheme();

  const getCharacterData = useCallback(async (): Promise<SearchResp> => {
    setLoading(true);
    const searchQuery: string = String(searchParams.get('search'));

    const resp: SearchResp = await service.getSeachedData(searchQuery);

    setCharacterData(resp.results[0]);
    setLoading(false);

    return resp;
  }, [searchParams, service]);

  useEffect(() => {
    void getCharacterData();
  }, [getCharacterData, searchParams]);

  const handleClick = () => {
    setSearchParams({ page: String(pageParams) });
    navigate('/');
    setDestroyed(true);
  };

  return isDestroyed ? null : (
    <main className={theme + ' detailed_results'} data-testid="detailed_page">
      {isLoading ? (
        <div className="spinner detailed" data-testid="spinner_test" />
      ) : (
        <>
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
          <button className="close_detailed" onClick={handleClick}>
            X
          </button>
        </>
      )}
    </main>
  );
};

export default DetailedSection;
