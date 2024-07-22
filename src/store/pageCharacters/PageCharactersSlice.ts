import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { PeopleSearchResp } from '../../model/TypesStarWars';
import { RootState } from '../Store';

export interface PageCharactersState {
  characters: PeopleSearchResp[];
}

export const initialState: PageCharactersState = {
  characters: [],
};

export const pageCharacterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    fetchDefaultPageCharacters: (state) => {
      state.value += 1;
    },
    fetchPageCharacters: (state) => {
      state.value -= 1;
    },
    fetchSearchedCharacters: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const {
  getDefaultPageCharacters,
  fetchPageCharacters,
  fetchSearchedCharacters,
} = pageCharacterSlice.actions;
export const selectCount = (state: RootState) => state.counter.value;
export default pageCharacterSlice.reducer;
