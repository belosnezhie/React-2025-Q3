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
    <div
      className="
    w-[250px]
    p-[2%]
    flex
    justify-between
    items-center
    gap-1
    border-2
  border-border
  bg-card-background
    rounded-lg
    card"
    >
      <NavLink
        className="transition-transform duration-300 hover:scale-[0.95]"
        data-testid="results_card"
        to={`/${getID()}?page=${currentPage}`}
      >
        {characterName}
      </NavLink>
      <FavButton characterData={characterData} />
    </div>
  );
};
