import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

import { useLocalStorage } from '@/hooks/use-local-storage';

export const SearchForm = (): React.ReactElement => {
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
    const currentQuery: string = data.trim();
    setQuery(currentQuery);

    setSearchParameters({ page: '1' });
  };

  return (
    <>
      <form
        className="w-min flex justify-center items-center gap-1"
        data-testid="search_form"
        onSubmit={handleSubmit}
      >
        <input
          className={twMerge(
            'block h-[40px] max-w-[180px]',
            'pl-[2%] bg-title text-border',
            'border-2 border-background rounded-lg',
          )}
          name="search"
          onChange={handleChange}
          type="text"
          value={currentInputValue}
        />
        <input
          className={twMerge(
            'h-[40px] block p-[2%] bg-background',
            'cursor-pointer border-0 rounded-lg',
            'transition-transform duration-300',
            'hover:scale-[0.95]',
          )}
          type="submit"
          value="Search"
        />
      </form>
    </>
  );
};
