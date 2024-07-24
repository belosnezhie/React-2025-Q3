import { useTheme } from '../../hooks/ContextHooks';
import { useAppDispatch, useAppSelector } from '../../hooks/StateHooks';
import { clearFavorites } from '../../store/favoriteCharacter/FavoriteCharacterSlice';
import type { RootState } from '../../store/Store';

import { DownloadButton } from './DownloadButton.tsx';

import './Flyout.css';

export const Flyout = () => {
  const favCharactersCount = useAppSelector(
    (state: RootState) => state.favoriteCharacters.favCharacters.length,
  );
  const dispatch = useAppDispatch();
  const theme = useTheme();

  return (
    <>
      <div className={theme + ' flyout'}>
        <button
          className="unselect_button"
          onClick={() => dispatch(clearFavorites())}
        >
          Unselect all
        </button>
        <p>{favCharactersCount} items are selected</p>
        <DownloadButton />
      </div>
    </>
  );
};
