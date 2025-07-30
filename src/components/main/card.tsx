import { JSX } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';

import { FavButton } from '@/components';
import { CharacterSearchResponse } from '@/model/types-star-wars';

interface CardProps {
  characterData: CharacterSearchResponse;
}

export const Card = ({ characterData }: CardProps): JSX.Element => {
  const [searchParameters] = useSearchParams();
  const currentPage = searchParameters.get('page') ?? '1';

  const { name: characterName, url: characterURL } = characterData;

  const getID = (): string => {
    const match = /\/people\/(\d+)\//.exec(characterURL);
    return match ? match[1] : '';
  };

  return (
    <>
      <NavLink
        className="w-[250px] p-[2%] border-2 border-border bg-card-background rounded-lg text-white cursor-pointer transition-all duration-300 z-1000"
        data-testid="results_card"
        to={`/${getID()}?page=${currentPage}`}
      >
        Name: {characterName}
      </NavLink>
      <FavButton characterData={characterData} />
    </>
  );
};
