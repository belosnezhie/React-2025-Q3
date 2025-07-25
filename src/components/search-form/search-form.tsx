import './search-form.css';
import React, { JSX, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useLocalStorage } from '@/hooks/use-local-storage';
import { SearchQueryStorage } from '@/services/local-storage';

interface SearchFormProps {
  storage: SearchQueryStorage;
  updateCartsCallback: (newSearchQuery: string) => Promise<void>;
}

export const SearchForm = ({ _ }: SearchFormProps): JSX.Element => {
  const [query, setQuery] = useLocalStorage('');
  // const [currentInputValue, setCurrentInputValue] = useState<string>(query);
  // const [searchParameters, setSearchParameters] = useSearchParams();
  const navigate = useNavigate();

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
  //   setCurrentInputValue(event.target.value);
  // };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    const data = new FormData(event.currentTarget).get('search');

    if (typeof data !== 'string') {
      throw new TypeError('Invalid input');
    }
    const currentQuery: string = data.trim();
    // const currentPage = searchParameters.get('page') ?? '1';
    // const shouldFlushPage = currentQuery !== query && currentPage !== '1';
    setQuery(currentQuery);

    navigate(`/?page=1`);

    // if (shouldFlushPage) {
    //   // setSearchParameters({ page: '1' });
    //   navigate(`/?page=1`);
    // } else {
    //   await updateCartsCallback(currentQuery);
    // }
  };

  return (
    <>
      <form
        className="search_form"
        data-testid="search_form"
        onSubmit={handleSubmit}
      >
        <input
          className="search_input"
          name="search"
          // onChange={handleChange}
          type="text"
          // value={currentInputValue}
        />
        <input className="submit_input" type="submit" value="Search" />
      </form>
    </>
  );
};
