import { SearchResp } from '../../model/TypesStarWars';

import Card from './Card';
import styles from './Main.module.css';

interface ResultsListProps {
  listData: SearchResp;
  isDetailed: string | false | string[];
}

const ResultsList = ({ listData, isDetailed }: ResultsListProps) => {
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
