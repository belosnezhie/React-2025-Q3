import React, { JSX, useState } from 'react';

import './search-form.css';
import { SearchQueryStorage } from '@/services/local-storage';

interface SearchFormProps {
  storage: SearchQueryStorage;
  updateCartsCallback: (searchQuery: string) => void;
}

export const SearchForm = ({
  storage,
  updateCartsCallback,
}: SearchFormProps): JSX.Element => {
  const [currentInputValue, setCurrentInputValue] = useState(
    storage.getSearchQuery(),
  );

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

    storage.setSearchQuery(searchQuery);

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
