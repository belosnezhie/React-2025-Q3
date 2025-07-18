import React, { ReactNode } from 'react';

import { CharacterSearchResp } from '../../model/types-star-wars';

import Card from './card.tsx';

import './main.css';

interface CardsWrapperProps {
  cardCharacterData: CharacterSearchResp[];
}

class CardsWrapper extends React.Component<CardsWrapperProps> {
  render(): ReactNode {
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
