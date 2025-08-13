import React, { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

import { Spinner } from '@/components';
import { useAppDispatch } from '@/hooks';
import {
  starWarsApi,
  useFetchSearchedCharactersQuery,
} from '@/services/api-service';

export const DetailedSection = (): null | React.ReactElement => {
  const { characterID } = useParams();
  const [searchParameters] = useSearchParams();
  const [isDestroyed, setDestroyed] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data, error, isError, isFetching } = useFetchSearchedCharactersQuery(
    characterID ?? '',
  );

  const handleClick = (): void => {
    const page = searchParameters.get('page') ?? 1;
    navigate(`/?page=${page}`);
    setDestroyed(true);
  };

  if (isError) {
    return <p>{`Something went wrong: ${JSON.stringify(error)}.`}</p>;
  }

  const handleRefetch = (): void => {
    dispatch(starWarsApi.util.invalidateTags(['Details']));
  };

  return isDestroyed ? null : (
    <aside
      className={twMerge(
        'w-[50%] p-[2%] flex flex-col',
        'items-center justify-center',
        'border-2 border-t-0 border-border',
        'bg-card-background z-1000 relative',
      )}
    >
      {isFetching ? (
        <Spinner />
      ) : (
        <>
          {data ? (
            <div data-testid="character_data">
              <p>Name: {data.name}</p>
              <p>Birth year: {data.birth_year}</p>
              <p>Hair color: {data.hair_color}</p>
              <p>Skin color: {data.skin_color}</p>
              <p>Eye color: {data.eye_color}</p>
              <p>Gender: {data.gender}</p>
              <button
                className={twMerge(
                  'group text-border cursor-pointer',
                  'transition-transform duration-300',
                  'hover:scale-[0.90]',
                )}
                onClick={handleRefetch}
              >
                Refetch{' '}
                <span
                  className={twMerge(
                    'inline-block text-2xl',
                    'transition-transform duration-500',
                    'delay-150 group-hover:rotate-360',
                  )}
                >
                  &#10226;
                </span>
              </button>
            </div>
          ) : (
            <p>There is no such character</p>
          )}
          <button
            className={twMerge(
              'absolute top-[10px] right-[10px]',
              'w-[40px] h-[40px] text-center',
              'rounded-full border-0 bg-background',
              'cursor-pointer',
            )}
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
