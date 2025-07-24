import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export const useLocalStorage = (
  newQuery: string,
): [string, Dispatch<SetStateAction<string>>] => {
  const key = 'User_JSFE2023Q4';

  const [query, setQuery] = useState<string>(() => {
    const stored = localStorage.getItem(key);
    return stored ?? newQuery;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(query));
  }, [key, query]);

  return [query, setQuery] as const;
};
