import { LoaderFunctionArgs } from '@remix-run/node';
import {
  Link,
  useLoaderData,
  useNavigation,
  useSearchParams,
} from '@remix-run/react';

import { useTheme } from '../../src/hooks/ContextHooks.ts';
import { getSearchedData } from '../../src/services/StarWarsApi.ts';

import '../../src/components/detailesSection/DetailedSection.css';

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const path = url.pathname.split('/').pop();

  const result = await getSearchedData(String(path));

  return result;
}

const DetailedSection = () => {
  const data = useLoaderData<typeof loader>();

  const [searchParams] = useSearchParams();
  const query = searchParams.get('search') || '';
  const page = searchParams.get('page') || 1;
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <main className={theme + ' detailed_results'} data-testid="detailed_page">
      {navigation.state === 'loading' ? (
        <div className="spinner detailed" data-testid="spinner_test" />
      ) : (
        <>
          {data?.results.length > 0 ? (
            <>
              <p data-testid="name">Name: {data.results[0].name}</p>
              <p data-testid="birth_year">
                Birth year: {data.results[0].birth_year}
              </p>
              <p data-testid="hair_color">
                Hair color: {data.results[0].hair_color}
              </p>
              <p data-testid="skin_color">
                Skin color: {data.results[0].skin_color}
              </p>
              <p data-testid="eye_color">
                Eye color: {data.results[0].eye_color}
              </p>
              <p data-testid="gender">Gender: {data.results[0].gender}</p>
            </>
          ) : null}
          <Link
            className="close_detailed"
            to={`/?search=${query}&page=${page}`}
          >
            X
          </Link>
        </>
      )}
    </main>
  );
};

export default DetailedSection;
