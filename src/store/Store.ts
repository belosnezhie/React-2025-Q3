import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { starWarsApi } from '../services/StarWarsApi';

import favoriteCharactersReducer from './favoriteCharacter/FavoriteCharacterSlice';

export const store = configureStore({
  reducer: {
    favoriteCharacters: favoriteCharactersReducer,
    [starWarsApi.reducerPath]: starWarsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(starWarsApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
