import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useTheme } from '../../hooks/ContextHooks';
import './DetailedSection.css';
import useLocalStorage from '../../hooks/UseLocalStorage';
import { useFetchSearchedCharactersQuery } from '../../services/StarWarsApi';

const DetailedSection = () => {
  const { query } = useLocalStorage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageParams] = useState(Number(searchParams.get('page')));
  const [isDestroyed, setDestroyed] = useState<boolean>(false);
  const navigate = useNavigate();

  const theme = useTheme();
  const { data, isFetching } = useFetchSearchedCharactersQuery(
    String(searchParams.get('search')),
  );

  const handleClick = () => {
    setSearchParams({ page: String(pageParams) });
    navigate(`/?search=${query}&page=${pageParams}`);
    setDestroyed(true);
  };

  return isDestroyed ? null : (
    <main className={theme + ' detailed_results'} data-testid="detailed_page">
      {isFetching ? (
        <div className="spinner detailed" data-testid="spinner_test" />
      ) : (
        <>
          {data?.results ? (
            <>
              <p>Name: {data.results[0].name}</p>
              <p>Birth year: {data.results[0].birth_year}</p>
              <p>Hair color: {data.results[0].hair_color}</p>
              <p>Skin color: {data.results[0].skin_color}</p>
              <p>Eye color: {data.results[0].eye_color}</p>
              <p>Gender: {data.results[0].gender}</p>
            </>
          ) : null}
          <button className="close_detailed" onClick={handleClick}>
            X
          </button>
        </>
      )}
    </main>
  );
};

export default DetailedSection;
