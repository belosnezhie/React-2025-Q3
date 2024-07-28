import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { PeopleSearchResp } from '../../model/TypesStarWars';
import { RootState } from '../Store';

export interface FavoritesCharactersState {
  favCharacters: PeopleSearchResp[];
}

export const initialState: FavoritesCharactersState = {
  favCharacters: [],
};

export const favoriteCharacterSlice = createSlice({
  name: 'favoriteCharacters',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<PeopleSearchResp>) => {
      state.favCharacters.push(action.payload);
    },
    removeFromFavorites: (state, action: PayloadAction<PeopleSearchResp>) => {
      return {
        ...state,
        favCharacters: state.favCharacters.filter(
          (item) => item.name !== action.payload.name,
        ),
      };
    },
    clearFavorites: (state) => {
      return {
        ...state,
        favCharacters: [],
      };
    },
  },
});

export const { addToFavorites, removeFromFavorites, clearFavorites } =
  favoriteCharacterSlice.actions;
export const selectFavorite = (state: RootState) =>
  state.favoriteCharacters.favCharacters;
export default favoriteCharacterSlice.reducer;
