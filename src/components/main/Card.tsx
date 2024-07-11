import { NavLink } from 'react-router-dom';

import { PeopleSearchResp } from '../../model/TypesStarWars';

interface CardProps {
  cardData: PeopleSearchResp;
  pageData: number;
  searchData: string;
}

const Card = (props: CardProps) => {
  return (
    <>
      <NavLink
        className="card"
        to={`/detailed?page=${props.pageData}&search=${props.searchData}`}
      >
        <p>Name: {props.cardData.name}</p>
      </NavLink>
    </>
  );
};

export default Card;
