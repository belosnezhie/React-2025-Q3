import { useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { PeopleSearchResp } from '../../model/TypesStarWars';

import './Main.css';
import Card from './Card.tsx';

interface CardsWrapperProps {
  cardCharactersData: PeopleSearchResp[] | [];
}

const ResultsList = (props: CardsWrapperProps) => {
  const [searchParams] = useSearchParams();
  const [pageSearchParam] = useState<number>(Number(searchParams.get('page')));
  const location = useLocation();

  return (
    <>
      <section
        className={`results_list ${location.pathname.includes('detailed') ? 'list' : 'table'}`}
      >
        {props.cardCharactersData.map((obj, index) => {
          return (
            <Card
              cardData={obj}
              key={index}
              pageData={pageSearchParam}
              searchData={obj.name}
            />
          );
        })}
      </section>
    </>
  );
};

export default ResultsList;
