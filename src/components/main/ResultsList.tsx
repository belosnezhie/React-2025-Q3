import { SearchResp } from '../../model/TypesStarWars';

import Card from './Card';
import styles from './Main.module.css';

interface ResultsListProps {
  listData: SearchResp;
  isDetailed: string | false | string[];
}

const ResultsList = ({ listData, isDetailed }: ResultsListProps) => {
  // const pathname = usePathname();
  // const { query } = useLocalStorage();
  // const currentPage = useAppSelector(selectPage);
  // const queryParams = useRouter().query;
  // const query = queryParams.search ? String(queryParams.search) : '';
  // const currentPage = queryParams.page ? Number(queryParams.page) : 1;

  // if (error || !data) {
  //   return (
  //     <p className={styles.placeholder}>Oops! there is no such character.</p>
  //   );
  // }
  return (
    <>
      <section
        className={`${styles.resultsList} ${isDetailed ? styles.list : styles.table}`}
      >
        {listData.results.map((obj, index) => {
          return (
            <Card
              cardData={obj}
              key={index}
              pageData={1}
              searchData={obj.name}
            />
          );
        })}
      </section>
    </>
  );
};

export default ResultsList;
