import Link from 'next/link';
import { useRouter } from 'next/router';

import { PeopleSearchResp } from '../../model/TypesStarWars';

import { FavoritesButton } from './FavoritesButton';
import styles from './Main.module.css';

interface CardProps {
  cardData: PeopleSearchResp;
  pageData: number;
  searchData: string;
}

const Card = (props: CardProps) => {
  const queryParams = useRouter().query;
  const query = queryParams.search ? String(queryParams.search) : '';

  return (
    <>
      <div className={styles.cardWrapper}>
        <Link
          href={`/?detailed=${props.cardData.name}&page=${props.pageData}&search=${query}`}
          // href={`/?detailed=${props.cardData.name}&page=${props.pageData}`}
          // href={'/?detailes'}
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
