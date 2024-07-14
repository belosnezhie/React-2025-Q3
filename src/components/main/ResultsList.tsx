import { useLocation } from 'react-router-dom';

import { PeopleSearchResp } from '../../model/TypesStarWars';

import './Main.css';
import Card from './Card.tsx';

interface CardsWrapperProps {
  cardCharactersData: PeopleSearchResp[] | [];
  pageSearchParam: number;
}

const ResultsList = (props: CardsWrapperProps) => {
  const location = useLocation();

  return (
    <>
      <section
        className={`results_list ${location.pathname.includes('detailed') ? 'list' : 'table'}`}
      >
        {props.cardCharactersData.length === 0 ? (
          <p className="placeholder">Oops! there is no such character.</p>
        ) : (
          props.cardCharactersData.map((obj, index) => {
            return (
              <Card
                cardData={obj}
                key={index}
                pageData={props.pageSearchParam}
                searchData={obj.name}
              />
            );
          })
        )}
      </section>
    </>
  );
};

export default ResultsList;
