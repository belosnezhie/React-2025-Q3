import { PeopleSearchResp } from '../../model/TypesStarWars';

interface CardProps {
  cardData: PeopleSearchResp;
}

const Card = (props: CardProps) => {
  return (
    <>
      <div className="card">
        <p>Name: {props.cardData.name}</p>
        <p>Birth year: {props.cardData.birth_year}</p>
        <p>Hair color: {props.cardData.hair_color}</p>
        <p>Skin color: {props.cardData.skin_color}</p>
        <p>Eye color: {props.cardData.eye_color}</p>
        <p>Gender: {props.cardData.gender}</p>
      </div>
    </>
  );
};

export default Card;
