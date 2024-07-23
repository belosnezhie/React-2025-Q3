import { NavLink } from 'react-router-dom';

import { PeopleSearchResp } from '../../model/TypesStarWars';

import { FavoritesButton } from './FavoritesButton.tsx';

interface CardProps {
  cardData: PeopleSearchResp;
  pageData: number;
  searchData: string;
}

const Card = (props: CardProps) => {
  return (
    <>
      <div className="card_wrapper">
        <NavLink
          to={`/detailed?page=${props.pageData}&search=${props.searchData}`}
          className={({ isActive, isPending }) =>
            isActive ? 'card active' : isPending ? 'card pending' : 'card'
          }
          data-testid="results_card"
        >
          <p>Name: {props.cardData.name}</p>
        </NavLink>
        <FavoritesButton characterData={props.cardData} />
      </div>
    </>
  );
};

export default Card;
