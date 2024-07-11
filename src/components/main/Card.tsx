import { Link } from 'react-router-dom';

import { PeopleSearchResp } from '../../model/TypesStarWars';

interface CardProps {
  cardData: PeopleSearchResp;
  pageData: number;
  searchData: string;
  clickCallback: () => void;
}

const Card = (props: CardProps) => {
  return (
    <>
      <Link
        className="card"
        to={`/detailed?page=${props.pageData}&search=${props.searchData}`}
        onClick={props.clickCallback}
      >
        <p>Name: {props.cardData.name}</p>
        <p>Birth year: {props.cardData.birth_year}</p>
      </Link>
    </>
  );
};

export default Card;
