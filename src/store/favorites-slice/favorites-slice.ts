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
  name: 'favorites',
  reducers: {
    addToFavorites: (state, action: PayloadAction<CharacterSearchResponse>) => {
      state.favorites.push(action.payload);
    },
    clearFavorites: (state) => {
      return {
        ...state,
        favorites: [],
      };
    },
    removeFromFavorites: (
      state,
      action: PayloadAction<CharacterSearchResponse>,
    ) => {
      return {
        ...state,
        favorites: state.favorites.filter(
          (item) => item.name !== action.payload.name,
        ),
      };
    },
  },
});

export const { addToFavorites, clearFavorites, removeFromFavorites } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
