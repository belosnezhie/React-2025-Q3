import { Component, ReactNode } from 'react';

import { PeopleSearchResp } from '../../model/TypesStarWars';

import Card from './Card.tsx';

import './Main.css';

interface CardsWrapperProps {
  cardPeopleData: PeopleSearchResp[];
}

class CardsWrapper extends Component<CardsWrapperProps> {
  render(): ReactNode {
    return (
      <>
        <main className="cards_wrapper">
          {this.props.cardPeopleData.map((obj, index) => {
            return <Card cardData={obj} key={index} />;
          })}
          <div className="yoda" />
        </main>
      </>
    );
  }
}

export default CardsWrapper;
