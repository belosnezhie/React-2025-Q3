import Link from 'next/link';

import { PeopleSearchResp } from '../../model/TypesStarWars';

import { FavoritesButton } from './FavoritesButton';
import styles from './Main.module.css';

interface CardProps {
  cardData: PeopleSearchResp;
  pageData: number;
  searchData: string;
}

const Card = (props: CardProps) => {
  return (
    <>
      <div className={styles.cardWrapper}>
        <Link
          // href={`/detailed?page=${props.pageData}&search=${props.searchData}`}
          href={'/detailed'}
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
