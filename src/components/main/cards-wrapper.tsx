import { JSX } from 'react';

import { Card } from '@/components';
import { CharacterSearchResponse } from '@/model/types-star-wars';

import './main.css';

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
    <>
      {cardCharacterData.map((object, index) => {
        return <Card cardData={object} key={index} />;
      })}
    </>
  );
};
