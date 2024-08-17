import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { SliceData } from '../../model/Model';
import { RootState } from '../Store';

export interface SubmittedDataState {
  data: SliceData[];
}

export const initialState: SubmittedDataState = {
  data: [],
};

export const submittedDataSlice = createSlice({
  name: 'submittedData',
  initialState,
  reducers: {
    saveData: (state, action: PayloadAction<SliceData>) => {
      state.data.push(action.payload);
    },
  },
});

export const { saveData } = submittedDataSlice.actions;
export const selectPage = (state: RootState) => state.submittedData.data;
export default submittedDataSlice.reducer;
