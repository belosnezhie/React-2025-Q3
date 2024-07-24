import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useTheme } from '../../hooks/ContextHooks';
import './DetailedSection.css';
import { useFetchSearchedCharactersQuery } from '../../services/StarWarsApi';

// interface DetailedSectionProps {
//   service: ApiService;
// }

const DetailedSection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageParams] = useState(Number(searchParams.get('page')));
  // const [searchQueryParams] = useState(String(searchParams.get('search')));
  const [isDestroyed, setDestroyed] = useState<boolean>(false);
  // const [isLoading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const theme = useTheme();
  const { data, isFetching } = useFetchSearchedCharactersQuery({
    searchQuery: String(searchParams.get('search')),
    pageNumber: Number(searchParams.get('page')),
  });

  // const getCharacterData = useCallback(async (): Promise<SearchResp> => {
  //   setLoading(true);
  //   const searchQuery: string = String(searchParams.get('search'));

  //   const resp: SearchResp = await service.getSeachedData(searchQuery);

  //   setCharacterData(resp.results[0]);
  //   setLoading(false);

  //   return resp;
  // }, [searchParams, service]);

  // useEffect(() => {
  //   void getCharacterData();
  // }, [getCharacterData, searchParams]);

  const handleClick = () => {
    setSearchParams({ page: String(pageParams) });
    navigate('/');
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
