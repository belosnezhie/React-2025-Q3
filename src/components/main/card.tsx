import React from 'react';

import { CharacterSearchResp } from '../../model/types-star-wars';

interface CardProps {
  cardData: CharacterSearchResp;
}

class Card extends React.Component<CardProps> {
  render() {
    const {
      name,
      birth_year: birthYear,
      hair_color: hairColor,
      skin_color: skinColor,
      eye_color: eyeColor,
      gender,
    } = this.props.cardData;

    const placeholder = 'N/A';

    return (
      <>
        <div className="card" data-testid="results_card">
          <p>Name: {name ?? placeholder}</p>
          <p>Birth year: {birthYear ?? placeholder}</p>
          <p>Hair color: {hairColor ?? placeholder}</p>
          <p>Skin color: {skinColor ?? placeholder}</p>
          <p>Eye color: {eyeColor ?? placeholder}</p>
          <p>Gender: {gender ?? placeholder}</p>
        </div>
      </>
    );
  }
}

export default Card;
