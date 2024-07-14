export default function useLocalStorage() {
  const key = 'User_JSFE2023Q4';

  const setItemToLS = (query: string): void => {
    localStorage.setItem(key, query);
  };

  const getItemFromLS = (): string => {
    if (localStorage.getItem(key) === null) {
      return '';
    } else {
      return String(localStorage.getItem(key));
    }
  };

  const query: string = getItemFromLS();

  const checkSearchQuery = (): boolean => {
    if (!localStorage.getItem(key)) {
      return false;
    }

    return true;
  };

  return { setItemToLS, query, checkSearchQuery };
}
