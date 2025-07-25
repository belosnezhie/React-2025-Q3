import React, { useSyncExternalStore } from 'react';

let listeners: (() => void)[] = [];
const subscribe = (listener: () => void): (() => void) => {
  listeners = [...listeners, listener];
  return (): void => {
    listeners = listeners.filter((l) => l !== listener);
  };
};
const getSnapshot = (key: string): null | string => localStorage.getItem(key);

export const useLocalStorage = (
  initialValue: string,
): [null | string, (nextState: string) => void] => {
  const key = 'User_JSFE2023Q4';

  const store: null | string = useSyncExternalStore(subscribe, () =>
    getSnapshot(key),
  );

  const setState = React.useCallback(
    (nextState: string) => {
      if (nextState === undefined || nextState === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, nextState);
      }
    },
    [key, store],
  );

  React.useEffect(() => {
    if (localStorage.getItem(key) === null && initialValue !== undefined) {
      localStorage.setItem(key, initialValue);
    }
  }, [key, initialValue]);

  return [store ?? initialValue, setState];
};
