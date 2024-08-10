import { useLocation } from 'react-router-dom';

import { useAppSelector } from '../../hooks/StateHooks';
// import useLocalStorage from '../../hooks/UseLocalStorage';
import { SearchResp } from '../../model/TypesStarWars.ts';
import { selectPage } from '../../store/pageSlice/PageSlice';
// import { useFetchCharactersQuery } from '../../store/StarWarsApi.ts';

import './Main.css';
import Card from './Card.tsx';

interface ResultsListProps {
  listData: SearchResp;
}

const ResultsList = ({ listData }: ResultsListProps) => {
  const location = useLocation();
  // const { query } = useLocalStorage();
  // const query = '';
  const currentPage = useAppSelector(selectPage);

  // const { data, error } = useFetchCharactersQuery({
  //   searchQuery: query,
  //   pageNumber: currentPage,
  // });

  // if (error || !data) {
  //   return <p className="placeholder">Oops! there is no such character.</p>;
  // }

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
