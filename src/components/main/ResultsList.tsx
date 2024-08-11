import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';

import { useFetchCharactersQuery } from '../../services/StarWarsApi';

import Card from './Card';
import styles from './Main.module.css';

const ResultsList = () => {
  const pathname = usePathname();
  const queryParams = useRouter().query;
  const query = queryParams.search ? String(queryParams.search) : '';
  const currentPage = queryParams.page ? Number(queryParams.page) : 1;

  const { data, error } = useFetchCharactersQuery({
    searchQuery: query,
    pageNumber: currentPage,
  });

  if (error || !data) {
    return (
      <p className={styles.placeholder}>Oops! there is no such character.</p>
    );
  }

  return (
    <>
      <section
        className={`${styles.resultsList} ${pathname.includes('detailed') ? styles.list : styles.table}`}
      >
        {data.results.map((obj, index) => {
          return (
            <Card
              cardData={obj}
              key={index}
              pageData={currentPage}
              searchData={obj.name}
            />
          );
        })}
      </section>
    </>
  );
};

export default ResultsList;
