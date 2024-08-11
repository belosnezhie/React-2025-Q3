import { NavLink, useSearchParams } from '@remix-run/react';

import { PeopleSearchResp } from '../../model/TypesStarWars';

import { FavoritesButton } from './FavoritesButton.tsx';

interface CardProps {
  cardData: PeopleSearchResp;
  searchData: string;
}

const Card = (props: CardProps) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('search') || '';
  const page = searchParams.get('page') || 1;

  return (
    <>
      <div className="card_wrapper">
        <NavLink
          to={`/detailes/${props.searchData}?page=${page}&search=${query}`}
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
