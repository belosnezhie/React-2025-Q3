import { Component } from 'react';

import { SingleAstroObjectResp } from '../../model/Types.tsx';

interface CardProps {
  cardData: SingleAstroObjectResp;
}

class Card extends Component<CardProps> {
  render() {
    return (
      <>
        <div className="card">
          <p>Name: {this.props.cardData.name}</p>
          <p>
            Astronomical object type:{' '}
            {this.props.cardData.astronomicalObjectType}
          </p>
          <p>
            Location:{' '}
            {this.props.cardData.location
              ? this.props.cardData.location.name
              : 'Unknown'}
          </p>
        </div>
      </>
    );
  }
}

export default Card;
