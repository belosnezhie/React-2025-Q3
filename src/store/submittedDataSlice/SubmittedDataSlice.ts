import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { InputsData } from '../../model/Types';
import { RootState } from '../Store';

export interface PageState {
  data: InputsData[];
}

export const initialState: PageState = {
  data: [],
};

export const submittedDataSlice = createSlice({
  name: 'submittedData',
  initialState,
  reducers: {
    saveData: (state, action: PayloadAction<InputsData>) => {
      state.data.push(action.payload);
    },
  },
});

export const { saveData } = submittedDataSlice.actions;
export const selectPage = (state: RootState) => state.submittedData.data;
export default submittedDataSlice.reducer;
