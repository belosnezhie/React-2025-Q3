import { useRouter } from 'next/router';
import React, { useState } from 'react';

// import { useSearchParams } from 'react-router-dom';

// import { useAppDispatch, useAppSelector } from '../../hooks/StateHooks';
// import useLocalStorage from '../../hooks/UseLocalStorage';
// import { useFetchCharactersQuery } from '../../services/StarWarsApi';
// import { selectPage, setCurrentPage } from '../../store/pageSlice/PageSlice';

import styles from './SearchForm.module.css';

const SearchForm = () => {
  // const { query, setItemToLS } = useLocalStorage();
  const router = useRouter();
  const queryParams = useRouter().query;
  // const currentPage = queryParams.page ? Number(queryParams.queryParams) : 1;
  const query = queryParams.query ? String(queryParams.search) : '';
  // const currentPage = useAppSelector(selectPage);
  // const [, setSearchParams] = useSearchParams();
  const [currentInputValue, setCurrentInputValue] = useState<string>(query);
  // const dispatch = useAppDispatch();

  // const { refetch } = useFetchCharactersQuery({
  //   searchQuery: query,
  //   pageNumber: currentPage,
  // });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target: HTMLFormElement = event.target as HTMLFormElement;
    const input = target.elements[0] as HTMLInputElement;
    const searchQuery: string = input.value.trim();

    await router.push({
      query: {
        search: searchQuery,
        page: 1,
      },
    });

    // setItemToLS(searchQuery);
    // dispatch(setCurrentPage(1));
    // await refetch();
    // setSearchParams({ search: searchQuery, page: String(1) });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInputValue(event.target.value);
  };

  return (
    <>
      <form
        className={styles.searchForm}
        onSubmit={handleSubmit}
        data-testid="search_form"
      >
        <input
          className={styles.searchInput}
          type="text"
          onChange={handleChange}
          value={currentInputValue}
          data-testid="search_input"
        ></input>
        <input
          className={styles.submitInput}
          type="submit"
          value="Search"
        ></input>
      </form>
    </>
  );
};

export default SearchForm;
