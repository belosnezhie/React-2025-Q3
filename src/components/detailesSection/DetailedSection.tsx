import { headers } from 'next/headers';
import Link from 'next/link';

import { getSearchedData } from '../../app/api/api';
import { getSearchParams } from '../../app/searchParams';

import styles from './DetailedSection.module.css';

const DetailedSection = async () => {
  const query = getSearchParams(headers()).query;
  const currentPage = getSearchParams(headers()).page;
  const name = getSearchParams(headers()).name;

  const data = await getSearchedData(name);

  return (
    <main
      className={styles.detailedResults}
      id="detailedResults"
      data-testid="detailed_page"
    >
      <>
        <p>Name: {data.results[0].name}</p>
        <p>Birth year: {data.results[0].birth_year}</p>
        <p>Hair color: {data.results[0].hair_color}</p>
        <p>Skin color: {data.results[0].skin_color}</p>
        <p>Eye color: {data.results[0].eye_color}</p>
        <p>Gender: {data.results[0].gender}</p>
      </>
      <Link
        href={`/?page=${currentPage}&search=${query}`}
        className={styles.closeDetailed}
      >
        X
      </Link>
    </main>
  );
};

export default DetailedSection;
