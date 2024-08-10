import { LoaderFunctionArgs } from '@remix-run/node';
import { Outlet, useLoaderData, useNavigation } from '@remix-run/react';

import { Flyout } from '../../src/components/flyout/Flyout.tsx';
import Header from '../../src/components/header/Header.tsx';
import ResultsList from '../../src/components/main/ResultsList.tsx';
import Pagination from '../../src/components/pagination/Pagination.tsx';
// import { ThemeProvider } from '../../src/context/ThemeContext.tsx';
import { useTheme } from '../../src/hooks/ContextHooks.ts';
import { useAppSelector } from '../../src/hooks/StateHooks.ts';
import { getDefaultData } from '../../src/services/StarWarsApi.ts';
import type { RootState } from '../../src/store/Store.ts';

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const page = url.searchParams.get('page') || 1;
  const query = url.searchParams.get('search') || '';

  const result = await getDefaultData(Number(page), String(query));

  return result;
}

export default function MainPage() {
  const theme = useTheme();
  const MAX_PER_PAGE: number = 10;
  // const location = useLocation();
  // const navigate = useNavigate();

  const data = useLoaderData<typeof loader>();
  const navigation = useNavigation();

  const favCharactersCount = useAppSelector(
    (state: RootState) => state.favoriteCharacters.favCharacters.length,
  );

  // const handleMainClick = (event: React.MouseEvent<HTMLDivElement>) => {
  //   const target = event.target as HTMLElement;

  //   let isCard = false;

  //   if (
  //     (target.parentElement &&
  //       target.parentElement.classList.contains('card')) ||
  //     target.classList.contains('card')
  //   ) {
  //     isCard = true;
  //   }

  //   if (location.pathname.includes('detailed') && !isCard) {
  //     navigate(`/?search=${query}&page=${currentPage}`);
  //   }
  // };

  return (
    <>
      <div className="page_wrapper">
        <div
          className={theme + ' wrapper'}
          // onClick={(event: React.MouseEvent<HTMLDivElement>) => {
          //   handleMainClick(event);
          // }}
          data-testid="wrapper"
        >
          <Header />
          <main className="page">
            {navigation.state === 'loading' ? (
              <div className="spinner" data-testid="spinner_test" />
            ) : data?.results ? (
              <>
                <section className="results_section">
                  <ResultsList listData={data} />
                </section>
                <Pagination pagesCount={Math.ceil(data.count / MAX_PER_PAGE)} />
              </>
            ) : null}
            <div className="yoda" />
          </main>
        </div>
        <Outlet />
      </div>
      {favCharactersCount ? <Flyout /> : null}
    </>
  );
}
