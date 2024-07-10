import { PeopleSearchResp } from '../../model/TypesStarWars';

import Card from './Card.tsx';

import './Main.css';

interface CardsWrapperProps {
  cardCharactersData: PeopleSearchResp[] | [];
}

const CardsWrapper = (props: CardsWrapperProps) => {
  return (
    <>
      <div className="cards_wrapper">
        {props.cardCharactersData.map((obj, index) => {
          return <Card cardData={obj} key={index} />;
        })}
      </div>
    </>
  );
};

export default CardsWrapper;
