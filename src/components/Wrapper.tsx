'use client';

import { useTheme } from '../hooks/ContextHooks';
import { useAppSelector } from '../hooks/StateHooks';
import { type RootState } from '../store/Store';

import { Flyout } from './flyout/Flyout';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  const favCharactersCount = useAppSelector(
    (state: RootState) => state.favoriteCharacters.favCharacters.length,
  );

  return (
    <div className={theme}>
      {children}
      {favCharactersCount ? <Flyout /> : null}
    </div>
  );
};

export default Wrapper;
