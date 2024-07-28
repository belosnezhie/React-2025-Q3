import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../Store';

export interface PageState {
  currentPage: number;
}

export const initialState: PageState = {
  currentPage: 1,
};

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setCurrentPage } = pageSlice.actions;
export const selectPage = (state: RootState) => state.page.currentPage;
export default pageSlice.reducer;
