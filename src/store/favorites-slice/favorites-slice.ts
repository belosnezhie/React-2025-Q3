import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

import { CharacterSearchResponse } from '@/model/types-star-wars';

export interface FavoritesCharactersState {
  favorites: CharacterSearchResponse[];
}

export const initialState: FavoritesCharactersState = {
  favorites: [],
};

export const favoritesSlice = createSlice({
  initialState,
  name: ' ',
  reducers: {
    addToFavorites: (state, action: PayloadAction<CharacterSearchResponse>) => {
      state.favorites.push(action.payload);
    },
    removeFromFavorites: (
      state,
      action: PayloadAction<CharacterSearchResponse>,
    ) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      return {
        ...state,
        favorites: state.favorites.filter(
          (item) => item.name !== action.payload.name,
        ),
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
