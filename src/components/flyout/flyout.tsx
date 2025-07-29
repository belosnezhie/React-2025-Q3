import { JSX } from 'react';

import type { RootState } from '@/store/store';

import { useAppDispatch, useAppSelector } from '@/hooks/state-hooks';
import { clearFavorites } from '@/store/favorites-slice/favorites-slice';

import './flyout.css';

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
      <footer className="flyout" data-testid="flyout">
        <button
          className="unselect_button"
          onClick={() => dispatch(clearFavorites())}
        >
          Unselect all
        </button>
        <p>{favorites.length} items are selected</p>
      </footer>
    </>
  );
};
