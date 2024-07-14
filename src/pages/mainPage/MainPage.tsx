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
import useLocalStorage from '../../hooks/UseLocalStorage';
import { PeopleSearchResp, SearchResp } from '../../model/TypesStarWars';
import { ApiService } from '../../services/ApiService';

interface MainPageProps {
  service: ApiService;
}

const MainPage = ({ service }: MainPageProps) => {
  const { setItemToLS, query } = useLocalStorage();

  const [charactersData, setCharactersData] = useState<PeopleSearchResp[] | []>(
    [],
  );
  const [isLoading, setLoading] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const checkCurrentPage = useCallback(() => {
    const currentPage: number =
      Number(searchParams.get('page')) === 0
        ? 1
        : Number(searchParams.get('page'));

    return currentPage;
  }, [searchParams]);

  const searchData = useCallback(
    async (searchQuery: string): Promise<SearchResp> => {
      setLoading(true);

      setItemToLS(searchQuery);

      const res: SearchResp = await service.getSeachedData(searchQuery);

      setCharactersData(res.results);
      setSearchParams({ search: searchQuery });
      setLoading(false);

      return res;
    },
    [service, setSearchParams, setItemToLS],
  );

  const fetchDefaultData = useCallback(async (): Promise<SearchResp> => {
    setLoading(true);
    const currentPage = checkCurrentPage();

    const res: SearchResp = await service.getDefaultData(currentPage);

    setCharactersData(res.results);
    setActivePage(currentPage);
    setLoading(false);

    return res;
  }, [service, checkCurrentPage]);

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
      navigate(`/?page=${activePage}`);
    }
  };

  const handlePageChange = async (pageNumber: number): Promise<SearchResp> => {
    setLoading(true);

    const res: SearchResp = await service.getDefaultData(pageNumber);

    setCharactersData(res.results);
    setLoading(false);
    navigate(`/?page=${pageNumber}`);
    setActivePage(pageNumber);

    return res;
  };

  // const getData = useCallback(async (): Promise<SearchResp> => {

  // }, []);

  useEffect(() => {
    if (query === '') {
      void fetchDefaultData();
    } else {
      void searchData(query);
    }
  }, [query, fetchDefaultData]);

  return (
    <>
      <div
        className="wrapper"
        onClick={(event: React.MouseEvent<HTMLDivElement>) => {
          handleMainClick(event);
        }}
      >
        <Header
          updateCartsCallback={async (searchQuery: string): Promise<void> => {
            await searchData(searchQuery);
          }}
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
                pagesCount={9}
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
