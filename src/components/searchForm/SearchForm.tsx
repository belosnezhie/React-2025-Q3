import React, { useState } from 'react';

import './SearchForm.css';
import { searchQueryStorage } from '../../services/LocalStorage';

interface SearchFormProps {
  updateCartsCallback: (searchQuery: string) => Promise<void>;
}

const SearchForm = (props: SearchFormProps) => {
  const [currentInputValue, setCurrentInputValue] = useState<string>(
    searchQueryStorage.getSearchQuery(),
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target: HTMLFormElement = event.target as HTMLFormElement;
    const input = target.elements[0] as HTMLInputElement;
    const searchQuery: string = input.value.trim();

    await props.updateCartsCallback(searchQuery);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInputValue(event.target.value);
  };

  return (
    <>
      <form className="search_form" onSubmit={handleSubmit}>
        <input
          className="search_input"
          type="text"
          onChange={handleChange}
          value={currentInputValue}
        ></input>
        <input className="submit_input" type="submit" value="Search"></input>
      </form>
    </>
  );
};

export default SearchForm;
