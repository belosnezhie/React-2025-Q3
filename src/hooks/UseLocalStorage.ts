export default function useLocalStorage() {
  const key = 'User_JSFE2023Q4';

  const setItemToLS = (query: string): void => {
    window?.localStorage?.setItem(key, query);
  };

  const getItemFromLS = (): string => {
    // if (window?.localStorage?.getItem(key) === null) {
    return '';
    // } else {
    //   return String(window?.localStorage?.getItem(key));
    // }
  };

  const query: string = getItemFromLS();

  const checkSearchQuery = (): boolean => {
    if (!window?.localStorage?.getItem(key)) {
      return false;
    }

    return true;
  };

  return { setItemToLS, query, checkSearchQuery };
}
