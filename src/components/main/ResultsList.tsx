import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { PeopleSearchResp } from '../../model/TypesStarWars';

import './Main.css';

interface CardsWrapperProps {
  cardCharactersData: PeopleSearchResp[] | [];
}

const ResultsList = (props: CardsWrapperProps) => {
  const [searchParams] = useSearchParams();
  const [pageSearchParam] = useState<number>(Number(searchParams.get('page')));

  return (
    <>
      <section className="results_list">
        <ul>
          {props.cardCharactersData.map((obj, index) => {
            return (
              <Link
                to={`/main/detailed?page=${pageSearchParam}&search=${obj.name}`}
              >
                <li key={index} className="results_item">
                  {obj.name}
                </li>
              </Link>
            );
          })}
        </ul>
      </section>
    </>
  );
};

export default ResultsList;
