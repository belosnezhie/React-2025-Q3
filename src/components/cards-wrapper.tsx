import { JSX } from 'react';

import { Card } from '@/components';
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
    <div className="flex justify-center gap-[1em] flex-wrap">
      {cardCharacterData.map((object, index) => {
        return <Card characterData={object} key={index} />;
      })}
    </div>
  );
};
