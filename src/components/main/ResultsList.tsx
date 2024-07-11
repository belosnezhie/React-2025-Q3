import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PeopleSearchResp } from '../../model/TypesStarWars';

import './Main.css';
import Card from './Card.tsx';

interface CardsWrapperProps {
  cardCharactersData: PeopleSearchResp[] | [];
}

const ResultsList = (props: CardsWrapperProps) => {
  const [searchParams] = useSearchParams();
  const [pageSearchParam] = useState<number>(Number(searchParams.get('page')));
  const [isDetailedShown, setDetailedShow] = useState<boolean>(false);

  const handleClick = () => {
    setDetailedShow(true);
  };

  return (
    <>
      <section className={`results_list ${isDetailedShown ? 'list' : 'table'}`}>
        {props.cardCharactersData.map((obj, index) => {
          return (
            <Card
              cardData={obj}
              key={index}
              pageData={pageSearchParam}
              searchData={obj.name}
              clickCallback={handleClick}
            />
          );
        })}
      </section>
    </>
  );
};

export default ResultsList;
