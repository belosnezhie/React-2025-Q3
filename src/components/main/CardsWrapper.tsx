import React, { ReactNode } from 'react';

import { CharacterSearchResp } from '../../model/TypesStarWars';

import Card from './Card.tsx';

import './Main.css';

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
