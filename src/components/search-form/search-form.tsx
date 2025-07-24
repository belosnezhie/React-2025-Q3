import React, { JSX } from 'react';

import './search-form.css';
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const data = new FormData(event.currentTarget).get('search');

    if (typeof data !== 'string') {
      throw new TypeError('Invalid input');
    }
    const searchQuery: string = data.trim();

    setQuery(searchQuery);

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
          value={query}
        />
        <input className="submit_input" type="submit" value="Search" />
      </form>
    </>
  );
};
