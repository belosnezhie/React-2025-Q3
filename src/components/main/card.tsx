import React, { JSX } from 'react';

import { CharacterSearchResponse } from '../../model/types-star-wars';

interface CardProps {
  cardData: CharacterSearchResponse;
}

class Card extends React.Component<CardProps> {
  render(): JSX.Element {
    const {
      birth_year: birthYear,
      eye_color: eyeColor,
      gender,
      hair_color: hairColor,
      name,
      skin_color: skinColor,
    } = this.props.cardData;

    const placeholder = 'N/A';

    return (
      <>
        <div className="card" data-testid="results_card">
          <p>Name: {name}</p>
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
