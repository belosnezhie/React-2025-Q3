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
  name: 'favoritesCharacters',
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
    donloadFavorites: (state) => {
      state.favCharacters.push();
    },
  },
});

export const {
  addToFavorites,
  removeFromFavorites,
  clearFavorites,
  donloadFavorites,
} = favoriteCharacterSlice.actions;
export const selectCount = (state: RootState) => state.counter.value;
export default favoriteCharacterSlice.reducer;
