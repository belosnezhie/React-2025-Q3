import {
  useLoaderData,
  useLocation,
  useNavigate,
  useNavigation,
  useSearchParams,
} from '@remix-run/react';

import { loader } from '../../../app/root.tsx';
import { Flyout } from '../../components/flyout/Flyout.tsx';
import Header from '../../components/header/Header.tsx';
import ResultsList from '../../components/main/ResultsList.tsx';
import Pagination from '../../components/pagination/Pagination.tsx';
import { useTheme } from '../../hooks/ContextHooks.ts';
import { useAppSelector } from '../../hooks/StateHooks.ts';
import type { RootState } from '../../store/Store.ts';

export default function MainPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('search') || '';
  const page = searchParams.get('page') || 1;
  const MAX_PER_PAGE: number = 10;
  const location = useLocation();

  const data = useLoaderData<typeof loader>();
  const navigation = useNavigation();

  const favCharactersCount = useAppSelector(
    (state: RootState) => state.favoriteCharacters.favCharacters.length,
  );

  const handleMainClick = () => {
    if (location.pathname.includes('detailes')) {
      navigate(`/?search=${query}&page=${page}`);
    }
  };

  return (
    <>
      <div
        className={theme + ' ' + 'page_wrapper'}
        data-testid="wrapper"
        onClick={handleMainClick}
      >
        <Header />
        <main className="page">
          {navigation.state === 'loading' ? (
            <div className="spinner" data-testid="spinner_test" />
          ) : (
            <>
              <section className="results_section">
                <ResultsList listData={data} />
              </section>
              <Pagination pagesCount={Math.ceil(data.count / MAX_PER_PAGE)} />
            </>
          )}
          <div className="yoda" />
        </main>
        {favCharactersCount ? <Flyout /> : null}
      </div>
    </>
  );
}
