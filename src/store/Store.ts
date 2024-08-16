import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import submittedDataReducer from './submittedDataSlice/SubmittedDataSlice';

// import favoriteCharactersReducer from './favoriteCharacterSlice/FavoriteCharacterSlice';
// import pageReducer from './pageSlice/PageSlice';

const rootReducer = combineReducers({
  submittedData: submittedDataReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
