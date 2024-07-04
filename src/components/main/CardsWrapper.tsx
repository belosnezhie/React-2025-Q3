import { Component, ReactNode } from 'react';

import { SingleAstroObjectResp } from '../../model/Types.tsx';

import Card from './Card.tsx';

import './Main.css';

interface CardsWrapperProps {
  data: SingleAstroObjectResp[];
}

class CardsWrapper extends Component<CardsWrapperProps> {
  render(): ReactNode {
    return (
      <>
        <main className="cards_wrapper">
          {this.props.data.map((obj, index) => {
            return <Card cardData={obj} key={index} />;
          })}
        </main>
      </>
    );
  }
}

export default CardsWrapper;
