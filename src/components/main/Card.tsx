import { headers } from 'next/headers';
import Link from 'next/link';

import { getSearchParams } from '../../app/searchParams';
import { PeopleSearchResp } from '../../model/TypesStarWars';

import { FavoritesButton } from './FavoritesButton';
import styles from './Main.module.css';

interface CardProps {
  cardData: PeopleSearchResp;
  pageData: number;
  searchData: string;
}

const Card = (props: CardProps) => {
  const query = getSearchParams(headers()).query;
  const page = getSearchParams(headers()).page;

  return (
    <>
      <div className={styles.cardWrapper}>
        <Link
          href={`/?detailed=${props.cardData.name}&page=${page}&search=${query}`}
          className={styles.card}
          data-testid="results_card"
        >
          <p>Name: {props.cardData.name}</p>
        </Link>
        <FavoritesButton characterData={props.cardData} />
      </div>
    </>
  );
};

export default Card;
