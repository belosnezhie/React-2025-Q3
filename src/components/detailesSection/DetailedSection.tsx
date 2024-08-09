import { useRouter } from 'next/router';
import { useState } from 'react';

import { useTheme } from '../../hooks/ContextHooks';
import { useFetchSearchedCharactersQuery } from '../../services/StarWarsApi';

import styles from './DetailedSection.module.css';

interface DetailedSectionProps {
  destroyCallback: (isDestroyed: boolean) => void;
}

const DetailedSection = ({ destroyCallback }: DetailedSectionProps) => {
  const [isDestroyed, setDestroyed] = useState<boolean>(false);

  const router = useRouter();
  const queryParams = useRouter().query;
  const query = queryParams.search ? String(queryParams.search) : '';
  const detailed = queryParams.detailed ? String(queryParams.detailed) : '';
  const currentPage = queryParams.page ? Number(queryParams.page) : 1;

  const theme = useTheme();
  const { data, isFetching } = useFetchSearchedCharactersQuery(detailed);
  // const { data, isFetching } = useFetchCharactersQuery({
  //   searchQuery: query,
  //   pageNumber: currentPage,
  // });
  const handleClick = async () => {
    // setSearchParams({ page: String(pageParams) });
    // navigate(`/?search=${query}&page=${pageParams}`);
    await router.push(`/?page=${currentPage}&search=${query}`);
    destroyCallback(false);
    setDestroyed(true);
  };

  return isDestroyed ? null : (
    <main
      className={theme + ' ' + styles.detailedResults}
      id="detailedResults"
      data-testid="detailed_page"
    >
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
          <button className={styles.closeDetailed} onClick={handleClick}>
            X
          </button>
        </>
      )}
    </main>
  );
};

export default DetailedSection;
