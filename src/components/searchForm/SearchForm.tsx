import { useRouter } from 'next/router';
import React, { useState } from 'react';

import styles from './SearchForm.module.css';

const SearchForm = () => {
  const router = useRouter();
  const queryParams = useRouter().query;
  const query = queryParams.search ? String(queryParams.search) : '';
  const [currentInputValue, setCurrentInputValue] = useState<string>(query);

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
