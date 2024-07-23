import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/StateHooks';
import { PeopleSearchResp } from '../../model/TypesStarWars';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../store/pageCharacters/PageCharactersSlice';
import { RootState } from '../../store/Store';

interface FavoritesButtonProps {
  characterData: PeopleSearchResp;
}

export const FavoritesButton = ({ characterData }: FavoritesButtonProps) => {
  const dispatch = useAppDispatch();
  const favoriteCharacters = useAppSelector(
    (state: RootState) => state.favoriteCharacters.favCharacters,
  );

  const checkIsFavorite = (): boolean => {
    const index = favoriteCharacters.indexOf(characterData);

    if (index !== -1) {
      return true;
    } else {
      return false;
    }
  };

  const [checked, setChecked] = useState<boolean>(checkIsFavorite);

  const handleChange = () => {
    if (checked) {
      setChecked(false);
      dispatch(removeFromFavorites(characterData));
    } else {
      setChecked(true);
      dispatch(addToFavorites(characterData));
    }
  };

  return (
    <>
      <input
        type="checkbox"
        className="fav_button"
        checked={checked}
        onChange={handleChange}
      ></input>
    </>
  );
};
