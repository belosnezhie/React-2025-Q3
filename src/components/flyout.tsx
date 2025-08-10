import React from 'react';
import { twMerge } from 'tailwind-merge';

import type { RootState } from '@/state';

import { DownloadButton } from '@/components';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { clearFavorites } from '@/state';

export const Flyout = (): null | React.ReactElement => {
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
        className={twMerge(
          'sticky bottom-0 w-full p-[2%]',
          'flex items-center justify-between',
          'bg-header-background z-60000',
        )}
        data-testid="flyout"
      >
        <button
          className={twMerge(
            'h-[40px] flex items-center justify-center',
            'p-[2%] bg-background cursor-pointer',
            'rounded-lg no-underline transition-all',
            'duration-300 hover:scale-[0.95]',
          )}
          onClick={() => dispatch(clearFavorites())}
        >
          Unselect all
        </button>
        <p>{favorites.length} items are selected</p>
        <DownloadButton />
      </footer>
    </>
  );
};
