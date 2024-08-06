import { useAppDispatch, useAppSelector } from '../../hooks/StateHooks';
import { PeopleSearchResp } from '../../model/TypesStarWars';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../store/favoriteCharacterSlice/FavoriteCharacterSlice';
import { RootState } from '../../store/Store';
import styles from '../main/Main.module.css';

interface FavoritesButtonProps {
  characterData: PeopleSearchResp;
}

export const FavoritesButton = ({ characterData }: FavoritesButtonProps) => {
  const dispatch = useAppDispatch();
  const favoriteCharacters = useAppSelector(
    (state: RootState) => state.favoriteCharacters.favCharacters,
  );

  const handleChange = () => {
    if (favoriteCharacters.includes(characterData)) {
      dispatch(removeFromFavorites(characterData));
    } else {
      dispatch(addToFavorites(characterData));
    }
  };

  return (
    <>
      <input
        type="checkbox"
        className={styles.favButton}
        checked={favoriteCharacters.includes(characterData)}
        onChange={handleChange}
        data-testid="fav_button"
      ></input>
    </>
  );
};
