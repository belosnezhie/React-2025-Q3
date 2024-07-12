import React, { useState } from 'react';

import './SearchForm.css';
import useLocalStorage from '../../hooks/UseLocalStorage';

interface SearchFormProps {
  updateCartsCallback: (searchQuery: string) => Promise<void>;
}

const SearchForm = (props: SearchFormProps) => {
  const { query } = useLocalStorage();

  const [currentInputValue, setCurrentInputValue] = useState<string>(query);

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
      <form
        className="search_form"
        onSubmit={handleSubmit}
        data-testid="search_form"
      >
        <input
          className="search_input"
          type="text"
          onChange={handleChange}
          value={currentInputValue}
          data-testid="search_input"
        ></input>
        <input className="submit_input" type="submit" value="Search"></input>
      </form>
    </>
  );
};

export default SearchForm;
