import React, { ReactNode } from 'react';

import { CharacterSearchResp } from '../../model/types-star-wars';

import Card from './card.tsx';

import './main.css';

interface CardsWrapperProps {
  cardCharacterData: CharacterSearchResp[];
  error: Error | null;
}

class CardsWrapper extends React.Component<CardsWrapperProps> {
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
        {this.props.cardCharacterData.map((obj, index) => {
          return <Card cardData={obj} key={index} />;
        })}
      </>
    );
  }
}

export default CardsWrapper;
