import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { InputsData } from '../../model/Model';
import { RootState } from '../Store';

export interface SubmittedDataState {
  data: InputsData[];
}

export const initialState: SubmittedDataState = {
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
