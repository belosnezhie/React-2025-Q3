import { useLocation } from 'react-router-dom';

import { useAppSelector } from '../../hooks/StateHooks';
import { SearchResp } from '../../model/TypesStarWars.ts';
import { selectPage } from '../../store/pageSlice/PageSlice';

import './Main.css';
import Card from './Card.tsx';

interface ResultsListProps {
  listData: SearchResp;
}

const ResultsList = ({ listData }: ResultsListProps) => {
  const location = useLocation();
  const currentPage = useAppSelector(selectPage);

  if (listData.results.length === 0) {
    return <p className="placeholder">Oops! there is no such character.</p>;
  }

  return (
    <>
      <section
        className={`results_list ${location.pathname.includes('detailed') ? 'list' : 'table'}`}
      >
        {listData.results.map((obj, index) => {
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
