import React, { ReactNode } from 'react';

import { Card } from '@/components';
import { CharacterSearchResponse } from '@/model/types-star-wars';

import './main.css';

interface CardsWrapperProps {
  cardCharacterData: CharacterSearchResponse[];
  error: Error | null;
}

export class CardsWrapper extends React.Component<CardsWrapperProps> {
  render(): ReactNode {
    const { cardCharacterData, error } = this.props;

    if (error) {
      return <p>Something went wrong: {error.message}</p>;
    }

    if (!cardCharacterData.length) {
      return <p>Oops! there is no such character.</p>;
    }

    return (
      <>
        {this.props.cardCharacterData.map((object, index) => {
          return <Card cardData={object} key={index} />;
        })}
      </>
    );
  }
}
