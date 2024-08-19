import { createSlice } from '@reduxjs/toolkit';

import { COUNTRIES } from '../../model/Model';

export interface CountriesState {
  countries: string[];
}

export const initialState: CountriesState = {
  countries: COUNTRIES,
};

export const submittedDataSlice = createSlice({
  name: 'submittedData',
  initialState,
  reducers: {},
});

export default submittedDataSlice.reducer;
