import { useLoaderData } from '@remix-run/react';

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
  const MAX_PER_PAGE: number = 10;
  // const location = useLocation();
  // const navigate = useNavigate();

  const data = useLoaderData<typeof loader>();
  // const navigation = useNavigation();

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
            {/* {navigation.state === 'loading' ? (
              <div className="spinner" data-testid="spinner_test" />
            ) : data?.results ? (
              <>
                <section className="results_section">
                  <ResultsList listData={data} />
                </section>
                <Pagination pagesCount={Math.ceil(data.count / MAX_PER_PAGE)} />
              </>
            ) : null} */}
            {data?.results ? (
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
      </div>
      {favCharactersCount ? <Flyout /> : null}
    </>
  );
}
