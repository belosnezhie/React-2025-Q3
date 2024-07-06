import { Component, ReactNode } from 'react';

import { PeopleSearchResp } from '../../model/TypesStarWars';

import Card from './Card.tsx';

import './Main.css';

interface CardsWrapperProps {
  cardPeopleData: PeopleSearchResp[];
}

class CardsWrapper extends Component<CardsWrapperProps> {
  render(): ReactNode {
    // if (this.props.cartSingleData instanceof SingleAstroObjectResp) {
    //   return <main className="cards_wrapper"></main>;
    // }

    return (
      <>
        <main className="cards_wrapper">
          {this.props.cardPeopleData.map((obj, index) => {
            return <Card cardData={obj} key={index} />;
          })}
        </main>
      </>
    );

    // return (
    //   <main className="cards_wrapper">
    //     <Card cardData={this.props.cartSingleData}></Card>
    //   </main>
    // );
  }
}

export default CardsWrapper;
