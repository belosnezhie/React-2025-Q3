import { Component, ReactNode } from 'react';

import { SingleAstroObjectResp } from '../../model/Types.tsx';

import Card from './Card.tsx';

import './Main.css';

interface CardsWrapperProps {
  cardAstroData: SingleAstroObjectResp[];
}

class CardsWrapper extends Component<CardsWrapperProps> {
  render(): ReactNode {
    // if (this.props.cartSingleData instanceof SingleAstroObjectResp) {
    //   return <main className="cards_wrapper"></main>;
    // }

    if (this.props.cardAstroData.length !== 0) {
      return (
        <>
          <main className="cards_wrapper">
            {this.props.cardAstroData.map((obj, index) => {
              return <Card cardData={obj} key={index} />;
            })}
          </main>
        </>
      );
    }

    // return (
    //   <main className="cards_wrapper">
    //     <Card cardData={this.props.cartSingleData}></Card>
    //   </main>
    // );
  }
}

export default CardsWrapper;
