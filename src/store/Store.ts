import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import countriesReduser from './countriesSlise/CountriesSlice';
import submittedDataReducer from './submittedDataSlice/SubmittedDataSlice';

const rootReducer = combineReducers({
  submittedData: submittedDataReducer,
  countries: countriesReduser,
});

export const store = configureStore({
  reducer: rootReducer,
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
