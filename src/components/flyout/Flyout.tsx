import { useTheme } from '../../hooks/ContextHooks';
import { useAppDispatch, useAppSelector } from '../../hooks/StateHooks';
import { clearFavorites } from '../../store/favoriteCharacterSlice/FavoriteCharacterSlice';
import type { RootState } from '../../store/Store';

import { DownloadButton } from './DownloadButton';
import styles from './Flyout.module.css';

export const Flyout = () => {
  const favCharactersCount = useAppSelector(
    (state: RootState) => state.favoriteCharacters.favCharacters.length,
  );
  const dispatch = useAppDispatch();
  const theme = useTheme();

  return (
    <>
      <div className={theme + ' ' + styles.flyout} data-testid="flyout">
        <button
          className={styles.unselectButton}
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
