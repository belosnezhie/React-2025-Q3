import { headers } from 'next/headers';
import Link from 'next/link';

import { PageProps } from '../../app/page';
import { getSearchParams } from '../../app/searchParams';
import { PeopleSearchResp } from '../../model/TypesStarWars';

import { FavoritesButton } from './FavoritesButton';
import styles from './Main.module.css';

interface CardProps {
  cardData: PeopleSearchResp;
  pageData: number;
  searchData: string;
  pageProps?: PageProps;
}

const Card = (props: CardProps) => {
  // const query = props.pageProps.searchParams.search
  //   ? String(props.pageProps.searchParams.search)
  //   : '';

  // const headersList = headers();
  // const fullUrl = headersList.get('referer') || '';
  // const searchParams = new URL(fullUrl).searchParams;
  // const query = searchParams.get('search') ? searchParams.get('search') : '';
  // const page = searchParams.get('page') ? searchParams.get('page') : '';

  const query = getSearchParams(headers()).query;

  return (
    <>
      <div className={styles.cardWrapper}>
        <Link
          href={`/?detailed=${props.cardData.name}&page=${props.pageData}&search=${query}`}
          // href={`/detailed/?page=${props.pageData}&search=${query}`}
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
