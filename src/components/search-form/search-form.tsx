import React, { JSX, useState } from 'react';

import './search-form.css';
import { useSearchParams } from 'react-router-dom';

import { useLocalStorage } from '@/hooks/use-local-storage';
import { SearchQueryStorage } from '@/services/local-storage';

interface SearchFormProps {
  storage: SearchQueryStorage;
  updateCartsCallback: (searchQuery: string) => void;
}

export const SearchForm = ({
  updateCartsCallback,
}: SearchFormProps): JSX.Element => {
  const [query, setQuery] = useLocalStorage('');
  const [currentInputValue, setCurrentInputValue] = useState<string>(query);
  const [_, setSearchParameters] = useSearchParams();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCurrentInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const data = new FormData(event.currentTarget).get('search');

    if (typeof data !== 'string') {
      throw new TypeError('Invalid input');
    }
    const searchQuery: string = data.trim();

    setQuery(searchQuery);
    setSearchParameters({ page: '1' });
    updateCartsCallback(searchQuery);
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
          onChange={handleChange}
          type="text"
          value={currentInputValue}
        />
        <input className="submit_input" type="submit" value="Search" />
      </form>
    </>
  );
};
