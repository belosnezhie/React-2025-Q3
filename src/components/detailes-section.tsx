import { JSX, useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { Spinner } from '@/components';
import { CharacterSearchResponse } from '@/model/types-star-wars';
import { ApiService } from '@/services/api-service';

interface DetailedSectionProps {
  service: ApiService;
}

export const DetailedSection = ({
  service,
}: DetailedSectionProps): JSX.Element | null => {
  const [characterData, setCharacterData] = useState<CharacterSearchResponse>();
  const { characterID } = useParams();
  const [searchParameters] = useSearchParams();
  const [isDestroyed, setDestroyed] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const getCharacterData = useCallback(async (): Promise<void> => {
    setLoading(true);
    const resp: CharacterSearchResponse = await service.getSeachedData(
      String(characterID),
    );
    setCharacterData(resp);

    setLoading(false);
  }, [service, characterID]);

  useEffect(() => {
    getCharacterData();
  }, [getCharacterData, searchParameters]);

  const handleClick = (): void => {
    const page = searchParameters.get('page') ?? 1;
    navigate(`/?page=${page}`);
    setDestroyed(true);
  };

  return isDestroyed ? null : (
    <aside
      className="
    p-[2%]
    flex
    flex-col
    items-center
    justify-center
    border-2
    border-border
    bg-card-background
    z-1000
    relative"
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {characterData ? (
            <div data-testid="character_data">
              <p>Name: {characterData.name}</p>
              <p>Birth year: {characterData.birth_year}</p>
              <p>Hair color: {characterData.hair_color}</p>
              <p>Skin color: {characterData.skin_color}</p>
              <p>Eye color: {characterData.eye_color}</p>
              <p>Gender: {characterData.gender}</p>
            </div>
          ) : (
            <p>Something went wrong</p>
          )}
          <button
            className="
            absolute
            top-[10px] right-[10px]
            w-[40px] h-[40px]
            text-center
            rounded-full
            border-0
            bg-background
            cursor-pointer"
            data-testid="close"
            onClick={handleClick}
          >
            X
          </button>
        </>
      )}
    </aside>
  );
};
