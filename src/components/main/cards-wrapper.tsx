import { JSX } from 'react';

import { Card } from '@/components';

import './main.css';
import { CharacterSearchResponse } from '@/model/types-star-wars';

interface CardsWrapperProps {
  cardCharacterData: CharacterSearchResponse[];
  error: Error | null;
}

export const CardsWrapper = ({
  cardCharacterData,
  error,
}: CardsWrapperProps): JSX.Element => {
  if (error) {
    return <p>Something went wrong: {error.message}</p>;
  }

  if (!cardCharacterData.length) {
    return <p>Oops! there is no such character.</p>;
  }

  return (
    <div className="cards_wrapper">
      {cardCharacterData.map((object, index) => {
        return (
          <Card
            characterName={object.name}
            characterURL={object.url}
            key={index}
          />
        );
      })}
    </div>
  );
};
