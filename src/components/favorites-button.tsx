import { JSX } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks';
import { CharacterSearchResponse } from '@/model/types-star-wars';
import { addToFavorites, removeFromFavorites, RootState } from '@/state';

export const FavButton = ({
  characterData,
}: {
  characterData: CharacterSearchResponse;
}): JSX.Element => {
  const favotites = useAppSelector(
    (state: RootState) => state.favorites.favorites,
  );
  const dispatch = useAppDispatch();

  const handleChange = (): void => {
    if (favotites.includes(characterData)) {
      dispatch(removeFromFavorites(characterData));
    } else {
      dispatch(addToFavorites(characterData));
    }
  };

  return (
    <input
      checked={favotites.includes(characterData)}
      className="
      w-[35px] h-[35px]
      appearance-none
      cursor-pointer
      bg-background
      mask-[url('/src/assets/star.svg')]
      mask-no-repeat
      mask-center
      mask-cover
      transition-transform
      duration-300
      checked:bg-border
      hover:scale-[0.90]"
      name="fav_checkbox"
      onChange={handleChange}
      type="checkbox"
    />
  );
};
