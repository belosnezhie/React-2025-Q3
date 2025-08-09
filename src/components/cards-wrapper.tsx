import React from 'react';

import { Card } from '@/components';
import { CharacterSearchResponse } from '@/model/types-star-wars';

interface CardsWrapperProps {
  cardCharacterData: CharacterSearchResponse[];
}

export const CardsWrapper = ({
  cardCharacterData,
}: CardsWrapperProps): React.ReactElement => {
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
