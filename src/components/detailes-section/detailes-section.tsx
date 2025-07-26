import { JSX, useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { CharacterSearchResponse } from '@/model/types-star-wars';
import { ApiService } from '@/services/api-service';

import './detailes-section.css';

interface DetailedSectionProps {
  service: ApiService;
}

const DetailedSection = ({
  service,
}: DetailedSectionProps): JSX.Element | null => {
  const [characterData, setCharacterData] = useState<CharacterSearchResponse>();
  const { characterID } = useParams();
  const [searchParameters, setSearchParameters] = useSearchParams();
  const [pageParameters] = useState(Number(searchParameters.get('page')));
  const [isDestroyed, setDestroyed] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const getCharacterData =
    useCallback(async (): Promise<CharacterSearchResponse> => {
      setLoading(true);
      const resp: CharacterSearchResponse = await service.getSeachedData(
        String(characterID),
      );
      setCharacterData(resp);
      setLoading(false);

      return resp;
    }, [service, characterID]);

  useEffect(() => {
    void getCharacterData();
  }, [getCharacterData, searchParameters]);

  const handleClick = (): void => {
    setSearchParameters({ page: String(pageParameters) });
    navigate('/');
    setDestroyed(true);
  };

  return isDestroyed ? null : (
    <main className="detailed_results">
      {isLoading ? (
        <div className="spinner detailed" />
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
