import React, { useState } from 'react';
import './SearchForm.css';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/StateHooks';
import useLocalStorage from '../../hooks/UseLocalStorage';
import { useFetchCharactersQuery } from '../../services/StarWarsApi';
import { selectPage, setCurrentPage } from '../../store/pageSlice/PageSlice';

const SearchForm = () => {
  const { query, setItemToLS } = useLocalStorage();
  const currentPage = useAppSelector(selectPage);
  const [, setSearchParams] = useSearchParams();
  const [currentInputValue, setCurrentInputValue] = useState<string>(query);
  const dispatch = useAppDispatch();

  const { refetch } = useFetchCharactersQuery({
    searchQuery: query,
    pageNumber: currentPage,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target: HTMLFormElement = event.target as HTMLFormElement;
    const input = target.elements[0] as HTMLInputElement;
    const searchQuery: string = input.value.trim();

    setItemToLS(searchQuery);
    dispatch(setCurrentPage(1));
    await refetch();
    setSearchParams({ search: searchQuery, page: String(1) });
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
