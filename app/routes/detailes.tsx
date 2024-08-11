import { LoaderFunctionArgs } from '@remix-run/node';
import {
  useLoaderData,
  // useNavigation,
  useSearchParams,
} from '@remix-run/react';
import { useState } from 'react';

import { useTheme } from '../../src/hooks/ContextHooks.ts';
import { getSearchedData } from '../../src/services/StarWarsApi.ts';

import '../../src/components/detailesSection/DetailedSection.css';

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get('search') || '';

  const result = await getSearchedData(String(query));

  return result;
}

const DetailedSection = () => {
  const data = useLoaderData<typeof loader>();

  const [searchParams, setSearchParams] = useSearchParams();
  const [pageParams] = useState(Number(searchParams.get('page')));
  const [isDestroyed, setDestroyed] = useState<boolean>(false);

  const theme = useTheme();

  const handleClick = () => {
    setSearchParams({ page: String(pageParams) });
    // navigate(`/?search=${query}&page=${pageParams}`);
    setDestroyed(true);
  };

  return isDestroyed ? null : (
    <main className={theme + ' detailed_results'} data-testid="detailed_page">
      {/* {isFetching ? (
        <div className="spinner detailed" data-testid="spinner_test" />
      ) : ( */}
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
      {/* )} */}
    </main>
  );
};

export default DetailedSection;
