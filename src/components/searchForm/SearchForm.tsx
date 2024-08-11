import { useSearchParams } from '@remix-run/react';
import React, { useState } from 'react';
import './SearchForm.css';

const SearchForm = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('search') || '';
  const [currentInputValue, setCurrentInputValue] = useState<string>(query);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInputValue(event.target.value);
  };

  return (
    <form method="get" className="search_form">
      <input
        type="text"
        name="search"
        className="search_input"
        onChange={handleChange}
        value={currentInputValue}
      />
      <input type="submit" value="Search" className="submit_input" />
    </form>
  );
};

export default SearchForm;
