import { useCallback, useEffect, useState } from 'react';
import {
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

import Header from '../../components/header/Header.tsx';
import ResultsList from '../../components/main/ResultsList.tsx';
import Pagination from '../../components/pagination/Pagination.tsx';
import { useTheme, useThemeSwitcher } from '../../context/ThemeContext.tsx';
import useLocalStorage from '../../hooks/UseLocalStorage';
import { PeopleSearchResp, SearchResp } from '../../model/TypesStarWars';
import { ApiService } from '../../services/ApiService';

interface MainPageProps {
  service: ApiService;
}

const MainPage = ({ service }: MainPageProps) => {
  const { query, checkSearchQuery } = useLocalStorage();
  const [charactersData, setCharactersData] = useState<PeopleSearchResp[] | []>(
    [],
  );
  const theme = useTheme();
  const handleThemeChange = useThemeSwitcher();
  const [isLoading, setLoading] = useState<boolean>(false);
  const MAX_PER_PAGE: number = 10;
  const [maxPagesCount, setMaxPagesCount] = useState<number>(1);
  const [activePage, setActivePage] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const countPages = (resultsCount: number) =>
    setMaxPagesCount(Math.ceil(resultsCount / MAX_PER_PAGE));

  const checkCurrentPage = useCallback(() => {
    const currentPage: number =
      Number(searchParams.get('page')) === 0
        ? 1
        : Number(searchParams.get('page'));

    return currentPage;
  }, []);

  const searchData = useCallback(
    async (searchQuery: string): Promise<SearchResp> => {
      setLoading(true);
      const res: SearchResp = await service.getSeachedData(searchQuery);

      setCharactersData(res.results);
      setSearchParams({ search: searchQuery });
      countPages(res.count);
      setActivePage(1);
      setLoading(false);

      return res;
    },
    [service],
  );

  const fetchDefaultData = useCallback(async (): Promise<SearchResp> => {
    setLoading(true);
    const currentPage = checkCurrentPage();

    const res: SearchResp = await service.getDefaultData(currentPage);

    setCharactersData(res.results);
    countPages(res.count);
    setActivePage(currentPage);
    setLoading(false);

    return res;
  }, [service]);

  const handlePageChange = async (pageNumber: number): Promise<SearchResp> => {
    setLoading(true);

    const res: SearchResp = checkSearchQuery()
      ? await service.getSeachedData(query, pageNumber)
      : await service.getDefaultData(pageNumber);

    setCharactersData(res.results);
    setLoading(false);
    setSearchParams({ search: query, page: String(pageNumber) });
    setActivePage(pageNumber);

    return res;
  };

  const handleMainClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;

    let isCard = false;

    if (
      (target.parentElement &&
        target.parentElement.classList.contains('card')) ||
      target.classList.contains('card')
    ) {
      isCard = true;
    }

    if (location.pathname.includes('detailed') && !isCard) {
      // возможно, здесь тоже нужно поправить на setSearchParams({ search: query, page: activePage });
      navigate(`/?page=${activePage}`);
    }
  };

  useEffect(() => {
    if (query) {
      void searchData(query);
    } else {
      void fetchDefaultData();
    }
  }, [searchData, fetchDefaultData]);

  return (
    <>
      <div
        className={theme + ' wrapper'}
        onClick={(event: React.MouseEvent<HTMLDivElement>) => {
          handleMainClick(event);
        }}
      >
        <Header
          updateCartsCallback={async (searchQuery: string): Promise<void> => {
            await searchData(searchQuery);
          }}
          changeThemeCallback={handleThemeChange}
        />
        <main className="page">
          {isLoading ? (
            <div className="spinner" data-testid="spinner_test" />
          ) : (
            <>
              <section className="results_section">
                <ResultsList
                  cardCharactersData={charactersData}
                  pageSearchParam={activePage}
                />
              </section>
              <Pagination
                updatePageCallback={handlePageChange}
                currentPage={activePage}
                pagesCount={maxPagesCount}
              />
            </>
          )}
          <div className="yoda" />
        </main>
      </div>
      <Outlet />
    </>
  );
};

export default MainPage;
