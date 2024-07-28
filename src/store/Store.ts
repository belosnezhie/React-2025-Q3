import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { starWarsApi } from '../services/StarWarsApi';

import favoriteCharactersReducer from './favoriteCharacterSlice/FavoriteCharacterSlice';
import pageReducer from './pageSlice/PageSlice';

const rootReducer = combineReducers({
  favoriteCharacters: favoriteCharactersReducer,
  page: pageReducer,
  [starWarsApi.reducerPath]: starWarsApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(starWarsApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
