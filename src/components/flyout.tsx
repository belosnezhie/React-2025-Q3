import { JSX } from 'react';

import type { RootState } from '@/store/store';

import { useAppDispatch, useAppSelector } from '@/hooks/state-hooks';
import { clearFavorites } from '@/store/favorites-slice/favorites-slice';

export const Flyout = (): JSX.Element | null => {
  const favorites = useAppSelector(
    (state: RootState) => state.favorites.favorites,
  );
  const dispatch = useAppDispatch();

  if (favorites.length === 0) {
    return null;
  }

  return (
    <>
      <footer
        className="sticky bottom-0 w-full flex items-center justify-between bg-header-background z-60000 p-[2%]"
        data-testid="flyout"
      >
        <button
          className="h-[40px] flex items-center justify-center p-[2%] bg-background cursor-pointer rounded-lg no-underline transition-all duration-300"
          onClick={() => dispatch(clearFavorites())}
        >
          Unselect all
        </button>
        <p>{favorites.length} items are selected</p>
      </footer>
    </>
  );
};
