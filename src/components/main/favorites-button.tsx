import { JSX } from 'react';

import { useAppDispatch } from '@/hooks/state-hooks';
import { CharacterSearchResponse } from '@/model/types-star-wars';
import { addToFavorites } from '@/store/favorites-slice/favorites-slice';

export const FavButton = ({
  characterData,
}: {
  characterData: CharacterSearchResponse;
}): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleClick = (): void => {
    dispatch(addToFavorites(characterData));
  };

  return (
    <button className="fav_button" onClick={handleClick}>
      Add to Favorites
    </button>
  );
};
